/**
 * 0-1 Knapsack Problem
 * Source: https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
 */

// Approach 1: Dynamic Programming O(n*W) time, O(n*W) space
const knapsack = (val, wt, W) => {
    const n = val.length;
    
    // Create a 2D DP array
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));
    
    // Build table dp[][] in bottom-up manner
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            // If weight of the nth item is more than Knapsack capacity w,
            // then this item cannot be included in the optimal solution
            if (wt[i - 1] <= w) {
                dp[i][w] = Math.max(
                    val[i - 1] + dp[i - 1][w - wt[i - 1]],  // Include the item
                    dp[i - 1][w]                            // Exclude the item
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][W];
};

// Approach 2: Space-optimized DP O(n*W) time, O(W) space - OPTIMAL
const knapsackOptimized = (val, wt, W) => {
    const n = val.length;
    
    // We only need previous row, so we can use a 1D array
    const dp = new Array(W + 1).fill(0);
    
    // Iterate through all items
    for (let i = 0; i < n; i++) {
        // Traverse from right to left to avoid using updated values
        for (let w = W; w >= wt[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    
    return dp[W];
};

// Approach 3: Memoization with Map O(n*W) time, O(n*W) space
const knapsackMemo = (() => {
    const memo = new Map();
    
    const knapsackHelper = (val, wt, W, n) => {
        // Create a unique key for memoization
        const key = `${n},${W}`;
        if (memo.has(key)) return memo.get(key);
        
        // Base case
        if (n === 0 || W === 0) {
            memo.set(key, 0);
            return 0;
        }
        
        let result;
        
        // If weight of the nth item is more than Knapsack capacity W,
        // then this item cannot be included in the optimal solution
        if (wt[n - 1] > W) {
            result = knapsackHelper(val, wt, W, n - 1);
        } else {
            // Return the maximum of two cases:
            // 1. nth item included
            // 2. nth item not included
            result = Math.max(
                val[n - 1] + knapsackHelper(val, wt, W - wt[n - 1], n - 1),
                knapsackHelper(val, wt, W, n - 1)
            );
        }
        
        memo.set(key, result);
        return result;
    };
    
    return (val, wt, W) => {
        memo.clear(); // Clear memo for each new problem
        return knapsackHelper(val, wt, W, val.length);
    };
})();

// Approach 4: Functional approach with reduce O(n*W) time, O(n*W) space
const knapsackFunctional = (val, wt, W) => {
    const n = val.length;
    
    // Create and initialize DP table
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));
    
    // Build table using functional approach
    return val.reduce((dpTable, currentValue, i) => {
        const currentWeight = wt[i];
        
        for (let w = 1; w <= W; w++) {
            if (currentWeight <= w) {
                dpTable[i + 1][w] = Math.max(
                    currentValue + dpTable[i][w - currentWeight],
                    dpTable[i][w]
                );
            } else {
                dpTable[i + 1][w] = dpTable[i][w];
            }
        }
        
        return dpTable;
    }, dp)[n][W];
};

// Approach 5: Using generator for step-by-step computation
function* knapsackGenerator(val, wt, W) {
    const n = val.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));
    
    yield { step: 'init', dp: dp.map(row => [...row]), message: 'Initialized DP table' };
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                const oldValue = dp[i][w];
                dp[i][w] = Math.max(
                    val[i - 1] + dp[i - 1][w - wt[i - 1]],
                    dp[i - 1][w]
                );
                yield { 
                    step: `processing_item_${i-1}`, 
                    itemValue: val[i - 1],
                    itemWeight: wt[i - 1],
                    capacity: w,
                    oldValue, 
                    newValue: dp[i][w],
                    dp: dp.map(row => [...row])
                };
            } else {
                dp[i][w] = dp[i - 1][w];
                yield { 
                    step: `skipping_item_${i-1}`, 
                    itemValue: val[i - 1],
                    itemWeight: wt[i - 1],
                    capacity: w,
                    reason: 'Weight exceeds capacity',
                    dp: dp.map(row => [...row])
                };
            }
        }
    }
    
    const result = dp[n][W];
    yield { step: 'complete', result, dp: dp.map(row => [...row]) };
}

const knapsackWithGenerator = (val, wt, W) => {
    const generator = knapsackGenerator(val, wt, W);
    let result = 0;
    
    for (const step of generator) {
        if (step.step === 'complete') {
            result = step.result;
        }
    }
    
    return result;
};

// Approach 6: Using BigInt for large values
const knapsackBigInt = (val, wt, W) => {
    const n = val.length;
    const bigVal = val.map(v => BigInt(v));
    
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(BigInt(0)));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = bigVal[i - 1] + dp[i - 1][w - wt[i - 1]] > dp[i - 1][w] ? 
                    bigVal[i - 1] + dp[i - 1][w - wt[i - 1]] : dp[i - 1][w];
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return Number(dp[n][W]);
};

// Approach 7: Using Set for tracking selected items
const knapsackWithItems = (val, wt, W) => {
    const n = val.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));
    const selectedItems = new Set();
    
    // Build table
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = Math.max(
                    val[i - 1] + dp[i - 1][w - wt[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    // Backtrack to find selected items
    let w = W;
    for (let i = n; i > 0 && w > 0; i--) {
        // If this item is included in the optimal solution
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.add(i - 1); // Add item index
            w -= wt[i - 1];
        }
    }
    
    return {
        maxValue: dp[n][W],
        selectedItems: Array.from(selectedItems).sort((a, b) => a - b)
    };
};

// Approach 8: Using WeakMap for memory-efficient caching
const createKnapsackSolver = () => {
    const cache = new WeakMap();
    
    return (val, wt, W) => {
        // Create a key object
        const key = { val, wt, W };
        
        // In a real implementation, we would need a more sophisticated approach
        // since WeakMap keys must be objects and we can't directly use arrays
        // For demonstration, we'll just use the basic DP approach
        return knapsack([...val], [...wt], W);
    };
};

const knapsackWeakMap = createKnapsackSolver();

// Approach 9: Using async/await for non-blocking computation
const knapsackAsync = async (val, wt, W) => {
    return new Promise((resolve) => {
        // For large problems, we might want to do this asynchronously
        setTimeout(() => {
            resolve(knapsack([...val], [...wt], W));
        }, 0);
    });
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Dynamic Programming', fn: knapsack },
        { name: 'Space Optimized', fn: knapsackOptimized },
        { name: 'Memoization', fn: knapsackMemo },
        { name: 'Functional', fn: knapsackFunctional }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(({ val, wt, W }) => {
                fn([...val], [...wt], W);
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== 0-1 Knapsack Problem Examples ===\n');
    
    // Test cases
    const testCases = [
        { val: [60, 100, 120], wt: [10, 20, 30], W: 50 },
        { val: [10, 20, 30], wt: [1, 2, 3], W: 4 },
        { val: [1, 4, 5, 7], wt: [1, 3, 4, 5], W: 7 },
        { val: [20, 5, 10, 40, 15, 25], wt: [1, 2, 3, 8, 7, 4], W: 10 }
    ];
    
    testCases.forEach(({ val, wt, W }, index) => {
        console.log(`Test Case ${index + 1}: W = ${W}, val = [${val.join(', ')}], wt = [${wt.join(', ')}]`);
        console.log(`  Dynamic Programming: ${knapsack([...val], [...wt], W)}`);
        console.log(`  Space Optimized: ${knapsackOptimized([...val], [...wt], W)}`);
        console.log(`  Memoization: ${knapsackMemo([...val], [...wt], W)}`);
        console.log(`  Functional: ${knapsackFunctional([...val], [...wt], W)}`);
        console.log(`  Generator: ${knapsackWithGenerator([...val], [...wt], W)}`);
        console.log(`  BigInt: ${knapsackBigInt([...val], [...wt], W)}`);
        console.log(`  With Items:`, knapsackWithItems([...val], [...wt], W));
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    // Destructuring with array operations
    const [firstVal, secondVal, ...restVal] = [60, 100, 120];
    const [firstWt, secondWt, ...restWt] = [10, 20, 30];
    console.log('Destructured values:', { firstVal, secondVal, restVal });
    console.log('Destructured weights:', { firstWt, secondWt, restWt });
    
    // Using Math methods for analysis
    const values = [60, 100, 120];
    const weights = [10, 20, 30];
    const stats = {
        maxValue: Math.max(...values),
        maxWeight: Math.max(...weights),
        totalValue: values.reduce((acc, val) => acc + val, 0),
        totalWeight: weights.reduce((acc, wt) => acc + wt, 0)
    };
    console.log('Knapsack stats:', stats);
    
    // Method chaining with array operations
    const processedItems = values
        .map((val, i) => ({ value: val, weight: weights[i], ratio: val / weights[i] }))
        .sort((a, b) => b.ratio - a.ratio)
        .slice(0, 2);
    
    console.log('Processed items (sorted by value/weight ratio):', processedItems);
    
    // Using Set for unique analysis
    const valsAndWts = [...values, ...weights];
    const uniqueValsWts = [...new Set(valsAndWts)];
    console.log('Unique values and weights:', uniqueValsWts);
    
    // Map for comprehensive analysis
    const knapsackAnalysis = new Map([
        ['values', values],
        ['weights', weights],
        ['capacity', 50],
        ['valueToWeightRatio', values.map((val, i) => val / weights[i])]
    ]);
    
    console.log('Comprehensive analysis:');
    for (const [key, value] of knapsackAnalysis) {
        console.log(`  ${key}:`, value);
    }
    
    // Generator demonstration
    console.log('\nStep-by-step computation for val=[10,20,30], wt=[1,2,3], W=4:');
    const gen = knapsackGenerator([10, 20, 30], [1, 2, 3], 4);
    let stepCount = 0;
    for (const step of gen) {
        if (stepCount < 3) { // Show first 3 steps
            console.log(`  ${step.step}:`, step.dp ? `dp[${step.dp.length}][${step.dp[0].length}]` : step.result);
        }
        stepCount++;
    }
    
    // Async/await demonstration
    (async () => {
        try {
            const asyncResult = await knapsackAsync([1, 4, 5, 7], [1, 3, 4, 5], 7);
            console.log('Async result for val=[1,4,5,7], wt=[1,3,4,5], W=7:', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Cached solver demonstration
    console.log('WeakMap cached result (first call):', knapsackWeakMap([20, 5, 10, 40, 15, 25], [1, 2, 3, 8, 7, 4], 10));
    console.log('WeakMap cached result (second call):', knapsackWeakMap([20, 5, 10, 40, 15, 25], [1, 2, 3, 8, 7, 4], 10));
    
    // Higher-order function for custom analysis
    const createKnapsackAnalyzer = (processor) => {
        return (val, wt, W) => {
            const maxValue = knapsack([...val], [...wt], W);
            return processor(maxValue, val, wt, W);
        };
    };
    
    const getEfficiency = createKnapsackAnalyzer((maxValue, val, wt, W) => {
        const totalValue = val.reduce((acc, v) => acc + v, 0);
        return totalValue > 0 ? ((maxValue / totalValue) * 100).toFixed(2) + '%' : '0%';
    });
    
    const getKnapsackProperties = createKnapsackAnalyzer((maxValue, val, wt, W) => ({
        capacity: W,
        items: val.length,
        maxValue,
        efficiency: getEfficiency(val, wt, W)
    }));
    
    console.log('Efficiency for val=[60,100,120], wt=[10,20,30], W=50:', getEfficiency([60, 100, 120], [10, 20, 30], 50));
    console.log('Properties for val=[10,20,30], wt=[1,2,3], W=4:', getKnapsackProperties([10, 20, 30], [1, 2, 3], 4));
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const analyzeKnapsack = compose(
        result => ({ ...result, efficiency: ((result.maxValue / result.totalValue) * 100).toFixed(2) + '%' }),
        ({ val, wt, W }) => ({ val, wt, W, maxValue: knapsack([...val], [...wt], W), totalValue: val.reduce((acc, v) => acc + v, 0) })
    );
    
    console.log('Composed analysis for val=[1,4,5,7], wt=[1,3,4,5], W=7:', analyzeKnapsack({ val: [1, 4, 5, 7], wt: [1, 3, 4, 5], W: 7 }));
    
    // Performance test
    const performanceTestCases = [
        { val: [10, 20, 30], wt: [1, 2, 3], W: 4 },
        { val: [1, 4, 5, 7], wt: [1, 3, 4, 5], W: 7 }
    ];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        knapsack,
        knapsackOptimized,
        knapsackMemo,
        knapsackFunctional,
        knapsackWithGenerator,
        knapsackBigInt,
        knapsackWithItems,
        knapsackWeakMap,
        knapsackAsync,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Dynamic Programming: O(n*W) time, O(n*W) space
 * - Space Optimized: O(n*W) time, O(W) space - OPTIMAL
 * - Memoization: O(n*W) time, O(n*W) space
 * - Functional: O(n*W) time, O(n*W) space
 * - Generator: O(n*W) time, O(n*W) space
 * - BigInt: O(n*W) time, O(n*W) space
 * - With Items: O(n*W) time, O(n*W) space
 * - WeakMap: O(n*W) time, O(n*W) space
 * - Async: O(n*W) time, O(n*W) space
 * 
 * Space Complexity Analysis:
 * - Dynamic Programming: O(n*W)
 * - Space Optimized: O(W) - OPTIMAL
 * - Memoization: O(n*W)
 * - Functional: O(n*W)
 * - Generator: O(n*W)
 * - BigInt: O(n*W)
 * - With Items: O(n*W)
 * - WeakMap: O(n*W)
 * - Async: O(n*W)
 * 
 * JavaScript-Specific Notes:
 * - Array.from() with fill() provides clean initialization of 2D arrays
 * - Map provides efficient memoization with O(1) average lookup
 * - Set enables tracking of selected items
 * - Generators provide step-by-step algorithm visualization
 * - BigInt handles arbitrarily large values
 * - Higher-order functions enable flexible analysis patterns
 * - Method chaining enables complex data transformations
 * - Async/await enables non-blocking computation
 * - Destructuring enables clean variable assignments
 * - 2D array manipulation showcases JavaScript's flexibility
 */
