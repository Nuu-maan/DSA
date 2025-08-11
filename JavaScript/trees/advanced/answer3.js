/**
 * Recover Binary Search Tree - Multiple Approaches
 * 
 * Problem: You are given the root of a binary search tree (BST), where the values of 
 * exactly two nodes of the tree were swapped by mistake. Recover the tree without 
 * changing its structure.
 * 
 * Example:
 * Input: [1,3,null,null,2]
 * Output: [3,1,null,null,2]
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
 * Approach 1: Inorder Traversal with Array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const recoverTreeInorderArray = (root) => {
    const nodes = [];
    const values = [];
    
    // Perform inorder traversal to collect nodes and values
    const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        nodes.push(node);
        values.push(node.val);
        inorder(node.right);
    };
    
    inorder(root);
    
    // Find the two swapped values
    values.sort((a, b) => a - b);
    
    // Update node values
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].val = values[i];
    }
};

/**
 * Approach 2: Inorder Traversal with Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree (recursion stack)
 */
const recoverTreeTwoPointers = (root) => {
    let first = null;  // First misplaced node
    let second = null; // Second misplaced node
    let prev = new TreeNode(-Infinity); // Previous node in inorder traversal
    
    const inorder = (node) => {
        if (!node) return;
        
        inorder(node.left);
        
        // Found a misplaced node
        if (node.val < prev.val) {
            if (!first) {
                first = prev; // First misplaced node is the previous one
            }
            second = node; // Second misplaced node is the current one
        }
        prev = node;
        
        inorder(node.right);
    };
    
    inorder(root);
    
    // Swap the values of the two misplaced nodes
    if (first && second) {
        [first.val, second.val] = [second.val, first.val];
    }
};

/**
 * Approach 3: Morris Inorder Traversal (O(1) space)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const recoverTreeMorris = (root) => {
    let first = null;  // First misplaced node
    let second = null; // Second misplaced node
    let prev = null;   // Previous node in inorder traversal
    
    let current = root;
    
    while (current) {
        if (!current.left) {
            // Process current node
            if (prev && prev.val > current.val) {
                if (!first) first = prev;
                second = current;
            }
            prev = current;
            
            // Move to the right child
            current = current.right;
        } else {
            // Find the inorder predecessor
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                // Set right pointer to current (thread the tree)
                predecessor.right = current;
                current = current.left;
            } else {
                // Restore the tree structure
                predecessor.right = null;
                
                // Process current node
                if (prev && prev.val > current.val) {
                    if (!first) first = prev;
                    second = current;
                }
                prev = current;
                
                // Move to the right child
                current = current.right;
            }
        }
    }
    
    // Swap the values of the two misplaced nodes
    if (first && second) {
        [first.val, second.val] = [second.val, first.val];
    }
};

/**
 * Approach 4: Iterative Inorder Traversal with Stack
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 */
const recoverTreeIterative = (root) => {
    let first = null;
    let second = null;
    let prev = new TreeNode(-Infinity);
    
    const stack = [];
    let current = root;
    
    while (stack.length || current) {
        // Go to the leftmost node
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        
        // Check for misplaced nodes
        if (current.val < prev.val) {
            if (!first) first = prev;
            second = current;
        }
        prev = current;
        
        // Move to the right child
        current = current.right;
    }
    
    // Swap the values of the two misplaced nodes
    if (first && second) {
        [first.val, second.val] = [second.val, first.val];
    }
};

// Helper function to create a binary tree from array representation
const createTree = (arr) => {
    if (arr.length === 0) return null;
    
    const nodes = arr.map(val => (val !== null ? new TreeNode(val) : null));
    
    for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i]) continue;
        
        const leftIndex = 2 * i + 1;
        const rightIndex = 2 * i + 2;
        
        if (leftIndex < nodes.length) nodes[i].left = nodes[leftIndex];
        if (rightIndex < nodes.length) nodes[i].right = nodes[rightIndex];
    }
    
    return nodes[0];
};

// Helper function to convert tree to array (level order)
const treeToArray = (root) => {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const node = queue.shift();
        
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }
    
    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }
    
    return result;
};

// Helper function to create a corrupted BST by swapping two nodes
const createCorruptedBST = (arr, val1, val2) => {
    const root = createTree([...arr]);
    let node1 = null;
    let node2 = null;
    
    // Find the nodes to swap
    const findNodes = (node) => {
        if (!node) return;
        if (node.val === val1) node1 = node;
        if (node.val === val2) node2 = node;
        findNodes(node.left);
        findNodes(node.right);
    };
    
    findNodes(root);
    
    // Swap the values
    if (node1 && node2) {
        [node1.val, node2.val] = [node2.val, node1.val];
    }
    
    return root;
};

// Test cases
const testCases = [
    {
        input: [1, 3, null, null, 2],
        swap: [1, 3],
        expected: [3, 1, null, null, 2]
    },
    {
        input: [3, 1, 4, null, null, 2],
        swap: [2, 3],
        expected: [2, 1, 4, null, null, 3]
    },
    {
        input: [2, 3, 1],
        swap: [1, 3],
        expected: [2, 1, 3]
    },
    {
        input: [10, 5, 15, 3, 8, 12, 20, 1, 4, 6, 9, 11, 13, 18, 25],
        swap: [5, 13],
        expected: [10, 13, 15, 3, 8, 12, 20, 1, 4, 6, 9, 11, 5, 18, 25]
    },
    {
        input: [5, 3, 8, 2, 4, 6, 10],
        swap: [2, 10],
        expected: [5, 3, 8, 10, 4, 6, 2]
    }
];

// Helper function to run tests
const runTests = () => {
    const functions = [
        { name: 'Inorder with Array', fn: recoverTreeInorderArray },
        { name: 'Two Pointers', fn: recoverTreeTwoPointers },
        { name: 'Morris Traversal', fn: recoverTreeMorris },
        { name: 'Iterative Inorder', fn: recoverTreeIterative }
    ];

    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name} Approach:`);
        let allPassed = true;
        
        testCases.forEach((test, index) => {
            // Create a corrupted BST by swapping two nodes
            const corruptedTree = createCorruptedBST(test.input, ...test.swap);
            
            // Make a deep copy of the corrupted tree for each test
            const treeCopy = JSON.parse(JSON.stringify(corruptedTree));
            
            // Recover the BST
            fn(treeCopy);
            
            // Convert the recovered tree to array for comparison
            const result = treeToArray(treeCopy);
            const expected = test.expected;
            
            // Check if the result matches the expected output
            const passed = JSON.stringify(result) === JSON.stringify(expected);
            if (!passed) allPassed = false;
            
            console.log(`  Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: [${test.input}] (swapped ${test.swap.join(' and ')})`);
                console.log(`    Expected: [${expected}]`);
                console.log(`    Got:      [${result}]`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
};

// Performance comparison
const measurePerformance = () => {
    // Create a large BST for testing
    const buildBST = (start, end) => {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new TreeNode(mid);
        node.left = buildBST(start, mid - 1);
        node.right = buildBST(mid + 1, end);
        return node;
    };
    
    // Create a large balanced BST (1023 nodes, height ~10)
    const largeTree = buildBST(1, 1023);
    
    // Corrupt the tree by swapping two nodes
    const swapNodes = (root, val1, val2) => {
        let node1 = null, node2 = null;
        
        const findNodes = (node) => {
            if (!node || (node1 && node2)) return;
            if (node.val === val1) node1 = node;
            if (node.val === val2) node2 = node;
            findNodes(node.left);
            findNodes(node.right);
        };
        
        findNodes(root);
        
        if (node1 && node2) {
            [node1.val, node2.val] = [node2.val, node1.val];
        }
        
        return root;
    };
    
    // Swap nodes with values 500 and 520
    const corruptedTree = swapNodes(JSON.parse(JSON.stringify(largeTree)), 500, 520);
    
    console.log('\nPerformance Comparison (large BST with 1023 nodes, two nodes swapped):');
    
    const functions = [
        { name: 'Inorder with Array', fn: recoverTreeInorderArray },
        { name: 'Two Pointers', fn: recoverTreeTwoPointers },
        { name: 'Morris Traversal', fn: recoverTreeMorris },
        { name: 'Iterative Inorder', fn: recoverTreeIterative }
    ];
    
    functions.forEach(({ name, fn }) => {
        // Create a fresh copy of the corrupted tree for each test
        const treeCopy = JSON.parse(JSON.stringify(corruptedTree));
        
        const start = performance.now();
        fn(treeCopy);
        const end = performance.now();
        
        console.log(`${name}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Recover Binary Search Tree ===');
runTests();
measurePerformance();
