import type { Day, ProblemSolver } from "./Types";

const days: { [key: number]: Day } = {
  1: require("./day1").default,
  2: require("./day2").default,
  3: require("./day3").default,
};

const ACTIVE_DAY = 3;

async function runSolve(solver: ProblemSolver, index: number) {
  console.log(`******* Problem ${index} *******`);
  console.log("******* Example *******");
  const example = await solver.example();
  console.log(example);

  console.log("******* Puzzle *******");
  const puzzle = await solver.puzzle();
  console.log(puzzle);

  console.log();
}

async function main() {
  const day = days[ACTIVE_DAY];
  if (!day) {
    console.log(`No day found for ${ACTIVE_DAY}`);
    return;
  }

  console.log(`******* Day ${ACTIVE_DAY} *******\n`);

  await runSolve(day.problem1, 1);
  await runSolve(day.problem2, 2);

  console.log("******* End *******");
}
main();
