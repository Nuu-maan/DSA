# Dynamic Programming - Basic Level

## Problem 1: Minimum Number of Jumps

### Problem Statement
Given an array of integers where each element represents the maximum number of steps that can be made forward from that element. Write a function to return the minimum number of jumps to reach the end of the array (starting from the first element). If an element is 0, then we cannot move through that element.

**Source:** [GeeksforGeeks - Minimum number of jumps](https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/)

### Approaches

#### 1. Recursive (Brute Force)
- **Time Complexity:** O(n^n)
- **Space Complexity:** O(n) for call stack
- **Idea:** Try all possible jumps from the first element and recursively find the minimum jumps needed from each position.

#### 2. Memoization (Top-Down DP)
- **Time Complexity:** O(n²)
- **Space Complexity:** O(n)
- **Idea:** Store the results of subproblems to avoid redundant calculations in the recursive approach.

#### 3. Tabulation (Bottom-Up DP)
- **Time Complexity:** O(n²)
- **Space Complexity:** O(n)
- **Idea:** Build a table to store the minimum jumps needed to reach each index from the start.

#### 4. Greedy (Optimal)
- **Time Complexity:** O(n)
- **Space Complexity:** O(1)
- **Idea:** Track the farthest we can reach and the number of steps we can still take. Update jumps when we run out of steps.

### Solution Code
See [answer1.cpp](./answer1.cpp) for implementation details.

### Test Cases
```
Test Case 1:
Input: [1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9]
Output: 3

Test Case 2:
Input: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
Output: 10

Test Case 3:
Input: [1, 0, 0, 0, 0]
Output: -1 (Cannot reach end)
```

### Notes
- The greedy approach is optimal for this problem with O(n) time and O(1) space.
- The DP approach is more intuitive but has higher time complexity.
- The recursive approach is included for understanding but is not efficient for large inputs.

---

## Problem 2: Coin Change (Minimum number of coins)

### Problem Statement
Given a value V and an array of denominations coins[], find the minimum number of coins that make the value V. If it's not possible to make the change, return -1.

**Source:** [GeeksforGeeks - Minimum number of coins](https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/)

### Approaches

- **Memoization (Top-Down)**
  - Time: O(n · V), Space: O(V)
  - DFS over remaining amount with memoization of best answers.

- **Bottom-Up 1D DP**
  - Time: O(n · V), Space: O(V)
  - Classic unbounded knapsack style; dp[a] = min over coins of dp[a - c] + 1.

- **BFS on Amounts** (alternative)
  - Time: O(n · V), Space: O(V)
  - Layered expansion from 0 to V using coin edges.

### Solution Code
See `C++/dynamic_programming/basic/answer2.cpp`.

### Sample Tests
```
V=11, coins=[1,2,5] -> 3
V=3,  coins=[2]     -> -1
V=0,  coins=[1]     -> 0
```

---

## Problem 3: Longest Increasing Subsequence (LIS)

### Problem Statement
Given an array arr[], find the length of the longest strictly increasing subsequence.

**Source:** [GeeksforGeeks - LIS](https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/)

### Approaches

- **O(n²) DP**
  - dp[i] = 1 + max(dp[j]) for all j < i and arr[j] < arr[i].

- **Patience Sorting / Binary Search (O(n log n))**
  - Maintain `tails`, replace with lower_bound; length of tails is the LIS length.

- **Memoized Recursion**
  - Educational variant; mirrors the O(n²) DP via top-down.

### Solution Code
See `C++/dynamic_programming/basic/answer3.cpp`.

### Sample Tests
```
[10,9,2,5,3,7,101,18] -> 4
[0,1,0,3,2,3]          -> 4
[7,7,7,7]              -> 1
```
