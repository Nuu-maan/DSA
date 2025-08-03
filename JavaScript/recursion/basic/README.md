# Basic Recursion Problems

This directory contains basic recursion problems and their solutions in JavaScript. Each problem is solved using multiple approaches to demonstrate different techniques and optimizations.

## Problems

### 1. Print 1 to n using recursion
- **Source**: [GeeksforGeeks](https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1)
- **Description**: Print numbers from 1 to n using recursion.
- **Approaches**:
  1. Basic recursion with helper function
  2. Pure recursion without helper
  3. Using array constructor and map
  4. Using generator function
  5. Using array spread and recursion
  6. Concise version using ternary and spread

### 2. Sum of first n natural numbers
- **Source**: [GeeksforGeeks](https://www.geeksforgeeks.org/problems/sum-of-first-n-terms5843/1)
- **Description**: Calculate the sum of the first n natural numbers using recursion.
- **Approaches**:
  1. Basic recursion
  2. Tail recursion optimization
  3. Mathematical formula (most efficient)
  4. Using array reduce (functional approach)
  5. Using generator function
  6. Using bitwise operations

### 3. Factorial of a number
- **Source**: [GeeksforGeeks](https://www.geeksforgeeks.org/problems/factorial5739/1)
- **Description**: Calculate the factorial of a number using recursion.
- **Approaches**:
  1. Basic recursion
  2. Tail recursion optimization
  3. Iterative approach
  4. Using array reduce (functional approach)
  5. Using generator function
  6. Memoization for optimization

## Running the Tests

Each solution file includes test cases that can be run using Node.js:

```bash
node answer1.js
node answer2.js
node answer3.js
```

## Performance Considerations

- **Time Complexity**: Most recursive solutions have O(n) time complexity.
- **Space Complexity**: 
  - Basic recursion: O(n) due to call stack
  - Tail recursion: O(1) with proper tail call optimization (TCO)
  - Iterative solutions: O(1) space

## Best Practices

1. **Base Case**: Always define a clear base case to prevent infinite recursion.
2. **Tail Recursion**: Use tail recursion where possible for better space efficiency.
3. **Edge Cases**: Handle edge cases like n=0 or n=1 explicitly.
4. **Input Validation**: Validate input to ensure it meets constraints.
5. **Memoization**: Use memoization for problems with overlapping subproblems.

## Common Patterns

1. **Helper Functions**: Use helper functions for cleaner recursion with additional parameters.
2. **Accumulator Pattern**: Use an accumulator parameter for tail recursion.
3. **Divide and Conquer**: Break problems into smaller subproblems.
4. **Memoization**: Cache results of expensive function calls.

## Next Steps

1. Try to solve these problems using iteration instead of recursion.
2. Explore more complex recursion problems like tree traversals and backtracking.
3. Practice identifying when to use recursion vs iteration.

## Resources

- [GeeksforGeeks - Recursion](https://www.geeksforgeeks.org/recursion/)
- [JavaScript.info - Recursion and Stack](https://javascript.info/recursion)
- [MDN - Functions - Recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion)
