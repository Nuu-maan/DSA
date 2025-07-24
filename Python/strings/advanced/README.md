# Advanced (Very Hard) String Problems

This section contains extremely challenging string problems from LeetCode, requiring advanced algorithms and sophisticated optimization techniques.

## Problems

1. **Word Break II** (question1.txt, answer1.py)
   - Find all possible sentences from a string using a dictionary of words
   - Time Complexity: O(2^n), Space Complexity: O(2^n)
   - Source: LeetCode Hard

2. **Palindrome Pairs** (question2.txt, answer2.py)
   - Find all pairs of strings that form palindromes when concatenated
   - Time Complexity: O(n * k^2), Space Complexity: O(n * k)
   - Source: LeetCode Hard

3. **Stream of Characters** (question3.txt, answer3.py)
   - Design an algorithm to search a stream of characters for dictionary words
   - Time Complexity: O(m), Space Complexity: O(n)
   - Source: LeetCode Hard

## Key Concepts

- Trie data structure
- Suffix arrays and trees
- Manacher's algorithm
- KMP algorithm
- Rabin-Karp algorithm
- Advanced dynamic programming

## Tips

1. Consider using Trie for dictionary-based problems
2. Implement efficient string hashing for pattern matching
3. Use suffix arrays for substring problems
4. Optimize memory usage with streaming techniques
5. Handle large input sizes with efficient data structures 