import { Tree } from "./tree.js";

const tree = new Tree([1, 5, 6])
const root = tree.buildTree()
tree.prettyPrint(root)
