export interface GetLens<Source, Target> {
  get: (source: Source) => Target
}

interface MutLens<Source, Target> {
  mut: (source: Source, target: Target) => void // mutate source by setting the target
}

export interface UnsetLens<Source, Target> {
  unset: (source: Source) => void // mutate source by setting the target to zero
}
