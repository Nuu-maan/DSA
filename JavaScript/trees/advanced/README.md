# Advanced Tree Problems

This directory contains advanced tree problems from LeetCode, each implemented with multiple solution approaches in modern JavaScript (ES6+).

## Problems

1. **Serialize and Deserialize Binary Tree**
   - Problem: [LeetCode #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
   - File: `question1.txt`
   - Solutions: `answer1.js`
   - Approaches:
     - Preorder Traversal with Null Markers
     - Level Order Traversal
     - JSON Serialization (for reference)
     - Binary Encoding

2. **Binary Tree Maximum Path Sum**
   - Problem: [LeetCode #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
   - File: `question2.txt`
   - Solutions: `answer2.js`
   - Approaches:
     - Recursive DFS with Global Maximum
     - Iterative Postorder Traversal
     - Kadane's Algorithm Adaptation

3. **Recover Binary Search Tree**
   - Problem: [LeetCode #99](https://leetcode.com/problems/recover-binary-search-tree/)
   - File: `question3.txt`
   - Solutions: `answer3.js`
   - Approaches:
     - Inorder Traversal with Array
     - Morris Inorder Traversal (O(1) space)
     - Recursive Inorder with Two Pointers

## Implementation Details

### Key Concepts
- **Tree Serialization/Deserialization**: Converting between tree and string representations
- **Path Sum Calculations**: Finding optimal paths in trees
- **BST Recovery**: Fixing corrupted BSTs with minimal changes
- **Advanced Traversals**: Morris traversal for O(1) space complexity

### Performance Considerations
- Space complexity optimizations
- Handling large trees efficiently
- Edge cases and error handling
- Memory management for serialization

## Running the Code

1. Navigate to the problem directory
2. Run the solution file with Node.js:
   ```bash
   node answerX.js
   ```
3. View the test results and performance comparison

## Next Steps
- Explore more advanced tree algorithms
- Implement segment trees and binary indexed trees
- Study self-balancing trees in depth
- Practice competitive programming problems
