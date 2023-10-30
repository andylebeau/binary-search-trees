import mergeSort from "./mergeSort.js";

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;
    // CleanArray removes duplicates and sorts the array with the helper mergeSort
    const cleanArray = [...new Set(mergeSort(arr))];
    const mid = Math.floor(cleanArray.length / 2);
    // Create tree by using recursion to find the mid value to create node
    const node = new Node(
      cleanArray[mid],
      this.buildTree(cleanArray.slice(0, mid)),
      this.buildTree(cleanArray.slice(mid + 1))
    );
    return node;
  }

  insert(value, node = this.root) {
    // Insert new node as leaf
    if (!node) return new Node(value);
    // If value exists do nothing, else add in the tree based on left or right value
    value < node.value
      ? (node.left = this.insert(value, node.left))
      : (node.right = this.insert(value, node.right));
    return node;
  }

  delete(value, node = this.root) {
    if (!node) return node;
    if (node.value < value) node.right = this.delete(value, node.right);
    else if (node.value > value) node.left = this.delete(value, node.left);
    else {
      if (node.left === null) return node.right;
      else if (node.right === null) return node.left;

      node.value = this.min(node.right);
      node.right = this.delete(value, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (!node) return null;

    if (value !== node.value) {
      return value < node.value
        ? this.find(value, node.left)
        : this.find(value, node.right);
    }
    return node;
  }

  // level by level
  levelOrder(node = this.root, fifo = [this.root], array = []) {
    if (!node) return [];

    if (node.left) fifo.push(node.left);
    if (node.right) fifo.push(node.right);
    array.push(node.value);
    fifo.shift();
    node = fifo[0];

    if (!node) return array;
    return this.levelOrder(node, fifo, array);
  }

  // left root right
  inOrder(node = this.root, array = []) {
    if (!node) return [];

    if (!node) return;
    this.inOrder(node.left, array);
    array.push(node.value);
    this.inOrder(node.right, array);
    return array;
  }

  // root left right
  preOrder(node = this.root, array = []) {
    if (!node) return [];

    if (!node) return;
    array.push(node.value);
    this.preOrder(node.left, array);
    this.preOrder(node.right, array);
    return array;
  }

  // left right root
  postOrder(node = this.root, array = []) {
    if (!node) return [];

    if (!node) return;
    this.postOrder(node.left, array);
    this.postOrder(node.right, array);
    array.push(node.value);
    return array;
  }

  height(value, node = this.find(value)) {
    if (!node) node = value;
    if (node === null) return -1;
    // Heights for left and right
    const lHeight = this.height(node.left);
    const rHeight = this.height(node.right);
    // Return max height of longest branch plus 1 since above recursion starts at 0
    return Math.max(lHeight, rHeight) + 1;
  }

  depth(value, node = this.root) {
    if (this.find(value)) {
      value = this.find(value);
    } else {
      return null;
    }
    if (value === node) return 0;
    if (value.value < node.value) return this.depth(value.value, node.left) + 1;
    if (value.value > node.value)
      return this.depth(value.value, node.right) + 1;
  }

  isBalanced(node = this.root) {
    if (!node) return null;
    const lHeight = this.height(node.left);
    const rHeight = this.height(node.right);
    return Math.abs(lHeight - rHeight) > 1 ? false : true;
  }

  reBalance() {
    if (this.root === null || this.isBalanced(this.root)) return tree;
    const array = this.inOrder(this.root);
    return (tree = new Tree(array));
  }

  // Helper functions
  min(node) {
    if (!node.left) return node.value;
    return this.min(node.left);
  }
}

// TOP supplied to view tree in console
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let tree = new Tree([10, 20, 30, 40, 50, 60, 70]);
prettyPrint(tree.root);

console.log(tree.postOrder(tree.root));
tree.insert(0);
tree.insert(5);
console.log(tree.isBalanced());
prettyPrint(tree.root);
tree.reBalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.min(tree.root));
