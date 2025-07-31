// Reverse Nodes in k-Group
// Source: https://leetcode.com/problems/reverse-nodes-in-k-group/

// Node class definition
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Approach 1: Iterative approach with pointer manipulation
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(1)
 */
const reverseKGroupIterative = (head, k) => {
  if (!head || k <= 1) return head;
  
  // Helper function to get the length of the linked list
  const getLength = (node) => {
    let length = 0;
    while (node) {
      length++;
      node = node.next;
    }
    return length;
  };
  
  // Helper function to reverse k nodes
  const reverseK = (start, k) => {
    let prev = null;
    let current = start;
    let count = 0;
    
    // Reverse k nodes
    while (current && count < k) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      count++;
    }
    
    // Return the new head and tail after reversal
    return { newHead: prev, newTail: start, nextGroup: current };
  };
  
  const dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupTail = dummy;
  
  const length = getLength(head);
  let remaining = length;
  
  while (remaining >= k) {
    // Get the start of current group
    const groupStart = prevGroupTail.next;
    
    // Reverse k nodes
    const { newHead, newTail, nextGroup } = reverseK(groupStart, k);
    
    // Connect with previous group
    prevGroupTail.next = newHead;
    newTail.next = nextGroup;
    
    // Update prevGroupTail for next iteration
    prevGroupTail = newTail;
    
    // Update remaining count
    remaining -= k;
  }
  
  return dummy.next;
};

/**
 * Approach 2: Recursive approach
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n/k) due to recursion stack
 */
const reverseKGroupRecursive = (head, k) => {
  if (!head || k <= 1) return head;
  
  // Helper function to check if there are at least k nodes remaining
  const hasKNodes = (node, k) => {
    let count = 0;
    while (node && count < k) {
      count++;
      node = node.next;
    }
    return count === k;
  };
  
  // If we don't have k nodes, return head as is
  if (!hasKNodes(head, k)) return head;
  
  // Reverse first k nodes
  let prev = null;
  let current = head;
  let count = 0;
  
  while (current && count < k) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
    count++;
  }
  
  // Recursively reverse the rest and connect
  if (current) {
    head.next = reverseKGroupRecursive(current, k);
  }
  
  // prev is the new head of the reversed group
  return prev;
};

/**
 * Approach 3: Stack-based approach
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(k) for the stack
 */
const reverseKGroupStack = (head, k) => {
  if (!head || k <= 1) return head;
  
  const dummy = new ListNode(0);
  let prevGroupTail = dummy;
  let current = head;
  
  while (current) {
    const stack = [];
    let temp = current;
    let count = 0;
    
    // Push k nodes to stack
    while (temp && count < k) {
      stack.push(temp);
      temp = temp.next;
      count++;
    }
    
    // If we have k nodes, reverse them
    if (count === k) {
      while (stack.length > 0) {
        const node = stack.pop();
        prevGroupTail.next = node;
        prevGroupTail = node;
      }
      // Connect to the remaining nodes
      prevGroupTail.next = temp;
      current = temp;
    } else {
      // If less than k nodes, keep them as is
      prevGroupTail.next = current;
      break;
    }
  }
  
  return dummy.next;
};

/**
 * Approach 4: Functional approach using array conversion
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for storing all nodes
 */
const reverseKGroupFunctional = (head, k) => {
  if (!head || k <= 1) return head;
  
  // Convert linked list to array
  const toArray = (node) => {
    const result = [];
    while (node) {
      result.push(node.val);
      node = node.next;
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
  
  // Get values from linked list
  const values = toArray(head);
  
  // Reverse every k elements
  const reversed = [];
  for (let i = 0; i < values.length; i += k) {
    const group = values.slice(i, i + k);
    if (group.length === k) {
      reversed.push(...group.reverse());
    } else {
      reversed.push(...group);
    }
  }
  
  return fromArray(reversed);
};

/**
 * Approach 5: Two-pointer approach with group tracking
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(1)
 */
const reverseKGroupTwoPointer = (head, k) => {
  if (!head || k <= 1) return head;
  
  // Helper function to get the kth node from current
  const getKthNode = (node, k) => {
    while (node && k > 0) {
      node = node.next;
      k--;
    }
    return node;
  };
  
  const dummy = new ListNode(0, head);
  let groupPrev = dummy;
  
  while (true) {
    const kth = getKthNode(groupPrev, k);
    if (!kth) break;
    
    const groupNext = kth.next;
    
    // Reverse group
    let prev = groupNext;
    let current = groupPrev.next;
    
    while (current !== groupNext) {
      const temp = current.next;
      current.next = prev;
      prev = current;
      current = temp;
    }
    
    const temp = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = temp;
  }
  
  return dummy.next;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(1)
 */
function* reverseKGroupGenerator(head, k) {
  yield { step: 'initial', k, head: head?.val };
  
  if (!head || k <= 1) {
    yield { step: 'early_return', result: head?.val };
    return head;
  }
  
  // Helper function to check if there are at least k nodes remaining
  const hasKNodes = (node, k) => {
    let count = 0;
    while (node && count < k) {
      count++;
      node = node.next;
    }
    return count === k;
  };
  
  const dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupTail = dummy;
  let groupCount = 0;
  
  while (prevGroupTail.next && hasKNodes(prevGroupTail.next, k)) {
    groupCount++;
    yield { step: `processing_group_${groupCount}` };
    
    // Get the start of current group
    const groupStart = prevGroupTail.next;
    let prev = null;
    let current = groupStart;
    let count = 0;
    
    // Reverse k nodes
    while (current && count < k) {
      yield { step: `reversing_node_${count + 1}_in_group_${groupCount}`, value: current.val };
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      count++;
    }
    
    // Connect with previous group
    prevGroupTail.next = prev;
    groupStart.next = current;
    prevGroupTail = groupStart;
    
    yield { step: `completed_group_${groupCount}` };
  }
  
  yield { step: 'final_result', result: dummy.next?.val };
  return dummy.next;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Reverse Nodes in k-Group ===');
  
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
    { arr: [1, 2, 3, 4, 5], k: 2 },
    { arr: [1, 2, 3, 4, 5], k: 3 },
    { arr: [1, 2, 3, 4, 5, 6, 7, 8], k: 3 },
    { arr: [1], k: 1 }
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: [${testCase.arr.join(', ')}], k = ${testCase.k}`);
    
    // Create lists for each approach
    const head1 = createLinkedList(testCase.arr);
    const result1 = reverseKGroupIterative(head1, testCase.k);
    console.log(`Iterative approach: [${linkedListToArray(result1).join(', ')}]`);
    
    const head2 = createLinkedList(testCase.arr);
    const result2 = reverseKGroupRecursive(head2, testCase.k);
    console.log(`Recursive approach: [${linkedListToArray(result2).join(', ')}]`);
    
    const head3 = createLinkedList(testCase.arr);
    const result3 = reverseKGroupStack(head3, testCase.k);
    console.log(`Stack approach: [${linkedListToArray(result3).join(', ')}]`);
    
    const head4 = createLinkedList(testCase.arr);
    const result4 = reverseKGroupFunctional(head4, testCase.k);
    console.log(`Functional approach: [${linkedListToArray(result4).join(', ')}]`);
    
    const head5 = createLinkedList(testCase.arr);
    const result5 = reverseKGroupTwoPointer(head5, testCase.k);
    console.log(`Two-pointer approach: [${linkedListToArray(result5).join(', ')}]`);
    
    // Generator approach
    console.log('Generator approach:');
    const head6 = createLinkedList(testCase.arr);
    const generator = reverseKGroupGenerator(head6, testCase.k);
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
  const performanceTest = (func, head, k, name) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      // Create a copy of the list for each test
      const copy = createLinkedList(linkedListToArray(head));
      func(copy, k);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const testList = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    
    performanceTest(reverseKGroupIterative, testList, 3, 'Iterative approach');
    performanceTest(reverseKGroupRecursive, testList, 3, 'Recursive approach');
    performanceTest(reverseKGroupTwoPointer, testList, 3, 'Two-pointer approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    reverseKGroupIterative,
    reverseKGroupRecursive,
    reverseKGroupStack,
    reverseKGroupFunctional,
    reverseKGroupTwoPointer,
    reverseKGroupGenerator
  };
}
