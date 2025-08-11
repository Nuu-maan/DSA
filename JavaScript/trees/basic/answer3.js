/**
 * Maximum Depth of Binary Tree - Multiple Approaches
 * 
 * Problem: Given the root of a binary tree, return its maximum depth.
 * 
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: 3
 */

// Definition for a binary tree node
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Approach 1: Recursive DFS (Depth-First Search)
 * Time Complexity: O(n) - We visit each node exactly once
 * Space Complexity: O(h) where h is the height of the tree (call stack)
 */
const maxDepthRecursive = (root) => {
    if (!root) return 0;
    
    const leftDepth = maxDepthRecursive(root.left);
    const rightDepth = maxDepthRecursive(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
};

/**
 * Approach 2: Iterative DFS using Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const maxDepthIterativeDFS = (root) => {
    if (!root) return 0;
    
    const stack = [[root, 1]];
    let maxDepth = 0;
    
    while (stack.length) {
        const [node, depth] = stack.pop();
        maxDepth = Math.max(maxDepth, depth);
        
        if (node.right) stack.push([node.right, depth + 1]);
        if (node.left) stack.push([node.left, depth + 1]);
    }
    
    return maxDepth;
};

/**
 * Approach 3: BFS (Breadth-First Search) using Queue
 * Time Complexity: O(n)
 * Space Complexity: O(n) - In the worst case, the queue will contain all nodes in one level
 */
const maxDepthBFS = (root) => {
    if (!root) return 0;
    
    const queue = [root];
    let depth = 0;
    
    while (queue.length) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        depth++;
    }
    
    return depth;
};

/**
 * Approach 4: Tail Recursion Optimization
 * Time Complexity: O(n)
 * Space Complexity: O(n) in worst case (skewed tree), O(log n) on average
 */
const maxDepthTailRecursive = (root, depth = 0) => {
    if (!root) return depth;
    
    const leftDepth = maxDepthTailRecursive(root.left, depth + 1);
    const rightDepth = maxDepthTailRecursive(root.right, depth + 1);
    
    return Math.max(leftDepth, rightDepth);
};

/**
 * Approach 5: Level Order Traversal with Null Markers
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const maxDepthLevelOrder = (root) => {
    if (!root) return 0;
    
    const queue = [root, null];
    let depth = 0;
    
    while (queue.length) {
        const node = queue.shift();
        
        if (node === null) {
            depth++;
            if (queue.length) queue.push(null);
        } else {
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return depth;
};

// Test cases
const testCases = [
    {
        input: new TreeNode(3, 
            new TreeNode(9), 
            new TreeNode(20, 
                new TreeNode(15), 
                new TreeNode(7)
            )
        ),
        expected: 3
    },
    {
        input: new TreeNode(1, 
            null, 
            new TreeNode(2)
        ),
        expected: 2
    },
    {
        input: null,
        expected: 0
    },
    {
        input: new TreeNode(0),
        expected: 1
    },
    {
        input: new TreeNode(1,
            new TreeNode(2,
                new TreeNode(3,
                    new TreeNode(4)
                )
            )
        ),
        expected: 4
    }
];

// Helper function to run tests
const runTests = () => {
    const functions = [
        { name: 'Recursive DFS', fn: maxDepthRecursive },
        { name: 'Iterative DFS', fn: maxDepthIterativeDFS },
        { name: 'BFS', fn: maxDepthBFS },
        { name: 'Tail Recursive', fn: maxDepthTailRecursive },
        { name: 'Level Order', fn: maxDepthLevelOrder }
    ];

    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name} Approach:`);
        let allPassed = true;
        
        testCases.forEach((test, index) => {
            const result = fn(test.input);
            const passed = result === test.expected;
            if (!passed) allPassed = false;
            
            console.log(`  Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Expected: ${test.expected}`);
                console.log(`    Got:      ${result}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
};

// Performance comparison
const measurePerformance = () => {
    // Create a large balanced binary tree for testing
    const buildBalancedTree = (depth) => {
        if (depth < 0) return null;
        const node = new TreeNode(depth);
        node.left = buildBalancedTree(depth - 1);
        node.right = buildBalancedTree(depth - 1);
        return node;
    };
    
    const largeTree = buildBalancedTree(15); // ~65,535 nodes
    
    console.log('\nPerformance Comparison (large balanced tree):');
    
    const functions = [
        { name: 'Recursive DFS', fn: maxDepthRecursive },
        { name: 'Iterative DFS', fn: maxDepthIterativeDFS },
        { name: 'BFS', fn: maxDepthBFS },
        { name: 'Tail Recursive', fn: maxDepthTailRecursive },
        { name: 'Level Order', fn: maxDepthLevelOrder }
    ];
    
    functions.forEach(({ name, fn }) => {
        const start = performance.now();
        fn(largeTree);
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Maximum Depth of Binary Tree ===');
runTests();
measurePerformance();
