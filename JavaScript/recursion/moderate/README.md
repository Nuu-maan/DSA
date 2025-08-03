# Moderate Recursion Problems

This directory contains moderate-level recursion problems and their solutions in JavaScript. Each problem is solved using multiple approaches to demonstrate different techniques and optimizations.

## Problems

### 1. Word Search II
- **Source**: [LeetCode](https://leetcode.com/problems/word-search-ii/)
- **Difficulty**: Hard
- **Description**: Given an m x n board of characters and a list of words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells.
- **Approaches**:
  1. Backtracking with Trie (Optimal)
  2. Backtracking with Hash Set (Naive)
  3. Optimized Trie with Early Pruning
  4. Backtracking with Trie Node Removal
  5. BFS with Trie
  6. Iterative Backtracking with Trie

### 2. N-Queens II
- **Source**: [LeetCode](https://leetcode.com/problems/n-queens-ii/)
- **Difficulty**: Hard
- **Description**: The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
- **Approaches**:
  1. Backtracking with Sets
  2. Backtracking with Bit Manipulation
  3. Iterative Backtracking
  4. Backtracking with Array Diagonal Tracking
  5. Bitmask with Mirroring Optimization
  6. Backtracking with Object Diagonal Tracking

### 3. Sudoku Solver
- **Source**: [LeetCode](https://leetcode.com/problems/sudoku-solver/)
- **Difficulty**: Hard
- **Description**: Write a program to solve a Sudoku puzzle by filling the empty cells following Sudoku rules.
- **Approaches**:
  1. Basic Backtracking with Validation
  2. Bitmasking with Pre-processing
  3. Most Constrained Variable Heuristic (MRV)
  4. Dancing Links (Algorithm X)
  5. Constraint Propagation with Backtracking
  6. Optimized Bitmask with Backtracking

## Running the Tests

Each solution file includes test cases that can be run using Node.js:

```bash
node answer1.js
node answer2.js
node answer3.js
```

## Performance Considerations

- **Time Complexity**: Most solutions have exponential time complexity due to the nature of backtracking problems.
- **Space Complexity**: 
  - Basic backtracking: O(n) for recursion stack
  - Optimized versions: O(n²) for additional data structures
  - Bitmasking can reduce space usage significantly

## Optimization Techniques

1. **Pruning**: Early termination of invalid paths in the search space.
2. **Memoization**: Caching intermediate results to avoid recomputation.
3. **Bitmasking**: Using bitwise operations for efficient state representation.
4. **Heuristics**: Using domain-specific knowledge to guide the search.
5. **Constraint Propagation**: Eliminating impossible values early in the search.

## Common Patterns

1. **Backtracking**: Systematically exploring all possible configurations.
2. **Memoization**: Storing results of expensive function calls.
3. **Bit Manipulation**: Efficiently representing sets of numbers.
4. **Trie Data Structure**: For efficient word search and prefix matching.
5. **Constraint Satisfaction**: Modeling and solving constraint satisfaction problems.

## Next Steps

1. Try to optimize the solutions further.
2. Implement additional test cases to verify edge cases.
3. Visualize the backtracking process for better understanding.
4. Explore parallelization opportunities for performance improvement.

## Resources

- [LeetCode - Backtracking](https://leetcode.com/tag/backtracking/)
- [GeeksforGeeks - Backtracking](https://www.geeksforgeeks.org/backtracking-algorithms/)
- [Algorithm X and Dancing Links](https://en.wikipedia.org/wiki/Knuth%27s_Algorithm_X)
- [Sudoku Solving Algorithms](https://en.wikipedia.org/wiki/Sudoku_solving_algorithms)
