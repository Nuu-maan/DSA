/**
 * Substring with Concatenation of All Words
 * 
 * Problem: You are given a string s and an array of strings words. All the strings of words are of the same length.
 * A concatenated substring in s is a substring that contains all the strings of any permutation of words concatenated.
 * Return the starting indices of all the concatenated substrings in s.
 * Source: https://leetcode.com/problems/substring-with-concatenation-of-all-words/
 * 
 * Approach 1: Sliding Window with Hash Map
 * Time Complexity: O(n * m * k) where n is length of s, m is number of words, k is length of each word
 * Space Complexity: O(m * k)
 */
function findSubstringSlidingWindow(s, words) {
    if (!s || !words || words.length === 0) return [];
    
    const wordLength = words[0].length;
    const totalWords = words.length;
    const totalLength = wordLength * totalWords;
    const result = [];
    
    if (s.length < totalLength) return [];
    
    // Create frequency map of words
    const wordFreq = new Map();
    for (const word of words) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
    
    // Try each starting position in the first wordLength characters
    for (let i = 0; i < wordLength; i++) {
        let left = i;
        let count = 0;
        const currentMap = new Map();
        
        // j is the starting index of the current word
        for (let j = i; j <= s.length - wordLength; j += wordLength) {
            const word = s.substring(j, j + wordLength);
            
            if (wordFreq.has(word)) {
                // Add to current map
                currentMap.set(word, (currentMap.get(word) || 0) + 1);
                count++;
                
                // If we have more occurrences than needed, move left pointer
                while (currentMap.get(word) > wordFreq.get(word)) {
                    const leftWord = s.substring(left, left + wordLength);
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    count--;
                    left += wordLength;
                }
                
                // If we found all words
                if (count === totalWords) {
                    result.push(left);
                    
                    // Move left pointer by one word
                    const leftWord = s.substring(left, left + wordLength);
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    count--;
                    left += wordLength;
                }
            } else {
                // Reset if we encounter a word not in the list
                currentMap.clear();
                count = 0;
                left = j + wordLength;
            }
        }
    }
    
    return result;
}

/**
 * Approach 2: Optimized Sliding Window with Word Matching
 * Time Complexity: O(n * m) where n is length of s, m is number of words
 * Space Complexity: O(m * k)
 */
function findSubstringOptimized(s, words) {
    if (!s || !words || words.length === 0) return [];
    
    const wordLength = words[0].length;
    const totalWords = words.length;
    const totalLength = wordLength * totalWords;
    const result = [];
    
    if (s.length < totalLength) return [];
    
    // Create frequency map of words
    const wordFreq = new Map();
    for (const word of words) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
    
    // Try each starting position in the first wordLength characters
    for (let i = 0; i < wordLength; i++) {
        let left = i;
        let matched = 0;
        const currentMap = new Map();
        
        // j is the starting index of the current window
        for (let j = i; j <= s.length - wordLength; j += wordLength) {
            const word = s.substring(j, j + wordLength);
            
            if (wordFreq.has(word)) {
                // Add to current map
                currentMap.set(word, (currentMap.get(word) || 0) + 1);
                
                // If we have too many of this word, move left pointer
                while (currentMap.get(word) > wordFreq.get(word)) {
                    const leftWord = s.substring(left, left + wordLength);
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    if (currentMap.get(leftWord) === wordFreq.get(leftWord) - 1) {
                        matched--;
                    }
                    left += wordLength;
                }
                
                // If counts match, we have a match for this word
                if (currentMap.get(word) === wordFreq.get(word)) {
                    matched++;
                }
                
                // If we matched all words, add to result
                if (matched === wordFreq.size) {
                    result.push(left);
                    
                    // Move left pointer by one word
                    const leftWord = s.substring(left, left + wordLength);
                    if (currentMap.get(leftWord) === wordFreq.get(leftWord)) {
                        matched--;
                    }
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    left += wordLength;
                }
            } else {
                // Reset if we encounter a word not in the list
                currentMap.clear();
                matched = 0;
                left = j + wordLength;
            }
        }
    }
    
    return result;
}

/**
 * Approach 3: Using Frequency Map and Fixed Window
 * Time Complexity: O(n * m) where n is length of s, m is number of words
 * Space Complexity: O(m * k)
 */
function findSubstringFixedWindow(s, words) {
    if (!s || !words || words.length === 0) return [];
    
    const wordLength = words[0].length;
    const totalWords = words.length;
    const totalLength = wordLength * totalWords;
    const result = [];
    
    if (s.length < totalLength) return [];
    
    // Create frequency map of words
    const wordFreq = new Map();
    for (const word of words) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
    
    // Check each possible starting position
    for (let i = 0; i <= s.length - totalLength; i++) {
        const seen = new Map();
        let j = 0;
        
        // Check each word in the current window
        while (j < totalWords) {
            const start = i + j * wordLength;
            const word = s.substring(start, start + wordLength);
            
            if (!wordFreq.has(word)) break;
            
            seen.set(word, (seen.get(word) || 0) + 1);
            
            // If we have more of this word than needed, break
            if (seen.get(word) > wordFreq.get(word)) break;
            
            j++;
        }
        
        // If we found all words, add to result
        if (j === totalWords) {
            result.push(i);
        }
    }
    
    return result;
}

/**
 * Approach 4: Two Pointers with Word Matching
 * Time Complexity: O(n * m) where n is length of s, m is number of words
 * Space Complexity: O(m * k)
 */
function findSubstringTwoPointers(s, words) {
    if (!s || !words || words.length === 0) return [];
    
    const wordLength = words[0].length;
    const totalWords = words.length;
    const totalLength = wordLength * totalWords;
    const result = [];
    
    if (s.length < totalLength) return [];
    
    // Create frequency map of words
    const wordFreq = new Map();
    for (const word of words) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
    
    // Try each possible starting position for the first word
    for (let i = 0; i < wordLength; i++) {
        let left = i;
        let right = i;
        const currentMap = new Map();
        let count = 0;
        
        while (right <= s.length - wordLength) {
            const word = s.substring(right, right + wordLength);
            right += wordLength;
            
            if (wordFreq.has(word)) {
                currentMap.set(word, (currentMap.get(word) || 0) + 1);
                count++;
                
                // If we have too many of this word, move left pointer
                while (currentMap.get(word) > wordFreq.get(word)) {
                    const leftWord = s.substring(left, left + wordLength);
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    count--;
                    left += wordLength;
                }
                
                // If we found all words, add to result
                if (count === totalWords) {
                    result.push(left);
                    
                    // Move left pointer by one word
                    const leftWord = s.substring(left, left + wordLength);
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    count--;
                    left += wordLength;
                }
            } else {
                // Reset if we encounter a word not in the list
                currentMap.clear();
                count = 0;
                left = right;
            }
        }
    }
    
    return result;
}

/**
 * Approach 5: Using Map with Early Termination
 * Time Complexity: O(n * m) where n is length of s, m is number of words
 * Space Complexity: O(m * k)
 */
function findSubstringEarlyTermination(s, words) {
    if (!s || !words || words.length === 0) return [];
    
    const wordLength = words[0].length;
    const totalWords = words.length;
    const totalLength = wordLength * totalWords;
    const result = [];
    
    if (s.length < totalLength) return [];
    
    // Create frequency map of words
    const wordFreq = new Map();
    for (const word of words) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
    
    // Check each possible starting position
    for (let i = 0; i <= s.length - totalLength; i++) {
        if (wordFreq.has(s.substring(i, i + wordLength))) {
            const seen = new Map();
            let j = 0;
            
            // Check each word in the current window
            for (j = 0; j < totalWords; j++) {
                const start = i + j * wordLength;
                const word = s.substring(start, start + wordLength);
                
                if (!wordFreq.has(word)) break;
                
                seen.set(word, (seen.get(word) || 0) + 1);
                
                // Early termination if we have more of this word than needed
                if (seen.get(word) > wordFreq.get(word)) break;
            }
            
            // If we found all words, add to result
            if (j === totalWords) {
                result.push(i);
            }
        }
    }
    
    return result;
}

/**
 * Approach 6: Optimized for Large Inputs
 * Time Complexity: O(n * m) where n is length of s, m is number of words
 * Space Complexity: O(m * k)
 */
function findSubstringOptimizedLarge(s, words) {
    if (!s || !words || words.length === 0) return [];
    
    const wordLength = words[0].length;
    const totalWords = words.length;
    const totalLength = wordLength * totalWords;
    const result = [];
    
    if (s.length < totalLength) return [];
    
    // Create frequency map of words
    const wordFreq = new Map();
    for (const word of words) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
    
    // Precompute word indices
    const wordIndices = [];
    for (let i = 0; i <= s.length - wordLength; i++) {
        const word = s.substring(i, i + wordLength);
        wordIndices.push(wordFreq.has(word) ? word : null);
    }
    
    // Try each starting position in the first wordLength characters
    for (let i = 0; i < wordLength; i++) {
        let left = i;
        let matched = 0;
        const currentMap = new Map();
        
        // j is the starting index of the current window
        for (let j = i; j <= s.length - wordLength; j += wordLength) {
            const wordIndex = j;
            const word = wordIndices[wordIndex];
            
            if (word !== null) {
                // Add to current map
                currentMap.set(word, (currentMap.get(word) || 0) + 1);
                
                // If we have too many of this word, move left pointer
                while (currentMap.get(word) > wordFreq.get(word)) {
                    const leftWord = wordIndices[left];
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    if (currentMap.get(leftWord) === wordFreq.get(leftWord) - 1) {
                        matched--;
                    }
                    left += wordLength;
                }
                
                // If counts match, we have a match for this word
                if (currentMap.get(word) === wordFreq.get(word)) {
                    matched++;
                }
                
                // If we matched all words, add to result
                if (matched === wordFreq.size) {
                    result.push(left);
                    
                    // Move left pointer by one word
                    const leftWord = wordIndices[left];
                    if (currentMap.get(leftWord) === wordFreq.get(leftWord)) {
                        matched--;
                    }
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    left += wordLength;
                }
            } else {
                // Reset if we encounter a word not in the list
                currentMap.clear();
                matched = 0;
                left = j + wordLength;
            }
        }
    }
    
    return result;
}

// Test cases
function runTests() {
    const testCases = [
        {
            s: "barfoothefoobarman",
            words: ["foo", "bar"],
            expected: [0, 9]
        },
        {
            s: "wordgoodgoodgoodbestword",
            words: ["word","good","best","word"],
            expected: []
        },
        {
            s: "barfoofoobarthefoobarman",
            words: ["bar","foo","the"],
            expected: [6,9,12]
        },
        {
            s: "wordgoodgoodgoodbestword",
            words: ["word","good","best","good"],
            expected: [8]
        },
        {
            s: "aaaaaaaa",
            words: ["aa","aa","aa"],
            expected: [0,1,2]
        },
        {
            s: "a",
            words: ["a"],
            expected: [0]
        },
        {
            s: "ababababab",
            words: ["ababa","babab"],
            expected: [0]
        }
    ];
    
    const functions = [
        findSubstringSlidingWindow,
        findSubstringOptimized,
        findSubstringFixedWindow,
        findSubstringTwoPointers,
        findSubstringEarlyTermination,
        findSubstringOptimizedLarge
    ];
    
    functions.forEach((func, index) => {
        console.log(`\nTesting ${func.name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = func(test.s, [...test.words]);
            const passed = JSON.stringify(result) === JSON.stringify(test.expected);
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: s="${test.s}", words=[${test.words}]`);
                console.log(`    Expected: [${test.expected}], Got: [${result}]`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Substring with Concatenation of All Words ===');
runTests();

// Export functions for use in other modules
module.exports = {
    findSubstringSlidingWindow,
    findSubstringOptimized,
    findSubstringFixedWindow,
    findSubstringTwoPointers,
    findSubstringEarlyTermination,
    findSubstringOptimizedLarge
};
