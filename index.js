import { Tree } from "./tree.js";

const tree = new Tree([1, 5, 6])
tree.insert(7)
tree.prettyPrint()
tree.insert(8)
tree.insert(9)
tree.prettyPrint()

tree.rebalance()

tree.prettyPrint()
