// https://github.com/Microsoft/TypeScript/issues/4895#issuecomment-401067935

// Using namespace here simply to show that external files
// should NOT have access to OpaqueTagSymbol or OpaqueTag.
// Put this in its own module, without the namespace
declare namespace Tag {
  const OpaqueTagSymbol: unique symbol

  class OpaqueTag<S extends symbol> {
    private [OpaqueTagSymbol]: S
  }

  export type Opaque<T, S extends symbol> = T & OpaqueTag<S>
}
