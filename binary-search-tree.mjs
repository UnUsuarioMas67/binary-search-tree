import { mergeSort } from './merge-sort.js';

class Node {
  left = null;
  right = null;

  constructor(data) {
    this.data = data;
  }
}

class Tree {
  root = null;

  constructor(arr) {
    const sorted = mergeSort(arr);
    const withoutDuplicates = [...new Set(sorted)];
    this.root = this.#buildTree(withoutDuplicates);
  }

  #buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    const middle = Math.floor((start + end) / 2);
    const root = new Node(arr[middle]);

    root.left = this.#buildTree(arr, start, middle - 1);
    root.right = this.#buildTree(arr, middle + 1, end);

    return root;
  }

  insert(value) {
    this.#insertRec(new Node(value));
  }

  #insertRec(node, root = this.root) {
    if (!root) {
      return node;
    }

    // No duplicates
    if (root.data === node.data) {
      return root;
    }

    if (node.data < root.data) {
      root.left = this.#insertRec(node, root.left);
    } else if (node.data > root.data) {
      root.right = this.#insertRec(node, root.right);
    }

    return root;
  }

  deleteItem(value) {
    this.#deleteItemRec(this.root, value);
  }

  #findMinRight(node) {
    let curr = node.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }

    return curr;
  }

  #deleteItemRec(root, value) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.#deleteItemRec(root.left, value);
    } else if (value > root.data) {
      root.right = this.#deleteItemRec(root.right, value);
    } else {
      if (!root.left) {
        if (root === this.root) {
          this.root = root.right;
        }

        return root.right;
      }
      if (!root.right) {
        if (root === this.root) {
          this.root = root.left;
        }

        return root.left;
      }

      const temp = this.#findMinRight(root);
      root.data = temp.data;
      root.right = this.#deleteItemRec(root.right, temp.data);
    }

    return root;
  }

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      } else {
        break;
      }
    }

    return current;
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error('A callback must be provided to the function');
    }

    this.#levelOrderRec(callback, [this.root]);
  }

  #levelOrderRec(callback, queue) {
    if (queue.length === 0) {
      return;
    }

    const node = queue.shift();
    callback(node);

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }

    this.#levelOrderRec(callback, queue);
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error('A callback must be provided to the function');
    }

    this.#inOrderRec(this.root, callback);
  }

  #inOrderRec(node, callback) {
    if (node === null) {
      return;
    }

    this.#inOrderRec(node.left, callback);
    callback(node);
    this.#inOrderRec(node.right, callback);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error('A callback must be provided to the function');
    }

    this.#preOrderRec(this.root, callback);
  }

  #preOrderRec(node, callback) {
    if (node === null) {
      return;
    }

    callback(node);
    this.#preOrderRec(node.left, callback);
    this.#preOrderRec(node.right, callback);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error('A callback must be provided to the function');
    }

    this.#postOrderRec(this.root, callback);
  }

  #postOrderRec(node, callback) {
    if (node === null) {
      return;
    }

    this.#postOrderRec(node.left, callback);
    this.#postOrderRec(node.right, callback);
    callback(node);
  }

  height(node = this.root) {
    if (node === null) {
      return -1;
    }

    const hl = this.height(node.left);
    const hr = this.height(node.right);

    return Math.max(hl, hr) + 1;
  }

  depth(node) {
    if (node === null) {
      return -1;
    }

    return this.height() - this.height(node);
  }

  isBalanced() {
    return this.#isBalancedRec() > -1;
  }

  #isBalancedRec(node = this.root) {
    if (!node) {
      return 0;
    }

    const left = this.#isBalancedRec(node.left);
    if (left === -1) {
      return -1;
    }

    const right = this.#isBalancedRec(node.right);
    if (right === -1) {
      return -1;
    }

    if (Math.abs(left - right) > 1) {
      return -1;
    }

    return Math.max(left, right) + 1;
  }

  rebalance() {
    const nodes = [];
    this.inOrder((n) => nodes.push(n.data));
    this.root = this.#buildTree(nodes);
  }

  print() {
    prettyPrint(this.root);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

export { Tree, Node };
