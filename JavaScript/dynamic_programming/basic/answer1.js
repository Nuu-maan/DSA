/**
 * Fibonacci Numbers
 * Source: https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/
 */

// Approach 1: Iterative with O(1) space - OPTIMAL
const fibonacci = (n) => {
    if (n <= 1) return n;
    
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b]; // ES6 destructuring swap
    }
    return b;
};

// Approach 2: Memoization with Map (O(n) time, O(n) space)
const fibonacciMemo = (() => {
    const memo = new Map([[0, 0], [1, 1]]);
    
    return function fib(n) {
        if (memo.has(n)) return memo.get(n);
        
        const result = fib(n - 1) + fib(n - 2);
        memo.set(n, result);
        return result;
    };
})();

// Approach 3: Dynamic Programming with array (O(n) time, O(n) space)
const fibonacciDP = (n) => {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
};

// Approach 4: Recursive with memoization using object
const fibonacciRecursiveMemo = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacciRecursiveMemo(n - 1, memo) + fibonacciRecursiveMemo(n - 2, memo);
    return memo[n];
};

// Approach 5: Using generator for sequence generation
function* fibonacciGenerator() {
    let a = 0, b = 1;
    yield a;
    yield b;
    
    while (true) {
        [a, b] = [b, a + b];
        yield b;
    }
}

const fibonacciWithGenerator = (n) => {
    if (n < 0) return undefined;
    
    const gen = fibonacciGenerator();
    let result;
    for (let i = 0; i <= n; i++) {
        result = gen.next().value;
    }
    return result;
};

// Approach 6: Functional approach with reduce
const fibonacciFunctional = (n) => {
    if (n <= 1) return n;
    
    return Array.from({ length: n - 1 }, (_, i) => i).reduce(
        (acc) => [acc[1], acc[0] + acc[1]],
        [0, 1]
    )[1];
};

// Approach 7: Using BigInt for large numbers
const fibonacciBigInt = (n) => {
    if (n <= 1) return BigInt(n);
    
    let a = BigInt(0), b = BigInt(1);
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
};

// Approach 8: Matrix exponentiation (advanced)
const fibonacciMatrix = (n) => {
    if (n <= 1) return n;
    
    const multiply = (F, M) => {
        const x = F[0][0] * M[0][0] + F[0][1] * M[1][0];
        const y = F[0][0] * M[0][1] + F[0][1] * M[1][1];
        const z = F[1][0] * M[0][0] + F[1][1] * M[1][0];
        const w = F[1][0] * M[0][1] + F[1][1] * M[1][1];
        
        F[0][0] = x;
        F[0][1] = y;
        F[1][0] = z;
        F[1][1] = w;
    };
    
    const power = (F, n) => {
        if (n === 0 || n === 1) return;
        
        const M = [[1, 1], [1, 0]];
        power(F, Math.floor(n / 2));
        multiply(F, F);
        
        if (n % 2 !== 0) {
            multiply(F, M);
        }
    };
    
    const F = [[1, 1], [1, 0]];
    if (n === 0) return 0;
    power(F, n - 1);
    return F[0][0];
};

// Approach 9: Using WeakMap for memory-efficient caching
const createFibonacciSolver = () => {
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
            result = n;
        } else {
            result = fibonacci(n - 1) + fibonacci(n - 2);
        }
        
        cache.set(key, result);
        return result;
    };
};

const fibonacciWeakMap = createFibonacciSolver();

// Using async/await for non-blocking computation
const fibonacciAsync = async (n) => {
    return new Promise((resolve) => {
        // For large numbers, we might want to do this asynchronously
        setTimeout(() => {
            resolve(fibonacci(n));
        }, 0);
    });
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Iterative', fn: fibonacci },
        { name: 'Memoization', fn: fibonacciMemo },
        { name: 'Dynamic Programming', fn: fibonacciDP },
        { name: 'Recursive Memo', fn: fibonacciRecursiveMemo },
        { name: 'Functional', fn: fibonacciFunctional }
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
    console.log('=== Fibonacci Examples ===\n');
    
    // Test cases
    const testCases = [0, 1, 5, 9, 10, 15];
    
    testCases.forEach(n => {
        console.log(`Fibonacci(${n}):`);
        console.log(`  Iterative: ${fibonacci(n)}`);
        console.log(`  Memoization: ${fibonacciMemo(n)}`);
        console.log(`  DP: ${fibonacciDP(n)}`);
        console.log(`  Recursive Memo: ${fibonacciRecursiveMemo(n)}`);
        console.log(`  Generator: ${fibonacciWithGenerator(n)}`);
        console.log(`  Functional: ${fibonacciFunctional(n)}`);
        console.log(`  BigInt: ${fibonacciBigInt(n)}`);
        console.log(`  Matrix: ${fibonacciMatrix(n)}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    // Destructuring with array operations
    const [first, second, ...rest] = [0, 1, 1, 2, 3, 5, 8, 13];
    console.log('Destructured:', { first, second, rest });
    
    // Using Math methods for analysis
    const fibSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
    const stats = {
        max: Math.max(...fibSequence),
        min: Math.min(...fibSequence),
        sum: fibSequence.reduce((acc, val) => acc + val, 0)
    };
    console.log('Fibonacci stats:', stats);
    
    // Method chaining with array operations
    const processedFibs = fibSequence
        .filter(n => n > 1)
        .map(n => ({ value: n, square: n * n }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);
    
    console.log('Processed Fibonacci numbers:', processedFibs);
    
    // Using Set for unique analysis
    const fibsWithDuplicates = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 1, 2, 3];
    const uniqueFibs = [...new Set(fibsWithDuplicates)];
    console.log('Unique Fibonacci numbers:', uniqueFibs);
    
    // Map for comprehensive analysis
    const fibAnalysis = new Map([
        ['sequence', fibSequence],
        ['length', fibSequence.length],
        ['even', fibSequence.filter(n => n % 2 === 0)],
        ['odd', fibSequence.filter(n => n % 2 !== 0)]
    ]);
    
    console.log('Comprehensive analysis:');
    for (const [key, value] of fibAnalysis) {
        console.log(`  ${key}:`, value);
    }
    
    // Generator demonstration
    console.log('\nFirst 10 Fibonacci numbers using generator:');
    const gen = fibonacciGenerator();
    const firstTen = [];
    for (let i = 0; i < 10; i++) {
        firstTen.push(gen.next().value);
    }
    console.log('First 10:', firstTen);
    
    // Async/await demonstration
    (async () => {
        try {
            const asyncResult = await fibonacciAsync(20);
            console.log('Async result for F(20):', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Cached solver demonstration
    console.log('WeakMap cached result (first call):', fibonacciWeakMap(15));
    console.log('WeakMap cached result (second call):', fibonacciWeakMap(15));
    
    // Higher-order function for custom analysis
    const createFibAnalyzer = (processor) => {
        return (n) => {
            const fib = fibonacci(n);
            return processor(fib, n);
        };
    };
    
    const getGoldenRatio = createFibAnalyzer((fib, n) => {
        if (n < 2) return 'N/A';
        const prevFib = fibonacci(n - 1);
        return (fib / prevFib).toFixed(6);
    });
    
    const getFibProperties = createFibAnalyzer((fib, n) => ({
        value: fib,
        index: n,
        isEven: fib % 2 === 0,
        digitCount: fib.toString().length
    }));
    
    console.log('Golden ratio approximation for F(10)/F(9):', getGoldenRatio(10));
    console.log('Properties of F(15):', getFibProperties(15));
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const analyzeFib = compose(
        result => ({ ...result, ratio: result.n > 0 ? (result.fib / fibonacci(result.n - 1)).toFixed(4) : 'N/A' }),
        n => ({ n, fib: fibonacci(n) })
    );
    
    console.log('Composed analysis for F(12):', analyzeFib(12));
    
    // Performance test
    const performanceTestCases = [10, 20, 30];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fibonacci,
        fibonacciMemo,
        fibonacciDP,
        fibonacciRecursiveMemo,
        fibonacciWithGenerator,
        fibonacciFunctional,
        fibonacciBigInt,
        fibonacciMatrix,
        fibonacciWeakMap,
        fibonacciAsync,
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
 * - Matrix: O(log n) time, O(1) space - MOST EFFICIENT
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
 * - Matrix: O(1) - MOST EFFICIENT
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
 */
