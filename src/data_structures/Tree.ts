/**
 * A simple node that creates a tree.
 * Only use this node for trees, nothing else.
 * this class is private and only usable in this file.
 */
class Node<T> {
    value: T;
    children: Node<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }
}

/**
 * The basic tree which can be considered as the parent of all other kinds of trees.
 */
export class GeneralTree<T> {
    public root: Node<T> | null;

    constructor(rootValue?: T) {
        this.root = rootValue ? new Node(rootValue) : null;
    }

    /**
     * If you give it a tree node, it will traverse through all of its children recursively.
     */
    public traverse(node: Node<T> | null = this.root, depth: number = 0) {
        if (!node) return "";

        let resultingString = "  ".repeat(depth) + "└──" + node.value + "\n";
        for (const child of node.children) {
            resultingString += this.traverse(child, depth + 1);
        }

        return resultingString;
    }

    /**
     * Adds a child node to the specified parent.
     * Then returns the parent node.
     */
    static insert<E>(parentNode: Node<E>, newValue: E): Node<E> {
        const newNode = new Node(newValue);
        parentNode.children.push(newNode);
        return parentNode;
    }
}