# Advanced Recursion Problems

This directory contains advanced-level recursion problems and their solutions in JavaScript. Each problem is solved using multiple approaches to demonstrate different techniques and optimizations.

## Problems

### 1. Regular Expression Matching
- **Source**: [LeetCode](https://leetcode.com/problems/regular-expression-matching/)
- **Difficulty**: Hard
- **Description**: Implement regular expression matching with support for '.' and '*' where:
  - '.' Matches any single character.
  - '*' Matches zero or more of the preceding element.
- **Approaches**:
  1. Recursive with Memoization (Top-Down)
  2. Dynamic Programming (Bottom-Up)
  3. Dynamic Programming with Space Optimization
  4. Recursive with Object Memoization
  5. NFA (Nondeterministic Finite Automaton)
  6. Iterative with Backtracking

### 2. Wildcard Matching
- **Source**: [LeetCode](https://leetcode.com/problems/wildcard-matching/)
- **Difficulty**: Hard
- **Description**: Implement wildcard pattern matching with support for '?' and '*' where:
  - '?' Matches any single character.
  - '*' Matches any sequence of characters (including the empty sequence).
- **Approaches**:
  1. Dynamic Programming (Bottom-Up)
  2. Dynamic Programming with Space Optimization
  3. Two Pointers with Greedy Approach
  4. Recursive with Memoization
  5. BFS with Memoization
  6. Optimized Two Pointers with Greedy

### 3. Word Break II
- **Source**: [LeetCode](https://leetcode.com/problems/word-break-ii/)
- **Difficulty**: Hard
- **Description**: Given a string and a dictionary of words, add spaces in the string to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.
- **Approaches**:
  1. Recursive with Memoization (Top-Down)
  2. Dynamic Programming (Bottom-Up)
  3. DFS with Memoization (Alternative Implementation)
  4. BFS with Memoization
  5. Iterative with Stack (DFS)
  6. Optimized with Word Lengths and Early Pruning

## Running the Tests

Each solution file includes test cases that can be run using Node.js:

```bash
node answer1.js
node answer2.js
node answer3.js
```

## Performance Considerations

- **Time Complexity**: Most solutions have exponential time complexity in the worst case due to the nature of the problems.
- **Space Complexity**: 
  - Basic approaches: O(n²) for memoization tables
  - Optimized versions: O(n) with space optimizations
  - Output-sensitive for Word Break II: O(2^n) in the worst case

## Optimization Techniques

1. **Memoization**: Caching intermediate results to avoid recomputation.
2. **Dynamic Programming**: Building solutions bottom-up to avoid recursion stack overhead.
3. **Pruning**: Early termination of search paths that cannot lead to a solution.
4. **Bitmasking**: Using bitwise operations for efficient state representation.
5. **Greedy Heuristics**: Making locally optimal choices to reduce search space.
6. **NFA/DFA**: Using automata theory for pattern matching problems.

## Common Patterns

1. **Backtracking**: Systematically exploring all possible configurations.
2. **Memoization**: Storing results of expensive function calls.
3. **State Machines**: Modeling problems as state transitions.
4. **String Manipulation**: Efficiently processing and matching string patterns.
5. **Combinatorial Search**: Exploring all possible combinations/permutations.

## Next Steps

1. Try to optimize the solutions further for specific input patterns.
2. Implement additional test cases to verify edge cases.
3. Visualize the recursion tree for better understanding.
4. Explore parallelization opportunities for performance improvement.

## Resources

- [LeetCode - Recursion](https://leetcode.com/tag/recursion/)
- [GeeksforGeeks - Recursion](https://www.geeksforgeeks.org/recursion/)
- [Dynamic Programming Patterns](https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns)
- [Regular Expressions Theory](https://en.wikipedia.org/wiki/Regular_expression#Formal_definition)
