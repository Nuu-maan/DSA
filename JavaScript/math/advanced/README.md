# JavaScript Math - Advanced Level

This section contains advanced math problems with multiple ES6+ solution approaches. All problems are from LeetCode.

## Problems

1. **Basic Calculator**
   - Problem: Implement a basic calculator to evaluate a simple expression string containing non-negative integers, '+', '-', '(', and ')'.
   - Source: [LeetCode - Basic Calculator](https://leetcode.com/problems/basic-calculator/)
   - Approaches:
     - Stack-based solution
     - Recursive descent parser
     - Functional approach with array methods
     - Map for state management
     - BigInt for very large numbers
     - Generator function for step-by-step visualization

2. **Max Points on a Line**
   - Problem: Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.
   - Source: [LeetCode - Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/)
   - Approaches:
     - HashMap to count slopes
     - Object-based approach
     - Functional approach using array methods
     - Map with custom key generation
     - BigInt for precise slope calculation
     - Generator function for step-by-step visualization

3. **Super Pow**
   - Problem: Calculate ab mod 1337 where a is a positive integer and b is an extremely large positive integer given in the form of an array.
   - Source: [LeetCode - Super Pow](https://leetcode.com/problems/super-pow/)
   - Approaches:
     - Modular exponentiation with array-based exponent
     - Recursive approach with modular arithmetic
     - Functional approach using array reduction
     - Map for memoization of modular powers
     - BigInt for handling large numbers
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
node answer1.js  # Test Basic Calculator
node answer2.js  # Test Max Points on a Line
node answer3.js  # Test Super Pow
```

## Performance Comparison

Each solution file includes a performance testing utility that compares the different approaches.

## Complexity Analysis

Each approach includes detailed time and space complexity analysis in the comments.
