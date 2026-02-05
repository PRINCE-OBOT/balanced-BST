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

  prettyPrint(node, prefix = '', isLeft = true){
     if (node === null || node === undefined) {
       return;
     }

     this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
     console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
     this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
   }
}

const tree = new Tree([2, 3, 9, 5])

tree.prettyPrint(tree.root)