import Node from "./Node.js";

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;
    // CleanArray removes duplicates and sorts the array with the helper mergeSort
    const cleanArray = [...new Set(this.mergeSort(arr))];
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
  inorder(node = this.root, array = []) {
    if (!node) return [];

    if (!node) return;
    this.inorder(node.left, array);
    array.push(node.value);
    this.inorder(node.right, array);
    return array;
  }

  // root left right
  preorder(node = this.root, array = []) {
    if (!node) return [];

    if (!node) return;
    array.push(node.value);
    this.preorder(node.left, array);
    this.preorder(node.right, array);
    return array;
  }

  // left right root
  postorder(node = this.root, array = []) {
    if (!node) return [];

    if (!node) return;
    this.postorder(node.left, array);
    this.postorder(node.right, array);
    array.push(node.value);
    return array;
  }

  height(value) {
    // Assign node the node of value
    let node = this.find(value);
    if (!node) node = value;
    if (node === null) return -1;
    // Heights for left and right
    const lHeight = this.height(node.left);
    const rHeight = this.height(node.right);
    // Return max height of longest branch plus 1 since above recursion starts at 0
    return Math.max(lHeight, rHeight) + 1;
  }

  depth(value, node = this.root) {
    // Finds the assigns the node with value input
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
    if (this.root === null || this.isBalanced(this.root)) return;
    const unbalancedTree = this.levelOrder(this.root);
    const cleanArray = [...new Set(this.mergeSort(unbalancedTree))];
    this.root = this.buildTree(cleanArray);
  }

  // Helper function for buildTree
  mergeSort(array) {
    // Edge cases
    if (array.length === 0 || array.some((value) => typeof value !== "number"))
      return "Please submit an array of numbers.";

    // Base case
    if (array.length < 2) return array;

    // Recursive case
    const mid = Math.ceil(array.length / 2);
    const leftHalf = array.slice(0, mid);
    const rightHalf = array.slice(mid);

    return this.merge(this.mergeSort(leftHalf), this.mergeSort(rightHalf));
  }

  // Helper funtion to merge after sorting
  merge(aArray, bArray) {
    const sorted = [];

    // Both arrays must have a value to sort
    while (aArray.length && bArray.length) {
      aArray[0] <= bArray[0]
        ? sorted.push(aArray.shift())
        : sorted.push(bArray.shift());
    }

    return sorted.concat(aArray, bArray);
  }

  // Helper function for delete
  min(node) {
    if (!node.left) return node.value;
    return this.min(node.left);
  }

  // Code supplied by TOP to console.log visual tree
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
