export interface Grid {
  row: number,
  col: number
}

export interface TestCase extends Record<string, Grid> { }
