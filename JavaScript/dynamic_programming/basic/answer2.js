/**
 * Climbing Stairs
 * Source: https://www.geeksforgeeks.org/count-ways-reach-nth-stair/
 */

// Approach 1: Iterative with O(1) space - OPTIMAL (Same as Fibonacci)
const countWays = (n) => {
    if (n <= 1) return 1;
    
    let prev2 = 1, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        [prev2, prev1] = [prev1, prev2 + prev1]; // ES6 destructuring swap
    }
    return prev1;
};

// Approach 2: Memoization with Map (O(n) time, O(n) space)
const countWaysMemo = (() => {
    const memo = new Map([[0, 1], [1, 1]]);
    
    return function count(n) {
        if (memo.has(n)) return memo.get(n);
        
        const result = count(n - 1) + count(n - 2);
        memo.set(n, result);
        return result;
    };
})();

// Approach 3: Dynamic Programming with array (O(n) time, O(n) space)
const countWaysDP = (n) => {
    if (n <= 1) return 1;
    
    const dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
};

// Approach 4: Recursive with memoization using object
const countWaysRecursiveMemo = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return 1;
    
    memo[n] = countWaysRecursiveMemo(n - 1, memo) + countWaysRecursiveMemo(n - 2, memo);
    return memo[n];
};

// Approach 5: Using generator for sequence generation
function* climbingStairsGenerator() {
    let prev2 = 1, prev1 = 1;
    yield prev2;
    yield prev1;
    
    while (true) {
        [prev2, prev1] = [prev1, prev2 + prev1];
        yield prev1;
    }
}

const countWaysWithGenerator = (n) => {
    if (n < 0) return undefined;
    
    const gen = climbingStairsGenerator();
    let result;
    for (let i = 0; i <= n; i++) {
        result = gen.next().value;
    }
    return result;
};

// Approach 6: Functional approach with reduce
const countWaysFunctional = (n) => {
    if (n <= 1) return 1;
    
    return Array.from({ length: n - 1 }, (_, i) => i).reduce(
        (acc) => [acc[1], acc[0] + acc[1]],
        [1, 1]
    )[1];
};

// Approach 7: Using BigInt for large numbers
const countWaysBigInt = (n) => {
    if (n <= 1) return BigInt(1);
    
    let prev2 = BigInt(1), prev1 = BigInt(1);
    for (let i = 2; i <= n; i++) {
        [prev2, prev1] = [prev1, prev2 + prev1];
    }
    return prev1;
};

// Approach 8: Space-optimized with closure
const createStairClimber = () => {
    const cache = new Map([[0, 1], [1, 1]]);
    
    return (n) => {
        if (cache.has(n)) return cache.get(n);
        
        let result;
        if (n <= 1) {
            result = 1;
        } else {
            result = createStairClimber()(n - 1) + createStairClimber()(n - 2);
        }
        
        cache.set(n, result);
        return result;
    };
};

const countWaysClosure = createStairClimber();

// Approach 9: Using WeakMap for memory-efficient caching
const createStairClimberWeakMap = () => {
    const cache = new WeakMap();
    const keys = new Map();
    
    return (n) => {
        // Create a unique key for each n
        if (!keys.has(n)) {
            keys.set(n, { value: n });
        }
        
        const key = keys.get(n);
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        let result;
        if (n <= 1) {
            result = 1;
        } else {
            result = countWays(n - 1) + countWays(n - 2);
        }
        
        cache.set(key, result);
        return result;
    };
};

const countWaysWeakMap = createStairClimberWeakMap();

// Using async/await for non-blocking computation
const countWaysAsync = async (n) => {
    return new Promise((resolve) => {
        // For large numbers, we might want to do this asynchronously
        setTimeout(() => {
            resolve(countWays(n));
        }, 0);
    });
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Iterative', fn: countWays },
        { name: 'Memoization', fn: countWaysMemo },
        { name: 'Dynamic Programming', fn: countWaysDP },
        { name: 'Recursive Memo', fn: countWaysRecursiveMemo },
        { name: 'Functional', fn: countWaysFunctional }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(n => {
                fn(n);
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Climbing Stairs Examples ===\n');
    
    // Test cases
    const testCases = [0, 1, 3, 4, 5, 10];
    
    testCases.forEach(n => {
        console.log(`Ways to climb ${n} stairs:`);
        console.log(`  Iterative: ${countWays(n)}`);
        console.log(`  Memoization: ${countWaysMemo(n)}`);
        console.log(`  DP: ${countWaysDP(n)}`);
        console.log(`  Recursive Memo: ${countWaysRecursiveMemo(n)}`);
        console.log(`  Generator: ${countWaysWithGenerator(n)}`);
        console.log(`  Functional: ${countWaysFunctional(n)}`);
        console.log(`  BigInt: ${countWaysBigInt(n)}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    // Destructuring with array operations
    const [base, first, ...rest] = [1, 1, 2, 3, 5, 8, 13];
    console.log('Destructured:', { base, first, rest });
    
    // Using Math methods for analysis
    const stairWays = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    const stats = {
        max: Math.max(...stairWays),
        min: Math.min(...stairWays),
        sum: stairWays.reduce((acc, val) => acc + val, 0)
    };
    console.log('Stair climbing stats:', stats);
    
    // Method chaining with array operations
    const processedWays = stairWays
        .filter(n => n > 1)
        .map(n => ({ ways: n, logWays: Math.log(n).toFixed(2) }))
        .sort((a, b) => b.ways - a.ways)
        .slice(0, 3);
    
    console.log('Processed ways:', processedWays);
    
    // Using Set for unique analysis
    const waysWithDuplicates = [1, 1, 2, 3, 5, 8, 13, 21, 1, 2, 3];
    const uniqueWays = [...new Set(waysWithDuplicates)];
    console.log('Unique ways:', uniqueWays);
    
    // Map for comprehensive analysis
    const stairAnalysis = new Map([
        ['sequence', stairWays],
        ['length', stairWays.length],
        ['even', stairWays.filter(n => n % 2 === 0)],
        ['odd', stairWays.filter(n => n % 2 !== 0)]
    ]);
    
    console.log('Comprehensive analysis:');
    for (const [key, value] of stairAnalysis) {
        console.log(`  ${key}:`, value);
    }
    
    // Generator demonstration
    console.log('\nFirst 10 stair climbing ways using generator:');
    const gen = climbingStairsGenerator();
    const firstTen = [];
    for (let i = 0; i < 10; i++) {
        firstTen.push(gen.next().value);
    }
    console.log('First 10:', firstTen);
    
    // Async/await demonstration
    (async () => {
        try {
            const asyncResult = await countWaysAsync(15);
            console.log('Async result for 15 stairs:', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Cached solver demonstration
    console.log('WeakMap cached result (first call):', countWaysWeakMap(10));
    console.log('WeakMap cached result (second call):', countWaysWeakMap(10));
    
    // Higher-order function for custom analysis
    const createStairAnalyzer = (processor) => {
        return (n) => {
            const ways = countWays(n);
            return processor(ways, n);
        };
    };
    
    const getGrowthRate = createStairAnalyzer((ways, n) => {
        if (n < 2) return 'N/A';
        const prevWays = countWays(n - 1);
        return ((ways / prevWays) * 100).toFixed(2) + '%';
    });
    
    const getStairProperties = createStairAnalyzer((ways, n) => ({
        stairs: n,
        ways,
        isEven: ways % 2 === 0,
        digitCount: ways.toString().length
    }));
    
    console.log('Growth rate for 10/9 stairs:', getGrowthRate(10));
    console.log('Properties of 12 stairs:', getStairProperties(12));
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const analyzeStairs = compose(
        result => ({ ...result, ratio: result.n > 0 ? (result.ways / countWays(result.n - 1)).toFixed(4) : 'N/A' }),
        n => ({ n, ways: countWays(n) })
    );
    
    console.log('Composed analysis for 10 stairs:', analyzeStairs(10));
    
    // Performance test
    const performanceTestCases = [5, 10, 15];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        countWays,
        countWaysMemo,
        countWaysDP,
        countWaysRecursiveMemo,
        countWaysWithGenerator,
        countWaysFunctional,
        countWaysBigInt,
        countWaysClosure,
        countWaysWeakMap,
        countWaysAsync,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Iterative: O(n) time, O(1) space - OPTIMAL
 * - Memoization: O(n) time, O(n) space
 * - Dynamic Programming: O(n) time, O(n) space
 * - Recursive Memo: O(n) time, O(n) space
 * - Generator: O(n) time, O(1) space
 * - Functional: O(n) time, O(n) space
 * - BigInt: O(n) time, O(1) space
 * - Closure: O(n) time, O(n) space
 * - WeakMap: O(n) time, O(n) space
 * 
 * Space Complexity Analysis:
 * - Iterative: O(1) - OPTIMAL
 * - Memoization: O(n)
 * - Dynamic Programming: O(n)
 * - Recursive Memo: O(n)
 * - Generator: O(1)
 * - Functional: O(n)
 * - BigInt: O(1)
 * - Closure: O(n)
 * - WeakMap: O(n)
 * 
 * JavaScript-Specific Notes:
 * - Destructuring assignment enables elegant variable swapping
 * - Map provides efficient memoization with O(1) average lookup
 * - Generators provide memory-efficient sequence generation
 * - BigInt handles arbitrarily large numbers
 * - WeakMap enables memory-efficient caching patterns
 * - Higher-order functions enable flexible analysis patterns
 * - Method chaining enables complex data transformations
 * - Async/await enables non-blocking computation
 * - Closures enable encapsulation of state
 */
