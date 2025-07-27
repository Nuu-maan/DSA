/**
 * First Missing Positive
 * Source: https://leetcode.com/problems/first-missing-positive/
 */

// Approach 1: Cyclic Sort (O(n) time, O(1) space) - OPTIMAL
const firstMissingPositive = (nums) => {
    const n = nums.length;
    
    // Place each positive number at its correct index
    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            // Swap nums[i] with nums[nums[i] - 1]
            [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
        }
    }
    
    // Find the first missing positive
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    
    return n + 1;
};

// Approach 2: Using array as hash map with sign marking (O(n) time, O(1) space)
const firstMissingPositiveSignMarking = (nums) => {
    const n = nums.length;
    
    // First pass: replace non-positive numbers with n+1
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0) {
            nums[i] = n + 1;
        }
    }
    
    // Second pass: mark presence by making numbers negative
    for (let i = 0; i < n; i++) {
        const num = Math.abs(nums[i]);
        if (num <= n) {
            nums[num - 1] = -Math.abs(nums[num - 1]);
        }
    }
    
    // Third pass: find first positive number
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            return i + 1;
        }
    }
    
    return n + 1;
};

// Approach 3: Using Set (O(n) time, O(n) space)
const firstMissingPositiveSet = (nums) => {
    const positiveSet = new Set(nums.filter(num => num > 0));
    
    for (let i = 1; i <= nums.length + 1; i++) {
        if (!positiveSet.has(i)) {
            return i;
        }
    }
    
    return nums.length + 1;
};

// Approach 4: Functional approach using reduce and find
const firstMissingPositiveFunctional = (nums) => {
    const positiveNums = nums.filter(num => num > 0);
    const maxNum = Math.max(...positiveNums, 0);
    
    const range = Array.from({ length: maxNum + 2 }, (_, i) => i + 1);
    
    return range.find(num => !positiveNums.includes(num)) || 1;
};

// Approach 5: Using Map for frequency counting
const firstMissingPositiveMap = (nums) => {
    const freqMap = new Map();
    
    // Count frequencies of positive numbers
    nums.forEach(num => {
        if (num > 0) {
            freqMap.set(num, (freqMap.get(num) || 0) + 1);
        }
    });
    
    // Find first missing positive
    for (let i = 1; i <= nums.length + 1; i++) {
        if (!freqMap.has(i)) {
            return i;
        }
    }
    
    return nums.length + 1;
};

// Advanced: Using binary search for sorted arrays
const firstMissingPositiveBinarySearch = (nums) => {
    // First, sort the array and remove duplicates
    const sortedUnique = [...new Set(nums.filter(num => num > 0))].sort((a, b) => a - b);
    
    if (sortedUnique.length === 0 || sortedUnique[0] > 1) {
        return 1;
    }
    
    // Binary search for the gap
    let left = 0;
    let right = sortedUnique.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // If sortedUnique[mid] === mid + 1, then 1 to mid+1 are present
        if (sortedUnique[mid] === mid + 1) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left + 1;
};

// Using generators for memory-efficient processing
function* generateMissingPositives(nums) {
    const positiveSet = new Set(nums.filter(num => num > 0));
    let candidate = 1;
    
    while (true) {
        if (!positiveSet.has(candidate)) {
            yield candidate;
        }
        candidate++;
    }
}

const firstMissingPositiveGenerator = (nums) => {
    const generator = generateMissingPositives(nums);
    return generator.next().value;
};

// Using async/await for large datasets
const firstMissingPositiveAsync = async (nums) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(firstMissingPositive([...nums]));
        }, 0);
    });
};

// Advanced: Find all missing positives up to n
const findAllMissingPositives = (nums) => {
    const n = nums.length;
    const result = [];
    
    // Use cyclic sort approach
    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
        }
    }
    
    // Collect all missing positives
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            result.push(i + 1);
        }
    }
    
    return result;
};

// Using WeakMap for caching (advanced pattern)
const createFirstMissingPositiveSolver = () => {
    const cache = new WeakMap();
    
    return (nums) => {
        if (cache.has(nums)) {
            return cache.get(nums);
        }
        
        const result = firstMissingPositive([...nums]);
        cache.set(nums, result);
        return result;
    };
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Cyclic Sort', fn: firstMissingPositive },
        { name: 'Sign Marking', fn: firstMissingPositiveSignMarking },
        { name: 'Set', fn: firstMissingPositiveSet },
        { name: 'Functional', fn: firstMissingPositiveFunctional },
        { name: 'Map', fn: firstMissingPositiveMap }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(nums => {
                fn([...nums]); // Fresh copy each iteration
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== First Missing Positive Examples ===\n');
    
    // Test cases
    const testCases = [
        [1, 2, 0],
        [3, 4, -1, 1],
        [7, 8, 9, 11, 12],
        [1],
        [1, 2, 3, 4, 5],
        [-1, -2, -3],
        [1, 1000000000],
        [],
        [2, 3, 4],
        [1, 2, 3, 5, 6, 7]
    ];
    
    testCases.forEach((nums, index) => {
        console.log(`Test Case ${index + 1}: [${nums.join(', ')}]`);
        console.log(`Cyclic Sort:    ${firstMissingPositive([...nums])}`);
        console.log(`Sign Marking:   ${firstMissingPositiveSignMarking([...nums])}`);
        console.log(`Set:            ${firstMissingPositiveSet([...nums])}`);
        console.log(`Functional:     ${firstMissingPositiveFunctional([...nums])}`);
        console.log(`Map:            ${firstMissingPositiveMap([...nums])}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    const nums = [3, 4, -1, 1];
    
    // Destructuring with array operations
    const [first, second, ...rest] = nums;
    console.log('Destructured:', { first, second, rest });
    
    // Using Math methods for analysis
    const positiveNums = nums.filter(n => n > 0);
    const stats = {
        max: Math.max(...positiveNums, 0),
        min: Math.min(...positiveNums, Infinity),
        count: positiveNums.length
    };
    console.log('Positive number stats:', stats);
    
    // Method chaining with array operations
    const processedNums = nums
        .filter(n => n > 0)                    // Keep positive numbers
        .map(n => ({ value: n, square: n * n })) // Add square property
        .sort((a, b) => a.value - b.value)      // Sort by value
        .slice(0, 3);                          // Take first 3
    
    console.log('Processed numbers:', processedNums);
    
    // Using Set for unique analysis
    const uniquePositives = [...new Set(nums.filter(n => n > 0))];
    console.log('Unique positives:', uniquePositives);
    
    // Map for comprehensive analysis
    const analysis = new Map([
        ['original', nums],
        ['positives', nums.filter(n => n > 0)],
        ['negatives', nums.filter(n => n < 0)],
        ['zeros', nums.filter(n => n === 0)],
        ['missing', firstMissingPositive([...nums])]
    ]);
    
    console.log('Comprehensive analysis:');
    for (const [key, value] of analysis) {
        console.log(`  ${key}:`, Array.isArray(value) ? value : [value]);
    }
    
    // Generator demonstration
    console.log('\nFirst 5 missing positives:');
    const generator = generateMissingPositives(nums);
    const missingPositives = [];
    for (let i = 0; i < 5; i++) {
        missingPositives.push(generator.next().value);
    }
    console.log('Missing positives:', missingPositives);
    
    // Find all missing positives demonstration
    const allMissing = findAllMissingPositives([...nums]);
    console.log('All missing positives up to array length:', allMissing);
    
    // Async/await demonstration
    (async () => {
        try {
            const asyncResult = await firstMissingPositiveAsync(nums);
            console.log('Async result:', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Cached solver demonstration
    const cachedSolver = createFirstMissingPositiveSolver();
    console.log('Cached result (first call):', cachedSolver(nums));
    console.log('Cached result (second call):', cachedSolver(nums));
    
    // Higher-order function for custom analysis
    const createMissingAnalyzer = (processor) => {
        return (nums) => {
            const missing = firstMissingPositive([...nums]);
            return processor(missing, nums);
        };
    };
    
    const getMissingInfo = createMissingAnalyzer((missing, original) => ({
        missing,
        position: missing <= original.length ? missing - 1 : 'beyond array',
        gap: missing - Math.max(...original.filter(n => n > 0), 0)
    }));
    
    const getCompletionRatio = createMissingAnalyzer((missing, original) => {
        const maxPositive = Math.max(...original.filter(n => n > 0), 0);
        const expected = maxPositive > 0 ? maxPositive : missing;
        const actual = original.filter(n => n > 0 && n <= expected).length;
        return ((actual / expected) * 100).toFixed(2) + '%';
    });
    
    console.log('Missing info:', getMissingInfo(nums));
    console.log('Completion ratio:', getCompletionRatio(nums));
    
    // Functional composition
    const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
    
    const analyzeArray = compose(
        arr => ({ 
            original: arr,
            missing: firstMissingPositive([...arr]),
            positiveCount: arr.filter(n => n > 0).length
        }),
        result => ({
            ...result,
            efficiency: result.positiveCount / result.missing
        })
    );
    
    console.log('Composed analysis:', analyzeArray(nums));
    
    // Performance test
    const performanceTestCases = [
        [1, 2, 0],
        Array.from({length: 100}, (_, i) => i + 2), // Missing 1
        Array.from({length: 100}, (_, i) => Math.floor(Math.random() * 200))
    ];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        firstMissingPositive,
        firstMissingPositiveSignMarking,
        firstMissingPositiveSet,
        firstMissingPositiveFunctional,
        firstMissingPositiveMap,
        firstMissingPositiveBinarySearch,
        firstMissingPositiveGenerator,
        firstMissingPositiveAsync,
        findAllMissingPositives,
        generateMissingPositives,
        createFirstMissingPositiveSolver,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Cyclic Sort: O(n) - OPTIMAL
 * - Sign Marking: O(n) - OPTIMAL
 * - Set: O(n)
 * - Functional: O(n²) due to includes()
 * - Map: O(n)
 * - Binary Search: O(n log n) due to sorting
 * 
 * Space Complexity Analysis:
 * - Cyclic Sort: O(1) - OPTIMAL
 * - Sign Marking: O(1) - OPTIMAL
 * - Set: O(n)
 * - Functional: O(n)
 * - Map: O(n)
 * - Binary Search: O(n)
 * 
 * JavaScript-Specific Notes:
 * - Destructuring assignment enables elegant swapping
 * - Array.filter() and Array.includes() provide clean functional approaches
 * - Set provides O(1) average lookup time for existence checks
 * - Map enables frequency counting with clean iteration
 * - Generators provide memory-efficient infinite sequences
 * - WeakMap enables memory-efficient caching patterns
 * - Math.max/Math.min with spread operator for array operations
 * - Higher-order functions enable flexible analysis patterns
 * - Method chaining enables complex data transformations
 */
