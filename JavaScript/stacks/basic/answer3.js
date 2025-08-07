/**
 * Next Greater Element
 * 
 * Approach 1: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1) - not counting the result array
 */
function nextGreaterElementBruteForce(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[j] > nums[i]) {
                result[i] = nums[j];
                break;
            }
        }
    }
    
    return result;
}

/**
 * Approach 2: Using Stack (Right to Left)
 * Time Complexity: O(n)
 * Space Complexity: O(n) - stack space
 */
function nextGreaterElementStack(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    
    // Process from right to left
    for (let i = n - 1; i >= 0; i--) {
        // Pop elements from stack that are smaller than current element
        while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
            stack.pop();
        }
        
        // If stack is not empty, the top element is the next greater
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }
        
        // Push current element to stack
        stack.push(nums[i]);
    }
    
    return result;
}

/**
 * Approach 3: Using Stack (Left to Right) with indices
 * Time Complexity: O(n)
 * Space Complexity: O(n) - stack space
 */
function nextGreaterElementStackIndices(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = []; // Store indices of elements
    
    for (let i = 0; i < n; i++) {
        const current = nums[i];
        
        // For elements in stack that are smaller than current
        while (stack.length > 0 && nums[stack[stack.length - 1]] < current) {
            const idx = stack.pop();
            result[idx] = current;
        }
        
        // Push current index to stack
        stack.push(i);
    }
    
    return result;
}

/**
 * Approach 4: Circular Array (Next Greater Element II)
 * Handles circular arrays where we can wrap around
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function nextGreaterElementCircular(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    
    // Process array twice to handle circular nature
    for (let i = 0; i < 2 * n; i++) {
        const idx = i % n;
        const current = nums[idx];
        
        while (stack.length > 0 && nums[stack[stack.length - 1]] < current) {
            const top = stack.pop();
            result[top] = current;
        }
        
        // Only push to stack during first pass
        if (i < n) {
            stack.push(idx);
        }
    }
    
    return result;
}

// Test cases
function testNextGreaterElement() {
    // Test case 1
    const nums1 = [4, 5, 2, 25];
    const expected1 = [5, 25, 25, -1];
    console.assert(
        JSON.stringify(nextGreaterElementBruteForce(nums1)) === JSON.stringify(expected1),
        "Test 1 Brute Force failed"
    );
    console.assert(
        JSON.stringify(nextGreaterElementStack(nums1)) === JSON.stringify(expected1),
        "Test 1 Stack failed"
    );
    console.assert(
        JSON.stringify(nextGreaterElementStackIndices(nums1)) === JSON.stringify(expected1),
        "Test 1 Stack Indices failed"
    );
    
    // Test case 2
    const nums2 = [13, 7, 6, 12];
    const expected2 = [-1, 12, 12, -1];
    console.assert(
        JSON.stringify(nextGreaterElementBruteForce(nums2)) === JSON.stringify(expected2),
        "Test 2 Brute Force failed"
    );
    console.assert(
        JSON.stringify(nextGreaterElementStack(nums2)) === JSON.stringify(expected2),
        "Test 2 Stack failed"
    );
    
    // Test case 3 (Circular)
    const nums3 = [1, 2, 1];
    const expected3 = [2, -1, 2];
    console.assert(
        JSON.stringify(nextGreaterElementCircular(nums3)) === JSON.stringify(expected3),
        "Test 3 Circular failed"
    );
    
    console.log("All next greater element tests passed!");
}

// Run the tests
try {
    testNextGreaterElement();
} catch (error) {
    console.error("Test failed:", error);
}
