/**
 * Text Justification - Multiple Approaches
 * 
 * Problem: Given an array of words and a maxWidth, format the text such that each line has
 * exactly maxWidth characters and is fully (left and right) justified.
 * 
 * Example:
 * Input: ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
 * Output:
 * [
 *   "This    is    an",
 *   "example  of text",
 *   "justification.  "
 * ]
 */

/**
 * Approach 1: Greedy Approach with Line Building
 * Time Complexity: O(n) where n is the total number of characters in all words
 * Space Complexity: O(n) for the output array
 */
const fullJustify1 = (words, maxWidth) => {
    const result = [];
    let currentLine = [];
    let numOfLetters = 0;
    
    for (const word of words) {
        // Calculate if the word fits in the current line
        // currentLine.length accounts for at least one space between words
        if (numOfLetters + word.length + currentLine.length > maxWidth) {
            // Distribute spaces and add the line to the result
            const totalSpaces = maxWidth - numOfLetters;
            const gaps = currentLine.length - 1;
            
            if (gaps === 0) {
                // Only one word in the line, left-justify
                result.push(currentLine[0] + ' '.repeat(totalSpaces));
            } else {
                // Distribute spaces as evenly as possible
                const spacePerGap = Math.floor(totalSpaces / gaps);
                let extraSpaces = totalSpaces % gaps;
                
                let line = '';
                for (let i = 0; i < currentLine.length; i++) {
                    line += currentLine[i];
                    if (i < gaps) {
                        // Add the base spaces plus an extra if available
                        const spaces = spacePerGap + (i < extraSpaces ? 1 : 0);
                        line += ' '.repeat(spaces);
                    }
                }
                result.push(line);
            }
            
            // Reset for the next line
            currentLine = [];
            numOfLetters = 0;
        }
        
        // Add the current word to the line
        currentLine.push(word);
        numOfLetters += word.length;
    }
    
    // Handle the last line (left-justified)
    if (currentLine.length > 0) {
        const lastLine = currentLine.join(' ');
        const padding = ' '.repeat(maxWidth - lastLine.length);
        result.push(lastLine + padding);
    }
    
    return result;
};

/**
 * Approach 2: Two-Pass with Line Building
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const fullJustify2 = (words, maxWidth) => {
    const result = [];
    let start = 0;
    
    while (start < words.length) {
        // Find the end index for the current line
        let end = start;
        let lineLength = words[end].length;
        
        while (end + 1 < words.length && lineLength + words[end + 1].length + (end + 1 - start) <= maxWidth) {
            end++;
            lineLength += words[end].length;
        }
        
        // Build the line
        let line = '';
        const numWords = end - start + 1;
        const totalSpaces = maxWidth - lineLength;
        
        // If it's the last line or only one word, left-justify
        if (end === words.length - 1 || numWords === 1) {
            line = words.slice(start, end + 1).join(' ');
            line += ' '.repeat(maxWidth - line.length);
        } else {
            // Distribute spaces
            const gaps = numWords - 1;
            const spacePerGap = Math.floor(totalSpaces / gaps);
            let extraSpaces = totalSpaces % gaps;
            
            for (let i = start; i <= end; i++) {
                line += words[i];
                if (i < end) {
                    const spaces = spacePerGap + (i - start < extraSpaces ? 1 : 0);
                    line += ' '.repeat(spaces);
                }
            }
        }
        
        result.push(line);
        start = end + 1;
    }
    
    return result;
};

/**
 * Approach 3: Functional Approach with Helper Functions
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const fullJustify3 = (words, maxWidth) => {
    const result = [];
    let currentLine = [];
    let currentLength = 0;
    
    // Helper function to create a line with full justification
    const createLine = (words, maxWidth, isLastLine = false) => {
        if (isLastLine || words.length === 1) {
            const line = words.join(' ');
            return line + ' '.repeat(maxWidth - line.length);
        }
        
        const totalSpaces = maxWidth - words.reduce((sum, word) => sum + word.length, 0);
        const gaps = words.length - 1;
        const spacesPerGap = Math.floor(totalSpaces / gaps);
        let extraSpaces = totalSpaces % gaps;
        
        return words.map((word, i) => {
            if (i === words.length - 1) return word;
            const spaces = spacesPerGap + (i < extraSpaces ? 1 : 0);
            return word + ' '.repeat(spaces);
        }).join('');
    };
    
    for (const word of words) {
        // Check if adding the next word exceeds the maxWidth
        const minLength = currentLine.length > 0 
            ? currentLength + word.length + 1  // +1 for space
            : word.length;                     // First word in line
            
        if (minLength <= maxWidth) {
            currentLine.push(word);
            currentLength = minLength;
        } else {
            // Add the current line to the result
            result.push(createLine(currentLine, maxWidth));
            
            // Start a new line with the current word
            currentLine = [word];
            currentLength = word.length;
        }
    }
    
    // Add the last line (left-justified)
    if (currentLine.length > 0) {
        const lastLine = currentLine.join(' ');
        result.push(lastLine + ' '.repeat(maxWidth - lastLine.length));
    }
    
    return result;
};

/**
 * Approach 4: Optimized with String Builder
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const fullJustify4 = (words, maxWidth) => {
    const result = [];
    let start = 0;
    
    while (start < words.length) {
        // Find the end index for the current line
        let end = start;
        let lineLength = words[end].length;
        
        while (end + 1 < words.length && lineLength + words[end + 1].length + (end + 1 - start) <= maxWidth) {
            end++;
            lineLength += words[end].length;
        }
        
        // Build the line
        const numWords = end - start + 1;
        const totalSpaces = maxWidth - lineLength;
        
        // Handle the last line or single word line
        if (end === words.length - 1 || numWords === 1) {
            const line = words.slice(start, end + 1).join(' ');
            result.push(line + ' '.repeat(maxWidth - line.length));
        } else {
            // Distribute spaces
            const gaps = numWords - 1;
            const spacePerGap = Math.floor(totalSpaces / gaps);
            let extraSpaces = totalSpaces % gaps;
            
            let line = '';
            for (let i = start; i <= end; i++) {
                line += words[i];
                if (i < end) {
                    const spaces = spacePerGap + (i - start < extraSpaces ? 1 : 0);
                    line += ' '.repeat(spaces);
                }
            }
            result.push(line);
        }
        
        start = end + 1;
    }
    
    return result;
};

// Test cases
const testCases = [
    {
        input: {
            words: ["This", "is", "an", "example", "of", "text", "justification."],
            maxWidth: 16
        },
        expected: [
            "This    is    an",
            "example  of text",
            "justification.  "
        ]
    },
    {
        input: {
            words: ["What","must","be","acknowledgment","shall","be"],
            maxWidth: 16
        },
        expected: [
            "What   must   be",
            "acknowledgment  ",
            "shall be        "
        ]
    },
    {
        input: {
            words: ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"],
            maxWidth: 20
        },
        expected: [
            "Science  is  what we",
            "understand      well",
            "enough to explain to",
            "a  computer.  Art is",
            "everything  else  we",
            "do                  "
        ]
    },
    {
        input: {
            words: ["Listen","to","many,","speak","to","a","few."],
            maxWidth: 6
        },
        expected: [
            "Listen",
            "to    ",
            "many, ",
            "speak ",
            "to   a",
            "few.  "
        ]
    },
    {
        input: {
            words: ["a", "b", "c", "d", "e"],
            maxWidth: 1
        },
        expected: ["a", "b", "c", "d", "e"]
    }
];

// Helper function to compare arrays of strings
const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

// Run tests
const runTests = () => {
    const functions = [fullJustify1, fullJustify2, fullJustify3, fullJustify4];
    const functionNames = [
        'Greedy Approach', 
        'Two-Pass', 
        'Functional', 
        'Optimized Builder'
    ];
    
    functions.forEach((fn, index) => {
        console.log(`\nTesting ${functionNames[index]} approach:`);
        testCases.forEach((test, i) => {
            const result = fn(test.input.words, test.input.maxWidth);
            const passed = arraysEqual(result, test.expected);
            console.log(`Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`  Input: ["${test.input.words.join('", "')}"], ${test.input.maxWidth}`);
                console.log('  Expected:');
                test.expected.forEach(line => console.log(`    "${line}"`));
                console.log('  Got:');
                result.forEach(line => console.log(`    "${line}"`));
            }
        });
    });
};

// Performance comparison
const measurePerformance = () => {
    // Generate a long list of words
    const words = [];
    const wordList = ["hello", "world", "this", "is", "a", "test", "of", "text", "justification"];
    
    for (let i = 0; i < 1000; i++) {
        words.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    
    const maxWidth = 30;
    
    console.log('\nPerformance Comparison (1000 words):');
    
    const functions = [fullJustify1, fullJustify2, fullJustify3, fullJustify4];
    const functionNames = [
        'Greedy Approach', 
        'Two-Pass', 
        'Functional', 
        'Optimized Builder'
    ];
    
    functions.forEach((fn, index) => {
        const start = performance.now();
        const result = fn([...words], maxWidth);
        const end = performance.now();
        console.log(`${functionNames[index]}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Text Justification ===');
runTests();
measurePerformance();
