# JavaScript Math - Basic Level

This section contains basic math problems with multiple ES6+ solution approaches. All problems are from GeeksforGeeks and have been made more challenging as requested.

## Problems

1. **Count Primes in a Range**
   - Problem: Given two positive integers L and R, count how many prime numbers exist in the range [L, R] (inclusive).
   - Source: [GeeksforGeeks - Count Primes in a Given Range](https://www.geeksforgeeks.org/count-primes-in-a-given-range/)
   - Approaches:
     - Basic iteration with prime checking
     - Sieve of Eratosthenes
     - Segmented Sieve (for large ranges)
     - Functional approach using array methods
     - Memoization with Map
     - Generator function for step-by-step visualization

2. **Find GCD of an Array of Numbers**
   - Problem: Given an array of positive integers, find the greatest common divisor (GCD) of all the numbers in the array.
   - Source: [GeeksforGeeks - GCD of Array](https://www.geeksforgeeks.org/gcd-two-array-numbers/)
   - Approaches:
     - Iterative with built-in GCD function
     - Recursive with reduce
     - Functional approach using array methods
     - Memoization with Map
     - BigInt for very large numbers
     - Generator function for step-by-step visualization

3. **Find LCM of an Array of Numbers**
   - Problem: Given an array of positive integers, find the least common multiple (LCM) of all the numbers in the array.
   - Source: [GeeksforGeeks - LCM of Array Elements](https://www.geeksforgeeks.org/lcm-of-given-array-elements/)
   - Approaches:
     - Iterative with built-in GCD function
     - Recursive with reduce
     - Functional approach using array methods
     - Memoization with Map
     - BigInt for very large numbers
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
node answer1.js  # Test Count Primes in Range
node answer2.js  # Test GCD of Array
node answer3.js  # Test LCM of Array
```

## Performance Comparison

Each solution file includes a performance testing utility that compares the different approaches.

## Complexity Analysis

Each approach includes detailed time and space complexity analysis in the comments.
