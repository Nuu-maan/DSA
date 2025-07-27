/**
 * Reverse an Array
 * Source: https://www.geeksforgeeks.org/problems/reverse-an-array/1
 */

// Approach 1: Using built-in reverse() method (mutates original array)
const reverseArrayInPlace = (arr) => {
    return arr.reverse();
};

// Approach 2: Using spread operator and reverse() (immutable)
const reverseArrayImmutable = (arr) => {
    return [...arr].reverse();
};

// Approach 3: Using Array.from() with mapping (functional approach)
const reverseArrayFunctional = (arr) => {
    return Array.from(arr, (_, index) => arr[arr.length - 1 - index]);
};

// Approach 4: Using reduce() (showcasing higher-order functions)
const reverseArrayReduce = (arr) => {
    return arr.reduce((reversed, current) => [current, ...reversed], []);
};

// Approach 5: Two-pointer technique (manual implementation)
const reverseArrayTwoPointer = (arr) => {
    const result = [...arr]; // Create copy to avoid mutation
    let left = 0;
    let right = result.length - 1;
    
    while (left < right) {
        // ES6 destructuring assignment for swapping
        [result[left], result[right]] = [result[right], result[left]];
        left++;
        right--;
    }
    
    return result;
};

// Approach 6: Using recursion with closures
const reverseArrayRecursive = (arr) => {
    const reverse = (index = 0, result = []) => {
        if (index >= arr.length) return result;
        return reverse(index + 1, [arr[index], ...result]);
    };
    return reverse();
};

// Approach 7: Using Map for index transformation
const reverseArrayMap = (arr) => {
    return arr.map((_, index) => arr[arr.length - 1 - index]);
};

// Performance comparison utility
const performanceTest = (arr, iterations = 100000) => {
    const methods = [
        { name: 'Built-in reverse()', fn: reverseArrayInPlace },
        { name: 'Spread + reverse()', fn: reverseArrayImmutable },
        { name: 'Array.from()', fn: reverseArrayFunctional },
        { name: 'reduce()', fn: reverseArrayReduce },
        { name: 'Two-pointer', fn: reverseArrayTwoPointer },
        { name: 'Map transformation', fn: reverseArrayMap }
    ];
    
    console.log(`Performance test with ${arr.length} elements, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const testArr = [...arr]; // Fresh copy for each test
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn([...testArr]); // Fresh copy each iteration
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Array Reversal Examples ===\n');
    
    // Test cases
    const testCases = [
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [10],
        [],
        ['a', 'b', 'c', 'd']
    ];
    
    testCases.forEach((arr, index) => {
        console.log(`Test Case ${index + 1}: [${arr.join(', ')}]`);
        console.log(`Built-in:     [${reverseArrayImmutable(arr).join(', ')}]`);
        console.log(`Functional:   [${reverseArrayFunctional(arr).join(', ')}]`);
        console.log(`Reduce:       [${reverseArrayReduce(arr).join(', ')}]`);
        console.log(`Two-pointer:  [${reverseArrayTwoPointer(arr).join(', ')}]`);
        console.log(`Recursive:    [${reverseArrayRecursive(arr).join(', ')}]`);
        console.log(`Map:          [${reverseArrayMap(arr).join(', ')}]`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    const originalArray = [1, 2, 3, 4, 5];
    console.log('Original:', originalArray);
    
    // Destructuring assignment
    const [first, ...rest] = originalArray;
    const [last] = [...originalArray].reverse();
    console.log('First element:', first);
    console.log('Last element:', last);
    console.log('Rest elements:', rest);
    
    // Arrow functions with different syntaxes
    const reverseShort = arr => [...arr].reverse();
    const reverseExplicit = (arr) => {
        return [...arr].reverse();
    };
    
    console.log('Arrow function (short):', reverseShort(originalArray));
    console.log('Arrow function (explicit):', reverseExplicit(originalArray));
    
    // Method chaining
    const processedArray = originalArray
        .filter(x => x % 2 === 0)  // Keep even numbers
        .map(x => x * 2)           // Double them
        .reverse();                // Reverse the result
    
    console.log('Chained operations (even → double → reverse):', processedArray);
    
    // Performance test with larger array
    const largeArray = Array.from({ length: 1000 }, (_, i) => i);
    performanceTest(largeArray, 1000);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        reverseArrayInPlace,
        reverseArrayImmutable,
        reverseArrayFunctional,
        reverseArrayReduce,
        reverseArrayTwoPointer,
        reverseArrayRecursive,
        reverseArrayMap,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Built-in reverse(): O(n)
 * - Spread + reverse(): O(n)
 * - Array.from(): O(n)
 * - reduce(): O(n)
 * - Two-pointer: O(n)
 * - Recursive: O(n)
 * - Map: O(n)
 * 
 * Space Complexity Analysis:
 * - Built-in reverse() (in-place): O(1)
 * - All other methods: O(n) for creating new array
 * 
 * JavaScript-Specific Notes:
 * - Array.reverse() mutates the original array
 * - Spread operator creates shallow copies
 * - Arrow functions provide concise syntax
 * - Destructuring enables elegant swapping
 * - Higher-order functions enable functional programming
 */
