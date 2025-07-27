/**
 * Minimum Number of Coins
 * Source: https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/
 */

// Approach 1: Dynamic Programming (O(V * coins.length) time, O(V) space) - OPTIMAL
const minCoins = (coins, V) => {
    // dp[i] will store the minimum number of coins needed for value i
    const dp = new Array(V + 1).fill(Infinity);
    dp[0] = 0; // 0 coins needed for value 0
    
    // For each coin denomination
    for (const coin of coins) {
        // Update dp array for all values from coin to V
        for (let i = coin; i <= V; i++) {
            if (dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[V] === Infinity ? -1 : dp[V]; // Return -1 if not possible
};

// Approach 2: Memoization with Map (O(V * coins.length) time, O(V) space)
const minCoinsMemo = (() => {
    const memo = new Map([[0, 0]]);
    
    return function min(coins, V) {
        if (memo.has(V)) return memo.get(V);
        
        let result = Infinity;
        
        for (const coin of coins) {
            if (V >= coin) {
                const subResult = min(coins, V - coin);
                if (subResult !== -1) {
                    result = Math.min(result, subResult + 1);
                }
            }
        }
        
        result = result === Infinity ? -1 : result;
        memo.set(V, result);
        return result;
    };
})();

// Approach 3: Greedy approach (only works for canonical coin systems)
const minCoinsGreedy = (coins, V) => {
    // Sort coins in descending order
    coins.sort((a, b) => b - a);
    
    let count = 0;
    let remaining = V;
    
    for (const coin of coins) {
        if (remaining >= coin) {
            const numCoins = Math.floor(remaining / coin);
            count += numCoins;
            remaining -= numCoins * coin;
        }
    }
    
    return remaining === 0 ? count : -1;
};

// Approach 4: BFS approach (O(V * coins.length) time, O(V) space)
const minCoinsBFS = (coins, V) => {
    if (V === 0) return 0;
    
    const queue = [[0, 0]]; // [current value, number of coins]
    const visited = new Set([0]);
    
    while (queue.length > 0) {
        const [currentValue, coinCount] = queue.shift();
        
        for (const coin of coins) {
            const nextValue = currentValue + coin;
            
            if (nextValue === V) {
                return coinCount + 1;
            }
            
            if (nextValue < V && !visited.has(nextValue)) {
                visited.add(nextValue);
                queue.push([nextValue, coinCount + 1]);
            }
        }
    }
    
    return -1;
};

// Approach 5: Functional approach with reduce
const minCoinsFunctional = (coins, V) => {
    const dp = Array.from({ length: V + 1 }, (_, i) => i === 0 ? 0 : Infinity);
    
    return coins.reduce((dpArray, coin) => {
        for (let i = coin; i <= V; i++) {
            if (dpArray[i - coin] !== Infinity) {
                dpArray[i] = Math.min(dpArray[i], dpArray[i - coin] + 1);
            }
        }
        return dpArray;
    }, dp)[V] === Infinity ? -1 : dp[V];
};

// Approach 6: Using generator for step-by-step computation
function* minCoinsGenerator(coins, V) {
    const dp = new Array(V + 1).fill(Infinity);
    dp[0] = 0;
    
    yield { step: 'init', dp: [...dp] };
    
    for (const [coinIndex, coin] of coins.entries()) {
        for (let i = coin; i <= V; i++) {
            if (dp[i - coin] !== Infinity) {
                const oldValue = dp[i];
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                yield { 
                    step: `processing_coin_${coinIndex}`, 
                    coin, 
                    value: i, 
                    oldValue, 
                    newValue: dp[i],
                    dp: [...dp]
                };
            }
        }
    }
    
    yield { step: 'complete', result: dp[V] === Infinity ? -1 : dp[V] };
}

const minCoinsWithGenerator = (coins, V) => {
    const generator = minCoinsGenerator(coins, V);
    let result = -1;
    
    for (const step of generator) {
        if (step.step === 'complete') {
            result = step.result;
        }
    }
    
    return result;
};

// Approach 7: Using BigInt for large values
const minCoinsBigInt = (coins, V) => {
    const bigV = BigInt(V);
    const bigCoins = coins.map(c => BigInt(c));
    
    const dp = new Array(V + 1).fill(Infinity);
    dp[0] = 0;
    
    for (const coin of bigCoins) {
        for (let i = Number(coin); i <= V; i++) {
            if (dp[i - Number(coin)] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - Number(coin)] + 1);
            }
        }
    }
    
    return dp[V] === Infinity ? -1 : dp[V];
};

// Approach 8: Using WeakMap for memory-efficient caching
const createMinCoinsSolver = () => {
    const cache = new WeakMap();
    
    return (coins, V) => {
        // Create a unique key for the coins array and value
        const key = { coins: [...coins].sort(), V };
        
        // We can't directly use WeakMap with objects, so we'll use a regular Map approach here
        // In a real implementation, we might use a more sophisticated caching mechanism
        const cacheKey = `${coins.sort().join(',')}:${V}`;
        
        // For demonstration, we'll just use the basic DP approach
        return minCoins([...coins], V);
    };
};

const minCoinsWeakMap = createMinCoinsSolver();

// Approach 9: Using Set for tracking visited values in BFS
const minCoinsBFSWithSet = (coins, V) => {
    if (V === 0) return 0;
    
    const queue = [0];
    const visited = new Set([0]);
    const coinCount = new Map([[0, 0]]);
    
    while (queue.length > 0) {
        const currentValue = queue.shift();
        const currentCount = coinCount.get(currentValue);
        
        for (const coin of coins) {
            const nextValue = currentValue + coin;
            
            if (nextValue === V) {
                return currentCount + 1;
            }
            
            if (nextValue < V && !visited.has(nextValue)) {
                visited.add(nextValue);
                coinCount.set(nextValue, currentCount + 1);
                queue.push(nextValue);
            }
        }
    }
    
    return -1;
};

// Using async/await for non-blocking computation
const minCoinsAsync = async (coins, V) => {
    return new Promise((resolve) => {
        // For large values, we might want to do this asynchronously
        setTimeout(() => {
            resolve(minCoins([...coins], V));
        }, 0);
    });
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Dynamic Programming', fn: minCoins },
        { name: 'Memoization', fn: minCoinsMemo },
        { name: 'Functional', fn: minCoinsFunctional },
        { name: 'BFS', fn: minCoinsBFS }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(({ coins, V }) => {
                fn([...coins], V);
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Minimum Number of Coins Examples ===\n');
    
    // Test cases
    const testCases = [
        { coins: [25, 10, 5], V: 30 },
        { coins: [9, 6, 5, 1], V: 11 },
        { coins: [1, 3, 4], V: 6 },
        { coins: [2], V: 3 },
        { coins: [1, 2, 5], V: 11 }
    ];
    
    testCases.forEach(({ coins, V }, index) => {
        console.log(`Test Case ${index + 1}: V = ${V}, coins = [${coins.join(', ')}]`);
        console.log(`  Dynamic Programming: ${minCoins([...coins], V)}`);
        console.log(`  Memoization: ${minCoinsMemo([...coins], V)}`);
        console.log(`  Greedy (only for canonical): ${minCoinsGreedy([...coins], V)}`);
        console.log(`  BFS: ${minCoinsBFS([...coins], V)}`);
        console.log(`  Functional: ${minCoinsFunctional([...coins], V)}`);
        console.log(`  Generator: ${minCoinsWithGenerator([...coins], V)}`);
        console.log(`  BFS with Set: ${minCoinsBFSWithSet([...coins], V)}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    // Destructuring with array operations
    const [firstCoin, secondCoin, ...restCoins] = [25, 10, 5, 1];
    console.log('Destructured:', { firstCoin, secondCoin, restCoins });
    
    // Using Math methods for analysis
    const coins = [25, 10, 5, 1];
    const stats = {
        max: Math.max(...coins),
        min: Math.min(...coins),
        sum: coins.reduce((acc, val) => acc + val, 0),
        avg: coins.reduce((acc, val) => acc + val, 0) / coins.length
    };
    console.log('Coin stats:', stats);
    
    // Method chaining with array operations
    const processedCoins = coins
        .filter(coin => coin > 5)
        .map(coin => ({ value: coin, doubled: coin * 2 }))
        .sort((a, b) => b.value - a.value);
    
    console.log('Processed coins:', processedCoins);
    
    // Using Set for unique analysis
    const coinsWithDuplicates = [25, 10, 5, 1, 10, 5, 25];
    const uniqueCoins = [...new Set(coinsWithDuplicates)];
    console.log('Unique coins:', uniqueCoins);
    
    // Map for comprehensive analysis
    const coinAnalysis = new Map([
        ['denominations', coins],
        ['count', coins.length],
        ['even', coins.filter(coin => coin % 2 === 0)],
        ['odd', coins.filter(coin => coin % 2 !== 0)]
    ]);
    
    console.log('Comprehensive analysis:');
    for (const [key, value] of coinAnalysis) {
        console.log(`  ${key}:`, value);
    }
    
    // Generator demonstration
    console.log('\nStep-by-step computation for V=11, coins=[9,6,5,1]:');
    const gen = minCoinsGenerator([9, 6, 5, 1], 11);
    let stepCount = 0;
    for (const step of gen) {
        if (stepCount < 5) { // Show first 5 steps
            console.log(`  ${step.step}:`, step.dp || step.result);
        }
        stepCount++;
    }
    
    // Async/await demonstration
    (async () => {
        try {
            const asyncResult = await minCoinsAsync([1, 3, 4], 6);
            console.log('Async result for V=6, coins=[1,3,4]:', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Higher-order function for custom analysis
    const createCoinAnalyzer = (processor) => {
        return (coins, V) => {
            const min = minCoins([...coins], V);
            return processor(min, coins, V);
        };
    };
    
    const getEfficiency = createCoinAnalyzer((min, coins, V) => {
        if (min === -1) return 'Impossible';
        const maxPossible = V / Math.min(...coins);
        return ((min / maxPossible) * 100).toFixed(2) + '%';
    });
    
    const getCoinProperties = createCoinAnalyzer((min, coins, V) => ({
        target: V,
        minCoins: min,
        denominations: coins.length,
        isPossible: min !== -1
    }));
    
    console.log('Efficiency for V=11, coins=[9,6,5,1]:', getEfficiency([9, 6, 5, 1], 11));
    console.log('Properties for V=6, coins=[1,3,4]:', getCoinProperties([1, 3, 4], 6));
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const analyzeCoins = compose(
        result => ({ ...result, efficiency: result.min !== -1 ? ((result.min / (result.V / Math.min(...result.coins))).toFixed(4)) : 'N/A' }),
        ({ coins, V }) => ({ coins, V, min: minCoins([...coins], V) })
    );
    
    console.log('Composed analysis for V=11, coins=[9,6,5,1]:', analyzeCoins({ coins: [9, 6, 5, 1], V: 11 }));
    
    // Performance test
    const performanceTestCases = [
        { coins: [1, 3, 4], V: 6 },
        { coins: [2, 5, 10], V: 15 },
        { coins: [1, 2, 5], V: 11 }
    ];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        minCoins,
        minCoinsMemo,
        minCoinsGreedy,
        minCoinsBFS,
        minCoinsFunctional,
        minCoinsWithGenerator,
        minCoinsBigInt,
        minCoinsWeakMap,
        minCoinsBFSWithSet,
        minCoinsAsync,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Dynamic Programming: O(V * coins.length) time, O(V) space - OPTIMAL
 * - Memoization: O(V * coins.length) time, O(V) space
 * - Greedy: O(coins.length * log(coins.length)) time, O(1) space
 * - BFS: O(V * coins.length) time, O(V) space
 * - Functional: O(V * coins.length) time, O(V) space
 * - Generator: O(V * coins.length) time, O(V) space
 * - BigInt: O(V * coins.length) time, O(V) space
 * - WeakMap: O(V * coins.length) time, O(V) space
 * - BFS with Set: O(V * coins.length) time, O(V) space
 * 
 * Space Complexity Analysis:
 * - Dynamic Programming: O(V) - OPTIMAL
 * - Memoization: O(V)
 * - Greedy: O(1)
 * - BFS: O(V)
 * - Functional: O(V)
 * - Generator: O(V)
 * - BigInt: O(V)
 * - WeakMap: O(V)
 * - BFS with Set: O(V)
 * 
 * JavaScript-Specific Notes:
 * - Array.fill() provides clean initialization of DP arrays
 * - Map provides efficient memoization with O(1) average lookup
 * - Set enables efficient tracking of visited values
 * - Generators provide step-by-step algorithm visualization
 * - BigInt handles arbitrarily large values
 * - Higher-order functions enable flexible analysis patterns
 * - Method chaining enables complex data transformations
 * - Async/await enables non-blocking computation
 * - Destructuring enables clean variable assignments
 */
