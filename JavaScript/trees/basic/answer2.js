/**
 * Binary Tree Level Order Traversal - Multiple Approaches
 * 
 * Problem: Given the root of a binary tree, return the level order traversal of its nodes' values.
 * 
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
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
 * Approach 1: Breadth-First Search (BFS) using Queue
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const levelOrderBFS = (root) => {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
};

/**
 * Approach 2: Depth-First Search (DFS) with Level Tracking
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 */
const levelOrderDFS = (root) => {
    const result = [];
    
    const dfs = (node, level) => {
        if (!node) return;
        
        if (!result[level]) result[level] = [];
        result[level].push(node.val);
        
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    };
    
    dfs(root, 0);
    return result;
};

/**
 * Approach 3: BFS with Null Markers
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const levelOrderNullMarkers = (root) => {
    if (!root) return [];
    
    const result = [];
    const queue = [root, null];
    let currentLevel = [];
    
    while (queue.length) {
        const node = queue.shift();
        
        if (node === null) {
            result.push([...currentLevel]);
            currentLevel = [];
            if (queue.length) queue.push(null);
        } else {
            currentLevel.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
};

/**
 * Approach 4: BFS with Level Tracking (Optimized)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const levelOrderOptimized = (root) => {
    if (!root) return [];
    
    const result = [];
    let level = 0;
    let currentLevel = [root];
    
    while (currentLevel.length) {
        result[level] = [];
        const nextLevel = [];
        
        for (const node of currentLevel) {
            result[level].push(node.val);
            if (node.left) nextLevel.push(node.left);
            if (node.right) nextLevel.push(node.right);
        }
        
        currentLevel = nextLevel;
        level++;
    }
    
    return result;
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
        expected: [[3],[9,20],[15,7]]
    },
    {
        input: new TreeNode(1),
        expected: [[1]]
    },
    {
        input: null,
        expected: []
    },
    {
        input: new TreeNode(1, 
            new TreeNode(2, 
                new TreeNode(4)
            ), 
            new TreeNode(3, 
                null, 
                new TreeNode(5)
            )
        ),
        expected: [[1],[2,3],[4,5]]
    }
];

// Helper function to run tests
const runTests = () => {
    const functions = [
        { name: 'BFS with Queue', fn: levelOrderBFS },
        { name: 'DFS with Level Tracking', fn: levelOrderDFS },
        { name: 'BFS with Null Markers', fn: levelOrderNullMarkers },
        { name: 'Optimized BFS', fn: levelOrderOptimized }
    ];

    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name} Approach:`);
        let allPassed = true;
        
        testCases.forEach((test, index) => {
            const result = fn(test.input);
            const passed = JSON.stringify(result) === JSON.stringify(test.expected);
            if (!passed) allPassed = false;
            
            console.log(`  Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Expected: ${JSON.stringify(test.expected)}`);
                console.log(`    Got:      ${JSON.stringify(result)}`);
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
        { name: 'BFS with Queue', fn: levelOrderBFS },
        { name: 'DFS with Level Tracking', fn: levelOrderDFS },
        { name: 'BFS with Null Markers', fn: levelOrderNullMarkers },
        { name: 'Optimized BFS', fn: levelOrderOptimized }
    ];
    
    functions.forEach(({ name, fn }) => {
        const start = performance.now();
        fn(largeTree);
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Binary Tree Level Order Traversal ===');
runTests();
measurePerformance();
