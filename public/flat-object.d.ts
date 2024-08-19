/**
 * This is at the core of the simplification. A flat object is a subset of JSON-Schema that doesn't allow for recursion in the JSON object, effectively allowing for easier manipulation of everything defined with these constraints. It can be used for validating data.
 */
export interface FlatObject {
  $schema?: string;
  [k: string]:
    | (boolean | number | null | string)
    | (
        | (boolean | number | null | string)
        | {
            [k: string]: boolean | number | null | string;
          }
      )[];
}
