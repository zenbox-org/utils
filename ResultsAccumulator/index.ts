export interface ResultsAccumulator<Val, Err> {
  successes: Val[]
  failures: Err[]
}
