// Copy List with Random Pointer
// Source: https://leetcode.com/problems/copy-list-with-random-pointer/

// Node class definition with random pointer
class RandomListNode {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * Approach 1: HashMap approach (Two-pass)
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for the hash map
 */
const copyRandomListHashMap = (head) => {
  if (!head) return null;
  
  const map = new Map();
  
  // First pass: create all nodes and store mapping
  let current = head;
  while (current) {
    map.set(current, new RandomListNode(current.val));
    current = current.next;
  }
  
  // Second pass: assign next and random pointers
  current = head;
  while (current) {
    const newNode = map.get(current);
    newNode.next = map.get(current.next) || null;
    newNode.random = map.get(current.random) || null;
    current = current.next;
  }
  
  return map.get(head);
};

/**
 * Approach 2: Interweaving nodes approach (Three-pass)
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(1)
 */
const copyRandomListInterweaving = (head) => {
  if (!head) return null;
  
  // First pass: create interleaved list
  let current = head;
  while (current) {
    const newNode = new RandomListNode(current.val);
    newNode.next = current.next;
    current.next = newNode;
    current = newNode.next;
  }
  
  // Second pass: assign random pointers
  current = head;
  while (current) {
    if (current.random) {
      current.next.random = current.random.next;
    }
    current = current.next.next;
  }
  
  // Third pass: separate the two lists
  current = head;
  const newHead = head.next;
  while (current) {
    const newNode = current.next;
    current.next = newNode.next;
    if (newNode.next) {
      newNode.next = newNode.next.next;
    }
    current = current.next;
  }
  
  return newHead;
};

/**
 * Approach 3: Recursive approach with memoization
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for the recursion stack and memoization
 */
const copyRandomListRecursive = (head) => {
  if (!head) return null;
  
  const map = new Map();
  
  const copy = (node) => {
    if (!node) return null;
    
    // If we've already copied this node, return the copy
    if (map.has(node)) {
      return map.get(node);
    }
    
    // Create new node
    const newNode = new RandomListNode(node.val);
    map.set(node, newNode);
    
    // Recursively copy next and random pointers
    newNode.next = copy(node.next);
    newNode.random = copy(node.random);
    
    return newNode;
  };
  
  return copy(head);
};

/**
 * Approach 4: Functional approach using array conversion
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for storing all nodes
 */
const copyRandomListFunctional = (head) => {
  if (!head) return null;
  
  // Convert to array with indices
  const nodes = [];
  let current = head;
  let index = 0;
  
  // First pass: create array of nodes with their indices
  while (current) {
    nodes.push({
      original: current,
      index: index,
      randomIndex: -1  // Will be updated later
    });
    current = current.next;
    index++;
  }
  
  // Second pass: determine random indices
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.original.random) {
      // Find the index of the random node
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].original === node.original.random) {
          node.randomIndex = j;
          break;
        }
      }
    }
  }
  
  // Create new nodes
  const newNodes = nodes.map(node => new RandomListNode(node.original.val));
  
  // Connect next and random pointers
  for (let i = 0; i < newNodes.length; i++) {
    if (i < newNodes.length - 1) {
      newNodes[i].next = newNodes[i + 1];
    }
    
    if (nodes[i].randomIndex !== -1) {
      newNodes[i].random = newNodes[nodes[i].randomIndex];
    }
  }
  
  return newNodes[0] || null;
};

/**
 * Approach 5: Array-based approach with index mapping
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for the arrays
 */
const copyRandomListArray = (head) => {
  if (!head) return null;
  
  // Create arrays to store original nodes and their random pointers
  const originalNodes = [];
  const randomPointers = [];
  
  // First pass: collect all nodes and their random pointers
  let current = head;
  while (current) {
    originalNodes.push(current);
    randomPointers.push(current.random);
    current = current.next;
  }
  
  // Create new nodes
  const newNodes = originalNodes.map(node => new RandomListNode(node.val));
  
  // Connect next pointers
  for (let i = 0; i < newNodes.length - 1; i++) {
    newNodes[i].next = newNodes[i + 1];
  }
  
  // Connect random pointers
  for (let i = 0; i < newNodes.length; i++) {
    if (randomPointers[i]) {
      // Find the index of the random node
      const randomIndex = originalNodes.indexOf(randomPointers[i]);
      if (randomIndex !== -1) {
        newNodes[i].random = newNodes[randomIndex];
      }
    }
  }
  
  return newNodes[0] || null;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for the map
 */
function* copyRandomListGenerator(head) {
  yield { step: 'initial', head: head?.val };
  
  if (!head) {
    yield { step: 'empty_list', result: null };
    return null;
  }
  
  const map = new Map();
  let stepCount = 0;
  
  // First pass: create all nodes and store mapping
  yield { step: 'first_pass_start' };
  let current = head;
  while (current) {
    stepCount++;
    yield { step: `creating_node_${stepCount}`, value: current.val };
    map.set(current, new RandomListNode(current.val));
    current = current.next;
  }
  
  // Second pass: assign next and random pointers
  yield { step: 'second_pass_start' };
  current = head;
  stepCount = 0;
  while (current) {
    stepCount++;
    const newNode = map.get(current);
    yield { 
      step: `connecting_node_${stepCount}`, 
      value: current.val, 
      next: current.next?.val, 
      random: current.random?.val 
    };
    newNode.next = map.get(current.next) || null;
    newNode.random = map.get(current.random) || null;
    current = current.next;
  }
  
  const result = map.get(head);
  yield { step: 'final_result', result: result?.val };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Copy List with Random Pointer ===');
  
  // Helper function to create linked list with random pointers from array representation
  // Format: [[val, randomIndex], ...] where randomIndex is the index of the node that random points to
  const createRandomList = (arr) => {
    if (arr.length === 0) return null;
    
    // Create all nodes first
    const nodes = arr.map(([val]) => new RandomListNode(val));
    
    // Connect next pointers
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }
    
    // Connect random pointers
    for (let i = 0; i < arr.length; i++) {
      const [, randomIndex] = arr[i];
      if (randomIndex !== null && randomIndex >= 0 && randomIndex < nodes.length) {
        nodes[i].random = nodes[randomIndex];
      }
    }
    
    return nodes[0];
  };
  
  // Helper function to convert linked list with random pointers to array representation for comparison
  const randomListToArray = (head) => {
    if (!head) return [];
    
    // First pass: collect all nodes and assign indices
    const nodeMap = new Map();
    let current = head;
    let index = 0;
    
    while (current) {
      nodeMap.set(current, index);
      current = current.next;
      index++;
    }
    
    // Second pass: create array representation
    const result = [];
    current = head;
    
    while (current) {
      const randomIndex = current.random ? nodeMap.get(current.random) : null;
      result.push([current.val, randomIndex]);
      current = current.next;
    }
    
    return result;
  };
  
  // Test cases
  const testCases = [
    [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],  // Example 1
    [[1, 1], [2, 1]],                               // Example 2
    [[3, null], [3, 0], [3, null]]                  // Example 3
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: [${testCase.map(([val, rand]) => `[${val},${rand}]`).join(', ')}]`);
    
    // Create lists for each approach
    const head1 = createRandomList(testCase);
    const result1 = copyRandomListHashMap(head1);
    console.log(`HashMap approach: [${randomListToArray(result1).map(([val, rand]) => `[${val},${rand}]`).join(', ')}]`);
    
    const head2 = createRandomList(testCase);
    const result2 = copyRandomListInterweaving(head2);
    console.log(`Interweaving approach: [${randomListToArray(result2).map(([val, rand]) => `[${val},${rand}]`).join(', ')}]`);
    
    const head3 = createRandomList(testCase);
    const result3 = copyRandomListRecursive(head3);
    console.log(`Recursive approach: [${randomListToArray(result3).map(([val, rand]) => `[${val},${rand}]`).join(', ')}]`);
    
    const head4 = createRandomList(testCase);
    const result4 = copyRandomListFunctional(head4);
    console.log(`Functional approach: [${randomListToArray(result4).map(([val, rand]) => `[${val},${rand}]`).join(', ')}]`);
    
    const head5 = createRandomList(testCase);
    const result5 = copyRandomListArray(head5);
    console.log(`Array approach: [${randomListToArray(result5).map(([val, rand]) => `[${val},${rand}]`).join(', ')}]`);
    
    // Generator approach
    console.log('Generator approach:');
    const head6 = createRandomList(testCase);
    const generator = copyRandomListGenerator(head6);
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log(`  ${JSON.stringify(result.value)}`);
      }
    } while (!result.done);
    console.log(`  Final result: [${randomListToArray(result.value).map(([val, rand]) => `[${val},${rand}]`).join(', ')}]`);
  });
  
  // Performance comparison utility
  const performanceTest = (func, head, name) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      // Create a copy of the list for each test
      const copy = createRandomList(randomListToArray(head));
      func(copy);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const testList = createRandomList([[1, 1], [2, 0], [3, null], [4, 2], [5, 1]]);
    
    performanceTest(copyRandomListHashMap, testList, 'HashMap approach');
    performanceTest(copyRandomListInterweaving, testList, 'Interweaving approach');
    performanceTest(copyRandomListRecursive, testList, 'Recursive approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    copyRandomListHashMap,
    copyRandomListInterweaving,
    copyRandomListRecursive,
    copyRandomListFunctional,
    copyRandomListArray,
    copyRandomListGenerator
  };
}
