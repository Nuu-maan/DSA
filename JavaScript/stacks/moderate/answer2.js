/**
 * Maximal Rectangle
 * 
 * Approach 1: Using Largest Rectangle in Histogram for each row
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(cols)
 */
function maximalRectangle(matrix) {
    if (!matrix.length) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = new Array(cols).fill(0);
    let maxArea = 0;
    
    // Calculate largest rectangle in histogram
    const largestRectangleArea = (heights) => {
        const stack = [];
        let maxArea = 0;
        
        for (let i = 0; i <= heights.length; i++) {
            while (stack.length > 0 && (i === heights.length || heights[stack[stack.length - 1]] >= heights[i])) {
                const height = heights[stack.pop()];
                const width = stack.length === 0 ? i : (i - stack[stack.length - 1] - 1);
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        
        return maxArea;
    };
    
    // Process each row
    for (let i = 0; i < rows; i++) {
        // Update heights array for current row
        for (let j = 0; j < cols; j++) {
            heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
        }
        
        // Calculate max area for current row's histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }
    
    return maxArea;
}

/**
 * Approach 2: Dynamic Programming with Left, Right, and Height Arrays
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(cols)
 */
function maximalRectangleDP(matrix) {
    if (!matrix.length) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Initialize arrays
    const left = new Array(cols).fill(0);
    const right = new Array(cols).fill(cols - 1);
    const height = new Array(cols).fill(0);
    let maxArea = 0;
    
    for (let i = 0; i < rows; i++) {
        let currLeft = 0;
        let currRight = cols - 1;
        
        // Update height and left boundaries
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === '1') {
                height[j]++;
                left[j] = Math.max(left[j], currLeft);
            } else {
                height[j] = 0;
                left[j] = 0;
                currLeft = j + 1;
            }
        }
        
        // Update right boundaries
        for (let j = cols - 1; j >= 0; j--) {
            if (matrix[i][j] === '1') {
                right[j] = Math.min(right[j], currRight);
                // Calculate area for current cell
                maxArea = Math.max(maxArea, height[j] * (right[j] - left[j] + 1));
            } else {
                right[j] = cols - 1;
                currRight = j - 1;
            }
        }
    }
    
    return maxArea;
}

/**
 * Approach 3: Optimized Dynamic Programming
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(cols)
 */
function maximalRectangleOptimized(matrix) {
    if (!matrix.length) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Initialize arrays
    const left = new Array(cols).fill(0);
    const right = new Array(cols).fill(cols - 1);
    const height = new Array(cols).fill(0);
    let maxArea = 0;
    
    for (let i = 0; i < rows; i++) {
        // Update height and left boundaries
        let currLeft = 0;
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === '1') {
                height[j]++;
                left[j] = Math.max(left[j], currLeft);
            } else {
                height[j] = 0;
                left[j] = 0;
                currLeft = j + 1;
            }
        }
        
        // Update right boundaries and calculate area
        let currRight = cols - 1;
        for (let j = cols - 1; j >= 0; j--) {
            if (matrix[i][j] === '1') {
                right[j] = Math.min(right[j], currRight);
                maxArea = Math.max(maxArea, height[j] * (right[j] - left[j] + 1));
            } else {
                right[j] = cols - 1;
                currRight = j - 1;
            }
        }
    }
    
    return maxArea;
}

// Test cases
function testMaximalRectangle() {
    // Test case 1
    const matrix1 = [
        ["1","0","1","0","0"],
        ["1","0","1","1","1"],
        ["1","1","1","1","1"],
        ["1","0","0","1","0"]
    ];
    const expected1 = 6;
    
    console.assert(maximalRectangle(matrix1) === expected1, "Test 1 failed");
    console.assert(maximalRectangleDP(matrix1) === expected1, "Test 1 DP failed");
    console.assert(maximalRectangleOptimized(matrix1) === expected1, "Test 1 Optimized failed");
    
    // Test case 2
    const matrix2 = [["0"]];
    const expected2 = 0;
    
    console.assert(maximalRectangle(matrix2) === expected2, "Test 2 failed");
    
    // Test case 3
    const matrix3 = [["1"]];
    const expected3 = 1;
    
    console.assert(maximalRectangle(matrix3) === expected3, "Test 3 failed");
    
    console.log("All maximal rectangle tests passed!");
}

// Run the tests
try {
    testMaximalRectangle();
} catch (error) {
    console.error("Test failed:", error);
}
