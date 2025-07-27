/**
 * Array Rotation
 * Source: https://www.geeksforgeeks.org/array-rotation/
 */

// Approach 1: Using slice() and concat() (immutable)
const rotateArraySlice = (nums, k) => {
    if (nums.length === 0) return nums;
    k = k % nums.length; // Handle k > array length
    
    return nums.slice(-k).concat(nums.slice(0, -k));
};

// Approach 2: Using spread operator (ES6+)
const rotateArraySpread = (nums, k) => {
    if (nums.length === 0) return nums;
    k = k % nums.length;
    
    return [...nums.slice(-k), ...nums.slice(0, -k)];
};

// Approach 3: Using Array.from() with mapping
const rotateArrayMap = (nums, k) => {
    if (nums.length === 0) return nums;
    k = k % nums.length;
    
    return Array.from(nums, (_, i) => nums[(i - k + nums.length) % nums.length]);
};

// Approach 4: In-place rotation using reverse technique
const rotateArrayInPlace = (nums, k) => {
    if (nums.length === 0) return nums;
    k = k % nums.length;
    
    // Helper function to reverse array segment
    const reverse = (arr, start, end) => {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]]; // ES6 destructuring swap
            start++;
            end--;
        }
    };
    
    const result = [...nums]; // Create copy to avoid mutation
    reverse(result, 0, result.length - 1);
    reverse(result, 0, k - 1);
    reverse(result, k, result.length - 1);
    
    return result;
};

// Approach 5: Using reduce() for functional approach
const rotateArrayReduce = (nums, k) => {
    if (nums.length === 0) return nums;
    k = k % nums.length;
    
    return nums.reduce((rotated, _, index) => {
        const newIndex = (index + k) % nums.length;
        rotated[newIndex] = nums[index];
        return rotated;
    }, new Array(nums.length));
};

// Approach 6: Using unshift() and pop() (demonstrates array methods)
const rotateArrayMethods = (nums, k) => {
    if (nums.length === 0) return nums;
    k = k % nums.length;
    
    const result = [...nums]; // Create copy
    for (let i = 0; i < k; i++) {
        result.unshift(result.pop());
    }
    return result;
};

// Approach 7: Cyclic replacement (advanced algorithm)
const rotateArrayCyclic = (nums, k) => {
    if (nums.length === 0) return nums;
    k = k % nums.length;
    
    const result = [...nums];
    let count = 0;
    
    for (let start = 0; count < result.length; start++) {
        let current = start;
        let prev = result[start];
        
        do {
            const next = (current + k) % result.length;
            [result[next], prev] = [prev, result[next]]; // ES6 destructuring
            current = next;
            count++;
        } while (start !== current);
    }
    
    return result;
};

// Advanced: Rotate with additional operations using method chaining
const rotateAndProcess = (nums, k, operations = {}) => {
    const { filter, map, sort } = operations;
    
    let result = rotateArraySpread(nums, k);
    
    if (filter) result = result.filter(filter);
    if (map) result = result.map(map);
    if (sort) result = result.sort(sort);
    
    return result;
};

// Using Set and Map for unique rotations
const getUniqueRotations = (nums) => {
    const rotations = new Set();
    
    for (let k = 0; k < nums.length; k++) {
        rotations.add(JSON.stringify(rotateArraySpread(nums, k)));
    }
    
    return Array.from(rotations).map(rotation => JSON.parse(rotation));
};

// Performance comparison utility
const performanceTest = (arr, k, iterations = 10000) => {
    const methods = [
        { name: 'slice + concat', fn: rotateArraySlice },
        { name: 'Spread operator', fn: rotateArraySpread },
        { name: 'Array.from + map', fn: rotateArrayMap },
        { name: 'In-place reverse', fn: rotateArrayInPlace },
        { name: 'reduce()', fn: rotateArrayReduce },
        { name: 'Array methods', fn: rotateArrayMethods }
    ];
    
    console.log(`Performance test with ${arr.length} elements, k=${k}, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn([...arr], k); // Fresh copy each iteration
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Array Rotation Examples ===\n');
    
    // Test cases
    const testCases = [
        { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 },
        { nums: [-1, -100, 3, 99], k: 2 },
        { nums: [1, 2], k: 3 },
        { nums: [1], k: 1 },
        { nums: [], k: 1 },
        { nums: [1, 2, 3, 4, 5], k: 0 },
        { nums: [1, 2, 3, 4, 5], k: 7 } // k > array length
    ];
    
    testCases.forEach(({ nums, k }, index) => {
        console.log(`Test Case ${index + 1}: [${nums.join(', ')}], k=${k}`);
        console.log(`slice + concat:    [${rotateArraySlice(nums, k).join(', ')}]`);
        console.log(`Spread operator:   [${rotateArraySpread(nums, k).join(', ')}]`);
        console.log(`Array.from + map:  [${rotateArrayMap(nums, k).join(', ')}]`);
        console.log(`In-place reverse:  [${rotateArrayInPlace(nums, k).join(', ')}]`);
        console.log(`reduce():          [${rotateArrayReduce(nums, k).join(', ')}]`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    const originalArray = [1, 2, 3, 4, 5, 6, 7];
    const k = 3;
    
    // Destructuring with array rotation
    const rotated = rotateArraySpread(originalArray, k);
    const [first, second, ...rest] = rotated;
    console.log('After rotation - First:', first, 'Second:', second, 'Rest:', rest);
    
    // Method chaining with rotation
    const processedRotation = rotateAndProcess(originalArray, k, {
        filter: x => x > 3,        // Keep numbers > 3
        map: x => x * 2,           // Double them
        sort: (a, b) => b - a      // Sort descending
    });
    console.log('Processed rotation (>3, *2, desc):', processedRotation);
    
    // Using Map for rotation tracking
    const rotationMap = new Map();
    for (let i = 0; i <= originalArray.length; i++) {
        rotationMap.set(i, rotateArraySpread(originalArray, i));
    }
    console.log('All rotations stored in Map:', rotationMap.size, 'entries');
    
    // Unique rotations using Set
    const uniqueRotations = getUniqueRotations([1, 2, 1, 2]);
    console.log('Unique rotations of [1,2,1,2]:', uniqueRotations.length);
    
    // Arrow functions with different rotation strategies
    const rotateLeft = (arr, k) => rotateArraySpread(arr, arr.length - k);
    const rotateRight = (arr, k) => rotateArraySpread(arr, k);
    
    console.log('Rotate left by 2:', rotateLeft(originalArray, 2));
    console.log('Rotate right by 2:', rotateRight(originalArray, 2));
    
    // Higher-order function for custom rotation
    const createRotator = (strategy) => {
        const strategies = {
            fast: rotateArraySpread,
            memory: rotateArrayInPlace,
            functional: rotateArrayReduce
        };
        return strategies[strategy] || rotateArraySpread;
    };
    
    const fastRotate = createRotator('fast');
    console.log('Fast rotation:', fastRotate(originalArray, k));
    
    // Performance test
    const largeArray = Array.from({ length: 1000 }, (_, i) => i);
    performanceTest(largeArray, 250, 1000);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        rotateArraySlice,
        rotateArraySpread,
        rotateArrayMap,
        rotateArrayInPlace,
        rotateArrayReduce,
        rotateArrayMethods,
        rotateArrayCyclic,
        rotateAndProcess,
        getUniqueRotations,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - slice + concat: O(n)
 * - Spread operator: O(n)
 * - Array.from + map: O(n)
 * - In-place reverse: O(n)
 * - reduce(): O(n)
 * - Array methods (k iterations): O(k)
 * - Cyclic replacement: O(n)
 * 
 * Space Complexity Analysis:
 * - Most approaches: O(n) for new array creation
 * - In-place approaches: O(1) additional space
 * 
 * JavaScript-Specific Notes:
 * - slice() creates shallow copies efficiently
 * - Spread operator provides clean syntax for array operations
 * - Destructuring enables elegant element swapping
 * - Method chaining allows complex transformations
 * - Map and Set provide efficient unique value tracking
 * - Higher-order functions enable strategy pattern implementation
 * - Performance varies significantly between approaches
 */
