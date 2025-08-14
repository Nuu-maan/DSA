# Dynamic Programming (C++) — Moderate (LeetCode Hard)

This section contains three LeetCode Hard DP problems with multiple solution approaches and small test harnesses.

## Problem 1: Burst Balloons (LC 312)
- Link: https://leetcode.com/problems/burst-balloons/
- Goal: Maximize coins from bursting balloons; coins from bursting i are nums[left]*nums[i]*nums[right] after surrounding becomes adjacent.
- Approaches:
  - Interval DP (Bottom-Up) — O(n^3) time, O(n^2) space.
  - Memoized Recursion (Top-Down) — O(n^3) time, O(n^2) space.
- File: `C++/dynamic_programming/moderate/answer1.cpp`

## Problem 2: Dungeon Game (LC 174)
- Link: https://leetcode.com/problems/dungeon-game/
- Goal: Minimum initial health at (0,0) so that health never drops below 1 while reaching (m-1,n-1).
- Approaches:
  - Bottom-Up DP from bottom-right — O(m·n) time, O(m·n) space.
  - Top-Down Memoization — O(m·n) time, O(m·n) space.
- File: `C++/dynamic_programming/moderate/answer2.cpp`

## Problem 3: Super Egg Drop (LC 887)
- Link: https://leetcode.com/problems/super-egg-drop/
- Goal: Minimum number of moves to determine critical floor with k eggs and n floors.
- Approaches:
  - Moves-based DP dp[m][k] — O(k·m), typically fast in practice; find smallest m with dp[m][k] ≥ n.
  - Top-Down with Binary Search on drop floor — ~O(k·n log n) for moderate n; memoized.
- File: `C++/dynamic_programming/moderate/answer3.cpp`

## Notes
- Test harness outputs use ASCII markers `[OK]/[X]` for consistent Windows console rendering.
- All solutions are written with type safety and clear complexity annotations.
