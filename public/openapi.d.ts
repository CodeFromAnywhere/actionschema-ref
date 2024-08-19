/**
 * @minItems 1
 */
export type SchemaArray = [ActionSchema, ...ActionSchema[]];
export type Parameter = ExampleXORExamples &
  SchemaXORContent &
  ParameterLocation & {
    name: string;
    in: string;
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
    schema?: OpenapiSchema | Reference;
    content?: {
      [k: string]: MediaType;
    };
    example?: unknown;
    examples?: {
      [k: string]: Example | Reference;
    };
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^x-".
     */
    [k: string]: unknown;
  };
/**
 * Schema and content are mutually exclusive, at least one is required
 */
export type SchemaXORContent = {
  [k: string]: unknown;
};
/**
 * Parameter location
 */
export type ParameterLocation =
  | {
      in?: "path";
      style?: "matrix" | "label" | "simple";
      required: true;
      [k: string]: unknown;
    }
  | {
      in?: "query";
      style?: "form" | "spaceDelimited" | "pipeDelimited" | "deepObject";
      [k: string]: unknown;
    }
  | {
      in?: "header";
      style?: "simple";
      [k: string]: unknown;
    }
  | {
      in?: "cookie";
      style?: "form";
      [k: string]: unknown;
    };
export type MediaType = ExampleXORExamples & {
  schema?: OpenapiSchema | Reference;
  example?: unknown;
  examples?: {
    [k: string]: Example | Reference;
  };
  encoding?: {
    [k: string]: Encoding;
  };
  /**
   * This interface was referenced by `undefined`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
};
export type Header = ExampleXORExamples &
  SchemaXORContent & {
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    style?: "simple";
    explode?: boolean;
    allowReserved?: boolean;
    schema?: OpenapiSchema | Reference;
    content?: {
      [k: string]: MediaType;
    };
    example?: unknown;
    examples?: {
      [k: string]: Example | Reference;
    };
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^x-".
     */
    [k: string]: unknown;
  };
export type HTTPSecurityScheme = {
  scheme: string;
  bearerFormat?: string;
  description?: string;
  type: "http";
  /**
   * This interface was referenced by `undefined`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
} & (
  | {
      scheme?: string;
      [k: string]: unknown;
    }
  | {
      scheme?: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
);
/**
 * OAS extension that specifies the parameters you use in your scopes.
 */
export type ScopeParameters = {
  name?: string;
  /**
   * Defaults to string, but can be further defined here if it has a specific syntax (using format or regex, for example)
   */
  schema?: OpenapiSchema | Reference2;
  description?: string;
}[];

/**
 * The description of OpenAPI v3.0.x documents, as defined by https://spec.openapis.org/oas/v3.0.3 and extended by ActionSchema.
 */
export interface OpenAPIDocument {
  $schema: string;
  $id?: string;
  /**
   * If given, should be a url linking to the original file, the starting point, if this is not already the one. Used to determine if anything has changed.
   */
  $source?: string;
  /**
   * Version
   */
  openapi: "3.1.0";
  /**
   * Version of actionschema.
   */
  "x-actionschema": string;
  info: Info;
  externalDocs?: ExternalDocumentation;
  /**
   * An array of Server Objects, which provide connectivity information to a target server. If the servers property is not provided, or is an empty array, the default value would be a Server Object with a url value of /.
   */
  servers?: Server[];
  /**
   * An array of Server Objects, indicating the original servers. Useful when defining a proxy.
   */
  "x-origin-servers"?: Server[];
  /**
   * Security Requirement Object (https://spec.openapis.org/oas/latest.html#security-requirement-object)
   *
   * Lists the required security schemes to execute this operation. The name used for each property MUST correspond to a security scheme declared in the Security Schemes under the Components Object.
   *
   * Security Requirement Objects that contain multiple schemes require that all schemes MUST be satisfied for a request to be authorized. This enables support for scenarios where multiple query parameters or HTTP headers are required to convey security information.
   *
   * When a list of Security Requirement Objects is defined on the OpenAPI Object or Operation Object, only one of the Security Requirement Objects in the list needs to be satisfied to authorize the request.
   *
   * A declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement ({}) can be included in the array.
   *
   * Please note: Every item in this array is an object with keys being the scheme names (can be anything). These names should then also be defined in components.securitySchemes.
   */
  security?: SecurityRequirement[];
  /**
   * Used for grouping endpoints together.
   *
   * A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the Operation Object must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
   */
  tags?: Tag[];
  paths: Paths;
  components?: Components;
  /**
   * This interface was referenced by `OpenAPIDocument`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
/**
 * Provides metadata about the API. The metadata MAY be used by tooling as required.
 */
export interface Info {
  title: string;
  /**
   * The version of the OpenAPI document (which is distinct from the OpenAPI Specification version or the API implementation version).
   */
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
  /**
   * Different people in the company and their capabilities and communication channels
   */
  "x-people"?: Contact1[];
  /**
   * Product info.
   */
  "x-product"?: {
    [k: string]: unknown;
  };
  /**
   * Important links needed for agents to make using the API easier.
   */
  "x-links"?: {
    /**
     * URL for a post request for code exchange for access token (Oauth2)
     */
    token_url?: string;
    refresh_url?: string;
    /**
     * Endpoint to revoke the OAuth2 token
     */
    revoke_url?: string;
    /**
     * URL Leading to a page to authorize/login. May contain {slug} that needs to be replaced with the clients slug. Please note this can also be a regular login page url in case the provider doesn't use oauth2.
     */
    authorization_url?: string;
    signupUrl?: string;
    loginUrl?: string;
    forgotPasswordUrl?: string;
    pricingUrl?: string;
    /**
     * Page from where logged-in user can make purchases, cancel subscription, etc.
     */
    billingUrl?: string;
    /**
     * URL of a page where the user can see their usage and its cost.
     */
    usageUrl?: string;
    docsUrl?: string;
    supportUrl?: string;
    /**
     * Url to info about creating integration or authorization with the provider
     */
    integrationsDocsUrl?: string;
    /**
     * Github repo or similar
     */
    sourceUrl?: string;
    /**
     * Url of the page where the user can find the required information for authorizing on the API. Usually this is a page where the user can create and see their API tokens.
     */
    apiManagementUrl?: string;
    createOauthAppUrl?: string;
    /**
     * Docs about scopes
     */
    scopesUrl?: string;
  };
  /**
   * Pricing info including monthly fees.
   */
  "x-pricing"?: {
    /**
     * General summary of all plans
     */
    description?: string;
    plans?: {
      price: number;
      currency: string;
      title: string;
      /**
       * How much credit do you get for this. Credit matches the credit spent with 'priceCredit' extension for operations
       */
      credit: number;
      /**
       * How long will you retain the credit you receive?
       */
      persistence?: "forever" | "interval" | "capped";
      /**
       * Required when filling in persistence 'capped'
       */
      persistenceCappedDays?: number;
      /**
       * If the plan is a subscription based plan, fill in the interval on which every time the price is paid, and credit is given.
       *
       * If there is a pay-as-you-go price, fill in the minimum purchase size for each step. It will be assumed the price to credit ratio is linear.
       */
      interval?: "week" | "month" | "quarter" | "year";
      rateLimit?: Ratelimit;
    }[];
  };
  "x-rateLimit"?: Ratelimit1;
  /**
   * General product reviews, collected.
   */
  "x-reviews"?: {
    [k: string]: unknown;
  };
  /**
   * General latency info.
   */
  "x-latency"?: {
    [k: string]: unknown;
  };
  /**
   * Link to other openapis that could be good alternatives.
   */
  "x-alternatives"?: string[];
  /**
   * Logo metadata. Standard taken from https://apis.guru
   */
  "x-logo"?: {
    /**
     * URL to a logo image
     */
    url?: string;
    backgroundColor?: string;
    secondaryColor?: string;
  };
  /**
   * This interface was referenced by `Info`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
/**
 * Contact information for the exposed API.
 */
export interface Contact {
  name?: string;
  url?: string;
  email?: string;
  "x-phoneNumber"?: string;
  "x-description"?: string;
  /**
   * This interface was referenced by `Contact`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   *
   * This interface was referenced by `Contact1`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
/**
 * The license information for the exposed API.
 */
export interface License {
  name: string;
  url?: string;
  /**
   * This interface was referenced by `License`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface Contact1 {
  name?: string;
  url?: string;
  email?: string;
  "x-phoneNumber"?: string;
  "x-description"?: string;
  /**
   * This interface was referenced by `Contact`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   *
   * This interface was referenced by `Contact1`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
/**
 * Plan-based RateLimit info that overwrites the general rateLimit.
 */
export interface Ratelimit {
  limit?: number;
  interval?: "second" | "minute";
  [k: string]: unknown;
}
/**
 * Global ratelimit info. Can be overwritten either by plans or by operations.
 */
export interface Ratelimit1 {
  limit?: number;
  interval?: "second" | "minute";
  [k: string]: unknown;
}
/**
 * Additional external documentation.
 */
export interface ExternalDocumentation {
  description?: string;
  url: string;
  /**
   * Scraped markdown from the url
   */
  markdown?: {
    [k: string]: unknown;
  };
  /**
   * This interface was referenced by `ExternalDocumentation`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   *
   * This interface was referenced by `ExternalDocumentation1`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface Server {
  url: string;
  description?: string;
  variables?: {
    [k: string]: ServerVariable;
  };
  /**
   * This interface was referenced by `Server`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface ServerVariable {
  enum?: string[];
  default: string;
  description?: string;
  /**
   * This interface was referenced by `ServerVariable`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface SecurityRequirement {
  [k: string]: string[];
}
export interface Tag {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentation1;
  "x-rateLimit"?: Ratelimit2;
  /**
   * This interface was referenced by `Tag`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface ExternalDocumentation1 {
  description?: string;
  url: string;
  /**
   * Scraped markdown from the url
   */
  markdown?: {
    [k: string]: unknown;
  };
  /**
   * This interface was referenced by `ExternalDocumentation`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   *
   * This interface was referenced by `ExternalDocumentation1`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
/**
 * Tag-based ratelimit info.
 */
export interface Ratelimit2 {
  limit?: number;
  interval?: "second" | "minute";
  [k: string]: unknown;
}
/**
 * The available paths and operations for the API.
 */
export interface Paths {}
/**
 * This interface was referenced by `Paths`'s JSON-Schema definition
 * via the `patternProperty` "^\/".
 */
export interface PathItem {}
/**
 * This interface was referenced by `PathItem`'s JSON-Schema definition
 * via the `patternProperty` "^(get|put|post|delete|options|head|patch|trace)$".
 */
export interface Operation {
  /**
   * ActionSchema addition: This can be filled with an array of different things of what you can do with the endpoint with more information of what the input should be and what the output should be.
   */
  "x-capabilities"?: [] | [string];
  /**
   * ActionSchema addition: You can specify an ActionSchema here that specifies the entire lifecycle of this operation. Defining this will allow the server to infer input and output based on which parameters use plugins and which don't.
   */
  "x-schema"?: {
    /**
     * The ActionSchema that defines the steps to be taken and in what order. Can be a reference or the direct schema.
     */
    schema?: ActionSchema | Reference;
    /**
     * Implemenatation may differ.
     *
     * - 'status' will respond immediately with the initial result and status.
     *  - 'wait' will wait for the entire thing to complete or until it has to wait itself. It doesn't need state.
     * - 'stream' will respond immediately and stream further results as they come. Also no need for state.
     */
    implementation?: "status" | "wait" | "stream";
    [k: string]: unknown;
  };
  /**
   * ActionSchema addition: Should refer to an operationId in the same OpenAPI that would undo the side-effect that calling this function caused.
   *
   * If this is given into a path.post object it should mean that this function has an external side-effect when executed, for example it will store some data somewhere.
   *
   * To undo this side-effect when changing or removing the plugin, we can specify an unmount plugin that is also part of the same openapi.
   *
   * The idea is that if specified, the side effect doesn't leavve any residu
   */
  "x-unmountOperationId"?: string;
  /**
   * Object to configure this endpoint to execute specified code. Beware that everything is possible (both remote and local code) but the implementation of where you host your openapi must support it.
   */
  "x-code"?: {
    canRunInBrowser?: boolean;
    /**
     * Must be a uri-reference to a file where the code is found. This can be used in multiple ways. For one we can show the raw code, and secondly, the server implementation can find the file to be executed (or sent to the browser).
     */
    "code-uri"?: string;
    [k: string]: unknown;
  };
  "x-rateLimit"?: Ratelimit3;
  /**
   * Define how much credits need to be blocked for using this endpoint, and deducted afterwards. Can be overwritten in response.
   */
  "x-priceCredit"?: number;
  /**
   * Defining tags here will help group the endpoint for different user interfaces.
   */
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentation1;
  operationId?: string;
  parameters?: (Parameter | Reference)[];
  requestBody?: RequestBody | Reference;
  responses: Responses;
  callbacks?: {
    [k: string]: Callback | Reference;
  };
  deprecated?: boolean;
  security?: SecurityRequirement[];
  servers?: Server[];
  /**
   * This interface was referenced by `Operation`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
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
export interface Reference {
  /**
   * This interface was referenced by `Reference`'s JSON-Schema definition
   * via the `patternProperty` "^\$ref$".
   */
  [k: string]: string;
}
/**
 * Operation-based ratelimit info. This overwrites plan-based or global ratelimits.
 */
export interface Ratelimit3 {
  limit?: number;
  interval?: "second" | "minute";
  [k: string]: unknown;
}
/**
 * Example and examples are mutually exclusive
 */
export interface ExampleXORExamples {
  [k: string]: unknown;
}
export interface OpenapiSchema {
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: number | boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  /**
   * @minItems 1
   */
  required?: [string, ...string[]];
  /**
   * @minItems 1
   */
  enum?: [unknown, ...unknown[]];
  type?: "array" | "boolean" | "integer" | "number" | "object" | "string";
  not?: OpenapiSchema | Reference1;
  allOf?: (OpenapiSchema | Reference1)[];
  oneOf?: (OpenapiSchema | Reference1)[];
  anyOf?: (OpenapiSchema | Reference1)[];
  items?: OpenapiSchema | Reference1;
  properties?: {
    [k: string]: OpenapiSchema | Reference1;
  };
  additionalProperties?: OpenapiSchema | Reference1 | boolean;
  description?: string;
  format?: string;
  default?: unknown;
  nullable?: boolean;
  discriminator?: Discriminator;
  readOnly?: boolean;
  writeOnly?: boolean;
  example?: unknown;
  externalDocs?: ExternalDocumentation1;
  deprecated?: boolean;
  xml?: XML;
  /**
   * This interface was referenced by `OpenapiSchema`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface Reference1 {
  /**
   * This interface was referenced by `Reference1`'s JSON-Schema definition
   * via the `patternProperty` "^\$ref$".
   */
  [k: string]: string;
}
/**
 * Used to select a oneOf-value based on a property in the value. See https://swagger.io/specification/v3/#discriminator-object
 */
export interface Discriminator {
  propertyName: string;
  mapping?: {
    [k: string]: string;
  };
  [k: string]: unknown;
}
/**
 * A metadata object that allows for more fine-tuned XML model definitions
 */
export interface XML {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
  /**
   * This interface was referenced by `XML`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
/**
 * See https://swagger.io/specification/v3/#example-object
 */
export interface Example {
  summary?: string;
  description?: string;
  value?: unknown;
  externalValue?: string;
  /**
   * This interface was referenced by `Example`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface Encoding {
  contentType?: string;
  headers?: {
    [k: string]: Header | Reference;
  };
  style?: "form" | "spaceDelimited" | "pipeDelimited" | "deepObject";
  explode?: boolean;
  allowReserved?: boolean;
  /**
   * This interface was referenced by `Encoding`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface RequestBody {
  description?: string;
  content: {
    [k: string]: MediaType;
  };
  required?: boolean;
  /**
   * This interface was referenced by `RequestBody`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface Responses {
  default?: Response | Reference;
}
export interface Response {
  description: string;
  headers?: {
    [k: string]: Header | Reference;
  };
  content?: {
    [k: string]: MediaType;
  };
  links?: {
    [k: string]: Link | Reference;
  };
  /**
   * This interface was referenced by `Response`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface Link {
  operationId?: string;
  operationRef?: string;
  parameters?: {
    [k: string]: unknown;
  };
  requestBody?: unknown;
  description?: string;
  server?: Server;
  /**
   * This interface was referenced by `Link`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface Callback {
  [k: string]: PathItem;
}
/**
 * An element to hold various schemas for the specification.
 */
export interface Components {
  schemas?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9\.\-_]+$".
     */
    [k: string]: OpenapiSchema | Reference;
  };
  responses?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9\.\-_]+$".
     */
    [k: string]: Reference | Response;
  };
  parameters?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9\.\-_]+$".
     */
    [k: string]: Reference | Parameter;
  };
  examples?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9\.\-_]+$".
     */
    [k: string]: Reference | Example;
  };
  requestBodies?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9\.\-_]+$".
     */
    [k: string]: Reference | RequestBody;
  };
  headers?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9\.\-_]+$".
     */
    [k: string]: Reference | Header;
  };
  securitySchemes?: OpenapiSecuritySchemes;
  links?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9\.\-_]+$".
     */
    [k: string]: Reference | Link;
  };
  callbacks?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9\.\-_]+$".
     */
    [k: string]: Reference | Callback;
  };
  /**
   * This interface was referenced by `Components`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface OpenapiSecuritySchemes {
  /**
   * This interface was referenced by `OpenapiSecuritySchemes`'s JSON-Schema definition
   * via the `patternProperty` "^[a-zA-Z0-9\.\-_]+$".
   */
  [k: string]:
    | Reference2
    | (APIKeySecurityScheme | HTTPSecurityScheme | OAuth2SecurityScheme | OpenIdConnectSecurityScheme);
}
export interface Reference2 {
  /**
   * This interface was referenced by `Reference2`'s JSON-Schema definition
   * via the `patternProperty` "^\$ref$".
   */
  [k: string]: string;
}
export interface APIKeySecurityScheme {
  type: "apiKey";
  name: string;
  in: "header" | "query" | "cookie";
  description?: string;
  /**
   * This interface was referenced by `APIKeySecurityScheme`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface OAuth2SecurityScheme {
  type: "oauth2";
  flows: OAuthFlows;
  description?: string;
  /**
   * This interface was referenced by `OAuth2SecurityScheme`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface OAuthFlows {
  implicit?: ImplicitOAuthFlow;
  password?: PasswordOAuthFlow;
  clientCredentials?: ClientCredentialsFlow;
  authorizationCode?: AuthorizationCodeOAuthFlow;
  /**
   * This interface was referenced by `OAuthFlows`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface ImplicitOAuthFlow {
  authorizationUrl: string;
  refreshUrl?: string;
  scopes: {
    [k: string]: string;
  };
  /**
   * This interface was referenced by `ImplicitOAuthFlow`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface PasswordOAuthFlow {
  tokenUrl: string;
  refreshUrl?: string;
  scopes: {
    [k: string]: string;
  };
  /**
   * This interface was referenced by `PasswordOAuthFlow`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface ClientCredentialsFlow {
  tokenUrl: string;
  refreshUrl?: string;
  scopes: {
    [k: string]: string;
  };
  /**
   * This interface was referenced by `ClientCredentialsFlow`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
/**
 * See https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type for a good understanding
 */
export interface AuthorizationCodeOAuthFlow {
  authorizationUrl: string;
  tokenUrl: string;
  refreshUrl?: string;
  "x-scopes-parameters"?: ScopeParameters;
  scopes: {
    [k: string]: string;
  };
  /**
   * This interface was referenced by `AuthorizationCodeOAuthFlow`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface OpenIdConnectSecurityScheme {
  type: "openIdConnect";
  openIdConnectUrl: string;
  description?: string;
  /**
   * This interface was referenced by `OpenIdConnectSecurityScheme`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
