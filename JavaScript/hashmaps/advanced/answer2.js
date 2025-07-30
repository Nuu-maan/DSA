// Implement LRU Cache
// Source: https://leetcode.com/problems/lru-cache/

/**
 * Doubly Linked List Node class for LRU Cache
 */
class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

/**
 * Approach 1: Using Map with Doubly Linked List
 * Time Complexity: O(1) for both get and put operations
 * Space Complexity: O(capacity) for storing at most capacity + 1 elements
 */
class LRUCacheDLL {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    
    // Create dummy head and tail nodes
    this.head = new ListNode(0, 0);
    this.tail = new ListNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  /**
   * Get value of the key if it exists, otherwise return -1
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      
      // Remove node from current position
      this.removeNode(node);
      
      // Add node to the front (most recently used)
      this.addToFront(node);
      
      return node.value;
    }
    return -1;
  }
  
  /**
   * Update the value of the key if it exists, otherwise add the key-value pair
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.map.has(key)) {
      // Update existing node
      const node = this.map.get(key);
      node.value = value;
      
      // Move to front (most recently used)
      this.removeNode(node);
      this.addToFront(node);
    } else {
      // Add new node
      if (this.map.size === this.capacity) {
        // Remove least recently used node (before tail)
        const lruNode = this.tail.prev;
        this.map.delete(lruNode.key);
        this.removeNode(lruNode);
      }
      
      // Add new node to front
      const newNode = new ListNode(key, value);
      this.map.set(key, newNode);
      this.addToFront(newNode);
    }
  }
  
  /**
   * Remove a node from the doubly linked list
   * @param {ListNode} node
   * @return {void}
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  /**
   * Add a node to the front of the doubly linked list
   * @param {ListNode} node
   * @return {void}
   */
  addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
}

/**
 * Approach 2: Using JavaScript Map with built-in ordering
 * Time Complexity: O(1) for both get and put operations
 * Space Complexity: O(capacity) for storing at most capacity elements
 */
class LRUCacheMap {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  
  /**
   * Get value of the key if it exists, otherwise return -1
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (this.map.has(key)) {
      const value = this.map.get(key);
      
      // Refresh the key by deleting and re-adding
      this.map.delete(key);
      this.map.set(key, value);
      
      return value;
    }
    return -1;
  }
  
  /**
   * Update the value of the key if it exists, otherwise add the key-value pair
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.map.has(key)) {
      // Remove existing key to refresh its position
      this.map.delete(key);
    } else if (this.map.size === this.capacity) {
      // Remove least recently used item (first item in map)
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
    
    // Add/update the key-value pair
    this.map.set(key, value);
  }
}

/**
 * Approach 3: Using Array with timestamp tracking
 * Time Complexity: O(n) for both get and put operations
 * Space Complexity: O(capacity) for storing at most capacity elements
 */
class LRUCacheArray {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = [];
  }
  
  /**
   * Get value of the key if it exists, otherwise return -1
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const index = this.cache.findIndex(item => item.key === key);
    
    if (index !== -1) {
      const item = this.cache[index];
      
      // Remove item and add it to the end (most recently used)
      this.cache.splice(index, 1);
      this.cache.push(item);
      
      return item.value;
    }
    return -1;
  }
  
  /**
   * Update the value of the key if it exists, otherwise add the key-value pair
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    const index = this.cache.findIndex(item => item.key === key);
    
    if (index !== -1) {
      // Update existing item
      this.cache.splice(index, 1);
      this.cache.push({ key, value });
    } else {
      // Add new item
      if (this.cache.length === this.capacity) {
        // Remove least recently used item (first item)
        this.cache.shift();
      }
      this.cache.push({ key, value });
    }
  }
}

/**
 * Approach 4: Using Object with usage tracking
 * Time Complexity: O(n) for both get and put operations
 * Space Complexity: O(capacity) for storing at most capacity elements
 */
class LRUCacheObject {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
    this.usage = [];
  }
  
  /**
   * Get value of the key if it exists, otherwise return -1
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (this.cache[key] !== undefined) {
      // Update usage order
      const index = this.usage.indexOf(key);
      this.usage.splice(index, 1);
      this.usage.push(key);
      
      return this.cache[key];
    }
    return -1;
  }
  
  /**
   * Update the value of the key if it exists, otherwise add the key-value pair
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.cache[key] !== undefined) {
      // Update existing key
      this.cache[key] = value;
      const index = this.usage.indexOf(key);
      this.usage.splice(index, 1);
      this.usage.push(key);
    } else {
      // Add new key
      if (this.usage.length === this.capacity) {
        // Remove least recently used key
        const lruKey = this.usage.shift();
        delete this.cache[lruKey];
      }
      this.cache[key] = value;
      this.usage.push(key);
    }
  }
}

/**
 * Approach 5: Using WeakMap with custom tracking
 * Time Complexity: O(n) for both get and put operations
 * Space Complexity: O(capacity) for storing at most capacity elements
 */
class LRUCacheWeakMap {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.usage = [];
  }
  
  /**
   * Get value of the key if it exists, otherwise return -1
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (this.map.has(key)) {
      // Update usage order
      const index = this.usage.indexOf(key);
      this.usage.splice(index, 1);
      this.usage.push(key);
      
      return this.map.get(key);
    }
    return -1;
  }
  
  /**
   * Update the value of the key if it exists, otherwise add the key-value pair
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.map.has(key)) {
      // Update existing key
      this.map.set(key, value);
      const index = this.usage.indexOf(key);
      this.usage.splice(index, 1);
      this.usage.push(key);
    } else {
      // Add new key
      if (this.usage.length === this.capacity) {
        // Remove least recently used key
        const lruKey = this.usage.shift();
        this.map.delete(lruKey);
      }
      this.map.set(key, value);
      this.usage.push(key);
    }
  }
}

/**
 * Approach 6: Generator-based approach for step-by-step visualization
 * Time Complexity: O(1) for both get and put operations
 * Space Complexity: O(capacity) for storing at most capacity elements
 */
class LRUCacheGenerator {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new ListNode(0, 0);
    this.tail = new ListNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  /**
   * Generator function for get operation visualization
   * @param {number} key
   * @return {Generator}
   */
  *getGenerator(key) {
    yield { step: 'initial', operation: 'get', key };
    
    if (this.map.has(key)) {
      const node = this.map.get(key);
      yield { step: 'found', key, value: node.value };
      
      // Remove node from current position
      this.removeNode(node);
      yield { step: 'removed_from_position', key };
      
      // Add node to the front (most recently used)
      this.addToFront(node);
      yield { step: 'added_to_front', key, value: node.value };
      
      return node.value;
    }
    
    yield { step: 'not_found', key };
    return -1;
  }
  
  /**
   * Generator function for put operation visualization
   * @param {number} key
   * @param {number} value
   * @return {Generator}
   */
  *putGenerator(key, value) {
    yield { step: 'initial', operation: 'put', key, value };
    
    if (this.map.has(key)) {
      // Update existing node
      const node = this.map.get(key);
      node.value = value;
      yield { step: 'update_existing', key, value };
      
      // Move to front (most recently used)
      this.removeNode(node);
      yield { step: 'removed_from_position', key };
      this.addToFront(node);
      yield { step: 'added_to_front', key, value };
    } else {
      yield { step: 'add_new', key, value };
      
      if (this.map.size === this.capacity) {
        // Remove least recently used node (before tail)
        const lruNode = this.tail.prev;
        this.map.delete(lruNode.key);
        this.removeNode(lruNode);
        yield { step: 'evict_lru', key: lruNode.key, value: lruNode.value };
      }
      
      // Add new node to front
      const newNode = new ListNode(key, value);
      this.map.set(key, newNode);
      this.addToFront(newNode);
      yield { step: 'added_new', key, value };
    }
    
    return undefined;
  }
  
  /**
   * Remove a node from the doubly linked list
   * @param {ListNode} node
   * @return {void}
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  /**
   * Add a node to the front of the doubly linked list
   * @param {ListNode} node
   * @return {void}
   */
  addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Implement LRU Cache ===');
  
  // Test cases
  const testCases = [
    [
      ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
      [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
    ]
  ];
  
  // Test all approaches
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    
    // Test DLL approach
    console.log('\nDLL Approach:');
    let lruCache1 = new LRUCacheDLL(2);
    for (let i = 1; i < testCase[0].length; i++) {
      const operation = testCase[0][i];
      const args = testCase[1][i];
      
      if (operation === "put") {
        lruCache1.put(args[0], args[1]);
        console.log(`put(${args[0]}, ${args[1]})`);
      } else if (operation === "get") {
        const result = lruCache1.get(args[0]);
        console.log(`get(${args[0]}) = ${result}`);
      }
    }
    
    // Test Map approach
    console.log('\nMap Approach:');
    let lruCache2 = new LRUCacheMap(2);
    for (let i = 1; i < testCase[0].length; i++) {
      const operation = testCase[0][i];
      const args = testCase[1][i];
      
      if (operation === "put") {
        lruCache2.put(args[0], args[1]);
        console.log(`put(${args[0]}, ${args[1]})`);
      } else if (operation === "get") {
        const result = lruCache2.get(args[0]);
        console.log(`get(${args[0]}) = ${result}`);
      }
    }
    
    // Test Array approach
    console.log('\nArray Approach:');
    let lruCache3 = new LRUCacheArray(2);
    for (let i = 1; i < testCase[0].length; i++) {
      const operation = testCase[0][i];
      const args = testCase[1][i];
      
      if (operation === "put") {
        lruCache3.put(args[0], args[1]);
        console.log(`put(${args[0]}, ${args[1]})`);
      } else if (operation === "get") {
        const result = lruCache3.get(args[0]);
        console.log(`get(${args[0]}) = ${result}`);
      }
    }
    
    // Generator approach
    console.log('\nGenerator Approach:');
    let lruCache4 = new LRUCacheGenerator(2);
    for (let i = 1; i < testCase[0].length; i++) {
      const operation = testCase[0][i];
      const args = testCase[1][i];
      
      if (operation === "put") {
        console.log(`put(${args[0]}, ${args[1]}):`);
        const generator = lruCache4.putGenerator(args[0], args[1]);
        let result;
        do {
          result = generator.next();
          if (!result.done) {
            console.log(`  ${JSON.stringify(result.value)}`);
          }
        } while (!result.done);
      } else if (operation === "get") {
        console.log(`get(${args[0]}):`);
        const generator = lruCache4.getGenerator(args[0]);
        let result;
        do {
          result = generator.next();
          if (!result.done) {
            console.log(`  ${JSON.stringify(result.value)}`);
          }
        } while (!result.done);
        console.log(`  Result: ${result.value}`);
      }
    }
  });
  
  // Performance comparison utility
  const performanceTest = (CacheClass, operations, args, name) => {
    const start = performance.now();
    
    const cache = new CacheClass(100);
    for (let i = 0; i < 1000; i++) {
      for (let j = 1; j < operations.length; j++) {
        const operation = operations[j];
        const arg = args[j];
        
        if (operation === "put") {
          cache.put(arg[0], arg[1]);
        } else if (operation === "get") {
          cache.get(arg[0]);
        }
      }
    }
    
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const operations = ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"];
    const args = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];
    
    performanceTest(LRUCacheDLL, operations, args, 'DLL Approach');
    performanceTest(LRUCacheMap, operations, args, 'Map Approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LRUCacheDLL,
    LRUCacheMap,
    LRUCacheArray,
    LRUCacheObject,
    LRUCacheWeakMap,
    LRUCacheGenerator
  };
}
