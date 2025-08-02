# JavaScript Queues

This section covers queue data structure implementations and problems in JavaScript, organized by difficulty level. All implementations use modern ES6+ JavaScript features and idioms.

## Difficulty Levels

### [Basic](basic/)

Fundamental queue concepts and implementations:

1. [Implement Queue using Array](basic/question1.txt)
2. [Design Circular Deque](basic/question2.txt)
3. [Time Needed to Buy Tickets](basic/question3.txt)

### [Moderate](moderate/)

Intermediate queue problems from LeetCode:

1. [Design Circular Queue](moderate/question1.txt)
2. [Implement Queue using Stacks](moderate/question2.txt)
3. [Sliding Window Maximum](moderate/question3.txt)

### [Advanced](advanced/)

Challenging queue problems from LeetCode:

1. [Number of Visible People in a Queue](advanced/question1.txt)
2. [Shortest Subarray with Sum at Least K](advanced/question2.txt)
3. [Find the Most Competitive Subsequence](advanced/question3.txt)

## Implementation Approach

Each problem is solved using multiple approaches showcasing different JavaScript features and patterns:

- **Approach 1-2**: Basic and optimized traditional implementations
- **Approach 3**: Implementation using modern JavaScript data structures (Map, Set)
- **Approach 4**: Functional programming approaches
- **Approach 5**: Advanced patterns (closures, higher-order functions)
- **Approach 6**: Generator functions for step-by-step visualization

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

Navigate to any difficulty level directory and run the implementation files:

```bash
# Basic level
cd basic
node answer1.js

# Moderate level
cd moderate
node answer1.js

# Advanced level
cd advanced
node answer1.js
```

## Performance Comparison

All implementations include performance testing utilities to compare different approaches:

```javascript
// Performance comparison utility
const performanceTest = (QueueClass, name, operations) => {
  const start = performance.now();
  const queue = new QueueClass();
  
  // Enqueue operations
  for (let i = 0; i < operations; i++) {
    queue.push(i);
  }
  
  // Dequeue operations
  for (let i = 0; i < operations; i++) {
    queue.pop();
  }
  
  const end = performance.now();
  console.log(`${name}: ${end - start}ms for ${operations} operations`);
};
```

## Source

Problems from GeeksforGeeks (Basic) and LeetCode (Moderate/Advanced):
- https://www.geeksforgeeks.org/queue-data-structure/
- https://leetcode.com/problemset/all/?topicSlugs=queue
