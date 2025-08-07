/**
 * Trapping Rain Water
 * 
 * Approach 1: Using Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function trapStack(height) {
    let water = 0;
    const stack = [];
    
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
}

/**
 * Approach 2: Two Pointers (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function trapTwoPointers(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
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
}

/**
 * Approach 3: Dynamic Programming
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function trapDP(height) {
    if (!height || height.length === 0) return 0;
    
    const n = height.length;
    const leftMax = new Array(n).fill(0);
    const rightMax = new Array(n).fill(0);
    let water = 0;
    
    // Calculate left max for each position
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }
    
    // Calculate right max for each position and water trapped
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }
    
    // Calculate trapped water
    for (let i = 0; i < n; i++) {
        water += Math.min(leftMax[i], rightMax[i]) - height[i];
    }
    
    return water;
}

/**
 * Approach 4: Brute Force (For comparison)
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function trapBruteForce(height) {
    let water = 0;
    const n = height.length;
    
    for (let i = 0; i < n; i++) {
        let leftMax = 0, rightMax = 0;
        
        // Find left max
        for (let j = i; j >= 0; j--) {
            leftMax = Math.max(leftMax, height[j]);
        }
        
        // Find right max
        for (let j = i; j < n; j++) {
            rightMax = Math.max(rightMax, height[j]);
        }
        
        // Add water trapped at current position
        water += Math.min(leftMax, rightMax) - height[i];
    }
    
    return water;
}

// Test cases
function testTrappingRainWater() {
    // Test case 1
    const height1 = [0,1,0,2,1,0,1,3,2,1,2,1];
    const expected1 = 6;
    
    console.assert(trapStack(height1) === expected1, "Test 1 Stack failed");
    console.assert(trapTwoPointers(height1) === expected1, "Test 1 Two Pointers failed");
    console.assert(trapDP(height1) === expected1, "Test 1 DP failed");
    console.assert(trapBruteForce(height1) === expected1, "Test 1 Brute Force failed");
    
    // Test case 2
    const height2 = [4,2,0,3,2,5];
    const expected2 = 9;
    
    console.assert(trapStack(height2) === expected2, "Test 2 Stack failed");
    console.assert(trapTwoPointers(height2) === expected2, "Test 2 Two Pointers failed");
    
    // Test case 3 (All increasing)
    const height3 = [1, 2, 3, 4, 5];
    const expected3 = 0;
    
    console.assert(trapStack(height3) === expected3, "Test 3 Stack failed");
    console.assert(trapDP(height3) === expected3, "Test 3 DP failed");
    
    console.log("All trapping rain water tests passed!");
}

// Run the tests
try {
    testTrappingRainWater();
} catch (error) {
    console.error("Test failed:", error);
}
