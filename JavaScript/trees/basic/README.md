# Basic Tree Problems

This directory contains basic tree traversal and manipulation problems from GeeksforGeeks, each implemented with multiple solution approaches in modern JavaScript (ES6+).

## Problems

1. **Binary Tree Inorder Traversal**
   - Problem: [GeeksforGeeks](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)
   - File: `question1.txt`
   - Solutions: `answer1.js`
   - Approaches:
     - Recursive Inorder Traversal
     - Iterative Inorder Traversal using Stack
     - Morris Traversal (Threaded Binary Tree)
     - Iterative with Visited Flag
     - Generator Function Approach

2. **Binary Tree Level Order Traversal**
   - Problem: [LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/)
   - File: `question2.txt`
   - Solutions: `answer2.js`
   - Approaches:
     - BFS with Queue (Level by Level)
     - DFS with Level Tracking
     - BFS with Null Markers
     - Optimized BFS with Level Tracking

3. **Maximum Depth of Binary Tree**
   - Problem: [LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
   - File: `question3.txt`
   - Solutions: `answer3.js`
   - Approaches:
     - Recursive DFS
     - Iterative DFS using Stack
     - BFS (Level Order Traversal)
     - Tail Recursion
     - Level Order with Null Markers

## Implementation Details

### Binary Tree Node Structure
```javascript
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
```

### Key Concepts
- **Inorder Traversal**: Left -> Root -> Right
- **Time Complexity**: O(n) for all approaches
- **Space Complexity**: 
  - Recursive: O(h) where h is the height of the tree (call stack)
  - Iterative (Stack): O(n) in worst case
  - Morris Traversal: O(1) extra space

## Running the Code

1. Navigate to the problem directory
2. Run the solution file with Node.js:
   ```bash
   node answer1.js
   ```
3. View the test results and performance comparison

## Performance Comparison

For a balanced binary tree with ~65,000 nodes:
- Recursive: Fast but limited by call stack depth
- Iterative (Stack): Reliable with consistent performance
- Morris Traversal: Most space-efficient (O(1) extra space)
- Iterative (Visited Flag): Clean implementation with stack
- Generator Function: Functional approach with lazy evaluation

## Next Steps

- Implement more tree traversal variations (preorder, postorder, level order)
- Solve tree construction problems
- Explore balanced tree implementations (AVL, Red-Black trees)
