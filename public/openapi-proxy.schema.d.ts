/**
 * ☢️ Allows easy creation new OpenAPIs that have a selection of paths from multiple OpenAPIs, and proxy the incoming requests to the right path of another server with authentication.
 */
export interface OpenapiProxySchema {
  /**
   * Name of the proxy
   */
  name: string;
  /**
   * List of multiple paths from multiple openapis
   */
  partialApis: PartialApi[];
  info: Info;
  /**
   * Secret API that - if given - must be met to gain access.
   */
  apiKey?: string;
}
/**
 * Only openapiUrl is required. If security isn't given but needed, securitySchemes will be passed on. If operations aren't given, all operations will be included.
 */
export interface PartialApi {
  openapiUrl: string;
  security?: SecurityRequirement;
  operations?: {
    path: string;
    /**
     * Incase the path is not unique, the proxy will suffix something to the path. This is stored here.
     */
    proxyPath?: string;
    method: string;
    /**
     * An array of modifications to the input schema
     */
    modifications?: {
      name: string;
      /**
       * Omit will omit the property, default will set a default but keep it possible to change, fixed will set a default that can't be changed.
       */
      modification: "omit" | "default" | "fixed";
      value?: string;
    }[];
  }[];
}
/**
 * Filled in security details based on the OpenAPIs securitySchemes.
 */
export interface SecurityRequirement {
  [k: string]: string[];
}
/**
 * Info object of the to be served openapi
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
