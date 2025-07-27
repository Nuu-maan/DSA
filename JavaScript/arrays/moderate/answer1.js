/**
 * Two Sum
 * Source: https://leetcode.com/problems/two-sum/
 */

// Approach 1: Brute Force (O(n²) time, O(1) space)
const twoSumBruteForce = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
};

// Approach 2: Hash Map - One Pass (O(n) time, O(n) space) - OPTIMAL
const twoSumHashMap = (nums, target) => {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return [];
};

// Approach 3: Using Object instead of Map (JavaScript-specific)
const twoSumObject = (nums, target) => {
    const numObj = {};
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (complement in numObj) {
            return [numObj[complement], i];
        }
        
        numObj[nums[i]] = i;
    }
    
    return [];
};

// Approach 4: Using Array.findIndex() (functional approach)
const twoSumFunctional = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        const j = nums.findIndex((num, index) => num === complement && index > i);
        
        if (j !== -1) {
            return [i, j];
        }
    }
    
    return [];
};

// Approach 5: Using reduce() with Map (advanced functional)
const twoSumReduce = (nums, target) => {
    const result = nums.reduce((acc, num, index) => {
        if (acc.found) return acc;
        
        const complement = target - num;
        
        if (acc.map.has(complement)) {
            acc.found = true;
            acc.indices = [acc.map.get(complement), index];
        } else {
            acc.map.set(num, index);
        }
        
        return acc;
    }, { map: new Map(), found: false, indices: [] });
    
    return result.indices;
};

// Approach 6: Using Set for existence check (when only checking if solution exists)
const twoSumExists = (nums, target) => {
    const seen = new Set();
    
    for (const num of nums) {
        const complement = target - num;
        if (seen.has(complement)) {
            return true;
        }
        seen.add(num);
    }
    
    return false;
};

// Advanced: Find all pairs that sum to target (handles duplicates)
const twoSumAllPairs = (nums, target) => {
    const pairs = [];
    const seen = new Map();
    
    nums.forEach((num, index) => {
        const complement = target - num;
        
        if (seen.has(complement)) {
            // Get all indices of complement
            seen.get(complement).forEach(complementIndex => {
                pairs.push([complementIndex, index]);
            });
        }
        
        // Store current number with its index
        if (!seen.has(num)) {
            seen.set(num, []);
        }
        seen.get(num).push(index);
    });
    
    return pairs;
};

// Using WeakMap for memory-efficient caching (advanced pattern)
const createTwoSumSolver = () => {
    const cache = new WeakMap();
    
    return (nums, target) => {
        // Check if we've solved this array before
        if (cache.has(nums)) {
            const cached = cache.get(nums);
            if (cached.has(target)) {
                return cached.get(target);
            }
        }
        
        // Solve and cache
        const result = twoSumHashMap(nums, target);
        
        if (!cache.has(nums)) {
            cache.set(nums, new Map());
        }
        cache.get(nums).set(target, result);
        
        return result;
    };
};

// Performance comparison utility
const performanceTest = (nums, target, iterations = 100000) => {
    const methods = [
        { name: 'Brute Force', fn: twoSumBruteForce },
        { name: 'Hash Map', fn: twoSumHashMap },
        { name: 'Object', fn: twoSumObject },
        { name: 'Functional', fn: twoSumFunctional },
        { name: 'Reduce', fn: twoSumReduce }
    ];
    
    console.log(`Performance test with ${nums.length} elements, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn(nums, target);
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Two Sum Examples ===\n');
    
    // Test cases
    const testCases = [
        { nums: [2, 7, 11, 15], target: 9 },
        { nums: [3, 2, 4], target: 6 },
        { nums: [3, 3], target: 6 },
        { nums: [1, 2, 3, 4, 5], target: 8 },
        { nums: [-1, -2, -3, -4, -5], target: -8 },
        { nums: [0, 4, 3, 0], target: 0 }
    ];
    
    testCases.forEach(({ nums, target }, index) => {
        console.log(`Test Case ${index + 1}: nums=[${nums.join(', ')}], target=${target}`);
        console.log(`Brute Force:  [${twoSumBruteForce(nums, target).join(', ')}]`);
        console.log(`Hash Map:     [${twoSumHashMap(nums, target).join(', ')}]`);
        console.log(`Object:       [${twoSumObject(nums, target).join(', ')}]`);
        console.log(`Functional:   [${twoSumFunctional(nums, target).join(', ')}]`);
        console.log(`Reduce:       [${twoSumReduce(nums, target).join(', ')}]`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    const nums = [2, 7, 11, 15];
    const target = 9;
    
    // Destructuring assignment
    const [index1, index2] = twoSumHashMap(nums, target);
    console.log('Destructured result:', { index1, index2 });
    
    // Using Map methods and iteration
    const numMap = new Map(nums.map((num, index) => [num, index]));
    console.log('Map entries:', [...numMap.entries()]);
    
    // Arrow functions with different syntaxes
    const quickTwoSum = (arr, tgt) => {
        const map = new Map();
        for (let i = 0; i < arr.length; i++) {
            const comp = tgt - arr[i];
            if (map.has(comp)) return [map.get(comp), i];
            map.set(arr[i], i);
        }
        return [];
    };
    
    console.log('Quick arrow function:', quickTwoSum(nums, target));
    
    // Method chaining with array operations
    const processedNums = nums
        .map((num, index) => ({ value: num, index }))
        .filter(item => item.value < target)
        .map(item => item.value);
    
    console.log('Processed numbers (< target):', processedNums);
    
    // Using Set for unique values
    const uniqueNums = [...new Set([...nums, ...nums])];
    console.log('Unique numbers:', uniqueNums);
    
    // Higher-order function for custom target finding
    const createTargetFinder = (operation) => {
        return (arr, target) => {
            const map = new Map();
            for (let i = 0; i < arr.length; i++) {
                const complement = operation(target, arr[i]);
                if (map.has(complement)) return [map.get(complement), i];
                map.set(arr[i], i);
            }
            return [];
        };
    };
    
    const twoSumSubtract = createTargetFinder((a, b) => a - b);
    const twoSumAdd = createTargetFinder((a, b) => a - b); // Same as regular two sum
    
    console.log('Custom target finder:', twoSumAdd(nums, target));
    
    // Demonstrate all pairs functionality
    const duplicateNums = [1, 2, 1, 3, 2, 4];
    const allPairs = twoSumAllPairs(duplicateNums, 3);
    console.log('All pairs that sum to 3:', allPairs);
    
    // Cached solver demonstration
    const cachedSolver = createTwoSumSolver();
    console.log('Cached solver (first call):', cachedSolver(nums, target));
    console.log('Cached solver (second call):', cachedSolver(nums, target));
    
    // Performance test
    const largeArray = Array.from({ length: 1000 }, (_, i) => i);
    const largeTarget = 1500;
    performanceTest(largeArray, largeTarget, 1000);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        twoSumBruteForce,
        twoSumHashMap,
        twoSumObject,
        twoSumFunctional,
        twoSumReduce,
        twoSumExists,
        twoSumAllPairs,
        createTwoSumSolver,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Brute Force: O(n²)
 * - Hash Map: O(n) - OPTIMAL
 * - Object: O(n)
 * - Functional: O(n²) due to findIndex
 * - Reduce: O(n)
 * 
 * Space Complexity Analysis:
 * - Brute Force: O(1)
 * - Hash Map: O(n)
 * - Object: O(n)
 * - Functional: O(1)
 * - Reduce: O(n)
 * 
 * JavaScript-Specific Notes:
 * - Map provides better performance than Object for frequent additions/deletions
 * - WeakMap enables memory-efficient caching patterns
 * - Destructuring assignment provides clean result extraction
 * - Higher-order functions enable flexible algorithm variations
 * - Set operations provide efficient uniqueness checking
 * - Method chaining enables complex data transformations
 */
