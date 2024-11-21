import { Tree } from "./tree.js";

const tree = new Tree([1, 5, 6])
tree.insert(7)
tree.insert(8)
tree.insert(9)
tree.insert(10)

console.log(tree.height(undefined))

console.log(tree.isBalanced())
