# JavaScript Math - Moderate Level

This section contains moderate math problems with multiple ES6+ solution approaches. All problems are from LeetCode.

## Problems

1. **Pow(x, n)**
   - Problem: Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).
   - Source: [LeetCode - Pow(x, n)](https://leetcode.com/problems/powx-n/)
   - Approaches:
     - Recursive with divide and conquer
     - Iterative with bit manipulation
     - Functional approach using array reduction
     - Memoization with Map
     - BigInt for very large exponents
     - Generator function for step-by-step visualization

2. **Sqrt(x)**
   - Problem: Given a non-negative integer x, return the square root of x rounded down to the nearest integer.
   - Source: [LeetCode - Sqrt(x)](https://leetcode.com/problems/sqrtx/)
   - Approaches:
     - Binary search
     - Newton's method (Newton-Raphson)
     - Linear search with optimization
     - Memoization with Map
     - BigInt for very large numbers
     - Generator function for step-by-step visualization

3. **Integer to Roman**
   - Problem: Given an integer, convert it to a Roman numeral.
   - Source: [LeetCode - Integer to Roman](https://leetcode.com/problems/integer-to-roman/)
   - Approaches:
     - Greedy algorithm with predefined values
     - Direct mapping with arrays
     - Functional approach using array methods
     - Map for value-numeral pairs
     - Recursive approach
     - Generator function for step-by-step visualization

## ES6+ Features Used

- Arrow functions
- Destructuring assignment
- Spread operator
- Array methods (map, reduce, filter)
- Template literals
- BigInt for handling large numbers
- Generator functions for visualization
- Map for memoization
- Modules for code organization

## Testing

Each solution file includes comprehensive test cases that can be run with Node.js:

```bash
node answer1.js  # Test Pow(x, n)
node answer2.js  # Test Sqrt(x)
node answer3.js  # Test Integer to Roman
```

## Performance Comparison

Each solution file includes a performance testing utility that compares the different approaches.

## Complexity Analysis

Each approach includes detailed time and space complexity analysis in the comments.
