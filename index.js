import { Tree } from "./tree.js";

const tree = new Tree([1, 5, 6])
tree.insert(2)
tree.delete(5)

console.log(tree.height(tree.find(1)))

console.log(tree.isBalanced())
