/**
 * Palindrome Partitioning
 * Source: https://www.geeksforgeeks.org/palindrome-partitioning-dp-17/
 */

// Helper function to check if a string is palindrome
const isPalindrome = (str, i, j) => {
    while (i < j) {
        if (str[i] !== str[j]) {
            return false;
        }
        i++;
        j--;
    }
    return true;
};

// Approach 1: Dynamic Programming O(n³) time, O(n²) space
const palindromePartition = (str) => {
    const n = str.length;
    
    // Create a 2D DP array for palindrome checking
    const isPal = Array.from({ length: n }, () => new Array(n).fill(false));
    
    // Fill the palindrome matrix
    for (let gap = 0; gap < n; gap++) {
        for (let i = 0; i < n - gap; i++) {
            const j = i + gap;
            
            if (gap === 0) {
                isPal[i][j] = true;
            } else if (gap === 1) {
                isPal[i][j] = (str[i] === str[j]);
            } else {
                isPal[i][j] = (str[i] === str[j]) && isPal[i + 1][j - 1];
            }
        }
    }
    
    // Create DP array for minimum cuts
    const dp = new Array(n).fill(0);
    
    // Fill the minimum cuts array
    for (let i = 0; i < n; i++) {
        if (isPal[0][i]) {
            dp[i] = 0;
        } else {
            dp[i] = Number.MAX_SAFE_INTEGER;
            for (let j = 0; j < i; j++) {
                if (isPal[j + 1][i]) {
                    dp[i] = Math.min(dp[i], 1 + dp[j]);
                }
            }
        }
    }
    
    return dp[n - 1];
};

// Approach 2: Memoization with Map O(n³) time, O(n²) space
const palindromePartitionMemo = (() => {
    const memo = new Map();
    const palMemo = new Map();
    
    const isPalHelper = (str, i, j) => {
        const key = `${i},${j}`;
        if (palMemo.has(key)) return palMemo.get(key);
        
        if (i >= j) {
            palMemo.set(key, true);
            return true;
        }
        
        if (str[i] !== str[j]) {
            palMemo.set(key, false);
            return false;
        }
        
        const result = isPalHelper(str, i + 1, j - 1);
        palMemo.set(key, result);
        return result;
    };
    
    const partitionHelper = (str, i, n) => {
        if (i >= n - 1) return 0;
        
        const key = `${i},${n}`;
        if (memo.has(key)) return memo.get(key);
        
        if (isPalHelper(str, i, n - 1)) {
            memo.set(key, 0);
            return 0;
        }
        
        let minCuts = Number.MAX_SAFE_INTEGER;
        
        for (let k = i; k < n - 1; k++) {
            if (isPalHelper(str, i, k)) {
                const cuts = 1 + partitionHelper(str, k + 1, n);
                if (cuts < minCuts) {
                    minCuts = cuts;
                }
            }
        }
        
        memo.set(key, minCuts);
        return minCuts;
    };
    
    return (str) => {
        memo.clear();
        palMemo.clear();
        return partitionHelper(str, 0, str.length);
    };
})();

// Approach 3: Optimized DP with precomputed palindromes O(n²) time, O(n²) space
const palindromePartitionOptimized = (str) => {
    const n = str.length;
    
    // Precompute palindromes
    const isPal = Array.from({ length: n }, () => new Array(n).fill(false));
    
    for (let gap = 0; gap < n; gap++) {
        for (let i = 0; i < n - gap; i++) {
            const j = i + gap;
            
            if (gap === 0) {
                isPal[i][j] = true;
            } else if (gap === 1) {
                isPal[i][j] = (str[i] === str[j]);
            } else {
                isPal[i][j] = (str[i] === str[j]) && isPal[i + 1][j - 1];
            }
        }
    }
    
    // DP for minimum cuts
    const dp = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
        if (isPal[0][i]) {
            dp[i] = 0;
        } else {
            dp[i] = Number.MAX_SAFE_INTEGER;
            for (let j = 0; j < i; j++) {
                if (isPal[j + 1][i] && 1 + dp[j] < dp[i]) {
                    dp[i] = 1 + dp[j];
                }
            }
        }
    }
    
    return dp[n - 1];
};

// Approach 4: Functional approach with reduce O(n³) time, O(n²) space
const palindromePartitionFunctional = (str) => {
    const n = str.length;
    
    // Create and initialize palindrome matrix
    const isPal = Array.from({ length: n }, () => new Array(n).fill(false));
    
    // Fill the palindrome matrix using functional approach
    Array.from({ length: n }, (_, gap) => gap).forEach(gap => {
        Array.from({ length: n - gap }, (_, i) => i).forEach(i => {
            const j = i + gap;
            
            if (gap === 0) {
                isPal[i][j] = true;
            } else if (gap === 1) {
                isPal[i][j] = (str[i] === str[j]);
            } else {
                isPal[i][j] = (str[i] === str[j]) && isPal[i + 1][j - 1];
            }
        });
    });
    
    // Create DP array for minimum cuts
    const dp = new Array(n).fill(0);
    
    // Fill the minimum cuts array using functional approach
    Array.from({ length: n }, (_, i) => i).forEach(i => {
        if (isPal[0][i]) {
            dp[i] = 0;
        } else {
            dp[i] = Array.from({ length: i }, (_, j) => j).reduce((minCuts, j) => {
                if (isPal[j + 1][i]) {
                    const cuts = 1 + dp[j];
                    return cuts < minCuts ? cuts : minCuts;
                }
                return minCuts;
            }, Number.MAX_SAFE_INTEGER);
        }
    });
    
    return dp[n - 1];
};

// Approach 5: Using generator for step-by-step computation
function* palindromePartitionGenerator(str) {
    const n = str.length;
    
    // Create a 2D DP array for palindrome checking
    const isPal = Array.from({ length: n }, () => new Array(n).fill(false));
    
    yield { step: 'init', isPal: isPal.map(row => [...row]), message: 'Initialized palindrome matrix' };
    
    // Fill the palindrome matrix
    for (let gap = 0; gap < n; gap++) {
        for (let i = 0; i < n - gap; i++) {
            const j = i + gap;
            
            if (gap === 0) {
                isPal[i][j] = true;
            } else if (gap === 1) {
                isPal[i][j] = (str[i] === str[j]);
            } else {
                isPal[i][j] = (str[i] === str[j]) && isPal[i + 1][j - 1];
            }
        }
        
        yield { 
            step: `processing_gap_${gap}`, 
            isPal: isPal.map(row => [...row])
        };
    }
    
    // Create DP array for minimum cuts
    const dp = new Array(n).fill(0);
    
    // Fill the minimum cuts array
    for (let i = 0; i < n; i++) {
        if (isPal[0][i]) {
            dp[i] = 0;
        } else {
            dp[i] = Number.MAX_SAFE_INTEGER;
            for (let j = 0; j < i; j++) {
                if (isPal[j + 1][i]) {
                    dp[i] = Math.min(dp[i], 1 + dp[j]);
                }
            }
        }
        
        yield { 
            step: `processing_cuts_${i}`, 
            dp: [...dp],
            isPal: isPal.map(row => [...row])
        };
    }
    
    const result = dp[n - 1];
    yield { step: 'complete', result, dp: [...dp], isPal: isPal.map(row => [...row]) };
}

const palindromePartitionWithGenerator = (str) => {
    const generator = palindromePartitionGenerator(str);
    let result = 0;
    
    for (const step of generator) {
        if (step.step === 'complete') {
            result = step.result;
        }
    }
    
    return result;
};

// Approach 6: Using BigInt for large strings
const palindromePartitionBigInt = (str) => {
    const n = str.length;
    
    // Create a 2D DP array for palindrome checking with BigInt
    const isPal = Array.from({ length: n }, () => new Array(n).fill(BigInt(0)));
    
    // Fill the palindrome matrix
    for (let gap = 0; gap < n; gap++) {
        for (let i = 0; i < n - gap; i++) {
            const j = i + gap;
            
            if (gap === 0) {
                isPal[i][j] = BigInt(1);
            } else if (gap === 1) {
                isPal[i][j] = (str[i] === str[j]) ? BigInt(1) : BigInt(0);
            } else {
                isPal[i][j] = (str[i] === str[j]) ? isPal[i + 1][j - 1] : BigInt(0);
            }
        }
    }
    
    // Create DP array for minimum cuts with BigInt
    const dp = new Array(n).fill(BigInt(0));
    
    // Fill the minimum cuts array
    for (let i = 0; i < n; i++) {
        if (isPal[0][i] === BigInt(1)) {
            dp[i] = BigInt(0);
        } else {
            dp[i] = BigInt(Number.MAX_SAFE_INTEGER);
            for (let j = 0; j < i; j++) {
                if (isPal[j + 1][i] === BigInt(1)) {
                    const cuts = BigInt(1) + dp[j];
                    if (cuts < dp[i]) {
                        dp[i] = cuts;
                    }
                }
            }
        }
    }
    
    return Number(dp[n - 1]);
};

// Approach 7: With actual partitioning
const palindromePartitionWithPartitions = (str) => {
    const n = str.length;
    
    // Precompute palindromes
    const isPal = Array.from({ length: n }, () => new Array(n).fill(false));
    
    for (let gap = 0; gap < n; gap++) {
        for (let i = 0; i < n - gap; i++) {
            const j = i + gap;
            
            if (gap === 0) {
                isPal[i][j] = true;
            } else if (gap === 1) {
                isPal[i][j] = (str[i] === str[j]);
            } else {
                isPal[i][j] = (str[i] === str[j]) && isPal[i + 1][j - 1];
            }
        }
    }
    
    // DP for minimum cuts
    const dp = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
        if (isPal[0][i]) {
            dp[i] = 0;
        } else {
            dp[i] = Number.MAX_SAFE_INTEGER;
            for (let j = 0; j < i; j++) {
                if (isPal[j + 1][i] && 1 + dp[j] < dp[i]) {
                    dp[i] = 1 + dp[j];
                }
            }
        }
    }
    
    // Function to get actual partitions
    const getPartitions = (str, isPal, dp) => {
        const partitions = [];
        let i = 0;
        let j = n - 1;
        
        while (i < n) {
            if (isPal[i][j] && dp[j] === (i === 0 ? 0 : dp[i-1] + 1)) {
                partitions.push(str.substring(i, j + 1));
                i = j + 1;
                j = n - 1;
            } else {
                j--;
            }
        }
        
        return partitions;
    };
    
    return {
        minCuts: dp[n - 1],
        partitions: getPartitions(str, isPal, dp)
    };
};

// Approach 8: Using WeakMap for memory-efficient caching
const createPalindromePartitionSolver = () => {
    const cache = new WeakMap();
    
    return (str) => {
        // Create a key object
        const key = { str };
        
        // In a real implementation, we would need a more sophisticated approach
        // since WeakMap keys must be objects and we can't directly use strings
        // For demonstration, we'll just use the basic DP approach
        return palindromePartition(str);
    };
};

const palindromePartitionWeakMap = createPalindromePartitionSolver();

// Approach 9: Using async/await for non-blocking computation
const palindromePartitionAsync = async (str) => {
    return new Promise((resolve) => {
        // For large strings, we might want to do this asynchronously
        setTimeout(() => {
            resolve(palindromePartition(str));
        }, 0);
    });
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Dynamic Programming', fn: palindromePartition },
        { name: 'Memoization', fn: palindromePartitionMemo },
        { name: 'Optimized', fn: palindromePartitionOptimized },
        { name: 'Functional', fn: palindromePartitionFunctional }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(str => {
                fn(str);
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Palindrome Partitioning Examples ===\n');
    
    // Test cases
    const testCases = [
        "ababbbabbababa",
        "aaabba",
        "abcde",
        "racecar"
    ];
    
    testCases.forEach((str, index) => {
        console.log(`Test Case ${index + 1}: "${str}"`);
        console.log(`  Dynamic Programming: ${palindromePartition(str)}`);
        console.log(`  Memoization: ${palindromePartitionMemo(str)}`);
        console.log(`  Optimized: ${palindromePartitionOptimized(str)}`);
        console.log(`  Functional: ${palindromePartitionFunctional(str)}`);
        console.log(`  Generator: ${palindromePartitionWithGenerator(str)}`);
        console.log(`  BigInt: ${palindromePartitionBigInt(str)}`);
        console.log(`  With Partitions:`, palindromePartitionWithPartitions(str));
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    // Destructuring with string operations
    const [firstChar, secondChar, ...restChars] = "ababbbabbababa";
    console.log('Destructured string:', { firstChar, secondChar, restChars });
    
    // Using Math methods for analysis
    const str = "ababbbabbababa";
    const stats = {
        length: str.length,
        minCuts: palindromePartition(str),
        efficiency: ((palindromePartition(str) / str.length) * 100).toFixed(2) + '%'
    };
    console.log('String stats:', stats);
    
    // Method chaining with array operations
    const processedStrings = testCases
        .map(str => ({ original: str, length: str.length, cuts: palindromePartition(str) }))
        .sort((a, b) => b.cuts - a.cuts);
    
    console.log('Processed strings:', processedStrings);
    
    // Using Set for unique analysis
    const allChars = [...new Set([...str])];
    console.log('Unique characters:', allChars);
    
    // Map for comprehensive analysis
    const stringAnalysis = new Map([
        ['original', str],
        ['length', str.length],
        ['palindromes', [...str].filter((char, i) => 
            [...str.substring(0, i+1)].reverse().join('') === str.substring(0, i+1))],
        ['uniqueChars', [...new Set([...str])]]
    ]);
    
    console.log('Comprehensive analysis:');
    for (const [key, value] of stringAnalysis) {
        console.log(`  ${key}:`, value);
    }
    
    // Generator demonstration
    console.log('\nStep-by-step computation for "aaabba":');
    const gen = palindromePartitionGenerator("aaabba");
    let stepCount = 0;
    for (const step of gen) {
        if (stepCount < 3) { // Show first 3 steps
            console.log(`  ${step.step}:`, step.isPal ? `isPal[${step.isPal.length}][${step.isPal[0].length}]` : step.result);
        }
        stepCount++;
    }
    
    // Async/await demonstration
    (async () => {
        try {
            const asyncResult = await palindromePartitionAsync("ababbbabbababa");
            console.log('Async result for "ababbbabbababa":', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Cached solver demonstration
    console.log('WeakMap cached result (first call):', palindromePartitionWeakMap("aaabba"));
    console.log('WeakMap cached result (second call):', palindromePartitionWeakMap("aaabba"));
    
    // Higher-order function for custom analysis
    const createStringAnalyzer = (processor) => {
        return (str) => {
            const minCuts = palindromePartition(str);
            return processor(minCuts, str);
        };
    };
    
    const getEfficiency = createStringAnalyzer((minCuts, str) => {
        return str.length > 0 ? ((minCuts / str.length) * 100).toFixed(2) + '%' : '0%';
    });
    
    const getStringProperties = createStringAnalyzer((minCuts, str) => ({
        length: str.length,
        minCuts,
        efficiency: getEfficiency(str)
    }));
    
    console.log('Efficiency for "ababbbabbababa":', getEfficiency("ababbbabbababa"));
    console.log('Properties for "aaabba":', getStringProperties("aaabba"));
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const analyzeString = compose(
        result => ({ ...result, efficiency: ((result.minCuts / result.length) * 100).toFixed(2) + '%' }),
        (str) => ({ str, minCuts: palindromePartition(str), length: str.length })
    );
    
    console.log('Composed analysis for "abcde":', analyzeString("abcde"));
    
    // Performance test
    const performanceTestCases = [
        "abcde",
        "aaabba"
    ];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        palindromePartition,
        palindromePartitionMemo,
        palindromePartitionOptimized,
        palindromePartitionFunctional,
        palindromePartitionWithGenerator,
        palindromePartitionBigInt,
        palindromePartitionWithPartitions,
        palindromePartitionWeakMap,
        palindromePartitionAsync,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Dynamic Programming: O(n³) time, O(n²) space
 * - Memoization: O(n³) time, O(n²) space
 * - Optimized: O(n²) time, O(n²) space
 * - Functional: O(n³) time, O(n²) space
 * - Generator: O(n³) time, O(n²) space
 * - BigInt: O(n³) time, O(n²) space
 * - With Partitions: O(n²) time, O(n²) space
 * - WeakMap: O(n³) time, O(n²) space
 * - Async: O(n³) time, O(n²) space
 * 
 * Space Complexity Analysis:
 * - Dynamic Programming: O(n²)
 * - Memoization: O(n²)
 * - Optimized: O(n²)
 * - Functional: O(n²)
 * - Generator: O(n²)
 * - BigInt: O(n²)
 * - With Partitions: O(n²)
 * - WeakMap: O(n²)
 * - Async: O(n²)
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
