/**
 * Lowest Common Ancestor of a Binary Tree - Multiple Approaches
 * 
 * Problem: Given a binary tree, find the lowest common ancestor (LCA) of two given nodes.
 * 
 * Example:
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
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
 * Approach 1: Recursive DFS
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 */
const lowestCommonAncestorRecursive = (root, p, q) => {
    // Base case: if root is null or matches either p or q
    if (!root || root === p || root === q) {
        return root;
    }
    
    // Search left and right subtrees
    const left = lowestCommonAncestorRecursive(root.left, p, q);
    const right = lowestCommonAncestorRecursive(root.right, p, q);
    
    // If both left and right are not null, root is the LCA
    if (left && right) {
        return root;
    }
    
    // Otherwise, return the non-null child
    return left || right;
};

/**
 * Approach 2: Iterative with Parent Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const lowestCommonAncestorParentPointers = (root, p, q) => {
    // Stack for tree traversal
    const stack = [root];
    
    // Map for parent pointers
    const parent = new Map();
    parent.set(root, null);
    
    // Iterate until we find both p and q
    while (!parent.has(p) || !parent.has(q)) {
        const node = stack.pop();
        
        // While traversing the tree, save parent pointers until we find both p and q
        if (node.left) {
            parent.set(node.left, node);
            stack.push(node.left);
        }
        if (node.right) {
            parent.set(node.right, node);
            stack.push(node.right);
        }
    }
    
    // Ancestors set for node p
    const ancestors = new Set();
    
    // Process all ancestors of p using parent pointers
    while (p !== null) {
        ancestors.add(p);
        p = parent.get(p);
    }
    
    // The first ancestor of q which appears in p's ancestor set is LCA
    while (!ancestors.has(q)) {
        q = parent.get(q);
    }
    
    return q;
};

/**
 * Approach 3: Iterative with Path Comparison
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const lowestCommonAncestorPathComparison = (root, p, q) => {
    // Helper function to find the path from root to target
    const findPath = (root, target) => {
        const stack = [];
        const visited = new Set();
        const parent = new Map();
        
        stack.push(root);
        parent.set(root, null);
        
        // Find the target node using DFS
        while (stack.length > 0) {
            const current = stack.pop();
            
            if (current === target) {
                break;
            }
            
            if (!visited.has(current)) {
                visited.add(current);
                
                // Push right first so left is processed first (LIFO)
                if (current.right) {
                    parent.set(current.right, current);
                    stack.push(current.right);
                }
                if (current.left) {
                    parent.set(current.left, current);
                    stack.push(current.left);
                }
            }
        }
        
        // Reconstruct the path
        const path = [];
        let node = target;
        while (node !== null) {
            path.unshift(node);
            node = parent.get(node);
        }
        
        return path;
    };
    
    const pathP = findPath(root, p);
    const pathQ = findPath(root, q);
    
    // Find the last common node in the two paths
    let lca = null;
    const minLength = Math.min(pathP.length, pathQ.length);
    
    for (let i = 0; i < minLength; i++) {
        if (pathP[i] === pathQ[i]) {
            lca = pathP[i];
        } else {
            break;
        }
    }
    
    return lca;
};

/**
 * Approach 4: Iterative Postorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const lowestCommonAncestorPostorder = (root, p, q) => {
    // Stack for postorder traversal
    const stack = [];
    // Map to track parent pointers and visited status
    const parent = new Map();
    parent.set(root, { parent: null, visited: false });
    stack.push(root);
    
    // Iterate until we find both p and q
    while (!parent.has(p) || !parent.has(q)) {
        const node = stack.pop();
        const nodeData = parent.get(node);
        
        if (!nodeData.visited) {
            // Mark as visited and push back to stack
            nodeData.visited = true;
            stack.push(node);
            
            // Process right child first for postorder
            if (node.right) {
                parent.set(node.right, { parent: node, visited: false });
                stack.push(node.right);
            }
            // Then left child
            if (node.left) {
                parent.set(node.left, { parent: node, visited: false });
                stack.push(node.left);
            }
        }
    }
    
    // Collect all ancestors of p
    const ancestors = new Set();
    while (p !== null) {
        ancestors.add(p);
        p = parent.get(p).parent;
    }
    
    // Find the first ancestor of q that is in p's ancestors
    while (!ancestors.has(q)) {
        q = parent.get(q).parent;
    }
    
    return q;
};

// Helper function to create a tree from array representation
const createTree = (arr, pVal, qVal) => {
    if (arr.length === 0) return { root: null, p: null, q: null };
    
    const nodes = arr.map(val => (val !== null ? new TreeNode(val) : null));
    let pNode = null;
    let qNode = null;
    
    for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i]) continue;
        
        const leftIndex = 2 * i + 1;
        const rightIndex = 2 * i + 2;
        
        if (leftIndex < nodes.length) nodes[i].left = nodes[leftIndex];
        if (rightIndex < nodes.length) nodes[i].right = nodes[rightIndex];
        
        if (nodes[i].val === pVal) pNode = nodes[i];
        if (nodes[i].val === qVal) qNode = nodes[i];
    }
    
    return { root: nodes[0], p: pNode, q: qNode };
};

// Test cases
const testCases = [
    {
        tree: [3,5,1,6,2,0,8,null,null,7,4],
        p: 5,
        q: 1,
        expected: 3
    },
    {
        tree: [3,5,1,6,2,0,8,null,null,7,4],
        p: 5,
        q: 4,
        expected: 5
    },
    {
        tree: [1,2],
        p: 1,
        q: 2,
        expected: 1
    },
    {
        tree: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        p: 10,
        q: 14,
        expected: 2
    },
    {
        tree: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        p: 8,
        q: 14,
        expected: 1
    },
    {
        tree: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        p: 3,
        q: 4,
        expected: 1
    }
];

// Helper function to run tests
const runTests = () => {
    const functions = [
        { name: 'Recursive DFS', fn: lowestCommonAncestorRecursive },
        { name: 'Parent Pointers', fn: lowestCommonAncestorParentPointers },
        { name: 'Path Comparison', fn: lowestCommonAncestorPathComparison },
        { name: 'Iterative Postorder', fn: lowestCommonAncestorPostorder }
    ];

    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name} Approach:`);
        let allPassed = true;
        
        testCases.forEach((test, index) => {
            const { root, p, q } = createTree(test.tree, test.p, test.q);
            const result = fn(root, p, q);
            const passed = result && result.val === test.expected;
            if (!passed) allPassed = false;
            
            console.log(`  Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Expected: ${test.expected}`);
                console.log(`    Got:      ${result ? result.val : 'null'}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
};

// Performance comparison
const measurePerformance = () => {
    // Create a large balanced binary tree
    const buildBalancedTree = (start, end) => {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new TreeNode(mid);
        node.left = buildBalancedTree(start, mid - 1);
        node.right = buildBalancedTree(mid + 1, end);
        return node;
    };
    
    // Create a tree with 2^16 - 1 nodes (32,767 nodes)
    const largeTree = buildBalancedTree(1, 32767);
    
    // Select two nodes far apart in the tree
    const p = findNode(largeTree, 1);  // Leftmost leaf
    const q = findNode(largeTree, 32767);  // Rightmost leaf
    
    console.log('\nPerformance Comparison (large balanced tree with 32,767 nodes):');
    
    const functions = [
        { name: 'Recursive DFS', fn: lowestCommonAncestorRecursive },
        { name: 'Parent Pointers', fn: lowestCommonAncestorParentPointers },
        { name: 'Path Comparison', fn: lowestCommonAncestorPathComparison },
        { name: 'Iterative Postorder', fn: lowestCommonAncestorPostorder }
    ];
    
    functions.forEach(({ name, fn }) => {
        const start = performance.now();
        const result = fn(largeTree, p, q);
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(4)}ms`);
    });
};

// Helper function to find a node with given value in the tree
const findNode = (root, val) => {
    if (!root) return null;
    if (root.val === val) return root;
    return findNode(root.left, val) || findNode(root.right, val);
};

// Run tests and performance comparison
console.log('=== Lowest Common Ancestor of a Binary Tree ===');
runTests();
measurePerformance();
