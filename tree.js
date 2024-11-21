class Node {
    constructor({data, leftChild = null, rightChild = null}) {
        this.data = data
        this.leftChild = leftChild
        this.rightChild = rightChild
    }

    setLeftChild(child) {
        this.leftChild = child
    }

    setRightChild(child) {
        this.rightChild = child
    }

    setData(newData) {
        this.data = newData
    }

    isLeaf() {
        return this.leftChild !== undefined || this.rightChild !== undefined
    }
}

export class Tree {
    constructor(array = []) {
        this.array = array
        this.root = this.buildTree(array)
        this.prettyPrint()
    }

    buildTree(array, start = 0, end = null) {
        const purged = (() => {
            const uniq = [...new Set(array)]
            return uniq.toSorted()
        })()

        if (purged.length <= 0) return 
        if (end == null) end = purged.length - 1

        if (start > end) return null

        const middle = Math.floor((start + end) / 2)        
        const root = new Node({data: purged[middle]})

        root.setLeftChild(this.buildTree(purged, start, middle - 1))
        root.setRightChild(this.buildTree(purged, middle + 1, end))

        return root
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node == null) return
        
        if (node.rightChild != null) 
            this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false)
        
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
        
        if (node.leftChild != null) 
            this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }

    insert(data, node = this.root) {
        console.log(`null? ${node == null} node.data ${node?.data}`)

        if(data == undefined) return 

        if (node == null) return new Node({data})

        if (node.data === data) return node

        if (node.data > data) { node.setLeftChild(this.insert(data, node.leftChild)) }
        else { node.setRightChild(this.insert(data, node.rightChild)) }

        return node
    }

    getSuccessor(node) {
        const successor = node.rightChild
        while (successor != null && successor.leftChild != null) {
            successor = successor.leftChild
        }

        return successor
    }

    delete(data, node = this.root){
        if(data == undefined) return 

        if (node == null) return node

        if (node.data > data) node.setLeftChild(this.delete(data, node.leftChild))
        else if (node.data < data) node.setRightChild(this.delete(data, node.rightChild))
        else {
            // Case 1: Leaf node or One child
            if (node.leftChild == null) return node.rightChild

            if (node.rightChild == null) return node.leftChild

            // Case 3: Two children
            const successor = this.getSuccessor(node)
            node.setData(successor.data)
            node.setRightChild(this.delete(successor.data, node.rightChild))
        }
        
        return node
    }

    find(data, node = this.root) {
        if(data == undefined) return 

        if (node == null) return

        if (node.data === data) return node

        if (node.data > data) {
            return this.find(data, node.leftChild)
        } else {
            return this.find(data, node.rightChild)
        }
    }

    levelOrderIterative(callback, node = this.root) {
        if (!callback) throw new Error('Callback is required')

        if (node == null) return
        
        const queue = []
        queue.push(node)

        while(queue.length > 0) {
            const currentNode = queue.shift()
            callback(currentNode)
            if (currentNode.leftChild != null) queue.push(currentNode.leftChild)
            if (currentNode.rightChild != null) queue.push(currentNode.rightChild)
        }
    }

    levelOrder(callback, nodesInLevel = [this.root]) {
        if (!callback) throw new Error('Callback is required')

        if (nodesInLevel.length <= 0) return

        const nextLevel = []
        for (const node of nodesInLevel) {
            callback(node)
            if (node.leftChild != null) nextLevel.push(node.leftChild)
            if (node.rightChild != null) nextLevel.push(node.rightChild)
        }

        this.levelOrder(callback, nextLevel)
    }

    inOrder(callback, node = this.root) {
        if (!callback) throw new Error('Callback is required')

        if (node == null) return

        this.inOrder(callback, node.leftChild)
        callback(node)
        this.inOrder(callback, node.rightChild)
    }

    preOrder(callback, node = this.root) {
        if (!callback) throw new Error('Callback is required')

        if (node == null) return

        callback(node)
        this.preOrder(callback, node.leftChild)
        this.preOrder(callback, node.rightChild)
    }

    postOrder(callback, node = this.root) {
        if (!callback) throw new Error('Callback is required')

        if (node == null) return

        this.postOrder(callback, node.leftChild)
        this.postOrder(callback, node.rightChild)
        callback(node)
    }

    height(node, height = 0) {
        if (node == null) return 0

        height++

        const heightLeft = this.height(node.leftChild, height)
        const heightRight = this.height(node.rightChild, height)

        let heightMax = heightLeft
        if (heightRight > heightLeft) heightMax = heightRight
        if (height > heightMax) heightMax = height

        return heightMax
    }

    depth(targetNode, node = this.root, depth = 0) {
        if (targetNode == null) return
        if (!this.find(targetNode.data)) return

        if (targetNode.data === node.data) return depth
        
        depth++

        if (node.data > targetNode.data) {
            return this.depth(targetNode, node.leftChild, depth)
        } else {
            return this.depth(targetNode, node.rightChild, depth)
        }
    }

    nodeBalanced(node) {
        const heightLeft = this.height(node.leftChild)
        const heightRight = this.height(node.rightChild)

        return Math.abs(heightLeft - heightRight) <=1
    }

    isBalanced(node = this.root) {
        const balanced = []
        this.inOrder((node) => balanced.push(this.nodeBalanced(node)), node)
        return balanced.every((b) => b)
    }

    rebalance() {
        if (this.isBalanced()) return

        const nodes = []
        this.levelOrder((node) => nodes.push(node.data))

        this.root = this.buildTree(nodes)
    }
     
}