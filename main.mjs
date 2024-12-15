import { Tree, Node } from './binary-search-tree.mjs';

const randomNumbersArray = function (n, min, max) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    const value = Math.floor(Math.random() * (max - min + 1) + min);
    arr.push(value);
  }

  return arr;
};

const tree = new Tree(randomNumbersArray(15, 50, 100));

// Print the tree and if it's balanced
console.log('Tree balanced: ' + tree.isBalanced());
tree.print();
console.log('');
console.log('');

// Insert random values greater than 100
const arr = randomNumbersArray(10, 101, 999);
for (let n of arr) {
  tree.insert(n);
}

// Print the tree and if it's balanced
console.log('Tree balanced: ' + tree.isBalanced());
tree.print();
console.log('');
console.log('');

// Rebalance the tree
tree.rebalance();

// Print the tree and if it's balanced
console.log('Tree balanced: ' + tree.isBalanced());
tree.print();
console.log('');
console.log('');

// Transversal functions
console.log('Level Order');
tree.levelOrder((n) => console.log(n.data));

console.log('\nIn Order');
tree.inOrder((n) => console.log(n.data));

console.log('\nPre Order');
tree.preOrder((n) => console.log(n.data));

console.log('\nPost Order');
tree.postOrder((n) => console.log(n.data));
