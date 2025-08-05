/**
 * Find the Kth Smallest Sum of a Matrix With Sorted Rows
 * 
 * Problem: You are given an m x n matrix mat that has been sorted in non-decreasing order, 
 * and an integer k. You need to find the kth smallest array among all possible arrays built 
 * from elements of each row in the matrix where rows are sorted in ascending order.
 * 
 * Approach 1: Min-Heap (Priority Queue) with BFS
 * Time Complexity: O(k * m * log(k * m))
 * Space Complexity: O(k * m)
 */
function kthSmallestSumMinHeap(mat, k) {
    const m = mat.length;
    const n = mat[0].length;
    
    // Min-heap to store [sum, indices...]
    const minHeap = new MinHeap();
    const seen = new Set();
    
    // Initialize with the first element (sum of first elements of each row)
    const initialIndices = new Array(m).fill(0);
    const initialSum = mat.reduce((sum, row, i) => sum + row[0], 0);
    
    minHeap.push([initialSum, ...initialIndices]);
    seen.add(initialIndices.join(','));
    
    let count = 0;
    
    while (minHeap.size() > 0) {
        const [currentSum, ...indices] = minHeap.pop();
        count++;
        
        if (count === k) {
            return currentSum;
        }
        
        // Generate next possible states by incrementing each index one by one
        for (let i = 0; i < m; i++) {
            if (indices[i] + 1 >= n) continue;
            
            const newIndices = [...indices];
            newIndices[i]++;
            const key = newIndices.join(',');
            
            if (!seen.has(key)) {
                const newSum = currentSum - mat[i][indices[i]] + mat[i][newIndices[i]];
                minHeap.push([newSum, ...newIndices]);
                seen.add(key);
            }
        }
    }
    
    return -1; // Should not reach here if k is valid
}

/**
 * Approach 2: Binary Search on Possible Sums
 * Time Complexity: O(m * n * log(maxSum - minSum) * log k)
 * Space Complexity: O(m)
 */
function kthSmallestSumBinarySearch(mat, k) {
    const m = mat.length;
    const n = mat[0].length;
    
    // Find the range of possible sums
    let left = 0;
    let right = 0;
    
    // Min possible sum (first element of each row)
    for (let i = 0; i < m; i++) {
        left += mat[i][0];
    }
    
    // Max possible sum (last element of each row)
    for (let i = 0; i < m; i++) {
        right += mat[i][n - 1];
    }
    
    // Binary search on possible sums
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const count = countArraysWithSumLessOrEqual(mat, 0, mid, 0, k);
        
        if (count < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

function countArraysWithSumLessOrEqual(mat, row, targetSum, currentSum, k) {
    if (row === mat.length) {
        return 1;
    }
    
    let count = 0;
    
    // Try all possible elements in the current row
    for (let i = 0; i < mat[row].length; i++) {
        const newSum = currentSum + mat[row][i];
        
        // Early termination if the sum exceeds the target
        if (newSum > target) {
            break;
        }
        
        // Early termination if we've already found k elements
        const remainingCount = countArraysWithSumLessOrEqual(mat, row + 1, target, newSum, k - count);
        count += remainingCount;
        
        if (count > k) {
            break; // No need to count further
        }
    }
    
    return count;
}

/**
 * Approach 3: Priority Queue with Optimizations
 * Optimized version of the min-heap approach with better pruning
 */
function kthSmallestSumOptimized(mat, k) {
    const m = mat.length;
    const n = mat[0].length;
    
    // Max-heap to keep track of the k smallest sums
    const maxHeap = new MaxHeap();
    
    // Initialize with the smallest sum (first element of each row)
    let initialSum = 0;
    for (let i = 0; i < m; i++) {
        initialSum += mat[i][0];
    }
    
    // Use a priority queue to explore sums in order
    const minHeap = new MinHeap();
    minHeap.push([initialSum, ...new Array(m).fill(0)]);
    
    // Use a set to avoid processing the same state multiple times
    const seen = new Set();
    seen.add(new Array(m).fill(0).join(','));
    
    while (minHeap.size() > 0) {
        const [currentSum, ...indices] = minHeap.pop();
        
        // Add to max heap (keep only k elements)
        maxHeap.push(currentSum);
        if (maxHeap.size() > k) {
            maxHeap.pop();
        }
        
        // If we've processed k elements and the current sum is larger than the kth smallest
        if (maxHeap.size() === k && currentSum > maxHeap.peek()) {
            break;
        }
        
        // Generate next possible states
        for (let i = 0; i < m; i++) {
            if (indices[i] + 1 >= n) continue;
            
            const newIndices = [...indices];
            newIndices[i]++;
            const key = newIndices.join(',');
            
            if (!seen.has(key)) {
                const newSum = currentSum - mat[i][indices[i]] + mat[i][newIndices[i]];
                minHeap.push([newSum, ...newIndices]);
                seen.add(key);
            }
        }
    }
    
    return maxHeap.peek();
}

// MinHeap implementation for the first approach
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
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
            
            if (this.compare(element, parent) >= 0) break;
            
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
                if (this.compare(leftChild, element) < 0) {
                    swap = leftChildIdx;
                }
            }
            
            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (
                    (swap === null && this.compare(rightChild, element) < 0) || 
                    (swap !== null && this.compare(rightChild, leftChild) < 0)
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
    
    compare(a, b) {
        // Compare based on the sum (first element of the array)
        return a[0] - b[0];
    }
    
    size() {
        return this.heap.length;
    }
    
    peek() {
        return this.heap[0];
    }
}

// MaxHeap implementation for the optimized approach
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        const max = this.heap[0];
        const end = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        
        return max;
    }
    
    bubbleUp(index) {
        const element = this.heap[index];
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            
            if (element <= parent) break;
            
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
                if (leftChild > element) {
                    swap = leftChildIdx;
                }
            }
            
            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (
                    (swap === null && rightChild > element) || 
                    (swap !== null && rightChild > leftChild)
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
    
    peek() {
        return this.heap[0];
    }
}

// Test cases
function runTests() {
    const testCases = [
        {
            mat: [[1,3,11],[2,4,6]],
            k: 5,
            expected: 7,
            name: 'Example 1'
        },
        {
            mat: [[1,3,11],[2,4,6]],
            k: 9,
            expected: 17,
            name: 'Example 2'
        },
        {
            mat: [[1,10,10],[1,4,5],[2,3,6]],
            k: 7,
            expected: 9,
            name: 'Example 3'
        },
        {
            mat: [[1,1,10],[2,2,9]],
            k: 7,
            expected: 12,
            name: 'Custom Test 1'
        }
    ];
    
    const functions = [
        { name: 'Min-Heap', fn: kthSmallestSumMinHeap },
        { name: 'Binary Search', fn: kthSmallestSumBinarySearch },
        { name: 'Optimized', fn: kthSmallestSumOptimized }
    ];
    
    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = fn(JSON.parse(JSON.stringify(test.mat)), test.k);
            const passed = result === test.expected;
            
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1} (${test.name}): ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Expected: ${test.expected}`);
                console.log(`    Got: ${result}`);
                console.log(`    Matrix: ${JSON.stringify(test.mat)}, k: ${test.k}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Kth Smallest Sum of a Matrix With Sorted Rows ===');
runTests();

// Export functions for use in other modules
module.exports = {
    kthSmallestSumMinHeap,
    kthSmallestSumBinarySearch,
    kthSmallestSumOptimized
};
