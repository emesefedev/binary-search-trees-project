import { Tree } from "./tree.js";

const tree = new Tree([1, 5, 6])
const root = tree.buildTree()
tree.prettyPrint(root)
tree.insert(2, root)
tree.prettyPrint(root)
tree.delete(1, root)
tree.prettyPrint(root)