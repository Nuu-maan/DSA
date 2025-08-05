/**
 * Create Sorted Array through Instructions
 * 
 * Problem: Given an array of instructions, create a sorted array and calculate the total cost of insertion.
 * The cost of each insertion is the minimum of:
 * 1. Number of elements < current instruction
 * 2. Number of elements > current instruction
 * 
 * Approach 1: Binary Search with Sorted Array
 * Time Complexity: O(n^2) - O(n) for each insertion in worst case
 * Space Complexity: O(n)
 */
function createSortedArrayNaive(instructions) {
    const MOD = 1e9 + 7;
    const nums = [];
    let totalCost = 0;
    
    for (const num of instructions) {
        // Find insertion position using binary search
        let left = 0;
        let right = nums.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        const insertPos = left;
        
        // Find the first position where element > num
        right = nums.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] <= num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        const firstGreater = left;
        
        // Calculate cost
        const cost = Math.min(insertPos, nums.length - firstGreater);
        totalCost = (totalCost + cost) % MOD;
        
        // Insert the number
        nums.splice(insertPos, 0, num);
    }
    
    return totalCost;
}

/**
 * Approach 2: Binary Indexed Tree (Fenwick Tree)
 * Time Complexity: O(n log M) where M is the maximum value in instructions
 * Space Complexity: O(M)
 */
class FenwickTree {
    constructor(size) {
        this.size = size;
        this.tree = new Array(size + 1).fill(0);
    }
    
    // Update the count at index
    update(index, delta = 1) {
        while (index <= this.size) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }
    
    // Query prefix sum [1..index]
    query(index) {
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
        return sum;
    }
    
    // Query range sum [left, right]
    rangeQuery(left, right) {
        if (left > right) return 0;
        return this.query(right) - this.query(left - 1);
    }
}

function createSortedArrayBIT(instructions) {
    const MOD = 1e9 + 7;
    const maxNum = Math.max(...instructions);
    const fenwick = new FenwickTree(maxNum);
    let totalCost = 0;
    
    for (let i = 0; i < instructions.length; i++) {
        const num = instructions[i];
        
        // Number of elements less than num
        const less = fenwick.query(num - 1);
        
        // Number of elements greater than num
        const greater = fenwick.rangeQuery(num + 1, maxNum);
        
        // Calculate cost and add to total
        const cost = Math.min(less, greater);
        totalCost = (totalCost + cost) % MOD;
        
        // Update Fenwick Tree
        fenwick.update(num);
    }
    
    return totalCost;
}

/**
 * Approach 3: Segment Tree
 * Time Complexity: O(n log M) where M is the maximum value in instructions
 * Space Complexity: O(M)
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
        this.min = min;
        this.max = max;
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
    
    updateValue(node, index) {
        if (node.start === node.end) {
            node.count++;
            return;
        }
        
        const mid = Math.floor((node.start + node.end) / 2);
        if (index <= mid) {
            this.updateValue(node.left, index);
        } else {
            this.updateValue(node.right, index);
        }
        
        node.count = (node.left?.count || 0) + (node.right?.count || 0);
    }
    
    rangeQuery(node, start, end) {
        if (!node || node.start > end || node.end < start) {
            return 0;
        }
        
        if (start <= node.start && node.end <= end) {
            return node.count;
        }
        
        return this.rangeQuery(node.left, start, end) + 
               this.rangeQuery(node.right, start, end);
    }
    
    update(index) {
        this.updateValue(this.root, index);
    }
    
    queryLessThan(num) {
        return this.rangeQuery(this.root, this.min, num - 1);
    }
    
    queryGreaterThan(num) {
        return this.rangeQuery(this.root, num + 1, this.max);
    }
}

function createSortedArraySegmentTree(instructions) {
    const MOD = 1e9 + 7;
    const maxNum = Math.max(...instructions);
    const segmentTree = new SegmentTree(1, maxNum);
    let totalCost = 0;
    
    for (const num of instructions) {
        const less = segmentTree.queryLessThan(num);
        const greater = segmentTree.queryGreaterThan(num);
        
        const cost = Math.min(less, greater);
        totalCost = (totalCost + cost) % MOD;
        
        segmentTree.update(num);
    }
    
    return totalCost;
}

// Test cases
function runTests() {
    const testCases = [
        {
            instructions: [1, 5, 6, 2],
            expected: 1,
            name: 'Example 1'
        },
        {
            instructions: [1, 2, 3, 6, 5, 4],
            expected: 3,
            name: 'Example 2'
        },
        {
            instructions: [1, 3, 3, 3, 2, 4, 2, 1, 2],
            expected: 4,
            name: 'Example 3'
        },
        {
            instructions: [1, 1, 1, 1, 1],
            expected: 0,
            name: 'All same elements'
        },
        {
            instructions: [1, 2, 3, 4, 5],
            expected: 0,
            name: 'Already sorted ascending'
        },
        {
            instructions: [5, 4, 3, 2, 1],
            expected: 6,
            name: 'Reverse sorted'
        },
        {
            instructions: [1, 100, 2, 99, 3, 98, 4, 97],
            expected: 6,
            name: 'Alternating high and low values'
        },
        {
            instructions: [1],
            expected: 0,
            name: 'Single element'
        }
    ];
    
    const functions = [
        { name: 'Naive with Sorted Array', fn: createSortedArrayNaive },
        { name: 'Binary Indexed Tree', fn: createSortedArrayBIT },
        { name: 'Segment Tree', fn: createSortedArraySegmentTree }
    ];
    
    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = fn([...test.instructions]);
            const passed = result === test.expected;
            
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1} (${test.name}): ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Expected: ${test.expected}`);
                console.log(`    Got: ${result}`);
                console.log(`    Input: ${JSON.stringify(test.instructions)}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Create Sorted Array through Instructions ===');
runTests();

// Export functions for use in other modules
module.exports = {
    createSortedArrayNaive,
    createSortedArrayBIT,
    createSortedArraySegmentTree
};
