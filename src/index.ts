import type { Solver } from "./Types";

const solverByDay: { [key: number]: Solver } = {
  1: require("./day1").default,
};

const ACTIVE_DAY = 1;

async function main() {
  const solver = solverByDay[ACTIVE_DAY];
  if (!solver) {
    console.log(`No solver found for day ${ACTIVE_DAY}`);
    return;
  }

  console.log("******* Example *******");
  const example = await solver.example();
  console.log(example);

  console.log("******* Puzzle *******");
  const puzzle = await solver.puzzle();
  console.log(puzzle);

  console.log("******* End *******");
}
main();
