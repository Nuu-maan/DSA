/**
 * Count of Range Sum
 * 
 * Problem: Given an integer array nums and two integers lower and upper, 
 * return the number of range sums that lie in [lower, upper] inclusive.
 * 
 * Approach 1: Merge Sort with Prefix Sum
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function countRangeSumMergeSort(nums, lower, upper) {
    // Calculate prefix sums
    const prefixSums = [0];
    for (const num of nums) {
        prefixSums.push(prefixSums[prefixSums.length - 1] + num);
    }
    
    // Helper function to perform merge sort and count valid ranges
    function mergeSortCount(start, end) {
        if (start === end) return 0;
        
        const mid = Math.floor((start + end) / 2);
        let count = mergeSortCount(start, mid) + mergeSortCount(mid + 1, end);
        
        // Count valid ranges that cross the left and right halves
        let i = start, j = mid + 1, k = mid + 1;
        
        // For each element in the left half, find valid ranges in the right half
        for (; i <= mid; i++) {
            while (j <= end && prefixSums[j] - prefixSums[i] < lower) j++;
            while (k <= end && prefixSums[k] - prefixSums[i] <= upper) k++;
            count += k - j;
        }
        
        // Merge the two sorted halves
        const sorted = [];
        let left = start, right = mid + 1;
        
        while (left <= mid && right <= end) {
            if (prefixSums[left] <= prefixSums[right]) {
                sorted.push(prefixSums[left++]);
            } else {
                sorted.push(prefixSums[right++]);
            }
        }
        
        while (left <= mid) sorted.push(prefixSums[left++]);
        while (right <= end) sorted.push(prefixSums[right++]);
        
        // Copy the sorted array back to prefixSums
        for (let i = 0; i < sorted.length; i++) {
            prefixSums[start + i] = sorted[i];
        }
        
        return count;
    }
    
    return mergeSortCount(0, prefixSums.length - 1);
}

/**
 * Approach 2: Binary Indexed Tree (Fenwick Tree)
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
class FenwickTree {
    constructor(size) {
        this.size = size;
        this.tree = new Array(size + 1).fill(0);
    }
    
    update(index, delta) {
        while (index <= this.size) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }
    
    query(index) {
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
        return sum;
    }
}

function countRangeSumBIT(nums, lower, upper) {
    // Calculate prefix sums
    const prefixSums = [0];
    for (const num of nums) {
        prefixSums.push(prefixSums[prefixSums.length - 1] + num);
    }
    
    // Coordinate compression
    const sortedSums = [...new Set([...prefixSums, ...prefixSums.map(s => s - upper), ...prefixSums.map(s => s - lower)])]
        .sort((a, b) => a - b);
    
    const rank = new Map();
    let r = 1; // 1-based indexing
    for (const sum of sortedSums) {
        if (!rank.has(sum)) {
            rank.set(sum, r++);
        }
    }
    
    // Initialize Fenwick Tree
    const fenwick = new FenwickTree(rank.size);
    let count = 0;
    
    // Process prefix sums in order
    for (const sum of prefixSums) {
        // Find the number of prefix sums in [sum - upper, sum - lower]
        const left = rank.get(sum - upper);
        const right = rank.get(sum - lower + 1) - 1;
        
        if (right >= 1) {
            count += fenwick.query(right);
            if (left > 1) {
                count -= fenwick.query(left - 1);
            }
        }
        
        // Update Fenwick Tree with current prefix sum
        fenwick.update(rank.get(sum), 1);
    }
    
    return count;
}

/**
 * Approach 3: Segment Tree
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
class SegmentTreeNode {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.left = null;
        this.right = null;
        this.count = 0;
    }
}

class SegmentTree {
    constructor(min, max) {
        this.root = this.build(min, max);
    }
    
    build(start, end) {
        const node = new SegmentTreeNode(start, end);
        if (start === end) return node;
        
        const mid = Math.floor((start + end) / 2);
        node.left = this.build(start, mid);
        node.right = this.build(mid + 1, end);
        
        return node;
    }
    
    update(node, index) {
        if (node.start === node.end) {
            node.count++;
            return;
        }
        
        const mid = Math.floor((node.start + node.end) / 2);
        if (index <= mid) {
            this.update(node.left, index);
        } else {
            this.update(node.right, index);
        }
        
        node.count = (node.left?.count || 0) + (node.right?.count || 0);
    }
    
    query(node, start, end) {
        if (!node || node.start > end || node.end < start) return 0;
        if (start <= node.start && node.end <= end) return node.count;
        
        return this.query(node.left, start, end) + this.query(node.right, start, end);
    }
}

function countRangeSumSegmentTree(nums, lower, upper) {
    // Calculate prefix sums
    const prefixSums = [0];
    for (const num of nums) {
        prefixSums.push(prefixSums[prefixSums.length - 1] + num);
    }
    
    // Coordinate compression
    const allNums = new Set();
    for (const sum of prefixSums) {
        allNums.add(sum);
        allNums.add(sum - lower);
        allNums.add(sum - upper);
    }
    
    const sorted = [...allNums].sort((a, b) => a - b);
    const rank = new Map();
    let r = 0;
    for (const num of sorted) {
        rank.set(num, r++);
    }
    
    // Initialize Segment Tree
    const min = 0;
    const max = sorted.length - 1;
    const st = new SegmentTree(min, max);
    
    let count = 0;
    
    // Process prefix sums in reverse order
    for (let i = 0; i < prefixSums.length; i++) {
        const sum = prefixSums[i];
        const left = rank.get(sum - upper);
        const right = rank.get(sum - lower);
        
        count += st.query(st.root, left, right);
        
        // Update Segment Tree with current prefix sum
        st.update(st.root, rank.get(sum));
    }
    
    return count;
}

// Test cases
function runTests() {
    const testCases = [
        {
            nums: [-2, 5, -1],
            lower: -2,
            upper: 2,
            expected: 3,
            name: 'Example 1'
        },
        {
            nums: [0],
            lower: 0,
            upper: 0,
            expected: 1,
            name: 'Single element array'
        },
        {
            nums: [1, 2, 3, 4],
            lower: 3,
            upper: 6,
            expected: 6,
            name: 'All positive numbers'
        },
        {
            nums: [-1, -2, -3, -4],
            lower: -6,
            upper: -3,
            expected: 5,
            name: 'All negative numbers'
        },
        {
            nums: [0, 0, 0, 0, 0, 0],
            lower: 0,
            upper: 0,
            expected: 21, // n*(n+1)/2 where n=6
            name: 'All zeros'
        },
        {
            nums: [1, 3, 5, 7],
            lower: 4,
            upper: 4,
            expected: 0,
            name: 'No valid range'
        }
    ];
    
    const functions = [
        { name: 'Merge Sort', fn: countRangeSumMergeSort },
        { name: 'Binary Indexed Tree', fn: countRangeSumBIT },
        { name: 'Segment Tree', fn: countRangeSumSegmentTree }
    ];
    
    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = fn([...test.nums], test.lower, test.upper);
            const passed = result === test.expected;
            
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1} (${test.name}): ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Expected: ${test.expected}`);
                console.log(`    Got: ${result}`);
                console.log(`    Input: nums=${JSON.stringify(test.nums)}, lower=${test.lower}, upper=${test.upper}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Count of Range Sum ===');
runTests();

// Export functions for use in other modules
module.exports = {
    countRangeSumMergeSort,
    countRangeSumBIT,
    countRangeSumSegmentTree
};
