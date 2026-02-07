import Tree from './tree.js';

const getArrOfRandomNum = (len) => {
  const arr = [];

  for (let i = 1; i < len; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }

  return arr;
};
const tree = new Tree(getArrOfRandomNum(30));

console.log('isBalance', tree.isBalance()); // true

console.log('preOrderForEach');
tree.preOrderForEach((data) => console.log(data));

console.log('inOrderForEach');
tree.inOrderForEach((data) => console.log(data));

console.log('postOrderForEach');
tree.postOrderForEach((data) => console.log(data));

// Unbalance tree
tree.insert(100);
tree.insert(240);

console.log('isBalance', tree.isBalance()); // false

tree.rebalance();

console.log('isBalance', tree.isBalance()); // true

tree.prettyPrint(tree.root);
