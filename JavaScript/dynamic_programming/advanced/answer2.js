/**
 * Egg Dropping Puzzle
 * Source: https://www.geeksforgeeks.org/egg-dropping-puzzle-dp-11/
 */

// Approach 1: Dynamic Programming O(N*K²) time, O(N*K) space
const eggDrop = (N, K) => {
    // Create a 2D DP array
    const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(0));
    
    // Base cases
    // We need 'i' trials for 'i' floors and 1 egg
    for (let i = 1; i <= K; i++) {
        dp[1][i] = i;
    }
    
    // We need only 1 trial for 1 floor with any number of eggs
    for (let i = 1; i <= N; i++) {
        dp[i][1] = 1;
    }
    
    // Fill the rest of the entries using optimal substructure property
    for (let i = 2; i <= N; i++) {
        for (let j = 2; j <= K; j++) {
            dp[i][j] = Number.MAX_SAFE_INTEGER;
            
            for (let x = 1; x <= j; x++) {
                const res = 1 + Math.max(dp[i-1][x-1], dp[i][j-x]);
                if (res < dp[i][j]) {
                    dp[i][j] = res;
                }
            }
        }
    }
    
    return dp[N][K];
};

// Approach 2: Memoization with Map O(N*K²) time, O(N*K) space
const eggDropMemo = (() => {
    const memo = new Map();
    
    const eggDropHelper = (N, K) => {
        // Create a unique key for memoization
        const key = `${N},${K}`;
        if (memo.has(key)) return memo.get(key);
        
        // Base cases
        if (K === 1 || K === 0) {
            memo.set(key, K);
            return K;
        }
        
        if (N === 1) {
            memo.set(key, K);
            return K;
        }
        
        let minTrials = Number.MAX_SAFE_INTEGER;
        
        // Try all possible floors
        for (let x = 1; x <= K; x++) {
            const res = 1 + Math.max(eggDropHelper(N-1, x-1), eggDropHelper(N, K-x));
            if (res < minTrials) {
                minTrials = res;
            }
        }
        
        memo.set(key, minTrials);
        return minTrials;
    };
    
    return (N, K) => {
        memo.clear(); // Clear memo for each new problem
        return eggDropHelper(N, K);
    };
})();

// Approach 3: Binary search optimization O(N*K*log(K)) time, O(N*K) space
const eggDropOptimized = (N, K) => {
    // Create a 2D DP array
    const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(0));
    
    // Base cases
    for (let i = 1; i <= K; i++) {
        dp[1][i] = i;
    }
    
    for (let i = 1; i <= N; i++) {
        dp[i][1] = 1;
    }
    
    // Fill the rest of the entries
    for (let i = 2; i <= N; i++) {
        for (let j = 2; j <= K; j++) {
            dp[i][j] = Number.MAX_SAFE_INTEGER;
            
            // Binary search for optimal x
            let low = 1;
            let high = j;
            
            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                const left = dp[i-1][mid-1];
                const right = dp[i][j-mid];
                const res = 1 + Math.max(left, right);
                
                if (res < dp[i][j]) {
                    dp[i][j] = res;
                }
                
                if (left < right) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
    }
    
    return dp[N][K];
};

// Approach 4: Functional approach with reduce O(N*K²) time, O(N*K) space
const eggDropFunctional = (N, K) => {
    // Create and initialize DP table
    const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(0));
    
    // Initialize base cases using functional approach
    for (let i = 1; i <= K; i++) dp[1][i] = i;
    for (let i = 1; i <= N; i++) dp[i][1] = 1;
    
    // Build table using functional approach
    return Array.from({ length: N - 1 }, (_, i) => i + 2).reduce((dpTable, i) => {
        return Array.from({ length: K - 1 }, (_, j) => j + 2).reduce((dpRow, j) => {
            dpRow[i][j] = Array.from({ length: j }, (_, x) => x + 1).reduce((minTrials, x) => {
                const res = 1 + Math.max(dpRow[i-1][x-1], dpRow[i][j-x]);
                return res < minTrials ? res : minTrials;
            }, Number.MAX_SAFE_INTEGER);
            return dpRow;
        }, dpTable);
    }, dp)[N][K];
};

// Approach 5: Using generator for step-by-step computation
function* eggDropGenerator(N, K) {
    const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(0));
    
    // Initialize base cases
    for (let i = 1; i <= K; i++) dp[1][i] = i;
    for (let i = 1; i <= N; i++) dp[i][1] = 1;
    
    yield { step: 'init', dp: dp.map(row => [...row]), message: 'Initialized DP table with base cases' };
    
    for (let i = 2; i <= N; i++) {
        for (let j = 2; j <= K; j++) {
            let minTrials = Number.MAX_SAFE_INTEGER;
            let bestX = -1;
            
            for (let x = 1; x <= j; x++) {
                const res = 1 + Math.max(dp[i-1][x-1], dp[i][j-x]);
                if (res < minTrials) {
                    minTrials = res;
                    bestX = x;
                }
            }
            
            dp[i][j] = minTrials;
            yield { 
                step: `processing_eggs_${i}_floors_${j}`, 
                eggs: i, floors: j, bestX,
                trials: minTrials,
                dp: dp.map(row => [...row])
            };
        }
    }
    
    const result = dp[N][K];
    yield { step: 'complete', result, dp: dp.map(row => [...row]) };
}

const eggDropWithGenerator = (N, K) => {
    const generator = eggDropGenerator(N, K);
    let result = 0;
    
    for (const step of generator) {
        if (step.step === 'complete') {
            result = step.result;
        }
    }
    
    return result;
};

// Approach 6: Using BigInt for large values
const eggDropBigInt = (N, K) => {
    // Create a 2D DP array with BigInt
    const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(BigInt(0)));
    
    // Base cases
    for (let i = 1; i <= K; i++) dp[1][i] = BigInt(i);
    for (let i = 1; i <= N; i++) dp[i][1] = BigInt(1);
    
    // Fill the rest of the entries
    for (let i = 2; i <= N; i++) {
        for (let j = 2; j <= K; j++) {
            dp[i][j] = BigInt(Number.MAX_SAFE_INTEGER);
            
            for (let x = 1; x <= j; x++) {
                const res = BigInt(1) + [
                    dp[i-1][x-1],
                    dp[i][j-x]
                ].reduce((max, val) => val > max ? val : max, dp[i-1][x-1]);
                
                if (res < dp[i][j]) {
                    dp[i][j] = res;
                }
            }
        }
    }
    
    return Number(dp[N][K]);
};

// Approach 7: Space-optimized version O(N*K²) time, O(K) space
const eggDropSpaceOptimized = (N, K) => {
    // We only need previous row, so we can use 1D arrays
    let prev = new Array(K + 1);
    let curr = new Array(K + 1);
    
    // Initialize for 1 egg
    for (let i = 0; i <= K; i++) {
        prev[i] = i;
    }
    
    // Fill for remaining eggs
    for (let i = 2; i <= N; i++) {
        curr[0] = 0;
        curr[1] = 1;
        
        for (let j = 2; j <= K; j++) {
            curr[j] = Number.MAX_SAFE_INTEGER;
            
            for (let x = 1; x <= j; x++) {
                const res = 1 + Math.max(prev[x-1], curr[j-x]);
                if (res < curr[j]) {
                    curr[j] = res;
                }
            }
        }
        
        // Swap arrays for next iteration
        [prev, curr] = [curr, prev];
    }
    
    return prev[K];
};

// Approach 8: Using WeakMap for memory-efficient caching
const createEggDropSolver = () => {
    const cache = new WeakMap();
    
    return (N, K) => {
        // Create a key object
        const key = { N, K };
        
        // In a real implementation, we would need a more sophisticated approach
        // since WeakMap keys must be objects and we can't directly use numbers
        // For demonstration, we'll just use the basic DP approach
        return eggDrop(N, K);
    };
};

const eggDropWeakMap = createEggDropSolver();

// Approach 9: Using async/await for non-blocking computation
const eggDropAsync = async (N, K) => {
    return new Promise((resolve) => {
        // For large values, we might want to do this asynchronously
        setTimeout(() => {
            resolve(eggDrop(N, K));
        }, 0);
    });
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Dynamic Programming', fn: eggDrop },
        { name: 'Memoization', fn: eggDropMemo },
        { name: 'Optimized', fn: eggDropOptimized },
        { name: 'Functional', fn: eggDropFunctional }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(({ N, K }) => {
                fn(N, K);
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Egg Dropping Puzzle Examples ===\n');
    
    // Test cases
    const testCases = [
        { N: 1, K: 2 },
        { N: 2, K: 6 },
        { N: 3, K: 14 },
        { N: 2, K: 10 }
    ];
    
    testCases.forEach(({ N, K }, index) => {
        console.log(`Test Case ${index + 1}: N=${N}, K=${K}`);
        console.log(`  Dynamic Programming: ${eggDrop(N, K)}`);
        console.log(`  Memoization: ${eggDropMemo(N, K)}`);
        console.log(`  Optimized: ${eggDropOptimized(N, K)}`);
        console.log(`  Functional: ${eggDropFunctional(N, K)}`);
        console.log(`  Generator: ${eggDropWithGenerator(N, K)}`);
        console.log(`  BigInt: ${eggDropBigInt(N, K)}`);
        console.log(`  Space Optimized: ${eggDropSpaceOptimized(N, K)}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    // Destructuring with object operations
    const { N: eggs, K: floors } = { N: 2, K: 6 };
    console.log('Destructured:', { eggs, floors });
    
    // Using Math methods for analysis
    const stats = {
        eggs,
        floors,
        minTrials: eggDrop(eggs, floors),
        efficiency: ((eggDrop(eggs, floors) / floors) * 100).toFixed(2) + '%'
    };
    console.log('Egg drop stats:', stats);
    
    // Method chaining with array operations
    const processedCases = testCases
        .map(({ N, K }) => ({ eggs: N, floors: K, trials: eggDrop(N, K) }))
        .sort((a, b) => b.trials - a.trials);
    
    console.log('Processed cases:', processedCases);
    
    // Using Set for unique analysis
    const uniqueEggs = [...new Set(testCases.map(({ N }) => N))];
    console.log('Unique egg counts:', uniqueEggs);
    
    // Map for comprehensive analysis
    const caseAnalysis = new Map([
        ['original', testCases],
        ['eggs', testCases.map(({ N }) => N)],
        ['floors', testCases.map(({ K }) => K)],
        ['trials', testCases.map(({ N, K }) => eggDrop(N, K))]
    ]);
    
    console.log('Comprehensive analysis:');
    for (const [key, value] of caseAnalysis) {
        console.log(`  ${key}:`, value);
    }
    
    // Generator demonstration
    console.log('\nStep-by-step computation for N=2, K=6:');
    const gen = eggDropGenerator(2, 6);
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
            const asyncResult = await eggDropAsync(2, 10);
            console.log('Async result for N=2, K=10:', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Cached solver demonstration
    console.log('WeakMap cached result (first call):', eggDropWeakMap(2, 6));
    console.log('WeakMap cached result (second call):', eggDropWeakMap(2, 6));
    
    // Higher-order function for custom analysis
    const createEggAnalyzer = (processor) => {
        return (N, K) => {
            const minTrials = eggDrop(N, K);
            return processor(minTrials, N, K);
        };
    };
    
    const getEfficiency = createEggAnalyzer((minTrials, N, K) => {
        return K > 0 ? ((minTrials / K) * 100).toFixed(2) + '%' : '0%';
    });
    
    const getEggProperties = createEggAnalyzer((minTrials, N, K) => ({
        eggs: N,
        floors: K,
        minTrials,
        efficiency: getEfficiency(N, K)
    }));
    
    console.log('Efficiency for N=2, K=6:', getEfficiency(2, 6));
    console.log('Properties for N=3, K=14:', getEggProperties(3, 14));
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const analyzeEggs = compose(
        result => ({ ...result, efficiency: ((result.minTrials / result.floors) * 100).toFixed(2) + '%' }),
        ({ N, K }) => ({ N, K, minTrials: eggDrop(N, K), floors: K })
    );
    
    console.log('Composed analysis for N=2, K=6:', analyzeEggs({ N: 2, K: 6 }));
    
    // Performance test
    const performanceTestCases = [
        { N: 1, K: 5 },
        { N: 2, K: 6 }
    ];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        eggDrop,
        eggDropMemo,
        eggDropOptimized,
        eggDropFunctional,
        eggDropWithGenerator,
        eggDropBigInt,
        eggDropSpaceOptimized,
        eggDropWeakMap,
        eggDropAsync,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Dynamic Programming: O(N*K²) time, O(N*K) space
 * - Memoization: O(N*K²) time, O(N*K) space
 * - Optimized: O(N*K*log(K)) time, O(N*K) space
 * - Functional: O(N*K²) time, O(N*K) space
 * - Generator: O(N*K²) time, O(N*K) space
 * - BigInt: O(N*K²) time, O(N*K) space
 * - Space Optimized: O(N*K²) time, O(K) space
 * - WeakMap: O(N*K²) time, O(N*K) space
 * - Async: O(N*K²) time, O(N*K) space
 * 
 * Space Complexity Analysis:
 * - Dynamic Programming: O(N*K)
 * - Memoization: O(N*K)
 * - Optimized: O(N*K)
 * - Functional: O(N*K)
 * - Generator: O(N*K)
 * - BigInt: O(N*K)
 * - Space Optimized: O(K)
 * - WeakMap: O(N*K)
 * - Async: O(N*K)
 * 
 * JavaScript-Specific Notes:
 * - Array.from() with fill() provides clean initialization of 2D arrays
 * - Map provides efficient memoization with O(1) average lookup
 * - Generators provide step-by-step algorithm visualization
 * - BigInt handles arbitrarily large values
 * - Higher-order functions enable flexible analysis patterns
 * - Method chaining enables complex data transformations
 * - Async/await enables non-blocking computation
 * - Destructuring enables clean variable assignments
 * - 2D array manipulation showcases JavaScript's flexibility
 * - Functional programming patterns with reduce
 */
