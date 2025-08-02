# JavaScript Queues - Basic Level

This section covers fundamental queue data structure implementations and operations using modern ES6+ JavaScript features.

## Problems

1. [Implement a Queue using an Array](question1.txt)
2. [Implement Circular Queue](question2.txt)
3. [Queue Operations - Reverse First K Elements](question3.txt)

## Approaches

Each problem is solved using multiple approaches showcasing different JavaScript features and patterns:

### Problem 1: Implement a Queue using an Array

- **Approach 1**: Basic Queue Implementation using Array
- **Approach 2**: Optimized Queue Implementation using Array with Front Pointer
- **Approach 3**: Functional Queue Implementation using Factory Function
- **Approach 4**: Queue Implementation using Map for Element Tracking
- **Approach 5**: Queue Implementation with Custom Iterator
- **Approach 6**: Generator-based Queue Implementation with Step-by-Step Visualization

### Problem 2: Implement Circular Queue

- **Approach 1**: Basic Circular Queue Implementation
- **Approach 2**: Circular Queue Implementation using Map
- **Approach 3**: Functional Circular Queue Implementation
- **Approach 4**: Circular Queue with Custom Iterator
- **Approach 5**: Circular Queue with Performance Tracking
- **Approach 6**: Generator-based Circular Queue Implementation with Step-by-Step Visualization

### Problem 3: Queue Operations - Reverse First K Elements

- **Approach 1**: Basic Implementation using Stack
- **Approach 2**: Using Array Methods and Slice
- **Approach 3**: Using Recursion
- **Approach 4**: Using Custom Queue Class with Stack
- **Approach 5**: Functional Approach with Reduce
- **Approach 6**: Generator-based Implementation with Step-by-Step Visualization

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
const performanceTest = (QueueClass, name, operations) => {
  const start = performance.now();
  const queue = new QueueClass();
  
  for (let i = 0; i < operations; i++) {
    queue.enqueue(i);
  }
  
  for (let i = 0; i < operations; i++) {
    queue.dequeue();
  }
  
  const end = performance.now();
  console.log(`${name}: ${end - start}ms for ${operations} operations`);
};
```

## Source

Problems adapted from GeeksforGeeks basic queue problems:
- https://www.geeksforgeeks.org/dsa/introduction-and-array-implementation-of-queue/
- https://www.geeksforgeeks.org/reversing-first-k-elements-queue/
