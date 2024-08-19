/**
 * ActionSchema plugin
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
