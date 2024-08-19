/**
 * @minItems 1
 */
export type SchemaArray = [ActionSchema, ...ActionSchema[]];

/**
 * This metaschema defines a JSON Schema that defines a semantic openapi. A semantic openapi abstracts away from authentication and HTTP implementations, and focuses on the semantic meaning of the operations, which have parameters to be described, what's input, and what's output.
 *
 * A Semantic OpenAPI can be implemented as a proxy, and is able to comprise multiple OpenAPIs too. If implemented, a semantic OpenAPI would get an OpenAPI too that would be much simpler than the original OpenAPI.
 */
export interface SemanticOpenapiSchema {
  $schema: "https://ref.actionschema.com/semantic-openapi-schema.json";
  type: "object";
  additionalProperties: false;
  /**
   * The operations. Each operation is defined under a key of the operationId, where the value contains all information of that operation.
   */
  properties: {
    [k: string]: SemanticOperationSchema;
  };
  definitions?: {
    [k: string]: ActionSchema;
  };
}
/**
 * Meta Schema that defines a schema that defines a semantic operation.
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-zA-Z]+[a-zA-Z0-9]*$".
 */
export interface SemanticOperationSchema {
  type: "object";
  /**
   * Combined description of all semantics
   */
  description?: string;
  additionalProperties: false;
  required?: string[];
  /**
   * A semantic operation is an object containing all info needed to execute an operation in an openapi. This JSON schema can be further constrained into a JSON schema for a specific operation. This would make openapiUrl, operationId, tags, summary, description, externalDocs 'const' and only require output (and input if it's required by the openapi).
   */
  properties?: {
    operationId: ActionSchema;
    openapiUrl: ActionSchema;
    tags?: ActionSchema;
    externalDocs?: ActionSchema;
    description?: ActionSchema;
    summary: ActionSchema;
    input?: ActionSchema1;
    output: ActionSchema2;
  };
}
/**
 * Core json-schema meta-schema, adapted to make it an ActionSchema with plugin capabilities. Root taken from https://json-schema.org/draft-07/schema#definitions
 */
export interface ActionSchema {
  /**
   * Useful at root. Dot-notation of where to find the items.
   */
  "x-grid-items-location"?: string;
  /**
   * Useful at root. If this is true, its a schema that is allowed to be read by anyone regardless of the data privacy.
   */
  "x-is-public"?: boolean;
  /**
   * Ensures this value will be stored under a key of its dot-location (if null) or of the value referenced in the relative json pointer of this string. The implementation of this spec should ensure the key doesn't conflict with other indexes. A JSON that uses this implementation will contain a $ref object instead of the actual data at this location, which can then be retrieved to build up the full JSON.
   */
  "x-storage"?: string | null;
  "x-plugin"?: ActionschemaPlugin;
  /**
   * An array of suggested operations to alter this key
   */
  "x-suggested-plugins"?: ActionschemaPlugin1[];
  /**
   * Besides serving as default values for e.g. forms and other things, with ActionSchema `default` also serves as a fallback of `x-plugin`. If x-plugin is empty or it fails, and `default` is available, the default will be set as the value.
   */
  default?: ActionSchema | boolean | number | unknown[] | string;
  /**
   * Sample JSON values associated with a particular schema, for the purpose of illustrating usage.
   *
   * Besides serving as example values for e.g. forms and other things, with ActionSchema `examples` also serves as a fallback of `x-plugin` and `default`.
   */
  examples?: unknown[];
  deprecated?: boolean;
  /**
   * Determines how it's shown in forms. See: https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/
   */
  "ui:widget"?: string;
  /**
   * Determines how it's shown in forms. See: https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/
   */
  "ui:options"?: {
    /**
     * If given, it is assumed the value or values of this property link to this model.
     */
    refModelName?: string;
    [k: string]: unknown;
  };
  $id?: string;
  /**
   * If given, should be a url linking to the original file, the starting point, if this is not already the one. Used to determine if anything has changed.
   */
  $source?: string;
  $schema?: string;
  $ref?: string;
  /**
   * Comment for the makers of the schema
   */
  $comment?: string;
  /**
   * In the form this shows up as the title for the property. More readable.
   */
  title?: string;
  /**
   * Description for schema at this location
   */
  description?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number | boolean;
  maxLength?: number;
  minLength?: number & number;
  pattern?: string;
  additionalItems?: ActionSchema;
  items?: ActionSchema | SchemaArray | boolean;
  maxItems?: number;
  minItems?: number & number;
  uniqueItems?: boolean;
  contains?: ActionSchema;
  maxProperties?: number;
  minProperties?: number & number;
  required?: string[];
  additionalProperties?: ActionSchema | boolean;
  definitions?: {
    [k: string]: ActionSchema;
  };
  properties?: {
    [k: string]: ActionSchema;
  };
  patternProperties?: {
    [k: string]: ActionSchema;
  };
  dependencies?: {
    [k: string]: ActionSchema | string[];
  };
  propertyNames?: ActionSchema;
  const?: ActionSchema | boolean;
  /**
   * @minItems 1
   */
  enum?: [unknown, ...unknown[]];
  type?:
    | ("array" | "boolean" | "integer" | "null" | "number" | "object" | "string")
    | [
        "array" | "boolean" | "integer" | "null" | "number" | "object" | "string",
        ...("array" | "boolean" | "integer" | "null" | "number" | "object" | "string")[]
      ];
  format?: string;
  contentMediaType?: string;
  contentEncoding?: string;
  if?: ActionSchema;
  then?: ActionSchema;
  else?: ActionSchema;
  allOf?: SchemaArray;
  anyOf?: SchemaArray;
  oneOf?: SchemaArray;
  not?: ActionSchema;
}
/**
 * Plug-in an openapi here to say how  this value can be determined.
 */
export interface ActionschemaPlugin {
  /**
   * OpenAPI URL + pointer to the operation
   */
  $operation?: string;
  summary?: string;
  /**
   * Could be used to auto-describe the usage of this plugin
   */
  description?: string;
  /**
   * For plugins for an array. If true, will replace items in the array fully.
   *
   * By default, ActionSchema will insert into an array with an optional discriminator (see below).
   */
  arrayReplace?: boolean;
  /**
   * For plugins for an array. If given, must be a key of the object in the array. Will now overwrite/replace object-items where a discriminator matches, while keeping the rest as-is.
   */
  arrayDiscriminatorPropertyKey?: boolean & string;
  /**
   * If true, will replace the object rather than overwriting it where needed.
   *
   * By default, ActionSchema will overwrite only the given individual properties of an object. In this case, the other properties will be set to stale if needed.
   */
  objectReplace?: boolean;
  $openapi?: OpenAPIDetails;
  /**
   * If given, must resolve to true in order to run this function
   */
  condition?: string;
  /**
   * Simple localizer on the object. if defined, will use it as path in the object/array, like `a.b.c[0].d`
   */
  outputLocation?: string;
  /**
   * If true, this plugin should cause a vertical expansion. This means, for each row it is ran on, it will copy that row for each item in the resulting array. NB: If vertical expand is enabled, initial calculation will still work, including expansion, but recalculation is disabled as it would create exponential expansion.
   */
  isVerticalExpandEnabled?: boolean;
  /**
   * If true, will not auto-execute when dependencies are met. Useful for example for scheduled columns
   */
  isAutoExecuteDisabled?: boolean;
  /**
   * Context given to the function. For strings, you'll be able to use variables here (using `${propertyName}` syntax). This needs to be known by the AI.
   */
  context?: {
    [k: string]: unknown;
  };
  /**
   * Array of dot locations of datapoints that are required to be non-stale for this plugin to run. Should replace `propertyDependencies`. Might later calculate this in realtime using the `x-plugin.code` property
   */
  dataDependencies?: string[];
  /**
   * Cost estimation to run this plugin. This is needed to give insight in costs for generations.
   */
  priceCredit?: number;
  /**
   * @deprecated
   * This could be the code executed upon receiving any context of the schema as context. If we can create an editor that has the proper typescript context and shows the function based on the body, we have a single source of truth for the codebase. We code inside the actionschemas or openapis! The beauty is, this is programming language agnostic and we have a much more readable way to get interfaces.
   */
  code?: {
    host?: "browser" | "serverless" | "server" | "gpu";
    code?: string;
    [k: string]: unknown;
  };
  /**
   * @deprecated
   * For grid-plugins: if true, entire grid data will be provided into the plugin
   */
  isGridDataProvided?: boolean;
  /**
   * @deprecated
   * Property keys in the same object that are required as context. This is needed to know what can be auto-generated. We can only generate if all used variables aren't undefined/null.
   */
  propertyDependencies?: string[];
  /**
   * @deprecated
   * What should the dependant values do when this value changes? If 'stale', there needs to be an `isStalePropertyName` given, so we can set it to stale.
   */
  onChangeDependantBehavior?: "ignore" | "stale" | "reset" | "delete";
  /**
   * @deprecated
   * If given, this could be a reference to another property that resolves to a boolean that, if true, tells that this value is stale.
   */
  stalePropertyName?: string;
  /**
   * @deprecated
   * If given, this could be a reference to another property that resolves to a boolean that, if false, tells that this value is invalid
   */
  validPropertyName?: string;
  [k: string]: unknown;
}
/**
 * @deprecated
 * The OpenAPI information required to execute the function.
 */
export interface OpenAPIDetails {
  url: string;
  /**
   * @deprecated
   */
  path?: string;
  /**
   * @deprecated
   */
  method?: string;
  /**
   * @deprecated
   */
  emoji?: string;
  operationId: string;
  [k: string]: unknown;
}
/**
 * ActionSchema plugin
 */
export interface ActionschemaPlugin1 {
  /**
   * OpenAPI URL + pointer to the operation
   */
  $operation?: string;
  summary?: string;
  /**
   * Could be used to auto-describe the usage of this plugin
   */
  description?: string;
  /**
   * For plugins for an array. If true, will replace items in the array fully.
   *
   * By default, ActionSchema will insert into an array with an optional discriminator (see below).
   */
  arrayReplace?: boolean;
  /**
   * For plugins for an array. If given, must be a key of the object in the array. Will now overwrite/replace object-items where a discriminator matches, while keeping the rest as-is.
   */
  arrayDiscriminatorPropertyKey?: boolean & string;
  /**
   * If true, will replace the object rather than overwriting it where needed.
   *
   * By default, ActionSchema will overwrite only the given individual properties of an object. In this case, the other properties will be set to stale if needed.
   */
  objectReplace?: boolean;
  $openapi?: OpenAPIDetails;
  /**
   * If given, must resolve to true in order to run this function
   */
  condition?: string;
  /**
   * Simple localizer on the object. if defined, will use it as path in the object/array, like `a.b.c[0].d`
   */
  outputLocation?: string;
  /**
   * If true, this plugin should cause a vertical expansion. This means, for each row it is ran on, it will copy that row for each item in the resulting array. NB: If vertical expand is enabled, initial calculation will still work, including expansion, but recalculation is disabled as it would create exponential expansion.
   */
  isVerticalExpandEnabled?: boolean;
  /**
   * If true, will not auto-execute when dependencies are met. Useful for example for scheduled columns
   */
  isAutoExecuteDisabled?: boolean;
  /**
   * Context given to the function. For strings, you'll be able to use variables here (using `${propertyName}` syntax). This needs to be known by the AI.
   */
  context?: {
    [k: string]: unknown;
  };
  /**
   * Array of dot locations of datapoints that are required to be non-stale for this plugin to run. Should replace `propertyDependencies`. Might later calculate this in realtime using the `x-plugin.code` property
   */
  dataDependencies?: string[];
  /**
   * Cost estimation to run this plugin. This is needed to give insight in costs for generations.
   */
  priceCredit?: number;
  /**
   * @deprecated
   * This could be the code executed upon receiving any context of the schema as context. If we can create an editor that has the proper typescript context and shows the function based on the body, we have a single source of truth for the codebase. We code inside the actionschemas or openapis! The beauty is, this is programming language agnostic and we have a much more readable way to get interfaces.
   */
  code?: {
    host?: "browser" | "serverless" | "server" | "gpu";
    code?: string;
    [k: string]: unknown;
  };
  /**
   * @deprecated
   * For grid-plugins: if true, entire grid data will be provided into the plugin
   */
  isGridDataProvided?: boolean;
  /**
   * @deprecated
   * Property keys in the same object that are required as context. This is needed to know what can be auto-generated. We can only generate if all used variables aren't undefined/null.
   */
  propertyDependencies?: string[];
  /**
   * @deprecated
   * What should the dependant values do when this value changes? If 'stale', there needs to be an `isStalePropertyName` given, so we can set it to stale.
   */
  onChangeDependantBehavior?: "ignore" | "stale" | "reset" | "delete";
  /**
   * @deprecated
   * If given, this could be a reference to another property that resolves to a boolean that, if true, tells that this value is stale.
   */
  stalePropertyName?: string;
  /**
   * @deprecated
   * If given, this could be a reference to another property that resolves to a boolean that, if false, tells that this value is invalid
   */
  validPropertyName?: string;
  [k: string]: unknown;
}
/**
 * Core json-schema meta-schema, adapted to make it an ActionSchema with plugin capabilities. Root taken from https://json-schema.org/draft-07/schema#definitions
 */
export interface ActionSchema1 {
  /**
   * Useful at root. Dot-notation of where to find the items.
   */
  "x-grid-items-location"?: string;
  /**
   * Useful at root. If this is true, its a schema that is allowed to be read by anyone regardless of the data privacy.
   */
  "x-is-public"?: boolean;
  /**
   * Ensures this value will be stored under a key of its dot-location (if null) or of the value referenced in the relative json pointer of this string. The implementation of this spec should ensure the key doesn't conflict with other indexes. A JSON that uses this implementation will contain a $ref object instead of the actual data at this location, which can then be retrieved to build up the full JSON.
   */
  "x-storage"?: string | null;
  "x-plugin"?: ActionschemaPlugin;
  /**
   * An array of suggested operations to alter this key
   */
  "x-suggested-plugins"?: ActionschemaPlugin1[];
  /**
   * Besides serving as default values for e.g. forms and other things, with ActionSchema `default` also serves as a fallback of `x-plugin`. If x-plugin is empty or it fails, and `default` is available, the default will be set as the value.
   */
  default?: ActionSchema | boolean | number | unknown[] | string;
  /**
   * Sample JSON values associated with a particular schema, for the purpose of illustrating usage.
   *
   * Besides serving as example values for e.g. forms and other things, with ActionSchema `examples` also serves as a fallback of `x-plugin` and `default`.
   */
  examples?: unknown[];
  deprecated?: boolean;
  /**
   * Determines how it's shown in forms. See: https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/
   */
  "ui:widget"?: string;
  /**
   * Determines how it's shown in forms. See: https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/
   */
  "ui:options"?: {
    /**
     * If given, it is assumed the value or values of this property link to this model.
     */
    refModelName?: string;
    [k: string]: unknown;
  };
  $id?: string;
  /**
   * If given, should be a url linking to the original file, the starting point, if this is not already the one. Used to determine if anything has changed.
   */
  $source?: string;
  $schema?: string;
  $ref?: string;
  /**
   * Comment for the makers of the schema
   */
  $comment?: string;
  /**
   * In the form this shows up as the title for the property. More readable.
   */
  title?: string;
  /**
   * Description for schema at this location
   */
  description?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number | boolean;
  maxLength?: number;
  minLength?: number & number;
  pattern?: string;
  additionalItems?: ActionSchema;
  items?: ActionSchema | SchemaArray | boolean;
  maxItems?: number;
  minItems?: number & number;
  uniqueItems?: boolean;
  contains?: ActionSchema;
  maxProperties?: number;
  minProperties?: number & number;
  required?: string[];
  additionalProperties?: ActionSchema | boolean;
  definitions?: {
    [k: string]: ActionSchema;
  };
  properties?: {
    [k: string]: ActionSchema;
  };
  patternProperties?: {
    [k: string]: ActionSchema;
  };
  dependencies?: {
    [k: string]: ActionSchema | string[];
  };
  propertyNames?: ActionSchema;
  const?: ActionSchema | boolean;
  /**
   * @minItems 1
   */
  enum?: [unknown, ...unknown[]];
  type?:
    | ("array" | "boolean" | "integer" | "null" | "number" | "object" | "string")
    | [
        "array" | "boolean" | "integer" | "null" | "number" | "object" | "string",
        ...("array" | "boolean" | "integer" | "null" | "number" | "object" | "string")[]
      ];
  format?: string;
  contentMediaType?: string;
  contentEncoding?: string;
  if?: ActionSchema;
  then?: ActionSchema;
  else?: ActionSchema;
  allOf?: SchemaArray;
  anyOf?: SchemaArray;
  oneOf?: SchemaArray;
  not?: ActionSchema;
}
/**
 * Core json-schema meta-schema, adapted to make it an ActionSchema with plugin capabilities. Root taken from https://json-schema.org/draft-07/schema#definitions
 */
export interface ActionSchema2 {
  /**
   * Useful at root. Dot-notation of where to find the items.
   */
  "x-grid-items-location"?: string;
  /**
   * Useful at root. If this is true, its a schema that is allowed to be read by anyone regardless of the data privacy.
   */
  "x-is-public"?: boolean;
  /**
   * Ensures this value will be stored under a key of its dot-location (if null) or of the value referenced in the relative json pointer of this string. The implementation of this spec should ensure the key doesn't conflict with other indexes. A JSON that uses this implementation will contain a $ref object instead of the actual data at this location, which can then be retrieved to build up the full JSON.
   */
  "x-storage"?: string | null;
  "x-plugin"?: ActionschemaPlugin;
  /**
   * An array of suggested operations to alter this key
   */
  "x-suggested-plugins"?: ActionschemaPlugin1[];
  /**
   * Besides serving as default values for e.g. forms and other things, with ActionSchema `default` also serves as a fallback of `x-plugin`. If x-plugin is empty or it fails, and `default` is available, the default will be set as the value.
   */
  default?: ActionSchema | boolean | number | unknown[] | string;
  /**
   * Sample JSON values associated with a particular schema, for the purpose of illustrating usage.
   *
   * Besides serving as example values for e.g. forms and other things, with ActionSchema `examples` also serves as a fallback of `x-plugin` and `default`.
   */
  examples?: unknown[];
  deprecated?: boolean;
  /**
   * Determines how it's shown in forms. See: https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/
   */
  "ui:widget"?: string;
  /**
   * Determines how it's shown in forms. See: https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/
   */
  "ui:options"?: {
    /**
     * If given, it is assumed the value or values of this property link to this model.
     */
    refModelName?: string;
    [k: string]: unknown;
  };
  $id?: string;
  /**
   * If given, should be a url linking to the original file, the starting point, if this is not already the one. Used to determine if anything has changed.
   */
  $source?: string;
  $schema?: string;
  $ref?: string;
  /**
   * Comment for the makers of the schema
   */
  $comment?: string;
  /**
   * In the form this shows up as the title for the property. More readable.
   */
  title?: string;
  /**
   * Description for schema at this location
   */
  description?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number | boolean;
  maxLength?: number;
  minLength?: number & number;
  pattern?: string;
  additionalItems?: ActionSchema;
  items?: ActionSchema | SchemaArray | boolean;
  maxItems?: number;
  minItems?: number & number;
  uniqueItems?: boolean;
  contains?: ActionSchema;
  maxProperties?: number;
  minProperties?: number & number;
  required?: string[];
  additionalProperties?: ActionSchema | boolean;
  definitions?: {
    [k: string]: ActionSchema;
  };
  properties?: {
    [k: string]: ActionSchema;
  };
  patternProperties?: {
    [k: string]: ActionSchema;
  };
  dependencies?: {
    [k: string]: ActionSchema | string[];
  };
  propertyNames?: ActionSchema;
  const?: ActionSchema | boolean;
  /**
   * @minItems 1
   */
  enum?: [unknown, ...unknown[]];
  type?:
    | ("array" | "boolean" | "integer" | "null" | "number" | "object" | "string")
    | [
        "array" | "boolean" | "integer" | "null" | "number" | "object" | "string",
        ...("array" | "boolean" | "integer" | "null" | "number" | "object" | "string")[]
      ];
  format?: string;
  contentMediaType?: string;
  contentEncoding?: string;
  if?: ActionSchema;
  then?: ActionSchema;
  else?: ActionSchema;
  allOf?: SchemaArray;
  anyOf?: SchemaArray;
  oneOf?: SchemaArray;
  not?: ActionSchema;
}
