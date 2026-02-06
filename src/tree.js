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

  delete(delRoot, root, dir) {
    if (!delRoot.left && !delRoot.right) {
      root[dir] = null;
    } else if (!delRoot.left && delRoot.right) {
      root[dir] = delRoot.right;
    } else if (delRoot.left && !delRoot.right) {
      root[dir] = delRoot.left;
    } else {
      const left = delRoot.left;

      if (!delRoot.right.left) {
        const right = delRoot.right;
        right.left = left;

        root[dir] = right;
      } else {
        let prev = delRoot.right;
        let cur = delRoot.right.left;

        let rootLeft;
        while (!rootLeft) {
          if (!cur.left) {
            rootLeft = cur;
            prev.left = null;
          } else {
            prev = cur;
            cur = cur.left;
          }
        }

        rootLeft.left = left;
        rootLeft.right = delRoot.right;

        root[dir] = rootLeft;
      }
    }
  }

  deleteItem(value) {
    if (!this.root) {
      return;
    } else {
      if (this.root.data === value) {
        this.root = null;
        return;
      }
    }

    const rec = (root) => {
      if (!root) return;

      if (root.left) {
        if (root.left.data === value) {
          this.delete(root.left, root, 'left');
          return;
        }
      }
      if (root.right) {
        if (root.right.data === value) {
          this.delete(root.right, root, 'right');
          return;
        }
      }

      rec(root.left);
      rec(root.right);
    };
    rec(this.root);
  }

  isCb(cb) {
    if (typeof cb !== 'function') throw new Error('Callback is required');
  }

  levelOrderForEach(cb) {
    // Using iteration
    this.isCb();
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
    this.isCb();

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

  inOrderForEach(cb) {
    this.isCb(cb);
    if (!this.root) return;

    const rec = (root) => {
      if (root.left) rec(root.left);
      cb(root.data);
      if (root.right) rec(root.right);
    };

    rec(this.root);
  }

  preOrderForEach(cb) {
    this.isCb(cb);
    if (!this.root) return;

    const rec = (root) => {
      cb(root.data);
      if (root.left) rec(root.left);
      if (root.right) rec(root.right);
    };

    rec(this.root);
  }

  postOrderForEach(cb) {
    this.isCb(cb);
    if (!this.root) return;

    const rec = (root) => {
      if (root.left) rec(root.left);
      if (root.right) rec(root.right);
      cb(root.data);
    };

    rec(this.root);
  }

  getHeights(root, hgt = -1, heights = []) {
    hgt++;
    if (root.left) {
      this.getHeights(root.left, hgt, heights);
    }
    if (root.right) {
      this.getHeights(root.right, hgt, heights);
    }
    if (!root.left || !root.right) heights.push(hgt);
    return heights;
  }

  height(value) {
    let height;
    const rec = (root) => {
      if (root.data === value) {
        const heights = this.getHeights(root);
        height = heights.toSorted((cur, next) => next - cur)[0];
        return;
      }

      if (root.left) rec(root.left);
      if (root.right) rec(root.right);
    };

    rec(this.root);

    return height;
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
