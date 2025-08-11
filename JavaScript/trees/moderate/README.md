# Moderate Tree Problems

This directory contains moderate difficulty tree problems from LeetCode, each implemented with multiple solution approaches in modern JavaScript (ES6+).

## Problems

1. **Validate Binary Search Tree**
   - Problem: [LeetCode #98](https://leetcode.com/problems/validate-binary-search-tree/)
   - File: `question1.txt`
   - Solutions: `answer1.js`
   - Approaches:
     - Inorder Traversal with Array
     - Recursive with Valid Range
     - Iterative with Stack
     - Morris Inorder Traversal

2. **Binary Tree Right Side View**
   - Problem: [LeetCode #199](https://leetcode.com/problems/binary-tree-right-side-view/)
   - File: `question2.txt`
   - Solutions: `answer2.js`
   - Approaches:
     - BFS with Level Tracking
     - DFS with Right-First Traversal
     - Iterative Level Order Traversal

3. **Lowest Common Ancestor of a Binary Tree**
   - Problem: [LeetCode #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
   - File: `question3.txt`
   - Solutions: `answer3.js`
   - Approaches:
     - Recursive DFS
     - Iterative with Parent Pointers
     - Path Comparison
     - Iterative Postorder

## Implementation Details

### Common Patterns
- **BST Validation**: Verifying binary search tree properties
- **Tree Traversal**: Various DFS and BFS approaches
- **Ancestor Finding**: Techniques to find common ancestors
- **Path Finding**: Tracking paths between nodes

### Key Optimizations
- Early termination in BST validation
- Space optimization with Morris traversal
- Efficient parent pointer tracking
- Memory-efficient iterative approaches

## Running the Code

1. Navigate to the problem directory
2. Run the solution file with Node.js:
   ```bash
   node answerX.js
   ```
3. View the test results and performance comparison

## Next Steps
- Explore advanced tree problems (serialization, advanced traversals)
- Implement tree construction algorithms
- Study self-balancing trees (AVL, Red-Black trees)
