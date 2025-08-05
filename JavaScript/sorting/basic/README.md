# Basic Sorting Algorithms

This directory contains implementations of basic sorting algorithms in JavaScript. Each algorithm is implemented with multiple approaches and includes comprehensive test cases.

## Table of Contents

1. [Bubble Sort](#bubble-sort)
2. [Insertion Sort](#insertion-sort)
3. [Selection Sort](#selection-sort)
4. [Running Tests](#running-tests)
5. [Contributing](#contributing)

## Bubble Sort

Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping adjacent elements if they are in the wrong order.

### Implementations

1. **Standard Bubble Sort**
   - Time Complexity: O(n²) in worst and average cases, O(n) in best case (already sorted)
   - Space Complexity: O(1)

2. **Optimized Bubble Sort with Early Exit**
   - Improves best case time complexity to O(n) when array is already sorted
   - Uses a flag to detect if any swaps were made in a pass

3. **Recursive Bubble Sort**
   - Demonstrates a recursive approach
   - Not recommended for large arrays due to call stack limitations

4. **Bubble Sort with Custom Comparator**
   - Allows sorting based on a custom comparison function
   - Supports both ascending and descending order

## Insertion Sort

Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time.

### Implementations

1. **Standard Insertion Sort**
   - Time Complexity: O(n²) in worst and average cases, O(n) in best case
   - Space Complexity: O(1)

2. **Binary Insertion Sort**
   - Uses binary search to find the proper location to insert
   - Reduces number of comparisons but not swaps
   - Still O(n²) time complexity

3. **Recursive Insertion Sort**
   - Demonstrates a recursive approach
   - Not recommended for large arrays

4. **Insertion Sort with Custom Comparator**
   - Allows sorting based on a custom comparison function
   - Supports custom sorting orders and complex objects

## Selection Sort

Selection Sort sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.

### Implementations

1. **Standard Selection Sort**
   - Time Complexity: O(n²) in all cases
   - Space Complexity: O(1)

2. **Selection Sort with Min-Max**
   - Finds both minimum and maximum in each pass
   - Reduces the number of passes by half
   - Still O(n²) but with better constants

3. **Recursive Selection Sort**
   - Demonstrates a recursive approach
   - Not recommended for large arrays

4. **Selection Sort with Custom Comparator**
   - Allows sorting based on a custom comparison function
   - Supports custom sorting orders

## Running Tests

Each implementation includes a test suite that can be run using Node.js:

```bash
# Run Bubble Sort tests
node answer1.js

# Run Insertion Sort tests
node answer2.js

# Run Selection Sort tests
node answer3.js
```

## Contributing

Contributions are welcome! Please ensure that any new implementations:

1. Include proper documentation
2. Follow the existing code style
3. Include test cases
4. Have time and space complexity analysis

## Sources

- [GeeksforGeeks - Bubble Sort](https://www.geeksforgeeks.org/bubble-sort/)
- [GeeksforGeeks - Insertion Sort](https://www.geeksforgeeks.org/insertion-sort/)
- [GeeksforGeeks - Selection Sort](https://www.geeksforgeeks.org/selection-sort/)
