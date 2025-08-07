/**
 * Largest Rectangle in Histogram
 * 
 * Approach 1: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function largestRectangleAreaBruteForce(heights) {
    let maxArea = 0;
    const n = heights.length;
    
    for (let i = 0; i < n; i++) {
        let minHeight = heights[i];
        
        for (let j = i; j < n; j++) {
            minHeight = Math.min(minHeight, heights[j]);
            const width = j - i + 1;
            maxArea = Math.max(maxArea, minHeight * width);
        }
    }
    
    return maxArea;
}

/**
 * Approach 2: Using Stack (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function largestRectangleAreaStack(heights) {
    const stack = [];
    let maxArea = 0;
    const n = heights.length;
    
    // Helper function to process the stack
    const processStack = (i, height) => {
        while (stack.length > 0 && (i === n || heights[stack[stack.length - 1]] >= height)) {
            const h = heights[stack.pop()];
            const width = stack.length === 0 ? i : (i - stack[stack.length - 1] - 1);
            maxArea = Math.max(maxArea, h * width);
        }
    };
    
    for (let i = 0; i <= n; i++) {
        const currentHeight = i < n ? heights[i] : 0;
        processStack(i, currentHeight);
        stack.push(i);
    }
    
    return maxArea;
}

/**
 * Approach 3: Divide and Conquer with Segment Tree (Optimal for some cases)
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(n)
 */
function largestRectangleAreaDivideConquer(heights) {
    // Helper function to find minimum index in range [start, end]
    const findMinIndex = (start, end) => {
        let minIndex = start;
        for (let i = start + 1; i <= end; i++) {
            if (heights[i] < heights[minIndex]) {
                minIndex = i;
            }
        }
        return minIndex;
    };
    
    // Main divide and conquer function
    const calculateArea = (start, end) => {
        if (start > end) return 0;
        if (start === end) return heights[start];
        
        // Find minimum height in current range
        const minIndex = findMinIndex(start, end);
        
        // Calculate maximum area in left, right and including current minimum
        const leftArea = calculateArea(start, minIndex - 1);
        const rightArea = calculateArea(minIndex + 1, end);
        const currentArea = heights[minIndex] * (end - start + 1);
        
        return Math.max(currentArea, Math.max(leftArea, rightArea));
    };
    
    return calculateArea(0, heights.length - 1);
}

/**
 * Approach 4: Dynamic Programming with Left and Right Boundaries
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function largestRectangleAreaDP(heights) {
    if (!heights || heights.length === 0) return 0;
    
    const n = heights.length;
    const left = new Array(n).fill(0);
    const right = new Array(n).fill(n - 1);
    
    // Calculate left boundaries
    for (let i = 1; i < n; i++) {
        let p = i - 1;
        while (p >= 0 && heights[p] >= heights[i]) {
            p = left[p] - 1;
        }
        left[i] = p + 1;
    }
    
    // Calculate right boundaries
    for (let i = n - 2; i >= 0; i--) {
        let p = i + 1;
        while (p < n && heights[p] >= heights[i]) {
            p = right[p] + 1;
        }
        right[i] = p - 1;
    }
    
    // Calculate max area
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        maxArea = Math.max(maxArea, heights[i] * (right[i] - left[i] + 1));
    }
    
    return maxArea;
}

// Test cases
function testLargestRectangleArea() {
    // Test case 1
    const heights1 = [2, 1, 5, 6, 2, 3];
    const expected1 = 10;
    
    console.assert(largestRectangleAreaBruteForce(heights1) === expected1, "Test 1 Brute Force failed");
    console.assert(largestRectangleAreaStack(heights1) === expected1, "Test 1 Stack failed");
    console.assert(largestRectangleAreaDivideConquer(heights1) === expected1, "Test 1 Divide & Conquer failed");
    console.assert(largestRectangleAreaDP(heights1) === expected1, "Test 1 DP failed");
    
    // Test case 2
    const heights2 = [2, 4];
    const expected2 = 4;
    
    console.assert(largestRectangleAreaBruteForce(heights2) === expected2, "Test 2 Brute Force failed");
    console.assert(largestRectangleAreaStack(heights2) === expected2, "Test 2 Stack failed");
    
    // Test case 3 (All increasing)
    const heights3 = [1, 2, 3, 4, 5];
    const expected3 = 9; // 3*3 = 9 (indices 2-4)
    
    console.assert(largestRectangleAreaStack(heights3) === expected3, "Test 3 Stack failed");
    console.assert(largestRectangleAreaDP(heights3) === expected3, "Test 3 DP failed");
    
    console.log("All largest rectangle in histogram tests passed!");
}

// Run the tests
try {
    testLargestRectangleArea();
} catch (error) {
    console.error("Test failed:", error);
}
