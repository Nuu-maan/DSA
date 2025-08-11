/**
 * Validate Binary Search Tree - Multiple Approaches
 * 
 * Problem: Given the root of a binary tree, determine if it is a valid BST.
 * 
 * Example:
 * Input: [2,1,3]
 * Output: true
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
 * Approach 1: Recursive Traversal with Valid Range
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 */
const isValidBSTRecursive = (root, min = -Infinity, max = Infinity) => {
    if (!root) return true;
    
    if (root.val <= min || root.val >= max) {
        return false;
    }
    
    return isValidBSTRecursive(root.left, min, root.val) && 
           isValidBSTRecursive(root.right, root.val, max);
};

/**
 * Approach 2: Inorder Traversal with Array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const isValidBSTInorder = (root) => {
    const inorder = [];
    
    const traverse = (node) => {
        if (!node) return;
        traverse(node.left);
        inorder.push(node.val);
        traverse(node.right);
    };
    
    traverse(root);
    
    // Check if the array is strictly increasing
    for (let i = 1; i < inorder.length; i++) {
        if (inorder[i] <= inorder[i - 1]) {
            return false;
        }
    }
    
    return true;
};

/**
 * Approach 3: Iterative Inorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(h) - height of the tree
 */
const isValidBSTIterative = (root) => {
    const stack = [];
    let prev = null;
    let current = root;
    
    while (current || stack.length) {
        // Traverse to the leftmost node
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        
        // Check if current value is greater than previous
        if (prev !== null && current.val <= prev) {
            return false;
        }
        
        prev = current.val;
        current = current.right;
    }
    
    return true;
};

/**
 * Approach 4: Morris Inorder Traversal (Threaded Binary Tree)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - No extra space used
 */
const isValidBSTMorris = (root) => {
    let prev = null;
    let current = root;
    
    while (current) {
        if (!current.left) {
            // Process current node
            if (prev !== null && current.val <= prev) {
                return false;
            }
            prev = current.val;
            current = current.right;
        } else {
            // Find inorder predecessor
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                // Create temporary link
                predecessor.right = current;
                current = current.left;
            } else {
                // Remove temporary link
                predecessor.right = null;
                // Process current node
                if (prev !== null && current.val <= prev) {
                    return false;
                }
                prev = current.val;
                current = current.right;
            }
        }
    }
    
    return true;
};

// Test cases
const testCases = [
    {
        input: new TreeNode(2, 
            new TreeNode(1), 
            new TreeNode(3)
        ),
        expected: true
    },
    {
        input: new TreeNode(5,
            new TreeNode(1),
            new TreeNode(4,
                new TreeNode(3),
                new TreeNode(6)
            )
        ),
        expected: false
    },
    {
        input: new TreeNode(5,
            new TreeNode(4),
            new TreeNode(6,
                new TreeNode(3),
                new TreeNode(7)
            )
        ),
        expected: false
    },
    {
        input: new TreeNode(2,
            new TreeNode(2),
            new TreeNode(2)
        ),
        expected: false
    },
    {
        input: new TreeNode(2147483647),
        expected: true
    },
    {
        input: new TreeNode(-2147483648, 
            null, 
            new TreeNode(2147483647)
        ),
        expected: true
    }
];

// Helper function to run tests
const runTests = () => {
    const functions = [
        { name: 'Recursive with Range', fn: isValidBSTRecursive },
        { name: 'Inorder with Array', fn: isValidBSTInorder },
        { name: 'Iterative Inorder', fn: isValidBSTIterative },
        { name: 'Morris Traversal', fn: isValidBSTMorris }
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
    // Create a large valid BST for testing
    const buildBST = (start, end) => {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new TreeNode(mid);
        node.left = buildBST(start, mid - 1);
        node.right = buildBST(mid + 1, end);
        return node;
    };
    
    const largeBST = buildBST(1, 10000); // ~10,000 nodes
    
    console.log('\nPerformance Comparison (large valid BST):');
    
    const functions = [
        { name: 'Recursive with Range', fn: isValidBSTRecursive },
        { name: 'Inorder with Array', fn: isValidBSTInorder },
        { name: 'Iterative Inorder', fn: isValidBSTIterative },
        { name: 'Morris Traversal', fn: isValidBSTMorris }
    ];
    
    functions.forEach(({ name, fn }) => {
        const start = performance.now();
        fn(largeBST);
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Validate Binary Search Tree ===');
runTests();
measurePerformance();
