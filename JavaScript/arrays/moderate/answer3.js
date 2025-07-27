/**
 * Product of Array Except Self
 * Source: https://leetcode.com/problems/product-of-array-except-self/
 */

// Approach 1: Left and Right Products (O(n) time, O(n) space)
const productExceptSelfTwoArrays = (nums) => {
    const n = nums.length;
    const leftProducts = new Array(n);
    const rightProducts = new Array(n);
    const result = new Array(n);
    
    // Calculate left products
    leftProducts[0] = 1;
    for (let i = 1; i < n; i++) {
        leftProducts[i] = leftProducts[i - 1] * nums[i - 1];
    }
    
    // Calculate right products
    rightProducts[n - 1] = 1;
    for (let i = n - 2; i >= 0; i--) {
        rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
    }
    
    // Combine left and right products
    for (let i = 0; i < n; i++) {
        result[i] = leftProducts[i] * rightProducts[i];
    }
    
    return result;
};

// Approach 2: Space Optimized (O(n) time, O(1) space) - OPTIMAL
const productExceptSelf = (nums) => {
    const n = nums.length;
    const result = new Array(n);
    
    // First pass: calculate left products and store in result
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Second pass: multiply by right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
};

// Approach 3: Using reduce() for functional approach
const productExceptSelfFunctional = (nums) => {
    const n = nums.length;
    
    // Calculate left products using reduce
    const leftProducts = nums.reduce((acc, num, index) => {
        if (index === 0) {
            acc.push(1);
        } else {
            acc.push(acc[index - 1] * nums[index - 1]);
        }
        return acc;
    }, []);
    
    // Calculate right products and combine
    return nums.reduceRight((acc, num, index) => {
        if (index === n - 1) {
            acc.rightProduct = 1;
            acc.result[index] = leftProducts[index] * acc.rightProduct;
        } else {
            acc.rightProduct *= nums[index + 1];
            acc.result[index] = leftProducts[index] * acc.rightProduct;
        }
        return acc;
    }, { result: new Array(n), rightProduct: 1 }).result;
};

// Approach 4: Using map() with closure
const productExceptSelfMap = (nums) => {
    const n = nums.length;
    let leftProduct = 1;
    
    // First pass: left products
    const leftProducts = nums.map((num, index) => {
        const current = leftProduct;
        leftProduct *= num;
        return current;
    });
    
    // Second pass: multiply by right products
    let rightProduct = 1;
    return leftProducts.map((leftProd, index) => {
        const result = leftProd * rightProduct;
        rightProduct *= nums[n - 1 - index];
        return result;
    }).reverse();
};

// Approach 5: Using Array.from() with custom logic
const productExceptSelfArrayFrom = (nums) => {
    const n = nums.length;
    
    return Array.from({ length: n }, (_, i) => {
        let product = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                product *= nums[j];
            }
        }
        return product;
    });
};

// Advanced: Handle zeros efficiently
const productExceptSelfWithZeros = (nums) => {
    const n = nums.length;
    const zeroCount = nums.filter(num => num === 0).length;
    
    if (zeroCount > 1) {
        return new Array(n).fill(0);
    }
    
    if (zeroCount === 1) {
        const zeroIndex = nums.indexOf(0);
        const product = nums.reduce((acc, num, index) => {
            return index === zeroIndex ? acc : acc * num;
        }, 1);
        
        return nums.map((num, index) => index === zeroIndex ? product : 0);
    }
    
    // No zeros, use regular approach
    return productExceptSelf(nums);
};

// Using BigInt for large numbers
const productExceptSelfBigInt = (nums) => {
    const n = nums.length;
    const result = new Array(n);
    
    // Convert to BigInt and calculate left products
    result[0] = BigInt(1);
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * BigInt(nums[i - 1]);
    }
    
    // Calculate right products
    let rightProduct = BigInt(1);
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= BigInt(nums[i]);
    }
    
    // Convert back to regular numbers
    return result.map(bigintNum => Number(bigintNum));
};

// Using generators for memory-efficient processing
function* productExceptSelfGenerator(nums) {
    const n = nums.length;
    const leftProducts = [];
    
    // Calculate left products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        leftProducts.push(leftProduct);
        leftProduct *= nums[i];
    }
    
    // Generate results with right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        yield leftProducts[i] * rightProduct;
        rightProduct *= nums[i];
    }
}

// Performance comparison utility
const performanceTest = (nums, iterations = 10000) => {
    const methods = [
        { name: 'Two Arrays', fn: productExceptSelfTwoArrays },
        { name: 'Space Optimized', fn: productExceptSelf },
        { name: 'Functional', fn: productExceptSelfFunctional },
        { name: 'Map-based', fn: productExceptSelfMap },
        { name: 'Array.from', fn: productExceptSelfArrayFrom }
    ];
    
    console.log(`Performance test with ${nums.length} elements, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn([...nums]); // Fresh copy each iteration
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Product of Array Except Self Examples ===\n');
    
    // Test cases
    const testCases = [
        [1, 2, 3, 4],
        [-1, 1, 0, -3, 3],
        [2, 3, 4, 5],
        [1, 0],
        [0, 0],
        [1],
        [-1, -2, -3],
        [5, 2, 3, 4, 1]
    ];
    
    testCases.forEach((nums, index) => {
        console.log(`Test Case ${index + 1}: [${nums.join(', ')}]`);
        console.log(`Two Arrays:       [${productExceptSelfTwoArrays(nums).join(', ')}]`);
        console.log(`Space Optimized:  [${productExceptSelf(nums).join(', ')}]`);
        console.log(`Functional:       [${productExceptSelfFunctional(nums).join(', ')}]`);
        console.log(`Map-based:        [${productExceptSelfMap(nums).join(', ')}]`);
        console.log(`With Zeros:       [${productExceptSelfWithZeros(nums).join(', ')}]`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    const nums = [1, 2, 3, 4];
    
    // Destructuring with array operations
    const [first, second, ...rest] = productExceptSelf(nums);
    console.log('Destructured result:', { first, second, rest });
    
    // Using Set and Map for analysis
    const products = productExceptSelf(nums);
    const uniqueProducts = new Set(products);
    console.log('Unique products:', [...uniqueProducts]);
    
    const productMap = new Map(nums.map((num, index) => [num, products[index]]));
    console.log('Number to product mapping:', [...productMap.entries()]);
    
    // Method chaining with array operations
    const processedProducts = productExceptSelf(nums)
        .filter(product => product > 10)      // Keep products > 10
        .map(product => Math.sqrt(product))   // Take square root
        .sort((a, b) => b - a);               // Sort descending
    
    console.log('Processed products (>10, sqrt, desc):', processedProducts);
    
    // Using reduce for custom analysis
    const productAnalysis = productExceptSelf(nums).reduce((analysis, product, index) => {
        analysis.sum += product;
        analysis.max = Math.max(analysis.max, product);
        analysis.min = Math.min(analysis.min, product);
        analysis.indices.push({ index, product });
        return analysis;
    }, { sum: 0, max: -Infinity, min: Infinity, indices: [] });
    
    console.log('Product analysis:', productAnalysis);
    
    // Generator usage for memory efficiency
    console.log('Generator results:');
    const generator = productExceptSelfGenerator(nums);
    const generatorResults = [];
    for (const product of generator) {
        generatorResults.unshift(product); // Reverse since generator yields in reverse
    }
    console.log('Generated products:', generatorResults);
    
    // Higher-order function for custom transformations
    const createProductTransformer = (transform) => {
        return (nums) => {
            return productExceptSelf(nums).map(transform);
        };
    };
    
    const getSquaredProducts = createProductTransformer(x => x * x);
    const getLogProducts = createProductTransformer(x => Math.log(Math.abs(x) || 1));
    
    console.log('Squared products:', getSquaredProducts(nums));
    console.log('Log products:', getLogProducts(nums));
    
    // Using BigInt for large number handling
    const largeNums = [1000000, 2000000, 3000000];
    const bigIntResults = productExceptSelfBigInt(largeNums);
    console.log('BigInt results for large numbers:', bigIntResults);
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const processArray = compose(
        arr => arr.filter(x => x > 0),
        arr => productExceptSelf(arr),
        arr => arr.map(x => Math.round(x))
    );
    
    console.log('Composed processing:', processArray([1, 2, 3, 4, 5]));
    
    // Performance test
    const largeArray = Array.from({ length: 1000 }, (_, i) => i + 1);
    performanceTest(largeArray, 1000);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productExceptSelfTwoArrays,
        productExceptSelf,
        productExceptSelfFunctional,
        productExceptSelfMap,
        productExceptSelfArrayFrom,
        productExceptSelfWithZeros,
        productExceptSelfBigInt,
        productExceptSelfGenerator,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Two Arrays: O(n)
 * - Space Optimized: O(n) - OPTIMAL
 * - Functional: O(n)
 * - Map-based: O(n)
 * - Array.from: O(n²) - less efficient
 * 
 * Space Complexity Analysis:
 * - Two Arrays: O(n) for auxiliary arrays
 * - Space Optimized: O(1) excluding output array - OPTIMAL
 * - Functional: O(n) for intermediate arrays
 * - Map-based: O(n) for intermediate arrays
 * - Array.from: O(1) excluding output array
 * 
 * JavaScript-Specific Notes:
 * - Array methods (reduce, map, filter) enable functional approaches
 * - BigInt provides arbitrary precision for large numbers
 * - Generators enable memory-efficient processing
 * - Destructuring provides clean result manipulation
 * - Method chaining enables complex transformations
 * - Higher-order functions enable flexible processing patterns
 * - Set and Map provide efficient data analysis capabilities
 */
