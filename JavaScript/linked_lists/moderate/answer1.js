// Merge k Sorted Lists
// Source: https://leetcode.com/problems/merge-k-sorted-lists/

// Node class definition
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Approach 1: Sequential merge using merge two lists
 * Time Complexity: O(k*N) where k is the number of lists and N is the total number of nodes
 * Space Complexity: O(1)
 */
const mergeKListsSequential = (lists) => {
  if (!lists || lists.length === 0) return null;
  
  // Helper function to merge two sorted lists
  const mergeTwoLists = (l1, l2) => {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }
    
    // Attach remaining nodes
    current.next = l1 || l2;
    
    return dummy.next;
  };
  
  // Sequentially merge all lists
  let result = null;
  for (let i = 0; i < lists.length; i++) {
    result = mergeTwoLists(result, lists[i]);
  }
  
  return result;
};

/**
 * Approach 2: Divide and conquer (merge sort approach)
 * Time Complexity: O(N*log(k)) where k is the number of lists and N is the total number of nodes
 * Space Complexity: O(log(k)) due to recursion stack
 */
const mergeKListsDivideConquer = (lists) => {
  if (!lists || lists.length === 0) return null;
  
  // Helper function to merge two sorted lists
  const mergeTwoLists = (l1, l2) => {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }
    
    // Attach remaining nodes
    current.next = l1 || l2;
    
    return dummy.next;
  };
  
  // Helper function to recursively merge lists
  const mergeLists = (lists, start, end) => {
    if (start === end) return lists[start];
    if (start > end) return null;
    
    const mid = Math.floor((start + end) / 2);
    const left = mergeLists(lists, start, mid);
    const right = mergeLists(lists, mid + 1, end);
    
    return mergeTwoLists(left, right);
  };
  
  return mergeLists(lists, 0, lists.length - 1);
};

/**
 * Approach 3: Min-heap approach
 * Time Complexity: O(N*log(k)) where k is the number of lists and N is the total number of nodes
 * Space Complexity: O(k) for the heap
 */
const mergeKListsHeap = (lists) => {
  if (!lists || lists.length === 0) return null;
  
  // Min-heap implementation
  class MinHeap {
    constructor() {
      this.heap = [];
    }
    
    push(node) {
      this.heap.push(node);
      this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();
      
      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown(0);
      return min;
    }
    
    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex].val <= this.heap[index].val) break;
        
        [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
        index = parentIndex;
      }
    }
    
    bubbleDown(index) {
      const lastIndex = this.heap.length - 1;
      
      while (true) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;
        
        if (leftChildIndex <= lastIndex && 
            this.heap[leftChildIndex].val < this.heap[smallestIndex].val) {
          smallestIndex = leftChildIndex;
        }
        
        if (rightChildIndex <= lastIndex && 
            this.heap[rightChildIndex].val < this.heap[smallestIndex].val) {
          smallestIndex = rightChildIndex;
        }
        
        if (smallestIndex === index) break;
        
        [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
        index = smallestIndex;
      }
    }
    
    isEmpty() {
      return this.heap.length === 0;
    }
  }
  
  const heap = new MinHeap();
  
  // Add the head of each non-empty list to the heap
  for (const list of lists) {
    if (list) {
      heap.push(list);
    }
  }
  
  const dummy = new ListNode(0);
  let current = dummy;
  
  // Extract the minimum element from heap and add next element of that list
  while (!heap.isEmpty()) {
    const minNode = heap.pop();
    current.next = minNode;
    current = current.next;
    
    if (minNode.next) {
      heap.push(minNode.next);
    }
  }
  
  return dummy.next;
};

/**
 * Approach 4: Functional approach using array methods
 * Time Complexity: O(N*log(N)) where N is the total number of nodes
 * Space Complexity: O(N) for storing all nodes
 */
const mergeKListsFunctional = (lists) => {
  if (!lists || lists.length === 0) return null;
  
  // Convert all lists to a single array of nodes
  const allNodes = lists
    .filter(list => list !== null)  // Remove null lists
    .flatMap(list => {
      const nodes = [];
      let current = list;
      while (current) {
        nodes.push(current);
        current = current.next;
      }
      return nodes;
    })
    .sort((a, b) => a.val - b.val);  // Sort by value
  
  // Connect all nodes
  if (allNodes.length === 0) return null;
  
  for (let i = 0; i < allNodes.length - 1; i++) {
    allNodes[i].next = allNodes[i + 1];
  }
  allNodes[allNodes.length - 1].next = null;
  
  return allNodes[0];
};

/**
 * Approach 5: Priority queue using Map
 * Time Complexity: O(N*log(k)) where k is the number of lists and N is the total number of nodes
 * Space Complexity: O(k) for the map
 */
const mergeKListsPriorityMap = (lists) => {
  if (!lists || lists.length === 0) return null;
  
  // Use a map to simulate priority queue
  const priorityMap = new Map();
  
  // Add all head nodes to the map
  for (const list of lists) {
    if (list) {
      const val = list.val;
      if (!priorityMap.has(val)) {
        priorityMap.set(val, []);
      }
      priorityMap.get(val).push(list);
    }
  }
  
  const dummy = new ListNode(0);
  let current = dummy;
  
  // Process nodes in sorted order
  while (priorityMap.size > 0) {
    // Find minimum key
    let minKey = Infinity;
    for (const key of priorityMap.keys()) {
      if (key < minKey) minKey = key;
    }
    
    // Get the node with minimum value
    const nodeList = priorityMap.get(minKey);
    const node = nodeList.pop();
    
    // Remove the key if no more nodes with that value
    if (nodeList.length === 0) {
      priorityMap.delete(minKey);
    }
    
    // Add next node from the same list if exists
    if (node.next) {
      const nextVal = node.next.val;
      if (!priorityMap.has(nextVal)) {
        priorityMap.set(nextVal, []);
      }
      priorityMap.get(nextVal).push(node.next);
    }
    
    // Connect the node
    current.next = node;
    current = current.next;
  }
  
  return dummy.next;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(N*log(k)) where k is the number of lists and N is the total number of nodes
 * Space Complexity: O(log(k)) due to recursion stack
 */
function* mergeKListsGenerator(lists) {
  yield { step: 'initial', listsCount: lists.length };
  
  if (!lists || lists.length === 0) {
    yield { step: 'empty_input', result: null };
    return null;
  }
  
  // Helper function to merge two sorted lists
  const mergeTwoLists = (l1, l2) => {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }
    
    // Attach remaining nodes
    current.next = l1 || l2;
    
    return dummy.next;
  };
  
  // Helper function to recursively merge lists
  const mergeLists = function* (lists, start, end) {
    yield { step: 'merge_range', start, end };
    
    if (start === end) {
      yield { step: 'single_list', index: start, value: lists[start]?.val };
      return lists[start];
    }
    if (start > end) {
      yield { step: 'invalid_range', result: null };
      return null;
    }
    
    const mid = Math.floor((start + end) / 2);
    yield { step: 'divide', mid };
    
    const leftGen = mergeLists(lists, start, mid);
    let leftResult;
    for (let result = leftGen.next(); !result.done; result = leftGen.next()) {
      yield { step: 'left_merge', ...result.value };
      if (result.done) leftResult = result.value;
    }
    
    const rightGen = mergeLists(lists, mid + 1, end);
    let rightResult;
    for (let result = rightGen.next(); !result.done; result = rightGen.next()) {
      yield { step: 'right_merge', ...result.value };
      if (result.done) rightResult = result.value;
    }
    
    const merged = mergeTwoLists(leftResult, rightResult);
    yield { step: 'merged', left: leftResult?.val, right: rightResult?.val, result: merged?.val };
    
    return merged;
  };
  
  const generator = mergeLists(lists, 0, lists.length - 1);
  let result;
  do {
    result = generator.next();
    if (!result.done) {
      yield result.value;
    }
  } while (!result.done);
  
  yield { step: 'final_result', result: result.value?.val };
  return result.value;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Merge k Sorted Lists ===');
  
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
    [[1,4,5],[1,3,4],[2,6]],
    [],
    [[]],
    [[1],[0]]
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: [${testCase.map(list => `[${list.join(', ')}]`).join(', ')}]`);
    
    // Create lists for each approach
    const lists1 = testCase.map(arr => createLinkedList(arr));
    const result1 = mergeKListsSequential(lists1);
    console.log(`Sequential approach: [${linkedListToArray(result1).join(', ')}]`);
    
    const lists2 = testCase.map(arr => createLinkedList(arr));
    const result2 = mergeKListsDivideConquer(lists2);
    console.log(`Divide & Conquer approach: [${linkedListToArray(result2).join(', ')}]`);
    
    const lists3 = testCase.map(arr => createLinkedList(arr));
    const result3 = mergeKListsHeap(lists3);
    console.log(`Heap approach: [${linkedListToArray(result3).join(', ')}]`);
    
    const lists4 = testCase.map(arr => createLinkedList(arr));
    const result4 = mergeKListsFunctional(lists4);
    console.log(`Functional approach: [${linkedListToArray(result4).join(', ')}]`);
    
    const lists5 = testCase.map(arr => createLinkedList(arr));
    const result5 = mergeKListsPriorityMap(lists5);
    console.log(`Priority Map approach: [${linkedListToArray(result5).join(', ')}]`);
    
    // Generator approach
    console.log('Generator approach:');
    const lists6 = testCase.map(arr => createLinkedList(arr));
    const generator = mergeKListsGenerator(lists6);
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
  const performanceTest = (func, lists, name) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      // Create copies of lists for each test
      const copies = lists.map(list => createLinkedList(linkedListToArray(list)));
      func(copies);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const testLists = [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6],
      [0, 7, 8],
      [3, 5, 9]
    ].map(arr => createLinkedList(arr));
    
    performanceTest(mergeKListsSequential, testLists, 'Sequential approach');
    performanceTest(mergeKListsDivideConquer, testLists, 'Divide & Conquer approach');
    performanceTest(mergeKListsHeap, testLists, 'Heap approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mergeKListsSequential,
    mergeKListsDivideConquer,
    mergeKListsHeap,
    mergeKListsFunctional,
    mergeKListsPriorityMap,
    mergeKListsGenerator
  };
}
