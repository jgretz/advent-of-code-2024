import { example_data, puzzleData } from "./data";

type Lists = [number[], number[]];

function parseLists(data: string): Lists {
  return data.split("\n").reduce(
    function (acc, row) {
      const [val1, val2] = row.split("   ").map(Number);
      acc[0].push(val1);
      acc[1].push(val2);

      return acc;
    },
    [[] as number[], [] as number[]]
  );
}

function sortLists(lists: Lists): Lists {
  return lists.map((list) => list.sort((a, b) => a - b)) as Lists;
}

function calculateDistance(data: Lists): number {
  return data[0].reduce(function (acc, val, i) {
    return acc + Math.abs(val - data[1][i]);
  }, 0);
}

function calculateDistanceForData(data: string): string {
  const lists = parseLists(data);
  const sorted = sortLists(lists);
  const distance = calculateDistance(sorted);

  return `${distance}`;
}

function similarityScore(number: number, list: number[]): number {
  return number * list.filter((x) => x === number).length;
}

function calculateSimilarityScore(data: Lists): number {
  return data[0].reduce(function (acc, val) {
    return acc + similarityScore(val, data[1]);
  }, 0);
}

function calculateSimilarityScoreForData(data: string): string {
  const lists = parseLists(data);
  const sorted = sortLists(lists);
  const score = calculateSimilarityScore(sorted);

  return `${score}`;
}

const problem1 = {
  example: function () {
    return calculateDistanceForData(example_data);
  },
  puzzle: function () {
    return calculateDistanceForData(puzzleData);
  },
};

const problem2 = {
  example: function () {
    return calculateSimilarityScoreForData(example_data);
  },
  puzzle: function () {
    return calculateSimilarityScoreForData(puzzleData);
  },
};

export default { problem1, problem2 };
