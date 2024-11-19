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
}

export class Tree {
    root = undefined

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
        if (node === undefined) return
        
        if (node.rightChild !== undefined) this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false)
        
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
        
        if (node.leftChild !== undefined) this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }
     
}