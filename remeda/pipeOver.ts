import { Modifier } from '../Modifier'

export const pipeOver = <In, Out>(input: In) => (modifiers: Modifier<In>[]) => {
  return modifiers.reduce((input, modifier) => modifier(input), input)
}
