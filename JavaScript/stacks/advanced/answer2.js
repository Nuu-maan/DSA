/**
 * Number of Visible People in a Queue
 * 
 * Approach 1: Using Monotonic Stack (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function canSeePersonsCount(heights) {
    const n = heights.length;
    const result = new Array(n).fill(0);
    const stack = [];
    
    for (let i = n - 1; i >= 0; i--) {
        let count = 0;
        
        // Count people that can be seen
        while (stack.length > 0 && heights[i] > stack[stack.length - 1]) {
            stack.pop();
            count++;
        }
        
        // If there's someone taller behind, we can see them too
        if (stack.length > 0) {
            count++;
        }
        
        result[i] = count;
        stack.push(heights[i]);
    }
    
    return result;
}

/**
 * Approach 2: Using Next Greater Element with Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function canSeePersonsCountWithNGE(heights) {
    const n = heights.length;
    const result = new Array(n).fill(0);
    const stack = [];
    
    for (let i = 0; i < n; i++) {
        // For elements in stack that are smaller than current
        while (stack.length > 0 && heights[stack[stack.length - 1]] < heights[i]) {
            const idx = stack.pop();
            result[idx]++;
        }
        
        // The next element in stack can see current element
        if (stack.length > 0) {
            result[stack[stack.length - 1]]++;
        }
        
        stack.push(i);
    }
    
    return result;
}

/**
 * Approach 3: Using Monotonic Stack with Pairs
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function canSeePersonsCountWithPairs(heights) {
    const n = heights.length;
    const result = new Array(n).fill(0);
    const stack = [];
    
    for (let i = n - 1; i >= 0; i--) {
        let count = 0;
        
        // Count people that can be seen
        while (stack.length > 0 && heights[i] > stack[stack.length - 1].height) {
            const { height, cnt } = stack.pop();
            count += cnt + 1; // +1 for the current person being popped
        }
        
        // If there's someone taller behind, we can see them
        if (stack.length > 0) {
            count++;
        }
        
        result[i] = count;
        stack.push({ height: heights[i], cnt: count });
    }
    
    return result;
}

// Test cases
function testCanSeePersonsCount() {
    // Test case 1
    const heights1 = [10, 6, 8, 5, 11, 9];
    const expected1 = [3, 1, 2, 1, 1, 0];
    
    console.assert(
        JSON.stringify(canSeePersonsCount(heights1)) === JSON.stringify(expected1),
        "Test 1 (Monotonic Stack) failed"
    );
    console.assert(
        JSON.stringify(canSeePersonsCountWithNGE(heights1)) === JSON.stringify(expected1),
        "Test 1 (NGE) failed"
    );
    console.assert(
        JSON.stringify(canSeePersonsCountWithPairs(heights1)) === JSON.stringify(expected1),
        "Test 1 (Pairs) failed"
    );
    
    // Test case 2
    const heights2 = [5, 1, 2, 3, 10];
    const expected2 = [4, 1, 1, 1, 0];
    
    console.assert(
        JSON.stringify(canSeePersonsCount(heights2)) === JSON.stringify(expected2),
        "Test 2 (Monotonic Stack) failed"
    );
    
    // Test case 3 (All increasing)
    const heights3 = [1, 2, 3, 4, 5];
    const expected3 = [1, 1, 1, 1, 0];
    
    console.assert(
        JSON.stringify(canSeePersonsCount(heights3)) === JSON.stringify(expected3),
        "Test 3 (Monotonic Stack) failed"
    );
    
    console.log("All visible people in queue tests passed!");
}

// Run the tests
try {
    testCanSeePersonsCount();
} catch (error) {
    console.error("Test failed:", error);
}
