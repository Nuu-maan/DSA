// Merge k Sorted Lists with Custom Comparator

// Node class definition
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Approach 1: Sequential merge using merge two lists with custom comparator
 * Time Complexity: O(k*N) where k is the number of lists and N is the total number of nodes
 * Space Complexity: O(1)
 */
const mergeKListsWithComparatorSequential = (lists, comparator) => {
  if (!lists || lists.length === 0) return null;
  
  // Helper function to merge two sorted lists with custom comparator
  const mergeTwoLists = (l1, l2, comparator) => {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
      if (comparator(l1, l2) <= 0) {
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
    result = mergeTwoLists(result, lists[i], comparator);
  }
  
  return result;
};

/**
 * Approach 2: Divide and conquer (merge sort approach) with custom comparator
 * Time Complexity: O(N*log(k)) where k is the number of lists and N is the total number of nodes
 * Space Complexity: O(log(k)) due to recursion stack
 */
const mergeKListsWithComparatorDivideConquer = (lists, comparator) => {
  if (!lists || lists.length === 0) return null;
  
  // Helper function to merge two sorted lists with custom comparator
  const mergeTwoLists = (l1, l2, comparator) => {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
      if (comparator(l1, l2) <= 0) {
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
  const mergeLists = (lists, start, end, comparator) => {
    if (start === end) return lists[start];
    if (start > end) return null;
    
    const mid = Math.floor((start + end) / 2);
    const left = mergeLists(lists, start, mid, comparator);
    const right = mergeLists(lists, mid + 1, end, comparator);
    
    return mergeTwoLists(left, right, comparator);
  };
  
  return mergeLists(lists, 0, lists.length - 1, comparator);
};

/**
 * Approach 3: Min-heap approach with custom comparator
 * Time Complexity: O(N*log(k)) where k is the number of lists and N is the total number of nodes
 * Space Complexity: O(k) for the heap
 */
const mergeKListsWithComparatorHeap = (lists, comparator) => {
  if (!lists || lists.length === 0) return null;
  
  // Min-heap implementation with custom comparator
  class MinHeap {
    constructor(comparator) {
      this.heap = [];
      this.comparator = comparator;
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
        if (this.comparator(this.heap[parentIndex], this.heap[index]) <= 0) break;
        
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
            this.comparator(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0) {
          smallestIndex = leftChildIndex;
        }
        
        if (rightChildIndex <= lastIndex && 
            this.comparator(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0) {
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
  
  const heap = new MinHeap(comparator);
  
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
 * Approach 4: Functional approach using array methods with custom comparator
 * Time Complexity: O(N*log(N)) where N is the total number of nodes
 * Space Complexity: O(N) for storing all nodes
 */
const mergeKListsWithComparatorFunctional = (lists, comparator) => {
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
    .sort(comparator);  // Sort by custom comparator
  
  // Connect all nodes
  if (allNodes.length === 0) return null;
  
  for (let i = 0; i < allNodes.length - 1; i++) {
    allNodes[i].next = allNodes[i + 1];
  }
  allNodes[allNodes.length - 1].next = null;
  
  return allNodes[0];
};

/**
 * Approach 5: Priority queue using Map with custom comparator
 * Time Complexity: O(N*log(k)) where k is the number of lists and N is the total number of nodes
 * Space Complexity: O(k) for the map
 */
const mergeKListsWithComparatorPriorityMap = (lists, comparator) => {
  if (!lists || lists.length === 0) return null;
  
  // Use a map to simulate priority queue
  const priorityMap = new Map();
  
  // Add all head nodes to the map
  for (const list of lists) {
    if (list) {
      // For simplicity, we'll use the node value as key
      // In a real implementation, we might need a more sophisticated approach
      const key = JSON.stringify(list.val);
      if (!priorityMap.has(key)) {
        priorityMap.set(key, []);
      }
      priorityMap.get(key).push(list);
    }
  }
  
  const dummy = new ListNode(0);
  let current = dummy;
  
  // Process nodes in sorted order according to comparator
  while (priorityMap.size > 0) {
    // Find minimum key according to comparator
    let minKey = null;
    let minNode = null;
    
    for (const [key, nodeList] of priorityMap.entries()) {
      const node = nodeList[0];
      if (minNode === null || comparator(node, minNode) < 0) {
        minKey = key;
        minNode = node;
      }
    }
    
    // Get the node with minimum value
    const nodeList = priorityMap.get(minKey);
    const node = nodeList.shift();
    
    // Remove the key if no more nodes with that value
    if (nodeList.length === 0) {
      priorityMap.delete(minKey);
    }
    
    // Add next node from the same list if exists
    if (node.next) {
      const nextKey = JSON.stringify(node.next.val);
      if (!priorityMap.has(nextKey)) {
        priorityMap.set(nextKey, []);
      }
      priorityMap.get(nextKey).push(node.next);
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
function* mergeKListsWithComparatorGenerator(lists, comparator) {
  yield { step: 'initial', listsCount: lists.length };
  
  if (!lists || lists.length === 0) {
    yield { step: 'empty_input', result: null };
    return null;
  }
  
  // Helper function to merge two sorted lists with custom comparator
  const mergeTwoLists = (l1, l2, comparator) => {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
      if (comparator(l1, l2) <= 0) {
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
  const mergeLists = function* (lists, start, end, comparator) {
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
    
    const leftGen = mergeLists(lists, start, mid, comparator);
    let leftResult;
    for (let result = leftGen.next(); !result.done; result = leftGen.next()) {
      yield { step: 'left_merge', ...result.value };
      if (result.done) leftResult = result.value;
    }
    
    const rightGen = mergeLists(lists, mid + 1, end, comparator);
    let rightResult;
    for (let result = rightGen.next(); !result.done; result = rightGen.next()) {
      yield { step: 'right_merge', ...result.value };
      if (result.done) rightResult = result.value;
    }
    
    const merged = mergeTwoLists(leftResult, rightResult, comparator);
    yield { step: 'merged', left: leftResult?.val, right: rightResult?.val, result: merged?.val };
    
    return merged;
  };
  
  const generator = mergeLists(lists, 0, lists.length - 1, comparator);
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
  console.log('=== Testing Merge k Sorted Lists with Custom Comparator ===');
  
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
    {
      lists: [[1,4,5],[1,3,4],[2,6]],
      comparator: (a, b) => a.val - b.val,
      description: 'Numeric ascending order'
    },
    {
      lists: [["apple","cherry"],["banana","date"]],
      comparator: (a, b) => a.val.localeCompare(b.val),
      description: 'String alphabetical order'
    },
    {
      lists: [[5,4,1],[4,3,1],[6,2]],
      comparator: (a, b) => b.val - a.val,
      description: 'Numeric descending order'
    }
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: ${testCase.description}`);
    console.log(`Lists: [${testCase.lists.map(list => `[${list.join(', ')}]`).join(', ')}]`);
    
    // Create lists for each approach
    const lists1 = testCase.lists.map(arr => createLinkedList(arr));
    const result1 = mergeKListsWithComparatorSequential(lists1, testCase.comparator);
    console.log(`Sequential approach: [${linkedListToArray(result1).join(', ')}]`);
    
    const lists2 = testCase.lists.map(arr => createLinkedList(arr));
    const result2 = mergeKListsWithComparatorDivideConquer(lists2, testCase.comparator);
    console.log(`Divide & Conquer approach: [${linkedListToArray(result2).join(', ')}]`);
    
    const lists3 = testCase.lists.map(arr => createLinkedList(arr));
    const result3 = mergeKListsWithComparatorHeap(lists3, testCase.comparator);
    console.log(`Heap approach: [${linkedListToArray(result3).join(', ')}]`);
    
    const lists4 = testCase.lists.map(arr => createLinkedList(arr));
    const result4 = mergeKListsWithComparatorFunctional(lists4, testCase.comparator);
    console.log(`Functional approach: [${linkedListToArray(result4).join(', ')}]`);
    
    const lists5 = testCase.lists.map(arr => createLinkedList(arr));
    const result5 = mergeKListsWithComparatorPriorityMap(lists5, testCase.comparator);
    console.log(`Priority Map approach: [${linkedListToArray(result5).join(', ')}]`);
    
    // Generator approach
    console.log('Generator approach:');
    const lists6 = testCase.lists.map(arr => createLinkedList(arr));
    const generator = mergeKListsWithComparatorGenerator(lists6, testCase.comparator);
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
  const performanceTest = (func, lists, comparator, name) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      // Create copies of lists for each test
      const copies = lists.map(list => createLinkedList(linkedListToArray(list)));
      func(copies, comparator);
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
    
    const numericComparator = (a, b) => a.val - b.val;
    
    performanceTest(mergeKListsWithComparatorSequential, testLists, numericComparator, 'Sequential approach');
    performanceTest(mergeKListsWithComparatorDivideConquer, testLists, numericComparator, 'Divide & Conquer approach');
    performanceTest(mergeKListsWithComparatorHeap, testLists, numericComparator, 'Heap approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mergeKListsWithComparatorSequential,
    mergeKListsWithComparatorDivideConquer,
    mergeKListsWithComparatorHeap,
    mergeKListsWithComparatorFunctional,
    mergeKListsWithComparatorPriorityMap,
    mergeKListsWithComparatorGenerator
  };
}
