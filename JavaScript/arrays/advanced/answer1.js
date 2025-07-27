/**
 * Median of Two Sorted Arrays
 * Source: https://leetcode.com/problems/median-of-two-sorted-arrays/
 */

// Approach 1: Binary Search (O(log(min(m,n))) time, O(1) space) - OPTIMAL
const findMedianSortedArrays = (nums1, nums2) => {
    // Ensure nums1 is the smaller array for optimization
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let low = 0;
    let high = m;
    
    while (low <= high) {
        const cut1 = Math.floor((low + high) / 2);
        const cut2 = Math.floor((m + n + 1) / 2) - cut1;
        
        const left1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
        const left2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
        
        const right1 = cut1 === m ? Infinity : nums1[cut1];
        const right2 = cut2 === n ? Infinity : nums2[cut2];
        
        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 === 0) {
                return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
            } else {
                return Math.max(left1, left2);
            }
        } else if (left1 > right2) {
            high = cut1 - 1;
        } else {
            low = cut1 + 1;
        }
    }
    
    return 1; // Should never reach here for valid input
};

// Approach 2: Merge and Find Median (O(m+n) time, O(m+n) space)
const findMedianSortedArraysMerge = (nums1, nums2) => {
    const merged = [];
    let i = 0, j = 0;
    
    // Merge the two sorted arrays
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }
    
    // Add remaining elements
    while (i < nums1.length) merged.push(nums1[i++]);
    while (j < nums2.length) merged.push(nums2[j++]);
    
    const totalLength = merged.length;
    if (totalLength % 2 === 0) {
        return (merged[totalLength / 2 - 1] + merged[totalLength / 2]) / 2;
    } else {
        return merged[Math.floor(totalLength / 2)];
    }
};

// Approach 3: Two Pointers without Extra Space (O(m+n) time, O(1) space)
const findMedianSortedArraysTwoPointers = (nums1, nums2) => {
    const totalLength = nums1.length + nums2.length;
    const isEven = totalLength % 2 === 0;
    const targetIndex = Math.floor(totalLength / 2);
    
    let i = 0, j = 0, count = 0;
    let prev = 0, current = 0;
    
    while (count <= targetIndex) {
        prev = current;
        
        if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
            current = nums1[i++];
        } else {
            current = nums2[j++];
        }
        
        count++;
    }
    
    return isEven ? (prev + current) / 2 : current;
};

// Approach 4: Using generators for memory-efficient merging
function* mergeGenerator(nums1, nums2) {
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            yield nums1[i++];
        } else {
            yield nums2[j++];
        }
    }
    
    while (i < nums1.length) yield nums1[i++];
    while (j < nums2.length) yield nums2[j++];
}

const findMedianSortedArraysGenerator = (nums1, nums2) => {
    const totalLength = nums1.length + nums2.length;
    const isEven = totalLength % 2 === 0;
    const targetIndex = Math.floor(totalLength / 2);
    
    const generator = mergeGenerator(nums1, nums2);
    let count = 0;
    let prev = 0, current = 0;
    
    for (const value of generator) {
        if (count === targetIndex) {
            current = value;
            break;
        }
        if (count === targetIndex - 1) {
            prev = value;
        }
        count++;
    }
    
    return isEven ? (prev + current) / 2 : current;
};

// Approach 5: Recursive Binary Search with memoization
const findMedianSortedArraysRecursive = (() => {
    const memo = new Map();
    
    const helper = (nums1, nums2, start1, end1, start2, end2) => {
        const key = `${start1}-${end1}-${start2}-${end2}`;
        if (memo.has(key)) return memo.get(key);
        
        const m = end1 - start1;
        const n = end2 - start2;
        
        if (m === 0) {
            const result = n % 2 === 0 
                ? (nums2[start2 + n/2 - 1] + nums2[start2 + n/2]) / 2
                : nums2[start2 + Math.floor(n/2)];
            memo.set(key, result);
            return result;
        }
        
        if (n === 0) {
            const result = m % 2 === 0 
                ? (nums1[start1 + m/2 - 1] + nums1[start1 + m/2]) / 2
                : nums1[start1 + Math.floor(m/2)];
            memo.set(key, result);
            return result;
        }
        
        const mid1 = start1 + Math.floor(m / 2);
        const mid2 = start2 + Math.floor(n / 2);
        
        if (nums1[mid1] <= nums2[mid2]) {
            const result = helper(nums1, nums2, mid1, end1, start2, mid2 + 1);
            memo.set(key, result);
            return result;
        } else {
            const result = helper(nums1, nums2, start1, mid1 + 1, mid2, end2);
            memo.set(key, result);
            return result;
        }
    };
    
    return (nums1, nums2) => {
        memo.clear();
        return helper(nums1, nums2, 0, nums1.length, 0, nums2.length);
    };
})();

// Advanced: Using async/await for large arrays (simulating async processing)
const findMedianSortedArraysAsync = async (nums1, nums2) => {
    return new Promise((resolve) => {
        // Simulate async processing for large datasets
        setTimeout(() => {
            resolve(findMedianSortedArrays(nums1, nums2));
        }, 0);
    });
};

// Using Map for caching results
const createMedianFinder = () => {
    const cache = new Map();
    
    return (nums1, nums2) => {
        const key = JSON.stringify([nums1, nums2]);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = findMedianSortedArrays(nums1, nums2);
        cache.set(key, result);
        return result;
    };
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Binary Search', fn: findMedianSortedArrays },
        { name: 'Merge Arrays', fn: findMedianSortedArraysMerge },
        { name: 'Two Pointers', fn: findMedianSortedArraysTwoPointers },
        { name: 'Generator', fn: findMedianSortedArraysGenerator }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(([nums1, nums2]) => {
                fn([...nums1], [...nums2]);
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Median of Two Sorted Arrays Examples ===\n');
    
    // Test cases
    const testCases = [
        [[1, 3], [2]],
        [[1, 2], [3, 4]],
        [[0, 0], [0, 0]],
        [[], [1]],
        [[2], []],
        [[1, 3, 5], [2, 4, 6]],
        [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]],
        [[-5, -3, -1], [1, 3, 5]]
    ];
    
    testCases.forEach(([nums1, nums2], index) => {
        console.log(`Test Case ${index + 1}: nums1=[${nums1.join(', ')}], nums2=[${nums2.join(', ')}]`);
        console.log(`Binary Search:  ${findMedianSortedArrays(nums1, nums2)}`);
        console.log(`Merge Arrays:   ${findMedianSortedArraysMerge(nums1, nums2)}`);
        console.log(`Two Pointers:   ${findMedianSortedArraysTwoPointers(nums1, nums2)}`);
        console.log(`Generator:      ${findMedianSortedArraysGenerator(nums1, nums2)}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    const nums1 = [1, 3, 5];
    const nums2 = [2, 4, 6];
    
    // Destructuring assignment for array swapping
    let [arr1, arr2] = [nums1, nums2];
    if (arr1.length > arr2.length) {
        [arr1, arr2] = [arr2, arr1];
        console.log('Arrays swapped using destructuring');
    }
    
    // Using Math methods for calculations
    const median = findMedianSortedArrays(nums1, nums2);
    console.log('Median:', median);
    console.log('Ceiling of median:', Math.ceil(median));
    console.log('Floor of median:', Math.floor(median));
    
    // Method chaining with array operations
    const processedArrays = [nums1, nums2]
        .map(arr => arr.filter(x => x > 2))     // Filter elements > 2
        .map(arr => arr.map(x => x * 2))        // Double the values
        .filter(arr => arr.length > 0);         // Keep non-empty arrays
    
    console.log('Processed arrays:', processedArrays);
    
    // Using Set for unique elements analysis
    const allElements = [...nums1, ...nums2];
    const uniqueElements = [...new Set(allElements)];
    console.log('All elements:', allElements);
    console.log('Unique elements:', uniqueElements);
    
    // Generator demonstration
    console.log('Generator merge:');
    const generator = mergeGenerator(nums1, nums2);
    const mergedFromGenerator = [...generator];
    console.log('Merged using generator:', mergedFromGenerator);
    
    // Async/await demonstration
    (async () => {
        try {
            const asyncMedian = await findMedianSortedArraysAsync(nums1, nums2);
            console.log('Async median result:', asyncMedian);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Cached median finder
    const cachedFinder = createMedianFinder();
    console.log('Cached result (first call):', cachedFinder(nums1, nums2));
    console.log('Cached result (second call):', cachedFinder(nums1, nums2));
    
    // Higher-order function for custom median processing
    const createMedianProcessor = (transform) => {
        return (nums1, nums2) => {
            const median = findMedianSortedArrays(nums1, nums2);
            return transform(median);
        };
    };
    
    const getSquaredMedian = createMedianProcessor(x => x * x);
    const getRoundedMedian = createMedianProcessor(x => Math.round(x * 100) / 100);
    
    console.log('Squared median:', getSquaredMedian(nums1, nums2));
    console.log('Rounded median:', getRoundedMedian(nums1, nums2));
    
    // Using Map for statistical analysis
    const stats = new Map([
        ['median', findMedianSortedArrays(nums1, nums2)],
        ['total_elements', nums1.length + nums2.length],
        ['min_element', Math.min(...nums1, ...nums2)],
        ['max_element', Math.max(...nums1, ...nums2)]
    ]);
    
    console.log('Statistical analysis:', [...stats.entries()]);
    
    // Performance test
    const performanceTestCases = [
        [[1, 3], [2]],
        [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]],
        [Array.from({length: 50}, (_, i) => i * 2), Array.from({length: 50}, (_, i) => i * 2 + 1)]
    ];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        findMedianSortedArrays,
        findMedianSortedArraysMerge,
        findMedianSortedArraysTwoPointers,
        findMedianSortedArraysGenerator,
        findMedianSortedArraysRecursive,
        findMedianSortedArraysAsync,
        createMedianFinder,
        mergeGenerator,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Binary Search: O(log(min(m,n))) - OPTIMAL
 * - Merge Arrays: O(m+n)
 * - Two Pointers: O(m+n)
 * - Generator: O(m+n)
 * - Recursive: O(log(m+n)) with memoization
 * 
 * Space Complexity Analysis:
 * - Binary Search: O(1) - OPTIMAL
 * - Merge Arrays: O(m+n)
 * - Two Pointers: O(1)
 * - Generator: O(1) for generation, O(m+n) if materialized
 * - Recursive: O(log(m+n)) for call stack + memoization
 * 
 * JavaScript-Specific Notes:
 * - Math.min/Math.max with spread operator for array operations
 * - Destructuring assignment for elegant array swapping
 * - Generators provide memory-efficient iteration
 * - Map provides efficient caching with complex keys
 * - Async/await enables non-blocking processing for large datasets
 * - Higher-order functions enable flexible result processing
 * - Infinity/-Infinity provide clean boundary handling
 */
