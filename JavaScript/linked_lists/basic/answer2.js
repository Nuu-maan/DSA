// Reverse a Linked List
// Source: https://www.geeksforgeeks.org/reverse-a-linked-list/

// Node class definition
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Approach 1: Iterative approach with three pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const reverseListIterative = (head) => {
  let prev = null;
  let current = head;
  let next = null;
  
  while (current) {
    // Store next node
    next = current.next;
    
    // Reverse the link
    current.next = prev;
    
    // Move pointers one position ahead
    prev = current;
    current = next;
  }
  
  // prev is the new head
  return prev;
};

/**
 * Approach 2: Recursive approach
 * Time Complexity: O(n)
 * Space Complexity: O(n) due to recursion stack
 */
const reverseListRecursive = (head) => {
  // Base case: if head is null or only one node, it's already reversed
  if (!head || !head.next) {
    return head;
  }
  
  // Recursively reverse the rest of the list
  const reversedHead = reverseListRecursive(head.next);
  
  // Reverse the current connection
  head.next.next = head;
  head.next = null;
  
  return reversedHead;
};

/**
 * Approach 3: Functional approach using array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const reverseListFunctional = (head) => {
  // Convert linked list to array
  const toArray = (node) => {
    const result = [];
    let current = node;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  };
  
  // Convert array back to linked list
  const fromArray = (arr) => {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  };
  
  // Get values, reverse array, and create new linked list
  const values = toArray(head);
  return fromArray(values.reverse());
};

/**
 * Approach 4: ES6+ optimized iterative approach
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const reverseListES6 = (head) => {
  let [prev, current] = [null, head];
  
  while (current) {
    [current.next, prev, current] = [prev, current, current.next];
  }
  
  return prev;
};

/**
 * Approach 5: Stack-based approach
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const reverseListStack = (head) => {
  if (!head) return null;
  
  const stack = [];
  let current = head;
  
  // Push all nodes to stack
  while (current) {
    stack.push(current);
    current = current.next;
  }
  
  // Pop nodes from stack to create reversed list
  const newHead = stack.pop();
  current = newHead;
  
  while (stack.length > 0) {
    current.next = stack.pop();
    current = current.next;
  }
  
  // Set the last node's next to null
  current.next = null;
  
  return newHead;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function* reverseListGenerator(head) {
  yield { step: 'initial', head: head?.val };
  
  let prev = null;
  let current = head;
  let stepCount = 0;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    
    yield { 
      step: `step ${++stepCount}`, 
      current: current.val, 
      next: next?.val, 
      prev: prev?.val,
      reversedConnection: `${current.val} -> ${prev?.val || 'null'}`
    };
    
    prev = current;
    current = next;
  }
  
  yield { step: 'result', newHead: prev?.val };
  return prev;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Reverse a Linked List ===');
  
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
  
  // Helper function to convert linked list to array for easy comparison
  const linkedListToArray = (head) => {
    const result = [];
    let current = head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  };
  
  // Test cases
  const testCases = [
    [1, 2, 3, 4, 5],
    [1, 2],
    [],
    [1]
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: [${testCase.join(', ')}]`);
    const head = createLinkedList(testCase);
    
    const result1 = reverseListIterative(head);
    console.log(`Iterative approach: [${linkedListToArray(result1).join(', ')}]`);
    
    const head2 = createLinkedList(testCase);
    const result2 = reverseListRecursive(head2);
    console.log(`Recursive approach: [${linkedListToArray(result2).join(', ')}]`);
    
    const head3 = createLinkedList(testCase);
    const result3 = reverseListFunctional(head3);
    console.log(`Functional approach: [${linkedListToArray(result3).join(', ')}]`);
    
    const head4 = createLinkedList(testCase);
    const result4 = reverseListES6(head4);
    console.log(`ES6+ approach: [${linkedListToArray(result4).join(', ')}]`);
    
    const head5 = createLinkedList(testCase);
    const result5 = reverseListStack(head5);
    console.log(`Stack approach: [${linkedListToArray(result5).join(', ')}]`);
    
    // Generator approach
    console.log('Generator approach:');
    const head6 = createLinkedList(testCase);
    const generator = reverseListGenerator(head6);
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log(`  ${JSON.stringify(result.value)}`);
      }
    } while (!result.done);
    console.log(`  Final result: [${linkedListToArray(result.value).join(', ')}]`);
  });
  
  // Performance comparison utility
  const performanceTest = (func, head, name) => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      // Create a copy of the list for each test
      const copy = createLinkedList(linkedListToArray(head));
      func(copy);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const longList = createLinkedList(Array.from({length: 1000}, (_, i) => i + 1));
    
    performanceTest(reverseListIterative, longList, 'Iterative approach');
    performanceTest(reverseListES6, longList, 'ES6+ approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    reverseListIterative,
    reverseListRecursive,
    reverseListFunctional,
    reverseListES6,
    reverseListStack,
    reverseListGenerator
  };
}
