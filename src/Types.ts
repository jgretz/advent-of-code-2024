export interface Solver {
  example: () => string | Promise<string>;
  puzzle: () => string | Promise<string>;
}
