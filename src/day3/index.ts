import { match } from "ts-pattern";
import { example1Data, example2Data, puzzleData } from "./data";

type Commands = "do" | "dont" | "noop";
type MathOp = "mul";

type Operation =
  | {
      type: Commands;
      numbers: undefined;
    }
  | {
      type: MathOp;
      numbers: number[];
    };

// Regular expression to match the patterns `mul(number, number)`, `do(anything)`, and `don't(anything)`
const opRegex = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g;
const cleanRegex = /[\(\)mul]/g;

function parseOperations(data: string) {
  const operations: Operation[] = [];

  // Extract matches using the regex
  let m: RegExpExecArray | null;
  while ((m = opRegex.exec(data)) !== null) {
    const clean = m[0].replace(cleanRegex, "");
    const op = match(clean)
      .with("do", () => ({ type: "do" as Commands, numbers: undefined }))
      .with("don't", () => ({ type: "dont" as Commands, numbers: undefined }))
      .otherwise((mString) => {
        const numbers = mString.split(",").map((x) => parseInt(x, 10));
        if (!numbers || numbers.length !== 2) {
          return { type: "noop" as Commands, numbers: undefined };
        }

        return {
          type: "mul" as MathOp,
          numbers,
        };
      });

    operations.push(op);
  }

  return operations;
}

function reduceAndSumOperations(operations: Operation[], obey = false) {
  let apply = true;

  return operations.reduce(function (acc, op) {
    const fn = match(op.type)
      .with("mul", () => () => {
        const val = op.numbers!.reduce((x, n) => x * n, 1);
        if (obey && !apply) {
          return;
        }

        acc += val;
      })
      .with("do", () => () => {
        apply = true;
      })
      .with("dont", () => () => {
        apply = false;
      })
      .otherwise(() => () => {});

    fn();
    return acc;
  }, 0);
}

const problem1 = {
  example: function () {
    return reduceAndSumOperations(parseOperations(example1Data));
  },
  puzzle: function () {
    return reduceAndSumOperations(parseOperations(puzzleData));
  },
};

const problem2 = {
  example: function () {
    return reduceAndSumOperations(parseOperations(example2Data), true);
  },
  puzzle: function () {
    return reduceAndSumOperations(parseOperations(puzzleData), true);
  },
};

export default { problem1, problem2 };
