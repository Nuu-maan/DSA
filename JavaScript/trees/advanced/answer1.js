/**
 * Serialize and Deserialize Binary Tree - Multiple Approaches
 * 
 * Problem: Design an algorithm to serialize and deserialize a binary tree.
 * 
 * Example:
 * Input: [1,2,3,null,null,4,5]
 * Output: [1,2,3,null,null,4,5]
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
 * Approach 1: Preorder Traversal with Null Markers
 * Time Complexity: O(n) for both serialize and deserialize
 * Space Complexity: O(n) for both serialize and deserialize
 */
class CodecPreorder {
    constructor() {
        this.SEPARATOR = ',';
        this.NULL_MARKER = 'null';
    }
    
    /**
     * Encodes a tree to a single string.
     * @param {TreeNode} root
     * @return {string}
     */
    serialize(root) {
        const result = [];
        
        const preorder = (node) => {
            if (!node) {
                result.push(this.NULL_MARKER);
                return;
            }
            
            result.push(node.val.toString());
            preorder(node.left);
            preorder(node.right);
        };
        
        preorder(root);
        return result.join(this.SEPARATOR);
    }

    /**
     * Decodes your encoded data to tree.
     * @param {string} data
     * @return {TreeNode}
     */
    deserialize(data) {
        if (!data) return null;
        const nodes = data.split(this.SEPARATOR);
        let index = 0;
        
        const buildTree = () => {
            if (index >= nodes.length || nodes[index] === this.NULL_MARKER) {
                index++;
                return null;
            }
            
            const node = new TreeNode(parseInt(nodes[index++]));
            node.left = buildTree();
            node.right = buildTree();
            
            return node;
        };
        
        return buildTree();
    }
}

/**
 * Approach 2: Level Order Traversal
 * Time Complexity: O(n) for both serialize and deserialize
 * Space Complexity: O(n) for both serialize and deserialize
 */
class CodecLevelOrder {
    constructor() {
        this.SEPARATOR = ',';
        this.NULL_MARKER = 'null';
    }
    
    /**
     * Encodes a tree to a single string.
     * @param {TreeNode} root
     * @return {string}
     */
    serialize(root) {
        if (!root) return '';
        
        const queue = [root];
        const result = [];
        
        while (queue.length) {
            const node = queue.shift();
            
            if (node) {
                result.push(node.val.toString());
                queue.push(node.left);
                queue.push(node.right);
            } else {
                result.push(this.NULL_MARKER);
            }
        }
        
        return result.join(this.SEPARATOR);
    }

    /**
     * Decodes your encoded data to tree.
     * @param {string} data
     * @return {TreeNode}
     */
    deserialize(data) {
        if (!data) return null;
        
        const nodes = data.split(this.SEPARATOR);
        if (nodes[0] === this.NULL_MARKER) return null;
        
        const root = new TreeNode(parseInt(nodes[0]));
        const queue = [root];
        let index = 1;
        
        while (queue.length && index < nodes.length) {
            const node = queue.shift();
            
            // Process left child
            if (index < nodes.length && nodes[index] !== this.NULL_MARKER) {
                node.left = new TreeNode(parseInt(nodes[index]));
                queue.push(node.left);
            }
            index++;
            
            // Process right child
            if (index < nodes.length && nodes[index] !== this.NULL_MARKER) {
                node.right = new TreeNode(parseInt(nodes[index]));
                queue.push(node.right);
            }
            index++;
        }
        
        return root;
    }
}

/**
 * Approach 3: JSON Serialization (Simple but less efficient for large trees)
 * Time Complexity: O(n) for both serialize and deserialize
 * Space Complexity: O(n) for both serialize and deserialize
 */
class CodecJSON {
    /**
     * Encodes a tree to a single string.
     * @param {TreeNode} root
     * @return {string}
     */
    serialize(root) {
        const serializeNode = (node) => {
            if (!node) return null;
            return {
                v: node.val,
                l: serializeNode(node.left),
                r: serializeNode(node.right)
            };
        };
        
        return JSON.stringify(serializeNode(root));
    }

    /**
     * Decodes your encoded data to tree.
     * @param {string} data
     * @return {TreeNode}
     */
    deserialize(data) {
        const parsed = JSON.parse(data);
        if (!parsed) return null;
        
        const deserializeNode = (obj) => {
            if (!obj) return null;
            const node = new TreeNode(obj.v);
            node.left = deserializeNode(obj.l);
            node.right = deserializeNode(obj.r);
            return node;
        };
        
        return deserializeNode(parsed);
    }
}

/**
 * Approach 4: Binary Encoding (Space Efficient)
 * Time Complexity: O(n) for both serialize and deserialize
 * Space Complexity: O(n) but more space efficient than string approaches
 */
class CodecBinary {
    constructor() {
        this.NULL_MARKER = 0x7fffffff; // A large number unlikely to be a node value
    }
    
    /**
     * Encodes a tree to a Uint32Array.
     * @param {TreeNode} root
     * @return {Uint32Array}
     */
    serialize(root) {
        const result = [];
        
        const preorder = (node) => {
            if (!node) {
                result.push(this.NULL_MARKER);
                return;
            }
            
            // Store node value as is (assuming it fits in 32 bits)
            result.push(node.val);
            preorder(node.left);
            preorder(node.right);
        };
        
        preorder(root);
        return new Uint32Array(result);
    }

    /**
     * Decodes your encoded data to tree.
     * @param {Uint32Array} data
     * @return {TreeNode}
     */
    deserialize(data) {
        if (!data || data.length === 0) return null;
        let index = 0;
        
        const buildTree = () => {
            if (index >= data.length || data[index] === this.NULL_MARKER) {
                index++;
                return null;
            }
            
            const node = new TreeNode(data[index++]);
            node.left = buildTree();
            node.right = buildTree();
            
            return node;
        };
        
        return buildTree();
    }
    
    // Helper method to convert Uint32Array to base64 for string representation
    serializeToString(root) {
        const arr = this.serialize(root);
        return btoa(String.fromCharCode(...new Uint8Array(arr.buffer)));
    }
    
    // Helper method to convert base64 string back to Uint32Array
    deserializeFromString(str) {
        const binaryString = atob(str);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const data = new Uint32Array(bytes.buffer);
        return this.deserialize(data);
    }
}

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

// Test cases
const testCases = [
    [1, 2, 3, null, null, 4, 5],
    [],
    [1],
    [1, 2, null, 3, 4, 5, 6],
    [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
];

// Helper function to run tests
const runTests = () => {
    const codecs = [
        { name: 'Preorder with Null Markers', instance: new CodecPreorder() },
        { name: 'Level Order Traversal', instance: new CodecLevelOrder() },
        { name: 'JSON Serialization', instance: new CodecJSON() },
        { name: 'Binary Encoding', instance: new CodecBinary() }
    ];

    testCases.forEach((testCase, index) => {
        const tree = createTree(testCase);
        console.log(`\nTest Case ${index + 1}:`);
        console.log(`Input: [${testCase.join(',')}]`);
        
        codecs.forEach(({ name, instance }) => {
            let serialized, deserialized, result;
            let passed = false;
            
            try {
                if (instance instanceof CodecBinary) {
                    serialized = instance.serializeToString(tree);
                    deserialized = instance.deserializeFromString(serialized);
                } else {
                    serialized = instance.serialize(tree);
                    deserialized = instance.deserialize(serialized);
                }
                
                result = treeToArray(deserialized);
                passed = JSON.stringify(result) === JSON.stringify(testCase);
                
                console.log(`  ${name}: ${passed ? 'PASS' : 'FAIL'}`);
                if (!passed) {
                    console.log(`    Expected: [${testCase.join(',')}]`);
                    console.log(`    Got:      [${result.join(',')}]`);
                }
            } catch (error) {
                console.log(`  ${name}: ERROR - ${error.message}`);
            }
        });
    });
};

// Performance comparison
const measurePerformance = () => {
    // Create a large tree for testing (complete binary tree with 4 levels)
    const buildLargeTree = (levels) => {
        const root = new TreeNode(1);
        const queue = [root];
        let value = 2;
        
        for (let i = 1; i < levels; i++) {
            const levelSize = queue.length;
            for (let j = 0; j < levelSize; j++) {
                const node = queue.shift();
                
                node.left = new TreeNode(value++);
                node.right = new TreeNode(value++);
                
                queue.push(node.left);
                queue.push(node.right);
            }
        }
        
        return root;
    };
    
    const largeTree = buildLargeTree(12); // ~4095 nodes
    const codecs = [
        { name: 'Preorder with Null Markers', instance: new CodecPreorder() },
        { name: 'Level Order Traversal', instance: new CodecLevelOrder() },
        { name: 'JSON Serialization', instance: new CodecJSON() },
        { name: 'Binary Encoding', instance: new CodecBinary() }
    ];
    
    console.log('\nPerformance Comparison (large tree with ~4095 nodes):');
    
    // Serialization performance
    console.log('\nSerialization:');
    codecs.forEach(({ name, instance }) => {
        const start = performance.now();
        if (instance instanceof CodecBinary) {
            instance.serializeToString(largeTree);
        } else {
            instance.serialize(largeTree);
        }
        const end = performance.now();
        console.log(`  ${name}: ${(end - start).toFixed(4)}ms`);
    });
    
    // Deserialization performance
    console.log('\nDeserialization:');
    const serializedTrees = codecs.map(({ name, instance }) => {
        if (instance instanceof CodecBinary) {
            return {
                name,
                data: instance.serializeToString(largeTree),
                instance
            };
        }
        return {
            name,
            data: instance.serialize(largeTree),
            instance
        };
    });
    
    serializedTrees.forEach(({ name, data, instance }) => {
        const start = performance.now();
        if (instance instanceof CodecBinary) {
            instance.deserializeFromString(data);
        } else {
            instance.deserialize(data);
        }
        const end = performance.now();
        console.log(`  ${name}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Serialize and Deserialize Binary Tree ===');
runTests();
measurePerformance();
