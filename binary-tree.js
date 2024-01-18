/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (this.root === null) {
      return 0;
    }

    let depth = 1;
    const queue = [this.root];

    while (queue.length > 0) {
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        const currentNode = queue.shift();

        if (currentNode.left === null && currentNode.right === null) {
          // Found a leaf node, return the depth
          return depth;
        }

        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }

        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }

      // Move to the next level
      depth++;
    }

    return depth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (this.root === null) {
      return 0;
    }

    let maxDepth = 0;
    const queue = [{ node: this.root, depth: 1 }];

    while (queue.length > 0) {
      const { node, depth } = queue.shift();

      if (node.left === null && node.right === null) {
        maxDepth = Math.max(maxDepth, depth);
      }

      if (node.left !== null) {
        queue.push({ node: node.left, depth: depth + 1 });
      }

      if (node.right !== null) {
        queue.push({ node: node.right, depth: depth + 1 });
      }
    }
    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSum = Number.MIN_SAFE_INTEGER;
    let rootNode = this.root
    if (rootNode === null) {
      return 0;
    }

    function maxSumHelper(node) {
      if (node === null) {
        return 0;
      }

      const leftSum = Math.max(0, maxSumHelper(node.left));
      const rightSum = Math.max(0, maxSumHelper(node.right));

      maxSum = Math.max(maxSum, node.val + leftSum + rightSum);

      return node.val + Math.max(leftSum, rightSum);
    }

    // Start the recursive traversal
    maxSumHelper(rootNode);

    // Return the overall maximum sum
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (this.root === null) {
      return null;
    }
  
    const queue = [this.root];
    let currentLarger = Infinity;
  
    while (queue.length > 0) {
      const current = queue.shift();
  
      if (current.val > lowerBound && current.val < currentLarger) {
        currentLarger = current.val;
      }
  
      if (current.left !== null) {
        queue.push(current.left);
      }
  
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    return currentLarger === Infinity ? null : currentLarger;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
