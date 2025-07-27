/**
 * Trapping Rain Water
 * Source: https://leetcode.com/problems/trapping-rain-water/
 */

// Approach 1: Two Pointers (O(n) time, O(1) space) - OPTIMAL
const trap = (height) => {
    if (height.length <= 2) return 0;
    
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
};

// Approach 2: Dynamic Programming with Arrays (O(n) time, O(n) space)
const trapDP = (height) => {
    if (height.length <= 2) return 0;
    
    const n = height.length;
    const leftMax = new Array(n);
    const rightMax = new Array(n);
    
    // Fill leftMax array
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }
    
    // Fill rightMax array
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }
    
    // Calculate trapped water
    let water = 0;
    for (let i = 0; i < n; i++) {
        water += Math.min(leftMax[i], rightMax[i]) - height[i];
    }
    
    return water;
};

// Approach 3: Using Stack (O(n) time, O(n) space)
const trapStack = (height) => {
    if (height.length <= 2) return 0;
    
    const stack = [];
    let water = 0;
    
    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();
            
            if (stack.length === 0) break;
            
            const distance = i - stack[stack.length - 1] - 1;
            const boundedHeight = Math.min(height[i], height[stack[stack.length - 1]]) - height[top];
            water += distance * boundedHeight;
        }
        stack.push(i);
    }
    
    return water;
};

// Approach 4: Functional approach using reduce
const trapFunctional = (height) => {
    if (height.length <= 2) return 0;
    
    // Calculate left max for each position
    const leftMaxes = height.reduce((acc, curr, index) => {
        if (index === 0) {
            acc.push(curr);
        } else {
            acc.push(Math.max(acc[index - 1], curr));
        }
        return acc;
    }, []);
    
    // Calculate right max for each position
    const rightMaxes = height.reduceRight((acc, curr, index) => {
        if (index === height.length - 1) {
            acc[index] = curr;
        } else {
            acc[index] = Math.max(acc[index + 1], curr);
        }
        return acc;
    }, new Array(height.length));
    
    // Calculate trapped water
    return height.reduce((water, curr, index) => {
        return water + Math.min(leftMaxes[index], rightMaxes[index]) - curr;
    }, 0);
};

// Approach 5: Using Map for memoization (advanced pattern)
const trapWithMemoization = (() => {
    const memo = new Map();
    
    return (height) => {
        const key = height.join(',');
        if (memo.has(key)) return memo.get(key);
        
        const result = trap(height);
        memo.set(key, result);
        return result;
    };
})();

// Advanced: Visualize water trapping
const visualizeTrap = (height) => {
    const maxHeight = Math.max(...height);
    const result = [];
    
    for (let level = maxHeight; level > 0; level--) {
        let row = '';
        for (let i = 0; i < height.length; i++) {
            if (height[i] >= level) {
                row += '█'; // Block
            } else {
                // Check if water can be trapped at this position and level
                const leftMax = Math.max(...height.slice(0, i + 1));
                const rightMax = Math.max(...height.slice(i));
                const waterLevel = Math.min(leftMax, rightMax);
                
                if (waterLevel >= level) {
                    row += '~'; // Water
                } else {
                    row += ' '; // Air
                }
            }
        }
        result.push(row);
    }
    
    return result;
};

// Using generators for step-by-step calculation
function* trapStepByStep(height) {
    if (height.length <= 2) {
        yield { step: 'complete', water: 0, message: 'Array too small' };
        return;
    }
    
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
    
    while (left < right) {
        const step = {
            left,
            right,
            leftMax,
            rightMax,
            water,
            currentHeight: { left: height[left], right: height[right] }
        };
        
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
                step.action = `Update leftMax to ${leftMax}`;
            } else {
                const trapped = leftMax - height[left];
                water += trapped;
                step.action = `Trap ${trapped} units at position ${left}`;
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
                step.action = `Update rightMax to ${rightMax}`;
            } else {
                const trapped = rightMax - height[right];
                water += trapped;
                step.action = `Trap ${trapped} units at position ${right}`;
            }
            right--;
        }
        
        step.newWater = water;
        yield step;
    }
    
    yield { step: 'complete', water, message: `Total water trapped: ${water}` };
}

// Using async/await for large datasets
const trapAsync = async (height) => {
    return new Promise((resolve) => {
        // Simulate async processing for large datasets
        setTimeout(() => {
            resolve(trap(height));
        }, 0);
    });
};

// Performance comparison utility
const performanceTest = (testCases, iterations = 1000) => {
    const methods = [
        { name: 'Two Pointers', fn: trap },
        { name: 'Dynamic Programming', fn: trapDP },
        { name: 'Stack', fn: trapStack },
        { name: 'Functional', fn: trapFunctional }
    ];
    
    console.log(`Performance test with ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            testCases.forEach(heights => {
                fn([...heights]);
            });
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Trapping Rain Water Examples ===\n');
    
    // Test cases
    const testCases = [
        [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        [4, 2, 0, 3, 2, 5],
        [3, 0, 2, 0, 4],
        [0, 1, 0],
        [3, 0, 0, 2, 0, 4],
        [5, 4, 1, 2],
        [1, 2, 3, 4, 5],
        []
    ];
    
    testCases.forEach((heights, index) => {
        console.log(`Test Case ${index + 1}: [${heights.join(', ')}]`);
        console.log(`Two Pointers: ${trap(heights)}`);
        console.log(`Dynamic Programming: ${trapDP(heights)}`);
        console.log(`Stack: ${trapStack(heights)}`);
        console.log(`Functional: ${trapFunctional(heights)}`);
        console.log('---');
    });
    
    // Demonstrate ES6+ features and JavaScript strengths
    console.log('\n=== ES6+ Features & JavaScript Strengths ===');
    
    const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    
    // Destructuring with array operations
    const [first, second, ...rest] = heights;
    console.log('First:', first, 'Second:', second, 'Rest length:', rest.length);
    
    // Using Math methods for analysis
    const maxHeight = Math.max(...heights);
    const minHeight = Math.min(...heights);
    const avgHeight = heights.reduce((sum, h) => sum + h, 0) / heights.length;
    
    console.log('Height analysis:', { maxHeight, minHeight, avgHeight: avgHeight.toFixed(2) });
    
    // Method chaining with array operations
    const processedHeights = heights
        .map((h, i) => ({ height: h, index: i }))
        .filter(item => item.height > 0)
        .sort((a, b) => b.height - a.height)
        .slice(0, 3);
    
    console.log('Top 3 highest bars:', processedHeights);
    
    // Using Set for unique height analysis
    const uniqueHeights = [...new Set(heights)].sort((a, b) => a - b);
    console.log('Unique heights:', uniqueHeights);
    
    // Map for height frequency
    const heightFreq = heights.reduce((freq, height) => {
        freq.set(height, (freq.get(height) || 0) + 1);
        return freq;
    }, new Map());
    
    console.log('Height frequency:', [...heightFreq.entries()]);
    
    // Generator demonstration for step-by-step visualization
    console.log('\nStep-by-step calculation:');
    const stepGenerator = trapStepByStep([3, 0, 2, 0, 4]);
    let stepCount = 0;
    for (const step of stepGenerator) {
        if (stepCount < 5) { // Show first 5 steps
            console.log(`Step ${stepCount + 1}:`, step.action || step.message);
        }
        stepCount++;
    }
    
    // Visualization
    console.log('\nVisualization of [3,0,2,0,4]:');
    const visualization = visualizeTrap([3, 0, 2, 0, 4]);
    visualization.forEach((row, level) => {
        console.log(`Level ${visualization.length - level}: ${row}`);
    });
    
    // Async/await demonstration
    (async () => {
        try {
            const asyncResult = await trapAsync(heights);
            console.log('Async result:', asyncResult);
        } catch (error) {
            console.error('Async error:', error);
        }
    })();
    
    // Memoized function demonstration
    console.log('Memoized result (first call):', trapWithMemoization(heights));
    console.log('Memoized result (second call):', trapWithMemoization(heights));
    
    // Higher-order function for custom analysis
    const createTrapAnalyzer = (processor) => {
        return (heights) => {
            const water = trap(heights);
            return processor(water, heights);
        };
    };
    
    const getWaterRatio = createTrapAnalyzer((water, heights) => {
        const totalArea = heights.length * Math.max(...heights);
        return (water / totalArea * 100).toFixed(2) + '%';
    });
    
    const getEfficiency = createTrapAnalyzer((water, heights) => {
        const totalHeight = heights.reduce((sum, h) => sum + h, 0);
        return totalHeight > 0 ? (water / totalHeight).toFixed(2) : '0';
    });
    
    console.log('Water ratio:', getWaterRatio(heights));
    console.log('Efficiency:', getEfficiency(heights));
    
    // Performance test
    const performanceTestCases = [
        [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        Array.from({length: 100}, (_, i) => Math.floor(Math.random() * 10)),
        Array.from({length: 50}, (_, i) => i % 5)
    ];
    performanceTest(performanceTestCases, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trap,
        trapDP,
        trapStack,
        trapFunctional,
        trapWithMemoization,
        visualizeTrap,
        trapStepByStep,
        trapAsync,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Two Pointers: O(n) - OPTIMAL
 * - Dynamic Programming: O(n)
 * - Stack: O(n)
 * - Functional: O(n)
 * 
 * Space Complexity Analysis:
 * - Two Pointers: O(1) - OPTIMAL
 * - Dynamic Programming: O(n)
 * - Stack: O(n)
 * - Functional: O(n)
 * 
 * JavaScript-Specific Notes:
 * - Math.max/Math.min with spread operator for array operations
 * - Array methods (reduce, map, filter) enable functional approaches
 * - Generators provide step-by-step algorithm visualization
 * - Map provides efficient memoization for repeated calculations
 * - Async/await enables non-blocking processing for large datasets
 * - Higher-order functions enable flexible analysis patterns
 * - Destructuring provides clean variable assignment
 * - Method chaining enables complex data transformations
 */
