/**
 * Merge k Sorted Lists
 * 
 * Problem: You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. 
 * Merge all the linked-lists into one sorted linked-list and return it.
 * 
 * Approach 1: Brute Force - Collect and Sort
 * Time Complexity: O(N log N) where N is the total number of nodes
 * Space Complexity: O(N)
 */
function mergeKListsBruteForce(lists) {
    // Collect all values into an array
    const nodes = [];
    
    // Flatten all lists into a single array
    for (const list of lists) {
        let current = list;
        while (current) {
            nodes.push(current.val);
            current = current.next;
        }
    }
    
    // Sort the array
    nodes.sort((a, b) => a - b);
    
    // Create a new linked list
    const dummyHead = new ListNode(0);
    let current = dummyHead;
    
    // Build the result linked list
    for (const val of nodes) {
        current.next = new ListNode(val);
        current = current.next;
    }
    
    return dummyHead.next;
}

/**
 * Approach 2: Compare One by One with Priority Queue (Min-Heap)
 * Time Complexity: O(N log k) where k is the number of linked lists
 * Space Complexity: O(k) for the priority queue
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(node) {
        this.heap.push(node);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        const min = this.heap[0];
        const end = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        
        return min;
    }
    
    bubbleUp(index) {
        const element = this.heap[index];
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            
            if (element.val >= parent.val) break;
            
            // Swap
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }
    
    sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        
        while (true) {
            let leftChildIdx = 2 * index + 1;
            let rightChildIdx = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
            
            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild.val < element.val) {
                    swap = leftChildIdx;
                }
            }
            
            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (
                    (swap === null && rightChild.val < element.val) || 
                    (swap !== null && rightChild.val < leftChild.val)
                ) {
                    swap = rightChildIdx;
                }
            }
            
            if (swap === null) break;
            
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
    
    size() {
        return this.heap.length;
    }
}

function mergeKListsHeap(lists) {
    const minHeap = new MinHeap();
    
    // Push the head of each list into the min-heap
    for (const list of lists) {
        if (list) {
            minHeap.push(list);
        }
    }
    
    const dummyHead = new ListNode(0);
    let current = dummyHead;
    
    // While there are elements in the heap
    while (minHeap.size() > 0) {
        const node = minHeap.pop();
        current.next = node;
        current = current.next;
        
        if (node.next) {
            minHeap.push(node.next);
        }
    }
    
    return dummyHead.next;
}

/**
 * Approach 3: Merge lists one by one
 * Time Complexity: O(kN) where k is the number of linked lists
 * Space Complexity: O(1)
 */
function mergeTwoLists(l1, l2) {
    const dummyHead = new ListNode(0);
    let current = dummyHead;
    
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
    
    current.next = l1 || l2;
    return dummyHead.next;
}

function mergeKListsMergeOneByOne(lists) {
    if (lists.length === 0) return null;
    
    let result = lists[0];
    
    for (let i = 1; i < lists.length; i++) {
        result = mergeTwoLists(result, lists[i]);
    }
    
    return result || null;
}

/**
 * Approach 4: Divide and Conquer (Merge Sort Style)
 * Time Complexity: O(N log k) where k is the number of linked lists
 * Space Complexity: O(1)
 */
function mergeKListsDivideConquer(lists) {
    if (lists.length === 0) return null;
    
    let interval = 1;
    
    while (interval < lists.length) {
        for (let i = 0; i + interval < lists.length; i += interval * 2) {
            lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
        }
        interval *= 2;
    }
    
    return lists[0] || null;
}

// Helper function to create linked lists for testing
function arrayToLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    
    const dummyHead = new ListNode(0);
    let current = dummyHead;
    
    for (const val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    
    return dummyHead.next;
}

// Helper function to convert linked list to array for testing
function linkedListToArray(head) {
    const result = [];
    let current = head;
    
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

// Test cases
function runTests() {
    // Test case 1
    const list1 = arrayToLinkedList([1, 4, 5]);
    const list2 = arrayToLinkedList([1, 3, 4]);
    const list3 = arrayToLinkedList([2, 6]);
    const expected1 = [1, 1, 2, 3, 4, 4, 5, 6];
    
    // Test case 2
    const list4 = null;
    const expected2 = [];
    
    // Test case 3
    const list5 = arrayToLinkedList([]);
    const expected3 = [];
    
    // Test case 4
    const list6 = arrayToLinkedList([1, 2, 3]);
    const list7 = arrayToLinkedList([4, 5, 6]);
    const expected4 = [1, 2, 3, 4, 5, 6];
    
    const testCases = [
        { 
            input: [list1, list2, list3], 
            expected: expected1,
            name: 'Multiple non-empty lists'
        },
        { 
            input: [], 
            expected: expected2,
            name: 'Empty list of lists'
        },
        { 
            input: [list4], 
            expected: expected2,
            name: 'Single null list'
        },
        { 
            input: [list5], 
            expected: expected3,
            name: 'Single empty list'
        },
        { 
            input: [list6, list7], 
            expected: expected4,
            name: 'Two non-overlapping lists'
        }
    ];
    
    const functions = [
        { name: 'Brute Force', fn: mergeKListsBruteForce },
        { name: 'Min-Heap', fn: mergeKListsHeap },
        { name: 'Merge One by One', fn: mergeKListsMergeOneByOne },
        { name: 'Divide and Conquer', fn: mergeKListsDivideConquer }
    ];
    
    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            // Create deep copies of the input lists for each test
            const inputCopies = test.input.map(list => {
                if (!list) return null;
                return arrayToLinkedList(linkedListToArray(list));
            });
            
            const result = fn(inputCopies);
            const resultArray = linkedListToArray(result);
            const passed = JSON.stringify(resultArray) === JSON.stringify(test.expected);
            
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1} (${test.name}): ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Expected: [${test.expected}]`);
                console.log(`    Got: [${resultArray}]`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// ListNode class for linked list implementation
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Run the tests
console.log('=== Merge k Sorted Lists ===');
runTests();

// Export functions for use in other modules
module.exports = {
    mergeKListsBruteForce,
    mergeKListsHeap,
    mergeKListsMergeOneByOne,
    mergeKListsDivideConquer,
    ListNode
};
