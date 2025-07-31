// Detect Loop in a Linked List
// Source: https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/

// Node class definition
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Approach 1: Floyd's Cycle Detection Algorithm (Tortoise and Hare)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const hasCycleFloyd = (head) => {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  // Move slow pointer one step and fast pointer two steps
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    // If they meet, there's a cycle
    if (slow === fast) {
      return true;
    }
  }
  
  // If fast reaches the end, there's no cycle
  return false;
};

/**
 * Approach 2: Hash Set approach
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const hasCycleHashSet = (head) => {
  const visited = new Set();
  let current = head;
  
  while (current) {
    // If we've seen this node before, there's a cycle
    if (visited.has(current)) {
      return true;
    }
    
    // Mark this node as visited
    visited.add(current);
    current = current.next;
  }
  
  // If we reach the end, there's no cycle
  return false;
};

/**
 * Approach 3: Modifying node values (destructive approach)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Note: This approach modifies the original list, which may not be acceptable in all cases
 */
const hasCycleDestructive = (head) => {
  const VISITED_MARKER = Symbol('visited');
  let current = head;
  
  while (current) {
    // If we've marked this node as visited, there's a cycle
    if (current.visited === VISITED_MARKER) {
      return true;
    }
    
    // Mark this node as visited
    current.visited = VISITED_MARKER;
    current = current.next;
  }
  
  // If we reach the end, there's no cycle
  return false;
};

/**
 * Approach 4: Functional approach with recursion
 * Time Complexity: O(n)
 * Space Complexity: O(n) due to recursion stack
 */
const hasCycleFunctional = (head) => {
  const detectCycle = (node, visited = new Set()) => {
    // Base case: if node is null, there's no cycle
    if (!node) return false;
    
    // If we've seen this node before, there's a cycle
    if (visited.has(node)) return true;
    
    // Add current node to visited set and continue
    visited.add(node);
    return detectCycle(node.next, visited);
  };
  
  return detectCycle(head);
};

/**
 * Approach 5: Array-based approach
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const hasCycleArray = (head) => {
  const visited = [];
  let current = head;
  
  while (current) {
    // If we've seen this node before, there's a cycle
    if (visited.includes(current)) {
      return true;
    }
    
    // Add current node to visited array
    visited.push(current);
    current = current.next;
  }
  
  // If we reach the end, there's no cycle
  return false;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function* hasCycleGenerator(head) {
  yield { step: 'initial', head: head?.val };
  
  if (!head || !head.next) {
    yield { step: 'early_return', result: false };
    return false;
  }
  
  let slow = head;
  let fast = head;
  let stepCount = 0;
  
  // Move slow pointer one step and fast pointer two steps
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    stepCount++;
    
    yield { 
      step: `step ${stepCount}`, 
      slow: slow?.val, 
      fast: fast?.val 
    };
    
    // If they meet, there's a cycle
    if (slow === fast) {
      yield { step: 'cycle_detected', result: true };
      return true;
    }
  }
  
  // If fast reaches the end, there's no cycle
  yield { step: 'no_cycle', result: false };
  return false;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Detect Loop in a Linked List ===');
  
  // Helper function to create linked list from array
  const createLinkedList = (arr) => {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  };
  
  // Helper function to create a cycle in a linked list
  const createCycle = (head, pos) => {
    if (pos === -1) return head;
    
    let cycleNode = null;
    let current = head;
    let index = 0;
    
    // Find the node at position 'pos'
    while (current) {
      if (index === pos) {
        cycleNode = current;
      }
      if (!current.next) {
        // Connect the last node to the cycle node
        current.next = cycleNode;
        break;
      }
      current = current.next;
      index++;
    }
    
    return head;
  };
  
  // Test cases
  const testCases = [
    { arr: [3, 2, 0, -4], pos: 1 },  // Cycle at index 1
    { arr: [1, 2], pos: 0 },         // Cycle at index 0
    { arr: [1], pos: -1 },           // No cycle
    { arr: [], pos: -1 }             // Empty list
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: [${testCase.arr.join(', ')}], pos = ${testCase.pos}`);
    
    // Create list without cycle for most approaches
    const head1 = createLinkedList(testCase.arr);
    const headWithCycle1 = testCase.pos !== -1 ? createCycle(createLinkedList(testCase.arr), testCase.pos) : head1;
    
    console.log(`Floyd's approach: ${hasCycleFloyd(headWithCycle1)}`);
    
    const head2 = createLinkedList(testCase.arr);
    const headWithCycle2 = testCase.pos !== -1 ? createCycle(createLinkedList(testCase.arr), testCase.pos) : head2;
    console.log(`Hash Set approach: ${hasCycleHashSet(headWithCycle2)}`);
    
    const head3 = createLinkedList(testCase.arr);
    const headWithCycle3 = testCase.pos !== -1 ? createCycle(createLinkedList(testCase.arr), testCase.pos) : head3;
    console.log(`Functional approach: ${hasCycleFunctional(headWithCycle3)}`);
    
    const head4 = createLinkedList(testCase.arr);
    const headWithCycle4 = testCase.pos !== -1 ? createCycle(createLinkedList(testCase.arr), testCase.pos) : head4;
    console.log(`Array approach: ${hasCycleArray(headWithCycle4)}`);
    
    // Generator approach
    console.log('Generator approach:');
    const head5 = createLinkedList(testCase.arr);
    const headWithCycle5 = testCase.pos !== -1 ? createCycle(createLinkedList(testCase.arr), testCase.pos) : head5;
    const generator = hasCycleGenerator(headWithCycle5);
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log(`  ${JSON.stringify(result.value)}`);
      }
    } while (!result.done);
    console.log(`  Final result: ${result.value}`);
  });
  
  // Performance comparison utility
  const performanceTest = (func, head, name) => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      func(head);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const cycleList = createCycle(createLinkedList(Array.from({length: 1000}, (_, i) => i + 1)), 500);
    
    performanceTest(hasCycleFloyd, cycleList, "Floyd's approach");
    performanceTest(hasCycleHashSet, cycleList, 'Hash Set approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    hasCycleFloyd,
    hasCycleHashSet,
    hasCycleDestructive,
    hasCycleFunctional,
    hasCycleArray,
    hasCycleGenerator
  };
}
