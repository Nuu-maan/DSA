/**
 * Valid Parentheses (Balanced Parentheses)
 * 
 * Approach 1: Using Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function isValidParenthesesStack(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in map) {
            const topElement = stack.pop();
            if (map[char] !== topElement) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}

/**
 * Approach 2: Using Counter (Only works for single type of parentheses)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function isValidParenthesesCounter(s) {
    let balance = 0;
    for (let char of s) {
        if (char === '(') balance++;
        else if (char === ')') balance--;
        
        if (balance < 0) return false; // More closing than opening
    }
    return balance === 0;
}

/**
 * Approach 3: Using Recursion (For educational purposes, not recommended for large inputs)
 * Time Complexity: O(n^2) in worst case
 * Space Complexity: O(n) due to call stack
 */
function isValidParenthesesRecursive(s) {
    if (s === '') return true;
    
    const stack = [];
    let i = 0;
    
    while (i < s.length) {
        const char = s[i];
        
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0) return false;
            
            const top = stack.pop();
            if (
                (char === ')' && top !== '(') ||
                (char === '}' && top !== '{') ||
                (char === ']' && top !== '[')
            ) {
                return false;
            }
        }
        
        i++;
    }
    
    if (stack.length > 0) return false;
    
    // Check if we can find a matching pair and recurse
    for (let j = 0; j < s.length - 1; j++) {
        if (
            (s[j] === '(' && s[j + 1] === ')') ||
            (s[j] === '{' && s[j + 1] === '}') ||
            (s[j] === '[' && s[j + 1] === ']')
        ) {
            return isValidParenthesesRecursive(s.substring(0, j) + s.substring(j + 2));
        }
    }
    
    return false;
}

// Test cases
function testBalancedParentheses() {
    // Test cases for stack approach
    console.assert(isValidParenthesesStack("()") === true, "Test 1 failed");
    console.assert(isValidParenthesesStack("()[]{}") === true, "Test 2 failed");
    console.assert(isValidParenthesesStack("(]") === false, "Test 3 failed");
    console.assert(isValidParenthesesStack("([)]") === false, "Test 4 failed");
    console.assert(isValidParenthesesStack("{[]}") === true, "Test 5 failed");
    
    // Test cases for counter approach (only works for single type)
    console.assert(isValidParenthesesCounter("()") === true, "Test 6 failed");
    console.assert(isValidParenthesesCounter("()()") === true, "Test 7 failed");
    console.assert(isValidParenthesesCounter("(()") === false, "Test 8 failed");
    console.assert(isValidParenthesesCounter(")(")) === false, "Test 9 failed");
    
    // Test cases for recursive approach
    console.assert(isValidParenthesesRecursive("()") === true, "Test 10 failed");
    console.assert(isValidParenthesesRecursive("()[]{}") === true, "Test 11 failed");
    console.assert(isValidParenthesesRecursive("(]") === false, "Test 12 failed");
    console.assert(isValidParenthesesRecursive("([)]") === false, "Test 13 failed");
    console.assert(isValidParenthesesRecursive("{[]}") === true, "Test 14 failed");
    
    console.log("All balanced parentheses tests passed!");
}

// Run the tests
try {
    testBalancedParentheses();
} catch (error) {
    console.error("Test failed:", error);
}
