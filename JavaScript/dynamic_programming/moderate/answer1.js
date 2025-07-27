/**
 * Longest Increasing Subsequence
 * Source: https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/
 */

// Approach 1: Dynamic Programming O(n²) time, O(n) space
const lis = (arr) => {
    if (!arr || arr.length === 0) return 0;
    
    const n = arr.length;
    const dp = new Array(n).fill(1); // Each element forms a subsequence of length 1
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
};

// Approach 2: Binary Search O(n log n) time, O(n) space - OPTIMAL
const lisBinarySearch = (arr) => {
    if (!arr || arr.length === 0) return 0;
    
    const tails = []; // tails[i] stores the smallest tail of all increasing subsequences of length i+1
    
    for (const num of arr) {
        let left = 0;
        let right = tails.length;
        
        // Binary search for the position to insert/replace
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // If num is larger than all elements in tails, append it
        if (left === tails.length) {
            tails.push(num);
        } else {
            // Replace the element at position left
            tails[left] = num;
        }
    }
    
    return tails.length;
};

// Approach 3: Memoization with Map O(n²) time, O(n²) space
const lisMemo = (() => {
    const memo = new Map();
    
    const lisHelper = (arr, index, prevIndex) => {
        // Create a unique key for memoization
        const key = `${index},${prevIndex}`;
        if (memo.has(key)) return memo.get(key);
        
        if (index === arr.length) return 0;
        
        // Exclude current element
        let result = lisHelper(arr, index + 1, prevIndex);
        
        // Include current element if it forms an increasing subsequence
        if (prevIndex === -1 || arr[index] > arr[prevIndex]) {
            result = Math.max(result, 1 + lisHelper(arr, index + 1, index));
        }
        
        memo.set(key, result);
        return result;
    };
    
    return (arr) => {
        memo.clear(); // Clear memo for each new array
        return lisHelper(arr, 0, -1);
    };
})();

// Approach 4: Functional approach with reduce O(n²) time, O(n) space
const lisFunctional = (arr) => {
    if (!arr || arr.length === 0) return 0;
    
    return arr.reduce((dp, current, i) => {
        dp[i] = 1 + arr.slice(0, i).reduce((maxLen, prev, j) => {
            return prev < current ? Math.max(maxLen, dp[j]) : maxLen;
        }, 0);
        return dp;
    }, new Array(arr.length).fill(0)).reduce((max, len) => Math.max(max, len), 0);
};

// Approach 5: Using generator for step-by-step computation
function* lisGenerator(arr) {
    if (!arr || arr.length === 0) {
        yield { step: 'complete', result: 0 };
        return;
    }
    
    const n = arr.length;
    const dp = new Array(n).fill(1);
    
    yield { step: 'init', dp: [...dp], message: 'Initialized DP array' };
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                const oldValue = dp[i];
                dp[i] = Math.max(dp[i], dp[j] + 1);
                yield { 
                    step: `processing_element_${i}`, 
                    element: arr[i],
                    comparedWith: arr[j],
                    oldValue, 
                    newValue: dp[i],
                    dp: [...dp]
                };
            }
        }
    }
    
    const result = Math.max(...dp);
    yield { step: 'complete', result, dp: [...dp] };
}

const lisWithGenerator = (arr) => {
    const generator = lisGenerator(arr);
    let result = 0;
    
    for (const step of generator) {
        if (step.step === 'complete') {
            result = step.result;
        }
    }
    
    return result;
};

// Approach 6: Using BigInt for large arrays
const lisBigInt = (arr) => {
    if (!arr || arr.length === 0) return 0;
    
    const n = arr.length;
    const dp = new Array(n).fill(BigInt(1));
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                dp[i] = dp[i] > dp[j] + BigInt(1) ? dp[i] : dp[j] + BigInt(1);
            }
        }
    }
    
    return Number(dp.reduce((max, len) => len > max ? len : max, BigInt(0)));
};

// Approach 7: Using Set for tracking unique subsequences
const lisWithSet = (arr) => {
    if (!arr || arr.length === 0) return 0;
    
    const n = arr.length;
    const dp = new Array(n).fill(1);
    const subsequences = new Array(n).fill(null).map(() => new Set());
    
    // Initialize each element as its own subsequence
    for (let i = 0; i < n; i++) {
        subsequences[i].add(arr[i]);
    }
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                // Merge subsequences
                subsequences[i] = new Set([...subsequences[j], arr[i]]);
            }
        }
    }
    
    return Math.max(...dp);
};

// Approach 8: Using WeakMap for memory-efficient caching
const createLisSolver = () => {
    const cache = new WeakMap();
    
    return (arr) => {
        if (cache.has(arr)) return cache.get(arr);
        
        const result = lis([...arr]); // Use basic DP approach
        cache.set(arr, result);
        return result;
    };
};

const lisWeakMap = createLisSolver();

// Approach 9: Using async/await for non-blocking computation
const lisAsync = async (arr) => {
    return new Promise((resolve) => {
        // For large arrays, we might want to do this asynchronously
        setTimeout(() => {
            resolve(lis([...arr]));
        }, 0);
    });
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Dynamic Programming', fn: lis },
        { name: 'Binary Search', fn: lisBinarySearch },
        { name: 'Memoization', fn: lisMemo },
        { name: 'Functional', fn: lisFunctional }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(arr => {
                fn([...arr]);
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Longest Increasing Subsequence Examples ===\n');
    
    // Test cases
    const testCases = [
        [10, 22, 9, 33, 21, 50, 41, 60, 80],
        [3, 10, 2, 1, 20],
        [10, 9, 2, 5, 3, 7, 101, 18],
        [0, 1, 0, 3, 2, 3],
        [7, 7, 7, 7, 7, 7, 7]
    ];
    
    testCases.forEach((arr, index) => {
        console.log(`Test Case ${index + 1}: [${arr.join(', ')}]`);
        console.log(`  Dynamic Programming: ${lis([...arr])}`);
        console.log(`  Binary Search: ${lisBinarySearch([...arr])}`);
        console.log(`  Memoization: ${lisMemo([...arr])}`);
        console.log(`  Functional: ${lisFunctional([...arr])}`);
        console.log(`  Generator: ${lisWithGenerator([...arr])}`);
        console.log(`  BigInt: ${lisBigInt([...arr])}`);
        console.log(`  Set-based: ${lisWithSet([...arr])}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    // Destructuring with array operations
    const [first, second, ...rest] = [10, 22, 9, 33, 21, 50, 41, 60, 80];
    console.log('Destructured:', { first, second, rest });
    
    // Using Math methods for analysis
    const sequence = [10, 22, 9, 33, 21, 50, 41, 60, 80];
    const stats = {
        max: Math.max(...sequence),
        min: Math.min(...sequence),
        length: sequence.length
    };
    console.log('Sequence stats:', stats);
    
    // Method chaining with array operations
    const processedSeq = sequence
        .filter(n => n > 20)
        .map(n => ({ value: n, doubled: n * 2 }))
        .sort((a, b) => b.value - a.value);
    
    console.log('Processed sequence:', processedSeq);
    
    // Using Set for unique analysis
    const seqWithDuplicates = [10, 22, 9, 33, 21, 50, 41, 60, 80, 22, 9];
    const uniqueSeq = [...new Set(seqWithDuplicates)];
    console.log('Unique sequence:', uniqueSeq);
    
    // Map for comprehensive analysis
    const seqAnalysis = new Map([
        ['original', sequence],
        ['length', sequence.length],
        ['even', sequence.filter(n => n % 2 === 0)],
        ['odd', sequence.filter(n => n % 2 !== 0)]
    ]);
    
    console.log('Comprehensive analysis:');
    for (const [key, value] of seqAnalysis) {
        console.log(`  ${key}:`, value);
    }
    
    // Generator demonstration
    console.log('\nStep-by-step computation for [10, 9, 2, 5, 3]:');
    const gen = lisGenerator([10, 9, 2, 5, 3]);
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
            const asyncResult = await lisAsync([0, 1, 0, 3, 2, 3]);
            console.log('Async result for [0, 1, 0, 3, 2, 3]:', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Cached solver demonstration
    console.log('WeakMap cached result (first call):', lisWeakMap([7, 7, 7, 7, 7, 7, 7]));
    console.log('WeakMap cached result (second call):', lisWeakMap([7, 7, 7, 7, 7, 7, 7]));
    
    // Higher-order function for custom analysis
    const createSeqAnalyzer = (processor) => {
        return (arr) => {
            const lisLength = lis([...arr]);
            return processor(lisLength, arr);
        };
    };
    
    const getEfficiency = createSeqAnalyzer((lisLength, arr) => {
        return ((lisLength / arr.length) * 100).toFixed(2) + '%';
    });
    
    const getSeqProperties = createSeqAnalyzer((lisLength, arr) => ({
        length: arr.length,
        lisLength,
        efficiency: ((lisLength / arr.length) * 100).toFixed(2) + '%'
    }));
    
    console.log('Efficiency for [10, 22, 9, 33, 21, 50, 41, 60, 80]:', getEfficiency([10, 22, 9, 33, 21, 50, 41, 60, 80]));
    console.log('Properties for [0, 1, 0, 3, 2, 3]:', getSeqProperties([0, 1, 0, 3, 2, 3]));
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const analyzeSeq = compose(
        result => ({ ...result, efficiency: ((result.lisLength / result.arr.length) * 100).toFixed(2) + '%' }),
        (arr) => ({ arr, lisLength: lis([...arr]) })
    );
    
    console.log('Composed analysis for [7, 7, 7, 7, 7, 7, 7]:', analyzeSeq([7, 7, 7, 7, 7, 7, 7]));
    
    // Performance test
    const performanceTestCases = [
        [10, 9, 2, 5, 3, 7, 101, 18],
        [0, 1, 0, 3, 2, 3],
        [7, 7, 7, 7, 7, 7, 7]
    ];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        lis,
        lisBinarySearch,
        lisMemo,
        lisFunctional,
        lisWithGenerator,
        lisBigInt,
        lisWithSet,
        lisWeakMap,
        lisAsync,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Dynamic Programming: O(n²) time, O(n) space
 * - Binary Search: O(n log n) time, O(n) space - OPTIMAL
 * - Memoization: O(n²) time, O(n²) space
 * - Functional: O(n²) time, O(n) space
 * - Generator: O(n²) time, O(n) space
 * - BigInt: O(n²) time, O(n) space
 * - Set-based: O(n²) time, O(n²) space
 * - WeakMap: O(n²) time, O(n) space
 * - Async: O(n²) time, O(n) space
 * 
 * Space Complexity Analysis:
 * - Dynamic Programming: O(n)
 * - Binary Search: O(n) - OPTIMAL
 * - Memoization: O(n²)
 * - Functional: O(n)
 * - Generator: O(n)
 * - BigInt: O(n)
 * - Set-based: O(n²)
 * - WeakMap: O(n)
 * - Async: O(n)
 * 
 * JavaScript-Specific Notes:
 * - Array.fill() provides clean initialization of DP arrays
 * - Map provides efficient memoization with O(1) average lookup
 * - Set enables tracking of unique subsequences
 * - Generators provide step-by-step algorithm visualization
 * - BigInt handles arbitrarily large values
 * - Higher-order functions enable flexible analysis patterns
 * - Method chaining enables complex data transformations
 * - Async/await enables non-blocking computation
 * - Destructuring enables clean variable assignments
 * - Binary search implementation showcases algorithmic thinking
 */
