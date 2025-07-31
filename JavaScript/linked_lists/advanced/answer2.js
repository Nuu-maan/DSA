// Reverse Nodes in k-Group with Custom Reversal Logic

// Node class definition
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Approach 1: Iterative approach with custom reversal logic
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(k) for temporary storage of k nodes
 */
const reverseKGroupWithLogicIterative = (head, k, reversalLogic) => {
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
  
  const dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupTail = dummy;
  
  while (prevGroupTail.next && hasKNodes(prevGroupTail.next, k)) {
    // Collect k nodes
    const nodes = [];
    let current = prevGroupTail.next;
    for (let i = 0; i < k; i++) {
      nodes.push(current);
      current = current.next;
    }
    
    // Apply custom reversal logic
    const reorderedNodes = reversalLogic(nodes);
    
    // Connect reordered nodes
    prevGroupTail.next = reorderedNodes[0];
    for (let i = 0; i < reorderedNodes.length - 1; i++) {
      reorderedNodes[i].next = reorderedNodes[i + 1];
    }
    reorderedNodes[reorderedNodes.length - 1].next = current;
    
    // Update prevGroupTail for next iteration
    prevGroupTail = reorderedNodes[reorderedNodes.length - 1];
  }
  
  return dummy.next;
};

/**
 * Approach 2: Recursive approach with custom reversal logic
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n/k) due to recursion stack
 */
const reverseKGroupWithLogicRecursive = (head, k, reversalLogic) => {
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
  
  // Collect first k nodes
  const nodes = [];
  let current = head;
  for (let i = 0; i < k; i++) {
    nodes.push(current);
    current = current.next;
  }
  
  // Apply custom reversal logic
  const reorderedNodes = reversalLogic(nodes);
  
  // Connect reordered nodes
  for (let i = 0; i < reorderedNodes.length - 1; i++) {
    reorderedNodes[i].next = reorderedNodes[i + 1];
  }
  
  // Recursively process the rest and connect
  reorderedNodes[reorderedNodes.length - 1].next = reverseKGroupWithLogicRecursive(current, k, reversalLogic);
  
  // Return the new head
  return reorderedNodes[0];
};

/**
 * Approach 3: Stack-based approach with custom reversal logic
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(k) for the stack
 */
const reverseKGroupWithLogicStack = (head, k, reversalLogic) => {
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
    
    // If we have k nodes, apply custom reversal logic
    if (count === k) {
      // Apply custom reversal logic
      const reorderedNodes = reversalLogic(stack);
      
      // Connect reordered nodes
      for (const node of reorderedNodes) {
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
 * Approach 4: Functional approach using array conversion with custom reversal logic
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for storing all nodes
 */
const reverseKGroupWithLogicFunctional = (head, k, reversalLogic) => {
  if (!head || k <= 1) return head;
  
  // Convert linked list to array
  const toArray = (node) => {
    const result = [];
    while (node) {
      result.push(node);
      node = node.next;
    }
    return result;
  };
  
  // Convert array back to linked list
  const fromArray = (arr) => {
    if (arr.length === 0) return null;
    for (let i = 0; i < arr.length - 1; i++) {
      arr[i].next = arr[i + 1];
    }
    arr[arr.length - 1].next = null;
    return arr[0];
  };
  
  // Get nodes from linked list
  const nodes = toArray(head);
  
  // Apply custom reversal logic to every k elements
  const reordered = [];
  for (let i = 0; i < nodes.length; i += k) {
    const group = nodes.slice(i, i + k);
    if (group.length === k) {
      reordered.push(...reversalLogic(group));
    } else {
      reordered.push(...group);
    }
  }
  
  return fromArray(reordered);
};

/**
 * Approach 5: Two-pointer approach with group tracking and custom reversal logic
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(k) for temporary storage
 */
const reverseKGroupWithLogicTwoPointer = (head, k, reversalLogic) => {
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
    
    // Collect k nodes
    const nodes = [];
    let current = groupPrev.next;
    for (let i = 0; i < k; i++) {
      nodes.push(current);
      current = current.next;
    }
    
    // Apply custom reversal logic
    const reorderedNodes = reversalLogic(nodes);
    
    // Connect reordered nodes
    groupPrev.next = reorderedNodes[0];
    reorderedNodes[reorderedNodes.length - 1].next = groupNext;
    groupPrev = reorderedNodes[reorderedNodes.length - 1];
  }
  
  return dummy.next;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(k) for temporary storage
 */
function* reverseKGroupWithLogicGenerator(head, k, reversalLogic) {
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
    
    // Collect k nodes
    const nodes = [];
    let current = prevGroupTail.next;
    for (let i = 0; i < k; i++) {
      nodes.push(current);
      yield { step: `collecting_node_${i + 1}_in_group_${groupCount}`, value: current.val };
      current = current.next;
    }
    
    // Apply custom reversal logic
    yield { step: `applying_reversal_logic_to_group_${groupCount}` };
    const reorderedNodes = reversalLogic(nodes);
    
    // Connect reordered nodes
    prevGroupTail.next = reorderedNodes[0];
    for (let i = 0; i < reorderedNodes.length - 1; i++) {
      reorderedNodes[i].next = reorderedNodes[i + 1];
    }
    reorderedNodes[reorderedNodes.length - 1].next = current;
    
    // Update prevGroupTail for next iteration
    prevGroupTail = reorderedNodes[reorderedNodes.length - 1];
    
    yield { step: `completed_group_${groupCount}` };
  }
  
  yield { step: 'final_result', result: dummy.next?.val };
  return dummy.next;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Reverse Nodes in k-Group with Custom Reversal Logic ===');
  
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
  
  // Custom reversal logic functions
  const normalReverse = (nodes) => [...nodes].reverse();
  const reverseAlternate = (nodes) => {
    if (Math.random() > 0.5) {
      return [...nodes].reverse();
    }
    return nodes;
  };
  const palindromeOrder = (nodes) => {
    if (nodes.length <= 1) return nodes;
    const result = [];
    const mid = Math.floor(nodes.length / 2);
    for (let i = mid - 1; i >= 0; i--) {
      result.push(nodes[i]);
    }
    if (nodes.length % 2 === 1) {
      result.push(nodes[mid]);
    }
    for (let i = mid + 1; i < nodes.length; i++) {
      result.push(nodes[i]);
    }
    return result;
  };
  
  // Test cases
  const testCases = [
    { 
      arr: [1, 2, 3, 4, 5], 
      k: 3, 
      reversalLogic: normalReverse,
      description: 'Normal reverse'
    },
    { 
      arr: [1, 2, 3, 4, 5, 6, 7, 8], 
      k: 4, 
      reversalLogic: (nodes) => [nodes[1], nodes[0], nodes[2], nodes[3]],
      description: 'Custom reorder: [1,2,3,4] -> [2,1,3,4]'
    },
    { 
      arr: [1, 2, 3, 4, 5, 6], 
      k: 3, 
      reversalLogic: palindromeOrder,
      description: 'Palindrome ordering'
    }
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: [${testCase.arr.join(', ')}], k = ${testCase.k}, ${testCase.description}`);
    
    // Create lists for each approach
    const head1 = createLinkedList(testCase.arr);
    const result1 = reverseKGroupWithLogicIterative(head1, testCase.k, testCase.reversalLogic);
    console.log(`Iterative approach: [${linkedListToArray(result1).join(', ')}]`);
    
    const head2 = createLinkedList(testCase.arr);
    const result2 = reverseKGroupWithLogicRecursive(head2, testCase.k, testCase.reversalLogic);
    console.log(`Recursive approach: [${linkedListToArray(result2).join(', ')}]`);
    
    const head3 = createLinkedList(testCase.arr);
    const result3 = reverseKGroupWithLogicStack(head3, testCase.k, testCase.reversalLogic);
    console.log(`Stack approach: [${linkedListToArray(result3).join(', ')}]`);
    
    const head4 = createLinkedList(testCase.arr);
    const result4 = reverseKGroupWithLogicFunctional(head4, testCase.k, testCase.reversalLogic);
    console.log(`Functional approach: [${linkedListToArray(result4).join(', ')}]`);
    
    const head5 = createLinkedList(testCase.arr);
    const result5 = reverseKGroupWithLogicTwoPointer(head5, testCase.k, testCase.reversalLogic);
    console.log(`Two-pointer approach: [${linkedListToArray(result5).join(', ')}]`);
    
    // Generator approach
    console.log('Generator approach:');
    const head6 = createLinkedList(testCase.arr);
    const generator = reverseKGroupWithLogicGenerator(head6, testCase.k, testCase.reversalLogic);
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
  const performanceTest = (func, head, k, reversalLogic, name) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      // Create a copy of the list for each test
      const copy = createLinkedList(linkedListToArray(head));
      func(copy, k, reversalLogic);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const testList = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    
    performanceTest(reverseKGroupWithLogicIterative, testList, 3, normalReverse, 'Iterative approach');
    performanceTest(reverseKGroupWithLogicRecursive, testList, 3, normalReverse, 'Recursive approach');
    performanceTest(reverseKGroupWithLogicTwoPointer, testList, 3, normalReverse, 'Two-pointer approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    reverseKGroupWithLogicIterative,
    reverseKGroupWithLogicRecursive,
    reverseKGroupWithLogicStack,
    reverseKGroupWithLogicFunctional,
    reverseKGroupWithLogicTwoPointer,
    reverseKGroupWithLogicGenerator
  };
}
