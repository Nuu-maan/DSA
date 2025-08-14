# Dynamic Programming (C++) — Advanced (LeetCode Very Hard/Hard)

This section contains three advanced DP problems with multiple solution approaches and small test harnesses.

## Problem 1: Regular Expression Matching (LC 10)
- Link: https://leetcode.com/problems/regular-expression-matching/
- Goal: Implement regex matching for '.' and '*' with full-string match.
- Approaches:
  - Bottom-Up DP (O(n·m) time, O(n·m) space)
  - Top-Down Memoization (O(n·m))
- File: `C++/dynamic_programming/advanced/answer1.cpp`

## Problem 2: Wildcard Matching (LC 44)
- Link: https://leetcode.com/problems/wildcard-matching/
- Goal: Implement wildcard matching for '?' and '*' with full-string match.
- Approaches:
  - Bottom-Up DP (O(n·m))
  - Greedy Two-Pointers with backtracking (average O(n+m), worst O(n·m))
  - Top-Down Memoization (O(n·m))
- File: `C++/dynamic_programming/advanced/answer2.cpp`

## Problem 3: Edit Distance (LC 72)
- Link: https://leetcode.com/problems/edit-distance/
- Goal: Minimum number of edits to transform word1 -> word2 (insert, delete, replace).
- Approaches:
  - Bottom-Up DP (O(n·m))
  - Space-optimized 1D DP (O(n·m) time, O(min(n,m)) space)
  - Top-Down Memoization (O(n·m))
- File: `C++/dynamic_programming/advanced/answer3.cpp`

## Notes
- Test harness outputs use ASCII markers `[OK]/[X]` for consistent Windows console rendering.
- All solutions follow type-safety and consistent repository structure.
