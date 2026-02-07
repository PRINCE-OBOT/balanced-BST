import Tree from './tree';

const tree = new Tree([1, 7, 4, 10, 23, 8, 9, 3,  24,  5, 7, 9]);

tree.insert(2)
tree.insert(0)
tree.insert(100)
tree.insert(120)
// console.log(tree.isBalance(52));
tree.rebalance()
tree.prettyPrint(tree.root);
// console.log(tree.height(67))
