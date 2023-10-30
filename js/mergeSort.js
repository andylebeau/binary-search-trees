export default function mergeSort(array) {
  // edge cases
  if (array.length === 0 || array.some((value) => typeof value !== "number"))
    return "Please submit an array of numbers.";

  // base case
  if (array.length < 2) return array;

  // recursive case
  const mid = Math.ceil(array.length / 2);
  const leftHalf = array.slice(0, mid);
  const rightHalf = array.slice(mid);

  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

// helper funtion to merge after sorting
function merge(aArray, bArray) {
  const sorted = [];

  // both array must have a value to sort
  while (aArray.length && bArray.length) {
    aArray[0] <= bArray[0]
      ? sorted.push(aArray.shift())
      : sorted.push(bArray.shift());
  }

  return sorted.concat(aArray, bArray);
}
