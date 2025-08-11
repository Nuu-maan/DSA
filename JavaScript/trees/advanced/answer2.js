/**
 * Binary Tree Maximum Path Sum - Multiple Approaches
 * 
 * Problem: Find the maximum path sum in a binary tree where the path may start and end at any node.
 * 
 * Example:
 * Input: [-10,9,20,null,null,15,7]
 * Output: 42 (15 -> 20 -> 7)
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
 * Approach 1: Recursive DFS with Global Maximum
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree (recursion stack)
 */
const maxPathSumRecursive = (root) => {
    let maxSum = -Infinity;
    
    const maxGain = (node) => {
        if (!node) return 0;
        
        // Max sum on the left and right sub-trees of node
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        
        // The price to start a new path with this node as the root
        const priceNewPath = node.val + leftGain + rightGain;
        
        // Update the global maximum
        maxSum = Math.max(maxSum, priceNewPath);
        
        // Return the maximum contribution this node and its children can make
        return node.val + Math.max(leftGain, rightGain);
    };
    
    maxGain(root);
    return maxSum;
};

/**
 * Approach 2: Iterative Postorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const maxPathSumIterative = (root) => {
    if (!root) return 0;
    
    let maxSum = -Infinity;
    const stack = [];
    const maxGainMap = new Map();
    maxGainMap.set(null, 0); // Base case for null nodes
    
    let lastVisited = null;
    let node = root;
    
    while (stack.length || node) {
        // Go to the leftmost node
        while (node) {
            stack.push(node);
            node = node.left;
        }
        
        node = stack[stack.length - 1];
        
        // If right child exists and not processed yet, process it first
        if (node.right && lastVisited !== node.right) {
            node = node.right;
        } else {
            // Process the current node
            const leftGain = Math.max(maxGainMap.get(node.left) || 0, 0);
            const rightGain = Math.max(maxGainMap.get(node.right) || 0, 0);
            
            // Calculate the maximum path sum with this node as the root
            const currentMax = node.val + leftGain + rightGain;
            maxSum = Math.max(maxSum, currentMax);
            
            // Store the maximum gain from this node
            maxGainMap.set(node, node.val + Math.max(leftGain, rightGain));
            
            lastVisited = stack.pop();
            node = null; // Reset node to process the parent
        }
    }
    
    return maxSum;
};

/**
 * Approach 3: Morris Traversal (O(1) space, but modifies the tree)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const maxPathSumMorris = (root) => {
    let maxSum = -Infinity;
    
    const getNodeMaxGain = (node) => {
        if (!node) return 0;
        const left = Math.max(0, node._leftGain || 0);
        const right = Math.max(0, node._rightGain || 0);
        maxSum = Math.max(maxSum, node.val + left + right);
        return node.val + Math.max(left, right);
    };
    
    let current = root;
    
    while (current) {
        if (current.left) {
            // Find the inorder predecessor
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                // Set the right pointer to current (thread the tree)
                predecessor.right = current;
                // Store the max gain from the left subtree
                current._leftGain = getNodeMaxGain(current.left);
                // Move to the left child
                current = current.left;
            } else {
                // Restore the tree structure
                predecessor.right = null;
                // Store the max gain from the right subtree
                current._rightGain = getNodeMaxGain(current.right);
                // Calculate the max path sum for the current node
                getNodeMaxGain(current);
                // Move to the right child
                current = current.right;
            }
        } else {
            // No left child, process the current node
            current._rightGain = getNodeMaxGain(current.right);
            getNodeMaxGain(current);
            // Move to the right child
            current = current.right;
        }
    }
    
    // Clean up the temporary properties
    const cleanTree = (node) => {
        if (!node) return;
        delete node._leftGain;
        delete node._rightGain;
        cleanTree(node.left);
        cleanTree(node.right);
    };
    
    cleanTree(root);
    return maxSum;
};

/**
 * Approach 4: Kadane's Algorithm Adaptation for Binary Tree
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 */
const maxPathSumKadane = (root) => {
    let maxSum = -Infinity;
    
    const kadane = (node) => {
        if (!node) return 0;
        
        // Recursively get the maximum path sum from left and right subtrees
        const left = kadane(node.left);
        const right = kadane(node.right);
        
        // Calculate the maximum path sum that includes the current node
        const currentMax = Math.max(
            node.val,
            node.val + left,
            node.val + right
        );
        
        // Update the global maximum path sum
        maxSum = Math.max(
            maxSum,
            currentMax,
            node.val + left + right
        );
        
        return currentMax;
    };
    
    kadane(root);
    return maxSum;
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

// Test cases
const testCases = [
    {
        input: [1, 2, 3],
        expected: 6 // 2 -> 1 -> 3
    },
    {
        input: [-10, 9, 20, null, null, 15, 7],
        expected: 42 // 15 -> 20 -> 7
    },
    {
        input: [-3],
        expected: -3
    },
    {
        input: [1, -2, 3],
        expected: 4 // 3 -> 1
    },
    {
        input: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1],
        expected: 48 // 7 -> 11 -> 5 -> 8 -> 13 -> 4
    },
    {
        input: [9, 6, -3, null, null, -6, 2, null, null, 2, null, -6, -6, -6],
        expected: 16 // 2 -> -3 -> 2 -> 15 (sum of values in the path)
    }
];

// Helper function to run tests
const runTests = () => {
    const functions = [
        { name: 'Recursive DFS', fn: maxPathSumRecursive },
        { name: 'Iterative Postorder', fn: maxPathSumIterative },
        { name: 'Morris Traversal', fn: maxPathSumMorris },
        { name: "Kadane's Adaptation", fn: maxPathSumKadane }
    ];

    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name} Approach:`);
        let allPassed = true;
        
        testCases.forEach((test, index) => {
            const tree = createTree(test.input);
            const result = fn(tree);
            const passed = result === test.expected;
            if (!passed) allPassed = false;
            
            console.log(`  Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: [${test.input.join(',')}]`);
                console.log(`    Expected: ${test.expected}`);
                console.log(`    Got: ${result}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
};

// Performance comparison
const measurePerformance = () => {
    // Create a large tree for testing (complete binary tree with 10 levels)
    const buildLargeTree = (levels) => {
        const root = new TreeNode(1);
        const queue = [root];
        let value = 2;
        
        for (let i = 1; i < levels; i++) {
            const levelSize = queue.length;
            for (let j = 0; j < levelSize; j++) {
                const node = queue.shift();
                
                // Alternate between positive and negative values
                node.left = new TreeNode(value % 2 === 0 ? value : -value);
                value++;
                node.right = new TreeNode(value % 2 === 0 ? value : -value);
                value++;
                
                queue.push(node.left);
                queue.push(node.right);
            }
        }
        
        return root;
    };
    
    const largeTree = buildLargeTree(10); // ~1023 nodes
    
    console.log('\nPerformance Comparison (large tree with ~1023 nodes):');
    
    const functions = [
        { name: 'Recursive DFS', fn: maxPathSumRecursive },
        { name: 'Iterative Postorder', fn: maxPathSumIterative },
        { name: 'Morris Traversal', fn: maxPathSumMorris },
        { name: "Kadane's Adaptation", fn: maxPathSumKadane }
    ];
    
    // Create a deep copy of the tree for each test to ensure fairness
    const deepCopy = (node) => {
        if (!node) return null;
        const copy = new TreeNode(node.val);
        copy.left = deepCopy(node.left);
        copy.right = deepCopy(node.right);
        return copy;
    };
    
    functions.forEach(({ name, fn }) => {
        const treeCopy = deepCopy(largeTree);
        const start = performance.now();
        const result = fn(treeCopy);
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(4)}ms (result: ${result})`);
    });
};

// Run tests and performance comparison
console.log('=== Binary Tree Maximum Path Sum ===');
runTests();
measurePerformance();
