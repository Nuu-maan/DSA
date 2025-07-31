// Find the Middle of a Linked List
// Source: https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/

// Node class definition
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Approach 1: Two-pointer technique (Tortoise and Hare)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const middleNodeTwoPointer = (head) => {
  let slow = head;
  let fast = head;
  
  // Move slow pointer one step and fast pointer two steps
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // When fast reaches the end, slow will be at the middle
  return slow;
};

/**
 * Approach 2: Count nodes first, then traverse to middle
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const middleNodeCount = (head) => {
  // First pass: count the number of nodes
  let count = 0;
  let current = head;
  while (current) {
    count++;
    current = current.next;
  }
  
  // Second pass: traverse to the middle
  let middleIndex = Math.floor(count / 2);
  current = head;
  for (let i = 0; i < middleIndex; i++) {
    current = current.next;
  }
  
  return current;
};

/**
 * Approach 3: Store nodes in array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const middleNodeArray = (head) => {
  const nodes = [];
  let current = head;
  
  // Store all nodes in array
  while (current) {
    nodes.push(current);
    current = current.next;
  }
  
  // Return the middle node
  const middleIndex = Math.floor(nodes.length / 2);
  return nodes[middleIndex];
};

/**
 * Approach 4: Functional approach using reduce
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const middleNodeFunctional = (head) => {
  // Convert linked list to array using functional approach
  const toArray = (node) => {
    const result = [];
    let current = node;
    while (current) {
      result.push(current);
      current = current.next;
    }
    return result;
  };
  
  const nodes = toArray(head);
  return nodes[Math.floor(nodes.length / 2)];
};

/**
 * Approach 5: Recursive approach
 * Time Complexity: O(n)
 * Space Complexity: O(n) due to recursion stack
 */
const middleNodeRecursive = (head) => {
  const findMiddle = (slow, fast) => {
    // Base case: if fast reaches the end, slow is at the middle
    if (!fast || !fast.next) {
      return slow;
    }
    
    // Move slow one step and fast two steps
    return findMiddle(slow.next, fast.next.next);
  };
  
  return findMiddle(head, head);
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function* middleNodeGenerator(head) {
  yield { step: 'initial', slow: head?.val, fast: head?.val };
  
  let slow = head;
  let fast = head;
  let stepCount = 0;
  
  // Move slow pointer one step and fast pointer two steps
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    stepCount++;
    yield { step: `step ${stepCount}`, slow: slow?.val, fast: fast?.val };
  }
  
  yield { step: 'result', middle: slow?.val };
  return slow;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Find the Middle of a Linked List ===');
  
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
    [1, 2, 3, 4, 5, 6],
    [1],
    [1, 2]
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: [${testCase.join(', ')}]`);
    const head = createLinkedList(testCase);
    
    const result1 = middleNodeTwoPointer(head);
    console.log(`Two-pointer approach: [${linkedListToArray(result1).join(', ')}]`);
    
    const head2 = createLinkedList(testCase);
    const result2 = middleNodeCount(head2);
    console.log(`Count approach: [${linkedListToArray(result2).join(', ')}]`);
    
    const head3 = createLinkedList(testCase);
    const result3 = middleNodeArray(head3);
    console.log(`Array approach: [${linkedListToArray(result3).join(', ')}]`);
    
    const head4 = createLinkedList(testCase);
    const result4 = middleNodeFunctional(head4);
    console.log(`Functional approach: [${linkedListToArray(result4).join(', ')}]`);
    
    const head5 = createLinkedList(testCase);
    const result5 = middleNodeRecursive(head5);
    console.log(`Recursive approach: [${linkedListToArray(result5).join(', ')}]`);
    
    // Generator approach
    console.log('Generator approach:');
    const head6 = createLinkedList(testCase);
    const generator = middleNodeGenerator(head6);
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
      func(head);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const longList = createLinkedList(Array.from({length: 1000}, (_, i) => i + 1));
    
    performanceTest(middleNodeTwoPointer, longList, 'Two-pointer approach');
    performanceTest(middleNodeCount, longList, 'Count approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    middleNodeTwoPointer,
    middleNodeCount,
    middleNodeArray,
    middleNodeFunctional,
    middleNodeRecursive,
    middleNodeGenerator
  };
}
