# Advanced Searching Algorithms

This directory contains advanced searching algorithm problems and their solutions in JavaScript. Each problem is solved using multiple approaches with detailed explanations and performance analysis.

## Problems

### 1. Minimum Window Substring
- **Problem**: Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.
- **Source**: [LeetCode - Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- **Approaches**:
  1. Sliding Window with Two Pointers and Hash Map - O(m + n) time, O(1) space
  2. Optimized Sliding Window with Filtered S - O(m + n) time, O(1) space
  3. Using Array for Frequency Counting - O(m + n) time, O(1) space
  4. Two Pointers with Direct String Comparison - O(m + n) time, O(1) space
  5. Using Array and Counter - O(m + n) time, O(1) space
  6. Using Map with Early Termination - O(m + n) time, O(1) space

### 2. Substring with Concatenation of All Words
- **Problem**: Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.
- **Source**: [LeetCode - Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)
- **Approaches**:
  1. Sliding Window with Hash Map
  2. Optimized Sliding Window with Word Matching
  3. Using Frequency Map and Fixed Window
  4. Two Pointers with Word Matching
  5. Using Map with Early Termination
  6. Optimized for Large Inputs

### 3. Longest Duplicate Substring
- **Problem**: Given a string s, return the longest substring that appears at least twice in s. If multiple such substrings exist, return any one of them.
- **Source**: [LeetCode - Longest Duplicate Substring](https://leetcode.com/problems/longest-duplicate-substring/)
- **Approaches**:
  1. Binary Search with Rolling Hash (Rabin-Karp)
  2. Binary Search with Suffix Array
  3. Binary Search with Trie
  4. Suffix Automaton
  5. Optimized Rolling Hash with Large Prime
  6. Using JavaScript Built-in Methods with Binary Search

## Running the Tests

Each solution file includes test cases that can be run using Node.js:

```bash
# Navigate to the advanced directory
cd JavaScript/searching/advanced/

# Run the tests for a specific problem
node answer1.js
node answer2.js
node answer3.js
```

## Performance Considerations

### Minimum Window Substring
- **Optimal Solution**: Sliding window with two pointers (O(m + n) time)
- **Key Insight**: Maintain a window that contains all characters of t
- **Optimization**: Skip characters not in t for better performance
- **Edge Cases**:
  - s is shorter than t
  - t contains duplicate characters
  - Multiple valid windows with same length
  - t contains characters not in s

### Substring with Concatenation of All Words
- **Optimal Solution**: Sliding window with word matching
- **Key Insight**: All words have the same length, allowing fixed-size window movement
- **Optimization**: Use frequency map to track word counts
- **Edge Cases**:
  - Empty string or words array
  - Words with duplicate entries
  - Very long input strings
  - Words with different lengths (though problem states all same length)

### Longest Duplicate Substring
- **Optimal Solution**: Binary search with rolling hash
- **Key Insight**: If a string has a duplicate of length L, it must have a duplicate of length L-1
- **Optimization**: Use large prime numbers for hashing to minimize collisions
- **Edge Cases**:
  - No duplicate substrings
  - Entire string is a duplicate
  - Very long input strings
  - All characters are the same

## Best Practices

1. **Sliding Window Technique**:
   - Use two pointers to represent the window
   - Expand the right pointer to include new elements
   - Contract the left pointer to exclude elements when the window becomes invalid
   - Keep track of the minimum/maximum window that satisfies the condition

2. **Hash Map Optimization**:
   - Use Maps or Objects to store character/count mappings
   - Consider using arrays for fixed character sets (e.g., ASCII)
   - Use the map size to track unique character requirements

3. **Early Termination**:
   - Return immediately when the smallest possible solution is found
   - Skip unnecessary iterations when possible
   - Use flags to avoid redundant checks

4. **String Manipulation**:
   - Precompute prefix sums or hashes when possible
   - Avoid string concatenation in loops
   - Use character codes for faster comparisons

## Contributing

Feel free to contribute additional approaches or optimizations. Please ensure all tests pass and follow the existing code style.
