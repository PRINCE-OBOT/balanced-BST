import Tree from './tree';

const tree = new Tree([1, 7, 4, 10, 23, 8, 9, 3,  24,  5, 7, 9, 67, 6345, 324]);

console.log(tree.depth(52))
tree.prettyPrint(tree.root);
// console.log(tree.height(67))
