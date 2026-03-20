/**
 * A simple node that creates a tree.
 * Only use this node for trees, nothing else.
 * this class is private and only usable in this file.
 */
class GeneralNode<T> {
    value: T;
    children: GeneralNode<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }
}

/**
 * The basic tree which can be considered as the parent of all other kinds of trees.
 */
export class GeneralTree<T> {
    public root: GeneralNode<T> | null;

    constructor(rootValue?: T) {
        this.root = rootValue ? new GeneralNode(rootValue) : null;
    }

    /**
     * If you give it a tree node, it will traverse through all of its children recursively.
     */
    public traverse(node: GeneralNode<T> | null = this.root, depth: number = 0) {
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
    static insert<E>(parentNode: GeneralNode<E>, newValue: E): GeneralNode<E> {
        const newNode = new GeneralNode(newValue);
        parentNode.children.push(newNode);
        return parentNode;
    }
}