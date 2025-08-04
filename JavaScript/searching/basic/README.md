# Basic Searching Algorithms

This directory contains basic searching algorithm problems and their solutions in JavaScript. Each problem is solved using multiple approaches with detailed explanations and performance analysis.

## Problems

### 1. Binary Search
- **Problem**: Given a sorted array of n elements, write a function to search a given element x in the array.
- **Source**: [GeeksforGeeks - Binary Search](https://www.geeksforgeeks.org/binary-search/)
- **Approaches**:
  1. Iterative Binary Search
  2. Recursive Binary Search
  3. Using Array.findIndex (Functional Approach)
  4. Using Array.indexOf (Built-in)
  5. Binary Search with Custom Comparator
  6. Binary Search with Early Exit for Edge Cases

### 2. Find First and Last Occurrences
- **Problem**: Find the first and last positions of an element in a sorted array.
- **Source**: [GeeksforGeeks - Find First and Last Positions](https://www.geeksforgeeks.org/find-first-and-last-positions-of-an-element-in-a-sorted-array/)
- **Approaches**:
  1. Two Binary Searches (First and Last)
  2. Linear Scan after finding one occurrence
  3. Using Array.indexOf and Array.lastIndexOf
  4. Binary Search with Boundary Detection
  5. Recursive with Boundary Tracking
  6. Using Binary Search with Custom Comparator

### 3. Find Missing Number in Sorted Array
- **Problem**: Find the missing number in a sorted array of n-1 distinct integers in the range 1 to n.
- **Source**: [GeeksforGeeks - Find Missing Number](https://www.geeksforgeeks.org/find-the-missing-number-in-a-sorted-array/)
- **Approaches**:
  1. Binary Search for Missing Element
  2. Sum of First n Natural Numbers
  3. XOR Operation
  4. Linear Search
  5. Using Array.findIndex
  6. Mathematical Approach with Formula

## Running the Tests

Each solution file includes test cases that can be run using Node.js:

```bash
# Navigate to the basic directory
cd JavaScript/searching/basic/

# Run the tests for a specific problem
node answer1.js
node answer2.js
node answer3.js
```

## Performance Considerations

### Binary Search Variations
- **Time Complexity**: O(log n) for optimal implementations
- **Space Complexity**: 
  - Iterative: O(1)
  - Recursive: O(log n) due to call stack

### Edge Cases Handled
- Empty array
- Single element array
- Target not found
- Target at first or last position
- Duplicate elements (where applicable)
- Large input sizes (performance testing)

## Best Practices

1. **Use Iterative Approach** for binary search in production code to avoid stack overflow with large arrays.
2. **Prefer Built-in Methods** like `indexOf` or `findIndex` for readability when performance is not critical.
3. **Consider Custom Comparators** when working with complex objects or non-standard comparison logic.
4. **Test Edge Cases** thoroughly, especially for off-by-one errors which are common in binary search implementations.
5. **Document Assumptions** about the input (e.g., sorted array) in function documentation.

## Contributing

Feel free to contribute additional approaches or optimizations. Please ensure all tests pass and follow the existing code style.
