/**
 * Find Maximum Element in Array
 * Source: https://www.geeksforgeeks.org/c-program-find-largest-element-array/
 */

// Approach 1: Using Math.max with spread operator (ES6+)
const findMaxSpread = (arr) => {
    if (arr.length === 0) return undefined;
    return Math.max(...arr);
};

// Approach 2: Using reduce() (functional programming)
const findMaxReduce = (arr) => {
    if (arr.length === 0) return undefined;
    return arr.reduce((max, current) => Math.max(max, current));
};

// Approach 3: Using reduce() with ternary operator
const findMaxReduceTernary = (arr) => {
    if (arr.length === 0) return undefined;
    return arr.reduce((max, current) => current > max ? current : max);
};

// Approach 4: Traditional for loop (performance optimized)
const findMaxLoop = (arr) => {
    if (arr.length === 0) return undefined;
    
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
};

// Approach 5: Using for...of loop (ES6+)
const findMaxForOf = (arr) => {
    if (arr.length === 0) return undefined;
    
    let max = arr[0];
    for (const element of arr) {
        if (element > max) {
            max = element;
        }
    }
    return max;
};

// Approach 6: Using Array.sort() (less efficient but demonstrates sorting)
const findMaxSort = (arr) => {
    if (arr.length === 0) return undefined;
    return [...arr].sort((a, b) => b - a)[0];
};

// Approach 7: Recursive approach with closures
const findMaxRecursive = (arr) => {
    if (arr.length === 0) return undefined;
    
    const findMax = (index = 0, currentMax = arr[0]) => {
        if (index >= arr.length) return currentMax;
        return findMax(index + 1, Math.max(currentMax, arr[index]));
    };
    
    return findMax();
};

// Approach 8: Using Array.filter() and Math.max (creative approach)
const findMaxFilter = (arr) => {
    if (arr.length === 0) return undefined;
    
    const max = Math.max(...arr);
    return arr.filter(x => x === max)[0];
};

// Advanced: Find max with additional information
const findMaxWithInfo = (arr) => {
    if (arr.length === 0) return { value: undefined, index: -1, count: 0 };
    
    let maxValue = arr[0];
    let maxIndex = 0;
    let count = 1;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxValue) {
            maxValue = arr[i];
            maxIndex = i;
            count = 1;
        } else if (arr[i] === maxValue) {
            count++;
        }
    }
    
    return { value: maxValue, index: maxIndex, count };
};

// Using Map for frequency tracking while finding max
const findMaxWithFrequency = (arr) => {
    if (arr.length === 0) return { max: undefined, frequency: new Map() };
    
    const frequency = new Map();
    let max = arr[0];
    
    for (const num of arr) {
        frequency.set(num, (frequency.get(num) || 0) + 1);
        if (num > max) max = num;
    }
    
    return { max, frequency };
};

// Performance comparison utility
const performanceTest = (arr, iterations = 100000) => {
    const methods = [
        { name: 'Math.max + spread', fn: findMaxSpread },
        { name: 'reduce()', fn: findMaxReduce },
        { name: 'Traditional loop', fn: findMaxLoop },
        { name: 'for...of loop', fn: findMaxForOf },
        { name: 'sort() approach', fn: findMaxSort }
    ];
    
    console.log(`Performance test with ${arr.length} elements, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn(arr);
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Find Maximum Element Examples ===\n');
    
    // Test cases
    const testCases = [
        [1, 8, 7, 56, 90],
        [1, 2, 0, 3, 2, 4, 5],
        [1],
        [-1, -2, -3, -4],
        [],
        [5, 5, 5, 5],
        [100, -200, 300, -400, 500]
    ];
    
    testCases.forEach((arr, index) => {
        console.log(`Test Case ${index + 1}: [${arr.join(', ')}]`);
        console.log(`Math.max + spread: ${findMaxSpread(arr)}`);
        console.log(`reduce():          ${findMaxReduce(arr)}`);
        console.log(`Traditional loop:  ${findMaxLoop(arr)}`);
        console.log(`for...of loop:     ${findMaxForOf(arr)}`);
        console.log(`Recursive:         ${findMaxRecursive(arr)}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    const numbers = [1, 8, 7, 56, 90, 23, 45];
    
    // Destructuring with rest parameters
    const [first, second, ...rest] = numbers;
    console.log('First:', first, 'Second:', second, 'Rest max:', Math.max(...rest));
    
    // Array methods chaining
    const processedMax = numbers
        .filter(x => x > 10)           // Filter numbers > 10
        .map(x => x * 2)               // Double them
        .reduce((max, curr) => Math.max(max, curr)); // Find max
    
    console.log('Chained operations max:', processedMax);
    
    // Using Set to find max of unique elements
    const uniqueNumbers = [...new Set(numbers)];
    console.log('Max of unique elements:', Math.max(...uniqueNumbers));
    
    // Advanced example with additional info
    const maxInfo = findMaxWithInfo([3, 7, 2, 7, 1, 7]);
    console.log('Max with info:', maxInfo);
    
    // Frequency tracking example
    const freqResult = findMaxWithFrequency([3, 7, 2, 7, 1, 7]);
    console.log('Max with frequency:', freqResult.max);
    console.log('All frequencies:', [...freqResult.frequency.entries()]);
    
    // Demonstrate closures and higher-order functions
    const createMaxFinder = (threshold) => {
        return (arr) => {
            const filtered = arr.filter(x => x >= threshold);
            return filtered.length > 0 ? Math.max(...filtered) : undefined;
        };
    };
    
    const findMaxAbove50 = createMaxFinder(50);
    console.log('Max above 50:', findMaxAbove50(numbers));
    
    // Performance test
    const largeArray = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
    performanceTest(largeArray, 1000);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        findMaxSpread,
        findMaxReduce,
        findMaxReduceTernary,
        findMaxLoop,
        findMaxForOf,
        findMaxSort,
        findMaxRecursive,
        findMaxFilter,
        findMaxWithInfo,
        findMaxWithFrequency,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Math.max + spread: O(n)
 * - reduce(): O(n)
 * - Traditional loop: O(n)
 * - for...of loop: O(n)
 * - sort() approach: O(n log n)
 * - Recursive: O(n)
 * 
 * Space Complexity Analysis:
 * - Most approaches: O(1)
 * - sort() approach: O(n) due to array copy
 * - Recursive: O(n) due to call stack
 * 
 * JavaScript-Specific Notes:
 * - Math.max() with spread operator is idiomatic and readable
 * - reduce() showcases functional programming paradigm
 * - for...of provides clean iteration syntax
 * - Map and Set provide efficient data structures
 * - Closures enable powerful function factories
 * - Performance varies significantly between approaches
 */
