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
    }

    buildTree(array = this.array, start = 0, end = undefined) {
        if (array.length <= 0) return 
        if (end == undefined) end = array.length - 1

        if (start > end) return undefined

        const middle = Math.floor((start + end) / 2)        
        const root = new Node({data: array[middle]})

        root.setLeftChild(this.buildTree(array, start, middle - 1))
        root.setRightChild(this.buildTree(array, middle + 1, end))

        return root
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node == undefined) return
        
        if (node.rightChild != undefined) this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false)
        
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
        
        if (node.leftChild != undefined) this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }

    insert(data, node) {
        if (node == undefined) return new Node({data})

        if (node.data === data) return node

        if (node.data > data) {
            node.setLeftChild(this.insert(data, node.leftChild))
        } else {
            node.setRightChild(this.insert(data, node.rightChild))
        }

        return node
    }

    getSuccessor(node) {
        const successor = node.rightChild
        while (successor != undefined && successor.leftChild != undefined) {
            successor = successor.leftChild
        }

        return successor
    }

    delete(data, node){
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
     
}