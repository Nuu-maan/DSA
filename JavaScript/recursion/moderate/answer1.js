/**
 * Word Search II
 * 
 * Given an m x n board of characters and a list of words, return all words on the board.
 * 
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

// Approach 1: Backtracking with Trie (Optimal)
// Time complexity: O(m*n*4^(max_word_length))
// Space complexity: O(total_characters_in_words + m*n) for trie and visited set
function findWords_v1(board, words) {
    // Build a trie from the words
    const trie = new Trie();
    for (const word of words) {
        trie.insert(word);
    }
    
    const result = new Set();
    const rows = board.length;
    const cols = board[0].length;
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    function dfs(i, j, node, currentWord) {
        // Check if current path forms a word
        if (node.isEnd) {
            result.add(currentWord);
            // Mark as not end to avoid duplicates
            node.isEnd = false;
        }
        
        // Mark as visited
        visited[i][j] = true;
        
        // Explore all four directions
        for (const [di, dj] of directions) {
            const ni = i + di;
            const nj = j + dj;
            
            // Check boundaries and if already visited
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && !visited[ni][nj]) {
                const char = board[ni][nj];
                if (node.children.has(char)) {
                    dfs(ni, nj, node.children.get(char), currentWord + char);
                }
            }
        }
        
        // Backtrack
        visited[i][j] = false;
    }
    
    // Start DFS from each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const char = board[i][j];
            if (trie.root.children.has(char)) {
                dfs(i, j, trie.root.children.get(char), char);
            }
        }
    }
    
    return Array.from(result);
}

// Trie Node
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

// Trie Data Structure
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEnd = true;
    }
}

// Approach 2: Backtracking with Hash Set (Naive)
// Time complexity: O(num_words * m * n * 4^max_word_length)
// Space complexity: O(m*n + max_word_length) for recursion stack
function findWords_v2(board, words) {
    const result = new Set();
    const wordSet = new Set(words);
    const rows = board.length;
    const cols = board[0].length;
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    function dfs(i, j, currentWord) {
        if (wordSet.has(currentWord)) {
            result.add(currentWord);
        }
        
        // Prune if no word starts with current prefix
        if (!words.some(word => word.startsWith(currentWord))) {
            return;
        }
        
        visited[i][j] = true;
        
        for (const [di, dj] of directions) {
            const ni = i + di;
            const nj = j + dj;
            
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && !visited[ni][nj]) {
                dfs(ni, nj, currentWord + board[ni][nj]);
            }
        }
        
        visited[i][j] = false;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dfs(i, j, board[i][j]);
        }
    }
    
    return Array.from(result);
}

// Approach 3: Optimized with Trie and removing found words
// Time complexity: O(m*n*4^(max_word_length))
// Space complexity: O(total_characters_in_words + m*n)
function findWords_v3(board, words) {
    const trie = new Trie();
    for (const word of words) {
        trie.insert(word);
    }
    
    const result = [];
    const rows = board.length;
    const cols = board[0].length;
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    function dfs(i, j, node, currentWord) {
        const char = board[i][j];
        if (!node.children.has(char)) return;
        
        const nextNode = node.children.get(char);
        const newWord = currentWord + char;
        
        if (nextNode.isEnd) {
            result.push(newWord);
            nextNode.isEnd = false; // Mark as found to avoid duplicates
            
            // Remove the word from the trie to optimize further searches
            if (nextNode.children.size === 0) {
                node.children.delete(char);
            }
        }
        
        visited[i][j] = true;
        
        for (const [di, dj] of directions) {
            const ni = i + di;
            const nj = j + dj;
            
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && !visited[ni][nj]) {
                dfs(ni, nj, nextNode, newWord);
                
                // Optimization: remove leaf nodes that have been processed
                if (nextNode.children.size === 0 && !nextNode.isEnd) {
                    node.children.delete(char);
                }
            }
        }
        
        visited[i][j] = false;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const char = board[i][j];
            if (trie.root.children.has(char)) {
                dfs(i, j, trie.root, '');
            }
        }
    }
    
    return result;
}

// Testing the functions
function runTests() {
    const testCases = [
        {
            board: [
                ["o","a","a","n"],
                ["e","t","a","e"],
                ["i","h","k","r"],
                ["i","f","l","v"]
            ],
            words: ["oath","pea","eat","rain"],
            expected: ["eat","oath"]
        },
        {
            board: [["a","b"],["c","d"]],
            words: ["abcb"],
            expected: []
        },
        {
            board: [["a"]],
            words: ["a"],
            expected: ["a"]
        }
    ];
    
    console.log('Running tests for findWords functions...\n');
    
    const versions = [
        { name: 'v1 (Trie + Backtracking)', fn: findWords_v1 },
        { name: 'v2 (Hash Set + Backtracking)', fn: findWords_v2 },
        { name: 'v3 (Optimized Trie)', fn: findWords_v3 }
    ];
    
    for (const version of versions) {
        console.log(`Testing ${version.name}:`);
        for (const test of testCases) {
            // Create deep copies to prevent modification
            const boardCopy = JSON.parse(JSON.stringify(test.board));
            const wordsCopy = [...test.words];
            
            const result = version.fn(boardCopy, wordsCopy);
            const resultSet = new Set(result);
            const expectedSet = new Set(test.expected);
            
            // Check if results match (order doesn't matter)
            const isMatch = result.length === test.expected.length && 
                          test.expected.every(word => resultSet.has(word));
            
            console.log(`  Input: `);
            console.log(`    Board: ${JSON.stringify(test.board)}`);
            console.log(`    Words: ${JSON.stringify(test.words)}`);
            console.log(`    Result: ${JSON.stringify(result)}`);
            console.log(`    Expected: ${JSON.stringify(test.expected)}`);
            console.log(`    Status: ${isMatch ? '✅ PASS' : '❌ FAIL'}`);
            console.log();
        }
    }
}

// Run the tests
runTests();

// Export the functions for potential use in other files
module.exports = {
    findWords_v1,
    findWords_v2,
    findWords_v3,
    Trie,
    TrieNode
};
