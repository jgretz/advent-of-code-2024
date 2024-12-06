import { exampleData, puzzleData } from "./data";

type Level = number[];
type Levels = Level[];

function parseLevels(data: string): Levels {
  return data
    .split("\n")
    .map((line) => line.split(" ").map((num) => parseInt(num)));
}

function isIncreasing(level: Level): boolean {
  return level.every((num, i, arr) => {
    if (i === 0) {
      return true;
    }
    return num > arr[i - 1];
  });
}

function isDecreasing(level: Level): boolean {
  return level.every((num, i, arr) => {
    if (i === 0) {
      return true;
    }
    return num < arr[i - 1];
  });
}

function isSpacedLegally(level: Level): boolean {
  return level.every((num, i, arr) => {
    if (i === 0) {
      return true;
    }

    const space = Math.abs(num - arr[i - 1]);
    return space >= 1 && space <= 3;
  });
}

function isLevelSafe(level: Level, withDampener: boolean): boolean {
  const safe =
    (isIncreasing(level) || isDecreasing(level)) && isSpacedLegally(level);
  if (safe || !withDampener) {
    return safe;
  }

  const candidates = level.map((num, i) => {
    return level.toSpliced(i, 1);
  });

  return candidates.some((candidate) => isLevelSafe(candidate, false));
}

function determineSafeLevels(levels: Levels, withDampener: boolean): number {
  return levels.filter((x) => isLevelSafe(x, withDampener)).length;
}

function determineSafeLevelsFromData(
  data: string,
  withDampener = false
): number {
  const levels = parseLevels(data);
  return determineSafeLevels(levels, withDampener);
}

const problem1 = {
  example: function () {
    return determineSafeLevelsFromData(exampleData);
  },
  puzzle: function () {
    return determineSafeLevelsFromData(puzzleData);
  },
};

const problem2 = {
  example: function () {
    return determineSafeLevelsFromData(exampleData, true);
  },
  puzzle: function () {
    return determineSafeLevelsFromData(puzzleData, true);
  },
};

export default { problem1, problem2 };
