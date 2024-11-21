import { Tree } from "./tree.js";

const tree = new Tree([1, 5, 6])
tree.prettyPrint()
tree.insert(6)
tree.prettyPrint()

console.log(tree.depth(tree.find(5)))
