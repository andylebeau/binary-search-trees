import Tree from "./Tree.js";

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const tree = new Tree(randomArray(10));

tree.prettyPrint();
// Should always be true
console.log("Balanced:", tree.isBalanced());

console.log("Level Order:", tree.levelOrder());
console.log("preorder:", tree.preorder());
console.log("inorder:", tree.inorder());
console.log("postorder:", tree.postorder());

tree.insert(101);
tree.insert(102);
tree.insert(103);

tree.prettyPrint();
// Should always be false
console.log("Balanced:", tree.isBalanced());

tree.reBalance();

tree.prettyPrint();
// Should always be true
console.log("Balanced:", tree.isBalanced());

console.log("Level Order:", tree.levelOrder());
console.log("preorder:", tree.preorder());
console.log("inorder:", tree.inorder());
console.log("postorder:", tree.postorder());
