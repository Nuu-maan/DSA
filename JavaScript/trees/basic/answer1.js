/**
 * Binary Tree Inorder Traversal - Multiple Approaches
 * 
 * Problem: Given the root of a binary tree, return the inorder traversal of its nodes' values.
 * 
 * Example:
 * Input: [1,null,2,3]
 * Output: [1,3,2]
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
 * Approach 1: Recursive Inorder Traversal
 * Time Complexity: O(n) - We visit each node exactly once
 * Space Complexity: O(n) - The worst case is O(n) for the call stack (skewed tree)
 */
const inorderTraversalRecursive = (root) => {
    const result = [];
    
    const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    };
    
    inorder(root);
    return result;
};

/**
 * Approach 2: Iterative Inorder Traversal using Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n) - In the worst case, the stack may contain all nodes
 */
const inorderTraversalIterative = (root) => {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current || stack.length) {
        // Traverse to the leftmost node
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        // Process the current node
        current = stack.pop();
        result.push(current.val);
        
        // Move to the right subtree
        current = current.right;
    }
    
    return result;
};

/**
 * Approach 3: Morris Traversal (Threaded Binary Tree)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - No extra space used (except for the result)
 */
const inorderTraversalMorris = (root) => {
    const result = [];
    let current = root;
    
    while (current) {
        if (!current.left) {
            // If no left child, visit the current node and move right
            result.push(current.val);
            current = current.right;
        } else {
            // Find the inorder predecessor (rightmost node in left subtree)
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                // Create a temporary link to current node
                predecessor.right = current;
                current = current.left;
            } else {
                // Remove the temporary link and process current node
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }
    
    return result;
};

/**
 * Approach 4: Iterative with Visited Flag
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const inorderTraversalIterativeVisited = (root) => {
    const result = [];
    const stack = [];
    
    if (root) stack.push({ node: root, visited: false });
    
    while (stack.length) {
        const { node, visited } = stack.pop();
        
        if (visited) {
            result.push(node.val);
        } else {
            // Push right, node (visited), left to process in reverse order
            if (node.right) stack.push({ node: node.right, visited: false });
            stack.push({ node, visited: true });
            if (node.left) stack.push({ node: node.left, visited: false });
        }
    }
    
    return result;
};

/**
 * Approach 5: Generator Function
 * Time Complexity: O(n)
 * Space Complexity: O(h) - Where h is the height of the tree
 */
function* inorderGenerator(node) {
    if (!node) return;
    yield* inorderGenerator(node.left);
    yield node.val;
    yield* inorderGenerator(node.right);
}

const inorderTraversalGenerator = (root) => {
    return [...inorderGenerator(root)];
};

// Test cases
const testCases = [
    {
        input: new TreeNode(1, null, new TreeNode(2, new TreeNode(3))),
        expected: [1, 3, 2]
    },
    {
        input: null,
        expected: []
    },
    {
        input: new TreeNode(1),
        expected: [1]
    },
    {
        input: new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3)),
        expected: [4, 2, 5, 1, 3]
    },
    {
        input: new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3))),
        expected: [1, 2, 3]
    }
];

// Helper function to run tests
const runTests = () => {
    const functions = [
        { name: 'Recursive', fn: inorderTraversalRecursive },
        { name: 'Iterative (Stack)', fn: inorderTraversalIterative },
        { name: 'Morris Traversal', fn: inorderTraversalMorris },
        { name: 'Iterative (Visited Flag)', fn: inorderTraversalIterativeVisited },
        { name: 'Generator Function', fn: inorderTraversalGenerator }
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
        { name: 'Recursive', fn: inorderTraversalRecursive },
        { name: 'Iterative (Stack)', fn: inorderTraversalIterative },
        { name: 'Morris Traversal', fn: inorderTraversalMorris },
        { name: 'Iterative (Visited Flag)', fn: inorderTraversalIterativeVisited },
        { name: 'Generator Function', fn: inorderTraversalGenerator }
    ];
    
    functions.forEach(({ name, fn }) => {
        const start = performance.now();
        fn(largeTree);
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Binary Tree Inorder Traversal ===');
runTests();
measurePerformance();
