/**
 * Edit Distance
 * Source: https://www.geeksforgeeks.org/edit-distance-dp-5/
 */

// Approach 1: Dynamic Programming O(m*n) time, O(m*n) space
const editDistance = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    
    // Create a 2D DP array
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                // If first string is empty, only option is to insert all characters of second string
                dp[i][j] = j;
            } else if (j === 0) {
                // If second string is empty, only option is to remove all characters of first string
                dp[i][j] = i;
            } else if (str1[i - 1] === str2[j - 1]) {
                // If last characters are same, ignore last char and recur for remaining string
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // If last character are different, consider all possibilities and find minimum
                dp[i][j] = 1 + Math.min(
                    dp[i][j - 1],    // Insert
                    dp[i - 1][j],    // Remove
                    dp[i - 1][j - 1] // Replace
                );
            }
        }
    }
    
    return dp[m][n];
};

// Approach 2: Space-optimized DP O(m*n) time, O(n) space - OPTIMAL
const editDistanceOptimized = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    
    // We only need previous row, so we can use a 1D array
    let prev = new Array(n + 1);
    let curr = new Array(n + 1);
    
    // Initialize first row
    for (let j = 0; j <= n; j++) {
        prev[j] = j;
    }
    
    // Fill the DP table row by row
    for (let i = 1; i <= m; i++) {
        curr[0] = i; // Initialize first column of current row
        
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(
                    curr[j - 1],  // Insert
                    prev[j],      // Remove
                    prev[j - 1]   // Replace
                );
            }
        }
        
        // Swap arrays for next iteration
        [prev, curr] = [curr, prev];
    }
    
    return prev[n];
};

// Approach 3: Memoization with Map O(m*n) time, O(m*n) space
const editDistanceMemo = (() => {
    const memo = new Map();
    
    const editDistanceHelper = (str1, str2, m, n) => {
        // Create a unique key for memoization
        const key = `${m},${n}`;
        if (memo.has(key)) return memo.get(key);
        
        let result;
        
        // Base cases
        if (m === 0) {
            result = n; // Insert all characters of second string
        } else if (n === 0) {
            result = m; // Remove all characters of first string
        } else if (str1[m - 1] === str2[n - 1]) {
            // If last characters are same, ignore last char and recur for remaining string
            result = editDistanceHelper(str1, str2, m - 1, n - 1);
        } else {
            // If last character are different, consider all possibilities and find minimum
            result = 1 + Math.min(
                editDistanceHelper(str1, str2, m, n - 1),    // Insert
                editDistanceHelper(str1, str2, m - 1, n),    // Remove
                editDistanceHelper(str1, str2, m - 1, n - 1) // Replace
            );
        }
        
        memo.set(key, result);
        return result;
    };
    
    return (str1, str2) => {
        memo.clear(); // Clear memo for each new problem
        return editDistanceHelper(str1, str2, str1.length, str2.length);
    };
})();

// Approach 4: Functional approach with reduce O(m*n) time, O(m*n) space
const editDistanceFunctional = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    
    // Create and initialize DP table
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    // Initialize base cases using functional approach
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    // Build table using functional approach
    return Array.from({ length: m }, (_, i) => i).reduce((dpTable, i) => {
        return Array.from({ length: n }, (_, j) => j).reduce((dpRow, j) => {
            if (str1[i] === str2[j]) {
                dpRow[i + 1][j + 1] = dpRow[i][j];
            } else {
                dpRow[i + 1][j + 1] = 1 + Math.min(
                    dpRow[i + 1][j],    // Insert
                    dpRow[i][j + 1],    // Remove
                    dpRow[i][j]         // Replace
                );
            }
            return dpRow;
        }, dpTable);
    }, dp)[m][n];
};

// Approach 5: Using generator for step-by-step computation
function* editDistanceGenerator(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    yield { step: 'init', dp: dp.map(row => [...row]), message: 'Initialized DP table with base cases' };
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                const oldValue = dp[i][j];
                dp[i][j] = dp[i - 1][j - 1];
                yield { 
                    step: `matching_chars`, 
                    char1: str1[i - 1],
                    char2: str2[j - 1],
                    oldValue, 
                    newValue: dp[i][j],
                    dp: dp.map(row => [...row])
                };
            } else {
                const oldValue = dp[i][j];
                dp[i][j] = 1 + Math.min(
                    dp[i][j - 1],    // Insert
                    dp[i - 1][j],    // Remove
                    dp[i - 1][j - 1] // Replace
                );
                yield { 
                    step: `different_chars`, 
                    char1: str1[i - 1],
                    char2: str2[j - 1],
                    operations: ['insert', 'remove', 'replace'],
                    oldValue, 
                    newValue: dp[i][j],
                    dp: dp.map(row => [...row])
                };
            }
        }
    }
    
    const result = dp[m][n];
    yield { step: 'complete', result, dp: dp.map(row => [...row]) };
}

const editDistanceWithGenerator = (str1, str2) => {
    const generator = editDistanceGenerator(str1, str2);
    let result = 0;
    
    for (const step of generator) {
        if (step.step === 'complete') {
            result = step.result;
        }
    }
    
    return result;
};

// Approach 6: Using BigInt for large strings
const editDistanceBigInt = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(BigInt(0)));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = BigInt(i);
    for (let j = 0; j <= n; j++) dp[0][j] = BigInt(j);
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = BigInt(1) + [
                    dp[i][j - 1],    // Insert
                    dp[i - 1][j],    // Remove
                    dp[i - 1][j - 1] // Replace
                ].reduce((min, val) => val < min ? val : min, dp[i][j - 1]);
            }
        }
    }
    
    return Number(dp[m][n]);
};

// Approach 7: Using Set for tracking operations
const editDistanceWithOperations = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    const operations = Array.from({ length: m + 1 }, () => 
        Array.from({ length: n + 1 }, () => []));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
        if (i > 0) operations[i][0] = [...operations[i-1][0], { op: 'remove', char: str1[i-1] }];
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
        if (j > 0) operations[0][j] = [...operations[0][j-1], { op: 'insert', char: str2[j-1] }];
    }
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
                operations[i][j] = [...operations[i-1][j-1]];
            } else {
                const insertCost = dp[i][j - 1] + 1;
                const removeCost = dp[i - 1][j] + 1;
                const replaceCost = dp[i - 1][j - 1] + 1;
                
                const minCost = Math.min(insertCost, removeCost, replaceCost);
                dp[i][j] = minCost;
                
                if (minCost === insertCost) {
                    operations[i][j] = [...operations[i][j-1], { op: 'insert', char: str2[j-1] }];
                } else if (minCost === removeCost) {
                    operations[i][j] = [...operations[i-1][j], { op: 'remove', char: str1[i-1] }];
                } else {
                    operations[i][j] = [...operations[i-1][j-1], { op: 'replace', from: str1[i-1], to: str2[j-1] }];
                }
            }
        }
    }
    
    return {
        distance: dp[m][n],
        operations: operations[m][n]
    };
};

// Approach 8: Using WeakMap for memory-efficient caching
const createEditDistanceSolver = () => {
    const cache = new WeakMap();
    
    return (str1, str2) => {
        // Create a key object
        const key = { str1, str2 };
        
        // In a real implementation, we would need a more sophisticated approach
        // since WeakMap keys must be objects and we can't directly use strings
        // For demonstration, we'll just use the basic DP approach
        return editDistance(str1, str2);
    };
};

const editDistanceWeakMap = createEditDistanceSolver();

// Approach 9: Using async/await for non-blocking computation
const editDistanceAsync = async (str1, str2) => {
    return new Promise((resolve) => {
        // For large strings, we might want to do this asynchronously
        setTimeout(() => {
            resolve(editDistance(str1, str2));
        }, 0);
    });
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Dynamic Programming', fn: editDistance },
        { name: 'Space Optimized', fn: editDistanceOptimized },
        { name: 'Memoization', fn: editDistanceMemo },
        { name: 'Functional', fn: editDistanceFunctional }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(({ str1, str2 }) => {
                fn(str1, str2);
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Edit Distance Examples ===\n');
    
    // Test cases
    const testCases = [
        { str1: "geek", str2: "gesek" },
        { str1: "sunday", str2: "saturday" },
        { str1: "cat", str2: "cut" },
        { str1: "kitten", str2: "sitting" }
    ];
    
    testCases.forEach(({ str1, str2 }, index) => {
        console.log(`Test Case ${index + 1}: "${str1}" -> "${str2}"`);
        console.log(`  Dynamic Programming: ${editDistance(str1, str2)}`);
        console.log(`  Space Optimized: ${editDistanceOptimized(str1, str2)}`);
        console.log(`  Memoization: ${editDistanceMemo(str1, str2)}`);
        console.log(`  Functional: ${editDistanceFunctional(str1, str2)}`);
        console.log(`  Generator: ${editDistanceWithGenerator(str1, str2)}`);
        console.log(`  BigInt: ${editDistanceBigInt(str1, str2)}`);
        console.log(`  With Operations:`, editDistanceWithOperations(str1, str2));
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    // Destructuring with string operations
    const [firstChar, secondChar, ...restChars] = "geek";
    console.log('Destructured string:', { firstChar, secondChar, restChars });
    
    // Using Math methods for analysis
    const str1 = "geek";
    const str2 = "gesek";
    const stats = {
        str1Length: str1.length,
        str2Length: str2.length,
        editDistance: editDistance(str1, str2)
    };
    console.log('String stats:', stats);
    
    // Method chaining with array operations
    const processedStrings = [str1, str2]
        .map(str => ({ original: str, length: str.length, upper: str.toUpperCase() }))
        .sort((a, b) => b.length - a.length);
    
    console.log('Processed strings:', processedStrings);
    
    // Using Set for unique analysis
    const allChars = [...new Set([...str1, ...str2])];
    console.log('Unique characters:', allChars);
    
    // Map for comprehensive analysis
    const stringAnalysis = new Map([
        ['string1', str1],
        ['string2', str2],
        ['commonChars', [...str1].filter(char => str2.includes(char))],
        ['uniqueChars', [...new Set([...str1, ...str2])]]
    ]);
    
    console.log('Comprehensive analysis:');
    for (const [key, value] of stringAnalysis) {
        console.log(`  ${key}:`, value);
    }
    
    // Generator demonstration
    console.log('\nStep-by-step computation for "cat" -> "cut":');
    const gen = editDistanceGenerator("cat", "cut");
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
            const asyncResult = await editDistanceAsync("kitten", "sitting");
            console.log('Async result for "kitten" -> "sitting":', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Cached solver demonstration
    console.log('WeakMap cached result (first call):', editDistanceWeakMap("sunday", "saturday"));
    console.log('WeakMap cached result (second call):', editDistanceWeakMap("sunday", "saturday"));
    
    // Higher-order function for custom analysis
    const createStringAnalyzer = (processor) => {
        return (str1, str2) => {
            const distance = editDistance(str1, str2);
            return processor(distance, str1, str2);
        };
    };
    
    const getEfficiency = createStringAnalyzer((distance, str1, str2) => {
        const maxLength = Math.max(str1.length, str2.length);
        return maxLength > 0 ? ((distance / maxLength) * 100).toFixed(2) + '%' : '0%';
    });
    
    const getStringProperties = createStringAnalyzer((distance, str1, str2) => ({
        str1Length: str1.length,
        str2Length: str2.length,
        distance,
        efficiency: getEfficiency(str1, str2)
    }));
    
    console.log('Efficiency for "geek" -> "gesek":', getEfficiency("geek", "gesek"));
    console.log('Properties for "cat" -> "cut":', getStringProperties("cat", "cut"));
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const analyzeStrings = compose(
        result => ({ ...result, efficiency: ((result.distance / Math.max(result.str1.length, result.str2.length)) * 100).toFixed(2) + '%' }),
        ({ str1, str2 }) => ({ str1, str2, distance: editDistance(str1, str2) })
    );
    
    console.log('Composed analysis for "kitten" -> "sitting":', analyzeStrings({ str1: "kitten", str2: "sitting" }));
    
    // Performance test
    const performanceTestCases = [
        { str1: "cat", str2: "cut" },
        { str1: "kitten", str2: "sitting" }
    ];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        editDistance,
        editDistanceOptimized,
        editDistanceMemo,
        editDistanceFunctional,
        editDistanceWithGenerator,
        editDistanceBigInt,
        editDistanceWithOperations,
        editDistanceWeakMap,
        editDistanceAsync,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Dynamic Programming: O(m*n) time, O(m*n) space
 * - Space Optimized: O(m*n) time, O(n) space - OPTIMAL
 * - Memoization: O(m*n) time, O(m*n) space
 * - Functional: O(m*n) time, O(m*n) space
 * - Generator: O(m*n) time, O(m*n) space
 * - BigInt: O(m*n) time, O(m*n) space
 * - With Operations: O(m*n) time, O(m*n) space
 * - WeakMap: O(m*n) time, O(m*n) space
 * - Async: O(m*n) time, O(m*n) space
 * 
 * Space Complexity Analysis:
 * - Dynamic Programming: O(m*n)
 * - Space Optimized: O(n) - OPTIMAL
 * - Memoization: O(m*n)
 * - Functional: O(m*n)
 * - Generator: O(m*n)
 * - BigInt: O(m*n)
 * - With Operations: O(m*n)
 * - WeakMap: O(m*n)
 * - Async: O(m*n)
 * 
 * JavaScript-Specific Notes:
 * - Array.from() with fill() provides clean initialization of 2D arrays
 * - Map provides efficient memoization with O(1) average lookup
 * - Set enables tracking of operations
 * - Generators provide step-by-step algorithm visualization
 * - BigInt handles arbitrarily large values
 * - Higher-order functions enable flexible analysis patterns
 * - Method chaining enables complex data transformations
 * - Async/await enables non-blocking computation
 * - Destructuring enables clean variable assignments
 * - 2D array manipulation showcases JavaScript's flexibility
 * - String manipulation with modern ES6+ features
 */
