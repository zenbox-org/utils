export type Actor<In> = (input: In) => void

export type ActorP<In> = (input: In) => Promise<void>
