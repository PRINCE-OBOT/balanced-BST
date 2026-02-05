import Node from './node.js';

export default class Tree {
  constructor(arr) {
    this.sortedArr = [...new Set(arr)].sort((cur, next) => cur - next);
    this.root = this.buildTree(this.sortedArr, 0, this.sortedArr.length - 1);
  }

  buildTree(sortedArr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const root = new Node(sortedArr[mid]);

    root.left = this.buildTree(sortedArr, start, mid - 1);
    root.right = this.buildTree(sortedArr, mid + 1, end);

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

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const tree = new Tree([2, 3, 9, 5]);
console.log(tree.includes(2));
console.log(tree.includes(3));
console.log(tree.includes(5));
console.log(tree.includes(10));

tree.prettyPrint(tree.root);
