# Basic Stack Problems

This directory contains basic stack problems and their solutions in JavaScript. Each problem includes multiple approaches with detailed explanations of time and space complexity.

## Problems

### 1. Stack Implementation using Array
- **Problem Statement**: Implement a stack data structure using an array with push, pop, top, isEmpty, and size operations.
- **Approaches**:
  1. **Array with push/pop**: Standard implementation using array methods (O(1) operations)
  2. **Array with unshift/shift**: Alternative implementation (O(n) push/pop)
  3. **Fixed-size array**: Memory-efficient implementation with circular buffer
- **Source**: [GeeksforGeeks](https://www.geeksforgeeks.org/stack-data-structure/)

### 2. Balanced Parentheses
- **Problem Statement**: Check if a string containing parentheses is balanced.
- **Approaches**:
  1. **Stack-based validation**: O(n) time and space
  2. **Counter-based approach**: O(n) time, O(1) space (for single type of brackets)
  3. **Recursive approach**: For educational purposes
- **Source**: [GeeksforGeeks](https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/)

### 3. Next Greater Element
- **Problem Statement**: Find the next greater element for each element in an array.
- **Approaches**:
  1. **Brute force**: O(n²) time, O(1) space
  2. **Stack-based**: O(n) time and space
  3. **Optimized stack approach**: With early termination
- **Source**: [GeeksforGeeks](https://www.geeksforgeeks.org/next-greater-element/)

## Running the Code

Each solution includes test cases that can be run using Node.js:

```bash
node answer1.js
node answer2.js
node answer3.js
```

## Complexity Analysis

| Problem | Best Approach | Time | Space |
|---------|---------------|------|-------|
| Stack Implementation | Array push/pop | O(1) ops | O(n) |
| Balanced Parentheses | Stack-based | O(n) | O(n) |
| Next Greater Element | Stack-based | O(n) | O(n) |

## Notes

- All implementations use modern JavaScript (ES6+) features.
- Error handling is included for edge cases.
- Test cases cover common scenarios and edge cases.
