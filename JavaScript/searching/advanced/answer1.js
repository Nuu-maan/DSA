/**
 * Minimum Window Substring
 * 
 * Problem: Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that
 * every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
 * Source: https://leetcode.com/problems/minimum-window-substring/
 * 
 * Approach 1: Sliding Window with Two Pointers and Hash Map
 * Time Complexity: O(m + n)
 * Space Complexity: O(1) - fixed size character set
 */
function minWindowSlidingWindow(s, t) {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return "";
    
    // Create frequency map for characters in t
    const targetFreq = new Map();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }
    
    const required = targetFreq.size;
    let formed = 0;
    let left = 0;
    let minLength = Infinity;
    let result = "";
    
    // Sliding window frequency map
    const windowFreq = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // Add current character to window
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        // Check if current character completes a required character count
        if (targetFreq.has(char) && windowFreq.get(char) === targetFreq.get(char)) {
            formed++;
        }
        
        // Try to contract the window from the left
        while (left <= right && formed === required) {
            const currentLength = right - left + 1;
            
            // Update result if we found a smaller window
            if (currentLength < minLength) {
                minLength = currentLength;
                result = s.substring(left, right + 1);
            }
            
            // Move left pointer to the right
            const leftChar = s[left];
            windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
            
            if (targetFreq.has(leftChar) && windowFreq.get(leftChar) < targetFreq.get(leftChar)) {
                formed--;
            }
            
            // Remove characters with zero count from the window
            if (windowFreq.get(leftChar) === 0) {
                windowFreq.delete(leftChar);
            }
            
            left++;
        }
    }
    
    return result;
}

/**
 * Approach 2: Optimized Sliding Window with Filtered S
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function minWindowOptimized(s, t) {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return "";
    
    // Create frequency map for characters in t
    const targetFreq = new Map();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }
    
    const required = targetFreq.size;
    let formed = 0;
    let left = 0;
    let minLength = Infinity;
    let result = "";
    
    // Filter S to only include characters in T
    const filteredS = [];
    for (let i = 0; i < s.length; i++) {
        if (targetFreq.has(s[i])) {
            filteredS.push([i, s[i]]);
        }
    }
    
    const windowFreq = new Map();
    
    for (let right = 0; right < filteredS.length; right++) {
        const [rightIdx, char] = filteredS[right];
        
        // Add current character to window
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        // Check if current character completes a required character count
        if (windowFreq.get(char) === targetFreq.get(char)) {
            formed++;
        }
        
        // Try to contract the window from the left
        while (left <= right && formed === required) {
            const [leftIdx, leftChar] = filteredS[left];
            const currentLength = rightIdx - leftIdx + 1;
            
            // Update result if we found a smaller window
            if (currentLength < minLength) {
                minLength = currentLength;
                result = s.substring(leftIdx, rightIdx + 1);
            }
            
            // Move left pointer to the right
            windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
            
            if (windowFreq.get(leftChar) < targetFreq.get(leftChar)) {
                formed--;
            }
            
            left++;
        }
    }
    
    return result;
}

/**
 * Approach 3: Using Array for Frequency Counting
 * Time Complexity: O(m + n)
 * Space Complexity: O(1) - fixed size array
 */
function minWindowArray(s, t) {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return "";
    
    const targetFreq = new Array(128).fill(0);
    for (const char of t) {
        targetFreq[char.charCodeAt(0)]++;
    }
    
    let required = 0;
    for (let i = 0; i < 128; i++) {
        if (targetFreq[i] > 0) required++;
    }
    
    const windowFreq = new Array(128).fill(0);
    let left = 0;
    let formed = 0;
    let minLength = Infinity;
    let result = "";
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s.charCodeAt(right);
        
        // Add current character to window
        windowFreq[rightChar]++;
        
        // Check if current character completes a required character count
        if (targetFreq[rightChar] > 0 && windowFreq[rightChar] === targetFreq[rightChar]) {
            formed++;
        }
        
        // Try to contract the window from the left
        while (left <= right && formed === required) {
            const currentLength = right - left + 1;
            
            // Update result if we found a smaller window
            if (currentLength < minLength) {
                minLength = currentLength;
                result = s.substring(left, right + 1);
            }
            
            // Move left pointer to the right
            const leftChar = s.charCodeAt(left);
            windowFreq[leftChar]--;
            
            if (targetFreq[leftChar] > 0 && windowFreq[leftChar] < targetFreq[leftChar]) {
                formed--;
            }
            
            left++;
        }
    }
    
    return result;
}

/**
 * Approach 4: Using Two Pointers with Direct String Comparison
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function minWindowDirect(s, t) {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return "";
    
    const targetFreq = new Map();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }
    
    const required = targetFreq.size;
    let formed = 0;
    let left = 0;
    let minLength = Infinity;
    let result = "";
    
    const windowFreq = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // Skip characters not in t
        if (!targetFreq.has(char)) continue;
        
        // Add current character to window
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        // Check if current character completes a required character count
        if (windowFreq.get(char) === targetFreq.get(char)) {
            formed++;
        }
        
        // Try to contract the window from the left
        while (left <= right && formed === required) {
            const currentLength = right - left + 1;
            
            // Update result if we found a smaller window
            if (currentLength < minLength) {
                minLength = currentLength;
                result = s.substring(left, right + 1);
            }
            
            const leftChar = s[left];
            
            // Only process characters in t
            if (targetFreq.has(leftChar)) {
                windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
                
                if (windowFreq.get(leftChar) < targetFreq.get(leftChar)) {
                    formed--;
                }
            }
            
            left++;
        }
    }
    
    return result;
}

/**
 * Approach 5: Using Array and Counter
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function minWindowCounter(s, t) {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return "";
    
    const targetFreq = new Array(128).fill(0);
    for (const char of t) {
        targetFreq[char.charCodeAt(0)]++;
    }
    
    let counter = t.length;
    let left = 0;
    let minLength = Infinity;
    let result = "";
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s.charCodeAt(right);
        
        // Decrease counter for characters in t
        if (targetFreq[rightChar] > 0) {
            counter--;
        }
        targetFreq[rightChar]--;
        
        // When we've found all characters
        while (counter === 0) {
            const currentLength = right - left + 1;
            
            // Update result if we found a smaller window
            if (currentLength < minLength) {
                minLength = currentLength;
                result = s.substring(left, right + 1);
            }
            
            // Move left pointer to the right
            const leftChar = s.charCodeAt(left);
            targetFreq[leftChar]++;
            
            if (targetFreq[leftChar] > 0) {
                counter++;
            }
            
            left++;
        }
    }
    
    return result;
}

/**
 * Approach 6: Using Map with Early Termination
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function minWindowEarlyTermination(s, t) {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return "";
    
    const targetFreq = new Map();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }
    
    const required = targetFreq.size;
    let formed = 0;
    let left = 0;
    let minLength = Infinity;
    let result = "";
    
    const windowFreq = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // Skip characters not in t for optimization
        if (!targetFreq.has(char)) continue;
        
        // Add current character to window
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        // Check if current character completes a required character count
        if (windowFreq.get(char) === targetFreq.get(char)) {
            formed++;
        }
        
        // Early termination if we've already found a window of size t.length
        if (formed === required && right - left + 1 === t.length) {
            return s.substring(left, right + 1);
        }
        
        // Try to contract the window from the left
        while (left <= right && formed === required) {
            const currentLength = right - left + 1;
            
            // Update result if we found a smaller window
            if (currentLength < minLength) {
                minLength = currentLength;
                result = s.substring(left, right + 1);
                
                // Early termination if we've found the smallest possible window
                if (minLength === t.length) {
                    return result;
                }
            }
            
            const leftChar = s[left];
            
            // Only process characters in t
            if (targetFreq.has(leftChar)) {
                windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
                
                if (windowFreq.get(leftChar) < targetFreq.get(leftChar)) {
                    formed--;
                }
            }
            
            left++;
        }
    }
    
    return result;
}

// Test cases
function runTests() {
    const testCases = [
        { s: "ADOBECODEBANC", t: "ABC", expected: "BANC" },
        { s: "a", t: "a", expected: "a" },
        { s: "a", t: "aa", expected: "" },
        { s: "bdab", t: "ab", expected: "ab" },
        { s: "cabwefgewcwaefgcf", t: "cae", expected: "cwae" },
        { s: "ab", t: "b", expected: "b" },
        { s: "aa", t: "aa", expected: "aa" },
        { s: "abc", t: "ac", expected: "abc" },
    ];
    
    const functions = [
        minWindowSlidingWindow,
        minWindowOptimized,
        minWindowArray,
        minWindowDirect,
        minWindowCounter,
        minWindowEarlyTermination
    ];
    
    functions.forEach((func, index) => {
        console.log(`\nTesting ${func.name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = func(test.s, test.t);
            const passed = result === test.expected;
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: s="${test.s}", t="${test.t}"`);
                console.log(`    Expected: "${test.expected}", Got: "${result}"`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Minimum Window Substring ===');
runTests();

// Export functions for use in other modules
module.exports = {
    minWindowSlidingWindow,
    minWindowOptimized,
    minWindowArray,
    minWindowDirect,
    minWindowCounter,
    minWindowEarlyTermination
};
