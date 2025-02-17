import { OpenAPIV3 } from "openapi-types";

/**
 * Represents the extracted API endpoint information
 */
export interface ApiEndpointInfo {
  path: string;
  method: string;
  description: string;
  parameters: {
    name: string;
    required: boolean;
    type: string;
    description?: string;
    schema?: OpenAPIV3.SchemaObject;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enum?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default?: any;
  }[];
  responseSchema: OpenAPIV3.SchemaObject | null;
  tags: string[];
}

/**
 * Resolves a parameter reference from components
 */
function resolveParameterRef(
  ref: string,
  spec: OpenAPIV3.Document
): OpenAPIV3.ParameterObject | null {
  const refPath = ref.replace("#/components/parameters/", "").split("/");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = spec.components?.parameters;

  for (const segment of refPath) {
    if (!current || typeof current !== "object") return null;
    current = current[segment];
  }

  return current as OpenAPIV3.ParameterObject;
}

/**
 * Resolves a schema reference from components
 */
function resolveSchemaRef(ref: string, spec: OpenAPIV3.Document): OpenAPIV3.SchemaObject | null {
  const refPath = ref.replace("#/components/schemas/", "").split("/");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = spec.components?.schemas;

  for (const segment of refPath) {
    if (!current || typeof current !== "object") return null;
    current = current[segment];
  }

  // If the resolved schema is still a reference, resolve it recursively
  if (current && typeof current === "object" && "$ref" in current) {
    return resolveSchemaRef(current.$ref, spec);
  }

  return current as OpenAPIV3.SchemaObject;
}

/**
 * Resolves a schema, following references if necessary
 */
function resolveSchema(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
  spec: OpenAPIV3.Document
): OpenAPIV3.SchemaObject | null {
  if ("$ref" in schema) {
    return resolveSchemaRef(schema.$ref, spec);
  }

  // If it's an array type, resolve the item schema
  if (schema.type === "array" && schema.items) {
    const resolvedItems = resolveSchema(
      schema.items as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
      spec
    );
    if (resolvedItems) {
      return {
        ...schema,
        items: resolvedItems,
      };
    }
  }

  // If it's an object type or has properties (even without explicit type), resolve property schemas
  if ((schema.type === "object" || schema.properties) && schema.properties) {
    const resolvedProperties: { [key: string]: OpenAPIV3.SchemaObject } = {};
    for (const [key, prop] of Object.entries(schema.properties)) {
      const resolved = resolveSchema(
        prop as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
        spec
      );
      if (resolved) {
        resolvedProperties[key] = resolved;
      }
    }
    return {
      ...schema,
      type: "object", // Ensure type is set
      properties: resolvedProperties,
    };
  }

  return schema;
}

/**
 * Extracts parameter information from OpenAPI parameter objects
 */
function extractParameterInfo(
  parameter: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject,
  spec: OpenAPIV3.Document
): ApiEndpointInfo["parameters"][0] | null {
  let resolvedParam: OpenAPIV3.ParameterObject;

  if ("$ref" in parameter) {
    const resolved = resolveParameterRef(parameter.$ref, spec);
    if (!resolved) return null;
    resolvedParam = resolved;
  } else {
    resolvedParam = parameter;
  }

  const schema = resolvedParam.schema as OpenAPIV3.SchemaObject;
  return {
    name: resolvedParam.name,
    required: resolvedParam.required || false,
    type: schema?.type || "string",
    description: resolvedParam.description,
    schema: schema,
    enum: schema?.enum,
    default: schema?.default,
  };
}

/**
 * Extracts response schema from OpenAPI operation object
 */
function extractResponseSchema(
  responses: OpenAPIV3.ResponsesObject,
  spec: OpenAPIV3.Document
): OpenAPIV3.SchemaObject | null {
  const successResponse = responses["200"];
  if (!successResponse) return null;

  let schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined;

  if ("$ref" in successResponse) {
    const resolved = resolveSchemaRef(successResponse.$ref, spec);
    if (!resolved) return null;
    schema = resolved;
  } else if ("content" in successResponse) {
    schema = successResponse.content?.["application/json"]?.schema;
  }

  if (!schema) return null;

  if ("$ref" in schema) {
    const resolved = resolveSchemaRef(schema.$ref, spec);
    if (!resolved) return null;
    return resolved;
  }

  return schema;
}

/**
 * Extracts API endpoint information from an OpenAPI path
 */
function extractPathInfo(
  path: string,
  pathItem: Required<OpenAPIV3.PathItemObject>,
  spec: OpenAPIV3.Document
): ApiEndpointInfo[] {
  const endpoints: ApiEndpointInfo[] = [];

  const methods = ["get", "post", "put", "delete", "patch"] as const;
  for (const method of methods) {
    const operation = pathItem[method] as OpenAPIV3.OperationObject;
    if (!operation) continue;

    const endpoint: ApiEndpointInfo = {
      path,
      method: method.toUpperCase(),
      description: operation.description || "",
      parameters: [],
      responseSchema: extractResponseSchema(operation.responses, spec),
      tags: operation.tags || [],
    };

    if (operation.parameters) {
      for (const param of operation.parameters) {
        const paramInfo = extractParameterInfo(param, spec);
        if (paramInfo) {
          endpoint.parameters.push(paramInfo);
        }
      }
    }

    endpoints.push(endpoint);
  }

  return endpoints;
}

/**
 * Parses OpenAPI specification and extracts endpoint information
 */
export function parseOpenApiSpec(spec: OpenAPIV3.Document): Map<string, ApiEndpointInfo[]> {
  const endpointMap = new Map<string, ApiEndpointInfo[]>();

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    if (pathItem) {
      const endpoints = extractPathInfo(path, pathItem as Required<OpenAPIV3.PathItemObject>, spec);
      if (endpoints.length > 0) {
        endpointMap.set(path, endpoints);
      }
    }
  }

  return endpointMap;
}

/**
 * Gets API endpoint information for a specific path
 */
export function getApiEndpointInfo(
  spec: OpenAPIV3.Document,
  targetPath: string
): ApiEndpointInfo[] | null {
  const pathItem = spec.paths[targetPath];
  if (!pathItem) return null;

  return extractPathInfo(targetPath, pathItem as Required<OpenAPIV3.PathItemObject>, spec);
}

/**
 * Generates TypeScript interfaces for API request parameters and response
 */
export function generateTypeDefinitions(
  endpointInfo: ApiEndpointInfo,
  spec: OpenAPIV3.Document,
  typeName: string
): string {
  let typeDefinitions = "";

  // Generate parameter interface
  const parameterProps = endpointInfo.parameters
    .map((param) => {
      const optional = param.required ? "" : "?";
      let type = param.schema?.type || param.type || "string";

      // Convert integer type to number
      if (type === "integer") {
        type = "number";
      }

      // Add enum type if available
      if (param.enum) {
        type = param.enum.map((v) => (typeof v === "string" ? `'${v}'` : v)).join(" | ");
      }

      let docs = param.description ? `/** ${param.description}` : "/**";
      if (param.default !== undefined) {
        docs += `\n   * @default ${param.default}`;
      }
      if (param.enum) {
        docs += `\n   * @enum ${param.enum.join(", ")}`;
      }
      docs += " */";

      // Special handling for contract property to ensure consistency
      if (param.name === "contract") {
        // If it's marked as required in the schema, keep it required
        const contractOptional = param.required ? "" : "?";
        return `  ${docs}\n  contract${contractOptional}: string;`;
      }

      return `  ${docs}\n  ${param.name}${optional}: ${type};`;
    })
    .join("\n\n");

  // Add eslint-disable comment if the interface would be empty
  const paramsComment = !parameterProps
    ? "// eslint-disable-next-line @typescript-eslint/no-empty-interface\n"
    : "";
  typeDefinitions += `${paramsComment}export interface ${typeName}Params {\n${parameterProps}\n}\n\n`;

  // Generate response interface if schema exists
  if (endpointInfo.responseSchema) {
    const resultSchema = endpointInfo.responseSchema.properties?.data as OpenAPIV3.SchemaObject;
    if (resultSchema) {
      let resultType = "";

      if (resultSchema.properties) {
        // If result is an object with properties, generate an interface
        const properties = Object.entries(resultSchema.properties)
          .map(([propName, propSchema]) => {
            const resolvedPropSchema = resolveSchema(
              propSchema as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
              spec
            );
            if (!resolvedPropSchema) return null;

            return generatePropertyDefinition(propName, resolvedPropSchema, spec, "  ");
          })
          .filter(Boolean)
          .join("\n");

        resultType = `{\n${properties}\n}`;
      } else if (resultSchema.type === "array" && resultSchema.items) {
        // If result is an array
        const itemSchema = resolveSchema(resultSchema.items, spec);
        if (itemSchema && (itemSchema.type === "object" || itemSchema.properties)) {
          resultType = `Array<{\n${generateSchemaInterface(itemSchema, spec)}\n}>`;
        } else {
          resultType = `Array<${itemSchema?.type === "integer" ? "number" : itemSchema?.type || "any"}>`;
        }
      } else {
        // For primitive types
        resultType = resultSchema.type === "integer" ? "number" : resultSchema.type || "any";
      }

      typeDefinitions += `export type ${typeName}Response = ApiResponse<${resultType}>;\n`;
    } else {
      // If no result schema, use any
      typeDefinitions += `export type ${typeName}Response = ApiResponse<any>;\n`;
    }
  }

  return typeDefinitions;
}

function generatePropertyDefinition(
  propName: string,
  schema: OpenAPIV3.SchemaObject,
  spec: OpenAPIV3.Document,
  indent: string
): string | null {
  let type: string;

  if (schema.type === "array" && schema.items) {
    const itemSchema = resolveSchema(schema.items, spec);
    if (!itemSchema) return `${propName}: Array<any>;`;

    if (itemSchema.type === "object" || itemSchema.properties) {
      type = `Array<{\n${generateSchemaInterface(itemSchema, spec, indent + "  ")}\n${indent}}>`;
    } else {
      const itemType = itemSchema.type === "integer" ? "number" : itemSchema.type || "any";
      type = `Array<${itemType}>`;
    }
  } else if (schema.type === "object" || schema.properties) {
    type = `{\n${generateSchemaInterface(schema, spec, indent + "  ")}\n${indent}}`;
  } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
    const valueSchema = resolveSchema(schema.additionalProperties, spec);
    if (!valueSchema) {
      type = "{ [key: string]: any }";
    } else if (valueSchema.type === "object" || valueSchema.properties) {
      // Remove the extra braces, the outer braces will be added by the property definition
      type = `{ [key: string]: {\n${generateSchemaInterface(valueSchema, spec, indent + "  ")}\n${indent}} }`;
    } else {
      const valueType = valueSchema.type === "integer" ? "number" : valueSchema.type || "any";
      type = `{ [key: string]: ${valueType} }`;
    }
  } else {
    type = schema.type === "integer" ? "number" : schema.type || "any";
  }

  const optional = schema.required ? "" : "?";
  const description = schema.description ? `\n${indent}/** ${schema.description} */` : "";

  return `${description}\n${indent}${propName}${optional}: ${type};`;
}

/**
 * Generates TypeScript interface properties from an OpenAPI schema
 */
function generateSchemaInterface(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
  spec: OpenAPIV3.Document,
  indent: string = "  "
): string {
  const resolvedSchema = resolveSchema(schema, spec);
  if (!resolvedSchema) return "any";

  if (!resolvedSchema.properties) {
    // Handle array types
    if (resolvedSchema.type === "array" && resolvedSchema.items) {
      const itemSchema = resolveSchema(resolvedSchema.items, spec);
      if (!itemSchema) return "Array<object>";

      if (itemSchema.type === "object" || itemSchema.properties) {
        return `Array<{\n${generateSchemaInterface(itemSchema, spec, indent + "  ")}\n${indent}}>`;
      } else if (itemSchema.type === "array") {
        return `${generateSchemaInterface(itemSchema, spec, indent)}[]`;
      } else {
        const type = itemSchema.type === "integer" ? "number" : itemSchema.type || "object";
        return `Array<${type}>`;
      }
    }

    // Handle additionalProperties (for dictionary/map types)
    if (
      resolvedSchema.additionalProperties &&
      typeof resolvedSchema.additionalProperties === "object"
    ) {
      const valueSchema = resolveSchema(resolvedSchema.additionalProperties, spec);
      if (!valueSchema) return "{ [key: string]: any }";

      if (valueSchema.type === "object" || valueSchema.properties) {
        // Remove the extra braces, they will be added by the property definition
        return `[key: string]: {\n${generateSchemaInterface(valueSchema, spec, indent + "  ")}\n${indent}}`;
      } else {
        const type = valueSchema.type === "integer" ? "number" : valueSchema.type || "any";
        return `[key: string]: ${type}`;
      }
    }

    // Handle primitive types
    return resolvedSchema.type === "integer" ? "number" : resolvedSchema.type || "any";
  }

  // Process each property and handle nested structures
  const properties = Object.entries(resolvedSchema.properties)
    .map(([propName, propSchema]) => {
      const resolvedPropSchema = resolveSchema(
        propSchema as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
        spec
      );
      if (!resolvedPropSchema) return `${propName}: any;`;

      let type: string;

      if (resolvedPropSchema.type === "array" && resolvedPropSchema.items) {
        const itemSchema = resolveSchema(resolvedPropSchema.items, spec);
        if (!itemSchema) return `${propName}: Array<object>;`;

        if (itemSchema.type === "object" || itemSchema.properties) {
          type = `Array<{\n${generateSchemaInterface(itemSchema, spec, indent + "  ")}\n${indent}}>`;
        } else if (itemSchema.type === "array") {
          type = `${generateSchemaInterface(itemSchema, spec, indent)}[]`;
        } else {
          const itemType = itemSchema.type === "integer" ? "number" : itemSchema.type || "object";
          type = `Array<${itemType}>`;
        }
      } else if (resolvedPropSchema.type === "object" || resolvedPropSchema.properties) {
        type = `{\n${generateSchemaInterface(resolvedPropSchema, spec, indent + "  ")}\n${indent}}`;
      } else if (
        resolvedPropSchema.additionalProperties &&
        typeof resolvedPropSchema.additionalProperties === "object"
      ) {
        const valueSchema = resolveSchema(resolvedPropSchema.additionalProperties, spec);
        if (!valueSchema) {
          type = "{ [key: string]: any }";
        } else if (valueSchema.type === "object" || valueSchema.properties) {
          // Remove the extra braces, they will be added by the property definition
          type = `{ [key: string]: {\n${generateSchemaInterface(valueSchema, spec, indent + "  ")}\n${indent}} }`;
        } else {
          const valueType = valueSchema.type === "integer" ? "number" : valueSchema.type || "any";
          type = `{ [key: string]: ${valueType} }`;
        }
      } else {
        type = resolvedPropSchema.type === "integer" ? "number" : resolvedPropSchema.type || "any";
      }

      const optional = resolvedPropSchema.required ? "" : "?";
      const description = resolvedPropSchema.description
        ? `\n${indent}/** ${resolvedPropSchema.description} */`
        : "";

      return `${description}\n${indent}${propName}${optional}: ${type};`;
    })
    .join("\n");

  return properties;
}
