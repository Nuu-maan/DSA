/**
 * 3Sum
 * Source: https://leetcode.com/problems/3sum/
 */

// Approach 1: Two-Pointer Technique (O(n²) time, O(1) space) - OPTIMAL
const threeSum = (nums) => {
    const result = [];
    nums.sort((a, b) => a - b); // Sort array first
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates for second element
                while (left < right && nums[left] === nums[left + 1]) left++;
                // Skip duplicates for third element
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
};

// Approach 2: Using Set for duplicate handling (alternative approach)
const threeSumWithSet = (nums) => {
    const result = [];
    const seen = new Set();
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        const target = -nums[i];
        const twoSumSet = new Set();
        
        for (let j = i + 1; j < nums.length; j++) {
            const complement = target - nums[j];
            
            if (twoSumSet.has(complement)) {
                const triplet = [nums[i], complement, nums[j]];
                const tripletKey = triplet.join(',');
                
                if (!seen.has(tripletKey)) {
                    result.push(triplet);
                    seen.add(tripletKey);
                }
            }
            
            twoSumSet.add(nums[j]);
        }
    }
    
    return result;
};

// Approach 3: Using Map for frequency counting
const threeSumWithMap = (nums) => {
    const result = [];
    const freqMap = new Map();
    
    // Count frequencies
    nums.forEach(num => {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    });
    
    const uniqueNums = [...freqMap.keys()].sort((a, b) => a - b);
    
    for (let i = 0; i < uniqueNums.length; i++) {
        const a = uniqueNums[i];
        
        for (let j = i; j < uniqueNums.length; j++) {
            const b = uniqueNums[j];
            const c = -(a + b);
            
            if (c < b) continue; // Ensure a <= b <= c
            
            if (freqMap.has(c)) {
                let count = 0;
                if (a === b && b === c) count = 3;
                else if (a === b || b === c) count = 2;
                else count = 1;
                
                if (freqMap.get(a) >= count && 
                    freqMap.get(b) >= count && 
                    freqMap.get(c) >= count) {
                    result.push([a, b, c]);
                }
            }
        }
    }
    
    return result;
};

// Approach 4: Functional approach using reduce and filter
const threeSumFunctional = (nums) => {
    nums.sort((a, b) => a - b);
    
    return nums.reduce((result, num, i) => {
        if (i > 0 && nums[i] === nums[i - 1]) return result;
        
        const twoSumResults = twoSumForThreeSum(nums, i + 1, -num);
        const triplets = twoSumResults.map(([left, right]) => [num, left, right]);
        
        return [...result, ...triplets];
    }, []);
};

// Helper function for functional approach
const twoSumForThreeSum = (nums, startIndex, target) => {
    const results = [];
    let left = startIndex;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            results.push([nums[left], nums[right]]);
            
            while (left < right && nums[left] === nums[left + 1]) left++;
            while (left < right && nums[right] === nums[right - 1]) right--;
            
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return results;
};

// Advanced: Find all unique triplets with custom sum
const threeSumCustomTarget = (nums, target = 0) => {
    const result = [];
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === target) {
                result.push([nums[i], nums[left], nums[right]]);
                
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
};

// Using generators for memory-efficient iteration
function* threeSumGenerator(nums) {
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                yield [nums[i], nums[left], nums[right]];
                
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
}

// Performance comparison utility
const performanceTest = (nums, iterations = 1000) => {
    const methods = [
        { name: 'Two-Pointer', fn: threeSum },
        { name: 'Set-based', fn: threeSumWithSet },
        { name: 'Map-based', fn: threeSumWithMap },
        { name: 'Functional', fn: threeSumFunctional }
    ];
    
    console.log(`Performance test with ${nums.length} elements, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn([...nums]); // Fresh copy each iteration
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== 3Sum Examples ===\n');
    
    // Test cases
    const testCases = [
        [-1, 0, 1, 2, -1, -4],
        [0, 1, 1],
        [0, 0, 0],
        [-2, 0, 1, 1, 2],
        [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4],
        []
    ];
    
    testCases.forEach((nums, index) => {
        console.log(`Test Case ${index + 1}: [${nums.join(', ')}]`);
        console.log(`Two-Pointer: ${JSON.stringify(threeSum(nums))}`);
        console.log(`Set-based:   ${JSON.stringify(threeSumWithSet(nums))}`);
        console.log(`Map-based:   ${JSON.stringify(threeSumWithMap(nums))}`);
        console.log(`Functional:  ${JSON.stringify(threeSumFunctional(nums))}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    const nums = [-1, 0, 1, 2, -1, -4];
    
    // Destructuring with array operations
    const [firstTriplet, ...restTriplets] = threeSum(nums);
    console.log('First triplet:', firstTriplet);
    console.log('Rest triplets:', restTriplets);
    
    // Using Set for unique triplet validation
    const triplets = threeSum(nums);
    const uniqueTriplets = new Set(triplets.map(triplet => JSON.stringify(triplet.sort())));
    console.log('Unique triplets count:', uniqueTriplets.size);
    
    // Method chaining with array operations
    const processedTriplets = threeSum(nums)
        .filter(triplet => triplet.every(num => num !== 0))  // Exclude triplets with 0
        .map(triplet => triplet.map(num => Math.abs(num)))   // Get absolute values
        .sort((a, b) => a.reduce((sum, x) => sum + x) - b.reduce((sum, x) => sum + x)); // Sort by sum
    
    console.log('Processed triplets:', processedTriplets);
    
    // Using Map for triplet analysis
    const tripletAnalysis = new Map();
    threeSum(nums).forEach(triplet => {
        const sum = triplet.reduce((acc, num) => acc + num, 0);
        const key = `sum_${sum}`;
        if (!tripletAnalysis.has(key)) {
            tripletAnalysis.set(key, []);
        }
        tripletAnalysis.get(key).push(triplet);
    });
    
    console.log('Triplet analysis:', [...tripletAnalysis.entries()]);
    
    // Generator usage for memory efficiency
    console.log('Generator results:');
    const generator = threeSumGenerator(nums);
    for (const triplet of generator) {
        console.log('Generated triplet:', triplet);
    }
    
    // Higher-order function for custom operations
    const createTripletProcessor = (operation) => {
        return (nums) => {
            return threeSum(nums).map(triplet => operation(triplet));
        };
    };
    
    const getTripletProducts = createTripletProcessor(triplet => 
        triplet.reduce((product, num) => product * num, 1)
    );
    
    console.log('Triplet products:', getTripletProducts(nums));
    
    // Custom target demonstration
    const customTargetTriplets = threeSumCustomTarget(nums, 1);
    console.log('Triplets summing to 1:', customTargetTriplets);
    
    // Performance test
    const largeArray = Array.from({ length: 100 }, (_, i) => i - 50);
    performanceTest(largeArray, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        threeSum,
        threeSumWithSet,
        threeSumWithMap,
        threeSumFunctional,
        threeSumCustomTarget,
        threeSumGenerator,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Two-Pointer: O(n²) - OPTIMAL
 * - Set-based: O(n²)
 * - Map-based: O(n²)
 * - Functional: O(n²)
 * 
 * Space Complexity Analysis:
 * - Two-Pointer: O(1) excluding output array
 * - Set-based: O(n) for sets
 * - Map-based: O(n) for frequency map
 * - Functional: O(n) for intermediate arrays
 * 
 * JavaScript-Specific Notes:
 * - Array.sort() uses Timsort (O(n log n))
 * - Set provides O(1) average lookup time
 * - Map maintains insertion order (ES6+)
 * - Generators enable memory-efficient iteration
 * - Destructuring provides clean array manipulation
 * - Method chaining enables complex transformations
 * - Higher-order functions enable flexible processing
 */
