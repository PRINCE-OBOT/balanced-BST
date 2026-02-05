import Node from './node.js';

export default class Tree {
  constructor(arr) {
    this.sortedArr = [...new Set(arr)].sort((cur, next) => cur - next);
    this.root = this.#buildTree(this.sortedArr, 0, this.sortedArr.length - 1);
  }

  #buildTree(sortedArr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const root = new Node(sortedArr[mid]);

    root.left = this.#buildTree(sortedArr, start, mid - 1);
    root.right = this.#buildTree(sortedArr, mid + 1, end);

    return root;
  }

  includes(value) {
    if (!this.root) return false;

    const rec = (root) => {
      if (root === null) return;
      if (root.data === value) return true;

      if (rec(root.left) || rec(root.right)) return true;

      return false;
    };

    return rec(this.root);
  }

  insert(value) {
    if (!this.root) this.root = new Node(value);

    const rec = (root) => {
      if (root === null) return;
      if (value === root.data) return;

      if (value < root.data) {
        if (root.left === null) root.left = new Node(value);
        else rec(root.left);
      } else {
        if (root.right === null) root.right = new Node(value);
        else rec(root.right);
      }
    };

    rec(this.root);
  }

  levelOrderForEach(cb) {
    // Using iteration
    if (typeof cb !== 'function') throw new Error('Callback is required');
    if (!this.root) return;

    const queue = [this.root];

    while (queue.length !== 0) {
      const root = queue.shift();

      cb(root.data);

      if (root.left !== null) queue.push(root.left);
      if (root.right !== null) queue.push(root.right);
    }
  }

  levelOrderForEachRec(cb) {
    // Using iteration
    if (typeof cb !== 'function') throw new Error('Callback is required');
    if (!this.root) return;

    const rec = (queue) => {
      const root = queue.shift();

      cb(root.data);

      if (root.left !== null) queue.push(root.left);
      if (root.right !== null) queue.push(root.right);

      if (queue.length !== 0) rec(queue);
    };

    rec([this.root]);
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.prettyPrint(tree.root);
tree.levelOrderForEachRec((data) => console.log(data));
