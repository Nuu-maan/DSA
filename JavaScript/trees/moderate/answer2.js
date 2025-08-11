/**
 * Binary Tree Right Side View - Multiple Approaches
 * 
 * Problem: Given the root of a binary tree, return the rightmost node of each level.
 * 
 * Example:
 * Input: [1,2,3,null,5,null,4]
 * Output: [1,3,4]
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
 * Approach 1: BFS Level Order Traversal (Right to Left)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const rightSideViewBFS = (root) => {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const levelSize = queue.length;
        
        // The first node in the queue is the rightmost node at this level
        result.push(queue[0].val);
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // Push right child first, then left
            if (node.right) queue.push(node.right);
            if (node.left) queue.push(node.left);
        }
    }
    
    return result;
};

/**
 * Approach 2: BFS Level Order Traversal (Left to Right)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const rightSideViewBFSLeftToRight = (root) => {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // If this is the last node in the current level
            if (i === levelSize - 1) {
                result.push(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
};

/**
 * Approach 3: DFS with Right-First Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 */
const rightSideViewDFS = (root) => {
    const result = [];
    
    const dfs = (node, level) => {
        if (!node) return;
        
        // The first time we reach this level, add the node's value
        if (level === result.length) {
            result.push(node.val);
        }
        
        // Traverse right first, then left
        dfs(node.right, level + 1);
        dfs(node.left, level + 1);
    };
    
    dfs(root, 0);
    return result;
};

/**
 * Approach 4: Iterative DFS with Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const rightSideViewIterativeDFS = (root) => {
    if (!root) return [];
    
    const result = [];
    const stack = [[root, 0]]; // [node, level]
    
    while (stack.length) {
        const [node, level] = stack.pop();
        
        // If this is the first node we've seen at this level
        if (level === result.length) {
            result.push(node.val);
        }
        
        // Push left first, then right (so right is processed first)
        if (node.left) stack.push([node.left, level + 1]);
        if (node.right) stack.push([node.right, level + 1]);
    }
    
    return result;
};

// Test cases
const testCases = [
    {
        input: new TreeNode(1,
            new TreeNode(2,
                null,
                new TreeNode(5)
            ),
            new TreeNode(3,
                null,
                new TreeNode(4)
            )
        ),
        expected: [1, 3, 4]
    },
    {
        input: new TreeNode(1,
            null,
            new TreeNode(3)
        ),
        expected: [1, 3]
    },
    {
        input: null,
        expected: []
    },
    {
        input: new TreeNode(1,
            new TreeNode(2)
        ),
        expected: [1, 2]
    },
    {
        input: new TreeNode(1,
            new TreeNode(2,
                new TreeNode(4)
            ),
            new TreeNode(3)
        ),
        expected: [1, 3, 4]
    },
    {
        input: new TreeNode(1,
            new TreeNode(2,
                new TreeNode(4,
                    new TreeNode(6)
                ),
                new TreeNode(5)
            ),
            new TreeNode(3)
        ),
        expected: [1, 3, 5, 6]
    }
];

// Helper function to run tests
const runTests = () => {
    const functions = [
        { name: 'BFS Right to Left', fn: rightSideViewBFS },
        { name: 'BFS Left to Right', fn: rightSideViewBFSLeftToRight },
        { name: 'DFS Right-First', fn: rightSideViewDFS },
        { name: 'Iterative DFS', fn: rightSideViewIterativeDFS }
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
                console.log(`    Expected: [${test.expected}]`);
                console.log(`    Got:      [${result}]`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
};

// Performance comparison
const measurePerformance = () => {
    // Create a large right-skewed tree for testing
    const createRightSkewedTree = (n) => {
        const root = new TreeNode(1);
        let current = root;
        for (let i = 2; i <= n; i++) {
            current.right = new TreeNode(i);
            current = current.right;
        }
        return root;
    };
    
    // Use a smaller tree for recursive DFS to avoid stack overflow
    const treeSize = 1000; // Reduced from 10,000 to 1,000
    const largeTree = createRightSkewedTree(treeSize);
    
    console.log(`\nPerformance Comparison (right-skewed tree with ${treeSize} nodes):`);
    
    const functions = [
        { name: 'BFS Right to Left', fn: rightSideViewBFS },
        { name: 'BFS Left to Right', fn: rightSideViewBFSLeftToRight },
        // Skip recursive DFS for large trees to avoid stack overflow
        // { name: 'DFS Right-First', fn: rightSideViewDFS },
        { name: 'Iterative DFS', fn: rightSideViewIterativeDFS }
    ];
    
    // Add a note about recursive DFS
    console.log('Note: Recursive DFS skipped for large trees to prevent stack overflow');
    
    functions.forEach(({ name, fn }) => {
        const start = performance.now();
        fn(largeTree);
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Binary Tree Right Side View ===');
runTests();
measurePerformance();
