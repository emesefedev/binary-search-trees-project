class Node {
    constructor({data, leftChild, rightChild}) {
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
    }

    buildTree(array, start = 0, end = undefined) {
        if (array.length <= 0) return undefined
        if (end == undefined) end = array.length - 1

        if (start > end) return undefined

        const middle = Math.floor((start + end) / 2)        
        const root = new Node({data: array[middle]})

        root.setLeftChild(this.buildTree(array, start, middle - 1))
        root.setRightChild(this.buildTree(array, middle + 1, end))

        return root
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node == undefined) return
        
        if (node.rightChild != undefined) this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false)
        
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
        
        if (node.leftChild != undefined) this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }

    insertRecursive(data, node) {
        if (node == undefined) return new Node({data})

        if (node.data === data) return node

        if (node.data > data) {
            node.setLeftChild(this.insertRecursive(data, node.leftChild))
        } else {
            node.setRightChild(this.insertRecursive(data, node.rightChild))
        }

        return node
    }

    insert(data) {
        this.prettyPrint(this.root)
        this.insertRecursive(data, this.root)
    }

    getSuccessor(node) {
        const successor = node.rightChild
        while (successor != undefined && successor.leftChild != undefined) {
            successor = successor.leftChild
        }

        return successor
    }

    delete(data, node = this.root){
        if (node == undefined) return node

        if (node.data > data) {
            node.setLeftChild(this.delete(data, node.leftChild))
        } else if (node.data < data) {
            node.setRightChild(this.delete(data, node.rightChild))
        } else {
            // Case 1: Leaf node or One child
            if (node.leftChild == undefined) return node.rightChild

            if (node.rightChild == undefined) return node.leftChild

            // Case 3: Two children
            const successor = this.getSuccessor(node)
            node.setData(successor.data)
            node.setRightChild(this.delete(successor.data, node.rightChild))
        }
        
        return node
    }

    find(data, node = this.root) {
        if (node == undefined) return undefined

        if (node.data === data) return node

        if (node.data > data) {
            return this.find(data, node.leftChild)
        } else {
            return this.find(data, node.rightChild)
        }
    }

    levelOrderIterative(callback, node = this.root) {
        if (callback == undefined) throw new Error('Callback is required')

        if (node == undefined) return
        
        const queue = []
        queue.push(node)

        while(queue.length > 0) {
            const currentNode = queue.shift()
            callback(currentNode)
            if (currentNode.leftChild != undefined) queue.push(currentNode.leftChild)
            if (currentNode.rightChild != undefined) queue.push(currentNode.rightChild)
        }
    }

    levelOrder(callback, nodesInLevel = [this.root]) {
        if (callback == undefined) throw new Error('Callback is required')

        if (nodesInLevel.length <= 0) return

        const nextLevel = []
        for (const node of nodesInLevel) {
            callback(node)
            if (node.leftChild != undefined) nextLevel.push(node.leftChild)
            if (node.rightChild != undefined) nextLevel.push(node.rightChild)
        }

        this.levelOrder(callback, nextLevel)
    }

    inOrder(callback, node = this.root) {
        if (callback == undefined) throw new Error('Callback is required')

        if (node == undefined) return

        this.inOrder(callback, node.leftChild)
        callback(node)
        this.inOrder(callback, node.rightChild)
    }

    preOrder(callback, node = this.root) {
        if (callback == undefined) throw new Error('Callback is required')

        if (node == undefined) return

        callback(node)
        this.preOrder(callback, node.leftChild)
        this.preOrder(callback, node.rightChild)
    }

    postOrder(callback, node = this.root) {
        if (callback == undefined) throw new Error('Callback is required')

        if (node == undefined) return

        this.postOrder(callback, node.leftChild)
        this.postOrder(callback, node.rightChild)
        callback(node)
    }

    height(node = this.root, height = 0) {
        if (node == undefined) return 0

        height++

        const heightLeft = this.height(node.leftChild, height)
        const heightRight = this.height(node.rightChild, height)

        let heightMax = heightLeft
        if (heightRight > heightLeft) heightMax = heightRight
        if (height > heightMax) heightMax = height

        return heightMax
    }

    depth(targetNode, node = this.root, depth = 0) {
        if (targetNode == undefined) return undefined

        if (targetNode.data === node.data) return depth
        
        depth++

        if (node.data > targetNode.data) {
            return this.depth(targetNode, node.leftChild, depth)
        } else {
            return this.depth(targetNode, node.rightChild, depth)
        }
    }
     
}