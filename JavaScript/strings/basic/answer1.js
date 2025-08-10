/**
 * Reverse Words in a String - Multiple Approaches
 * 
 * Problem: Given a string, reverse the order of the words.
 * 
 * Example:
 * Input: "the sky is blue"
 * Output: "blue is sky the"
 */

/**
 * Approach 1: Using built-in methods (split, reverse, join)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const reverseWords1 = (s) => {
    return s.trim().split(/\s+/).reverse().join(' ');
};

/**
 * Approach 2: Two Pointers (in-place for array, but JS strings are immutable)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const reverseWords2 = (s) => {
    // Trim and split into words
    const words = s.trim().split(/\s+/);
    let left = 0;
    let right = words.length - 1;
    
    // Reverse the array of words
    while (left < right) {
        [words[left], words[right]] = [words[right], words[left]];
        left++;
        right--;
    }
    
    return words.join(' ');
};

/**
 * Approach 3: Using Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const reverseWords3 = (s) => {
    const stack = [];
    let word = '';
    
    // Process the string from start to end
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ' ') {
            word += s[i];
        } else if (word) {
            stack.push(word);
            word = '';
        }
    }
    
    // Push the last word if exists
    if (word) stack.push(word);
    
    // Build the result by popping from stack
    let result = '';
    while (stack.length > 0) {
        result += stack.pop() + (stack.length > 0 ? ' ' : '');
    }
    
    return result;
};

/**
 * Approach 4: Using reduce (functional approach)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const reverseWords4 = (s) => {
    return s
        .trim()
        .split(/\s+/)
        .reduce((reversed, word) => [word, ...reversed], [])
        .join(' ');
};

// Test cases
const testCases = [
    { input: "the sky is blue", expected: "blue is sky the" },
    { input: "  hello world  ", expected: "world hello" },
    { input: "a good   example", expected: "example good a" },
    { input: "  Bob    Loves  Alice   ", expected: "Alice Loves Bob" },
    { input: "Alice does not even like bob", expected: "bob like even not does Alice" },
];

// Run tests
const runTests = () => {
    const functions = [reverseWords1, reverseWords2, reverseWords3, reverseWords4];
    const functionNames = ['Built-in', 'Two Pointers', 'Stack', 'Reduce'];
    
    functions.forEach((fn, index) => {
        console.log(`\nTesting ${functionNames[index]} approach:`);
        testCases.forEach((test, i) => {
            const result = fn(test.input);
            const passed = result === test.expected;
            console.log(`Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`  Input: "${test.input}"`);
                console.log(`  Expected: "${test.expected}"`);
                console.log(`  Got: "${result}"`);
            }
        });
    });
};

// Performance comparison
const measurePerformance = () => {
    const longString = 'a '.repeat(10000).trim(); // Creates "a a a ... a" (10000 times)
    
    console.log('\nPerformance Comparison (long string):');
    
    const functions = [reverseWords1, reverseWords2, reverseWords3, reverseWords4];
    const functionNames = ['Built-in', 'Two Pointers', 'Stack', 'Reduce'];
    
    functions.forEach((fn, index) => {
        const start = performance.now();
        const result = fn(longString);
        const end = performance.now();
        console.log(`${functionNames[index]}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Reverse Words in a String ===');
runTests();
measurePerformance();
