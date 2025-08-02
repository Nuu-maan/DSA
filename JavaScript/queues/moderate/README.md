# JavaScript Queues - Moderate Level

This section covers moderate difficulty queue problems from LeetCode, implemented using modern ES6+ JavaScript features.

## Problems

1. [Design Circular Queue](question1.txt)
2. [Implement Queue using Stacks](question2.txt)
3. [Sliding Window Maximum](question3.txt)

## Approaches

Each problem is solved using multiple approaches showcasing different JavaScript features and patterns:

### Problem 1: Design Circular Queue

- **Approach 1**: Basic Circular Queue Implementation
- **Approach 2**: Circular Queue Implementation using Linked List
- **Approach 3**: Circular Queue Implementation using Map
- **Approach 4**: Functional Circular Queue Implementation
- **Approach 5**: Circular Queue with Custom Iterator
- **Approach 6**: Generator-based Circular Queue Implementation with Step-by-Step Visualization

### Problem 2: Implement Queue using Stacks

- **Approach 1**: Two-Stack Implementation (Enqueue Heavy)
- **Approach 2**: Two-Stack Implementation (Dequeue Heavy)
- **Approach 3**: Functional Implementation using Factory Function
- **Approach 4**: Implementation using Map for Element Tracking
- **Approach 5**: Queue Implementation with Custom Iterator
- **Approach 6**: Generator-based Queue Implementation with Step-by-Step Visualization

### Problem 3: Sliding Window Maximum

- **Approach 1**: Brute Force Solution
- **Approach 2**: Deque (Double-ended Queue) Solution
- **Approach 3**: Dynamic Programming Solution
- **Approach 4**: Priority Queue (Max Heap) Solution
- **Approach 5**: Functional Programming Solution
- **Approach 6**: Generator-based Solution with Step-by-Step Visualization

## Key JavaScript Features Used

- ES6+ syntax (arrow functions, destructuring, spread operator)
- Modern data structures (Map, Set)
- Functional programming patterns
- Factory functions
- Custom iterators with Symbol.iterator
- Generator functions for step-by-step visualization
- Performance testing utilities
- Comprehensive documentation with time/space complexity analysis

## Usage

Each implementation file can be run independently to see the implementation in action:

```bash
node answer1.js
node answer2.js
node answer3.js
```

## Performance Comparison

All implementations include performance testing utilities to compare different approaches:

```javascript
// Performance comparison utility
const performanceTest = (func, name, nums, k) => {
  const start = performance.now();
  func([...nums], k);
  const end = performance.now();
  console.log(`${name}: ${end - start}ms for array of size ${nums.length} with window size ${k}`);
};
```

## Source

Problems from LeetCode Hard:
- https://leetcode.com/problems/design-circular-queue/
- https://leetcode.com/problems/implement-queue-using-stacks/
- https://leetcode.com/problems/sliding-window-maximum/
