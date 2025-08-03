/**
 * N-Queens II
 * 
 * The n-queens puzzle is the problem of placing n queens on an n x n chessboard
 * such that no two queens attack each other.
 * 
 * Given an integer n, return the number of distinct solutions to the n-queens puzzle.
 * 
 * @param {number} n
 * @return {number}
 */

// Approach 1: Backtracking with Sets
// Time complexity: O(n!)
// Space complexity: O(n)
function totalNQueens_v1(n) {
    let count = 0;
    
    // Track occupied columns and diagonals
    const cols = new Set();
    const diag1 = new Set(); // row - col
    const diag2 = new Set(); // row + col
    
    function backtrack(row) {
        if (row === n) {
            count++;
            return;
        }
        
        for (let col = 0; col < n; col++) {
            const d1 = row - col;
            const d2 = row + col;
            
            // Skip if the current position is under attack
            if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
                continue;
            }
            
            // Place the queen
            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);
            
            // Move to the next row
            backtrack(row + 1);
            
            // Backtrack
            cols.delete(col);
            diag1.delete(d1);
            diag2.delete(d2);
        }
    }
    
    backtrack(0);
    return count;
}

// Approach 2: Backtracking with Bit Manipulation (Optimized)
// Time complexity: O(n!)
// Space complexity: O(n) for recursion stack
function totalNQueens_v2(n) {
    let count = 0;
    
    function backtrack(row, cols, diag1, diag2) {
        if (row === n) {
            count++;
            return;
        }
        
        // Get available positions
        let available = ((1 << n) - 1) & (~(cols | diag1 | diag2));
        
        while (available) {
            // Get the rightmost available position
            const pos = available & -available;
            // Mark this position as taken
            available &= available - 1;
            
            // Recurse with updated positions
            backtrack(
                row + 1,
                cols | pos,
                (diag1 | pos) << 1,
                (diag2 | pos) >> 1
            );
        }
    }
    
    backtrack(0, 0, 0, 0);
    return count;
}

// Approach 3: Iterative Backtracking
// Time complexity: O(n!)
// Space complexity: O(n)
function totalNQueens_v3(n) {
    if (n === 0) return 0;
    
    const stack = [];
    let count = 0;
    
    // Each element is [row, cols, diag1, diag2, col]
    stack.push([0, 0, 0, 0, 0]);
    
    while (stack.length > 0) {
        const [row, cols, diag1, diag2, col] = stack.pop();
        
        if (col < n) {
            // Try to place queen at (row, col)
            const pos = 1 << col;
            
            // Check if position is under attack
            if (!(cols & pos) && !(diag1 & (1 << (row - col + n - 1))) && !(diag2 & (1 << (row + col)))) {
                if (row === n - 1) {
                    count++;
                } else {
                    // Push the next column to try
                    stack.push([row, cols, diag1, diag2, col + 1]);
                    
                    // Push the next row with the current position marked
                    stack.push([
                        row + 1,
                        cols | pos,
                        diag1 | (1 << (row - col + n - 1)),
                        diag2 | (1 << (row + col)),
                        0
                    ]);
                }
            } else {
                // Try next column
                stack.push([row, cols, diag1, diag2, col + 1]);
            }
        }
    }
    
    return count;
}

// Approach 4: Backtracking with Array for Diagonal Tracking
// Time complexity: O(n!)
// Space complexity: O(n)
function totalNQueens_v4(n) {
    let count = 0;
    const cols = new Array(n).fill(false);
    const diag1 = new Array(2 * n - 1).fill(false);
    const diag2 = new Array(2 * n - 1).fill(false);
    
    function backtrack(row) {
        if (row === n) {
            count++;
            return;
        }
        
        for (let col = 0; col < n; col++) {
            const d1 = row - col + n - 1;
            const d2 = row + col;
            
            if (cols[col] || diag1[d1] || diag2[d2]) {
                continue;
            }
            
            cols[col] = diag1[d1] = diag2[d2] = true;
            backtrack(row + 1);
            cols[col] = diag1[d1] = diag2[d2] = false;
        }
    }
    
    backtrack(0);
    return count;
}

// Approach 5: Backtracking with Bitmask and Mirroring (Optimized for even n)
// Time complexity: O(n!)
// Space complexity: O(n)
function totalNQueens_v5(n) {
    if (n === 0) return 0;
    
    let count = 0;
    
    function backtrack(row, cols, diag1, diag2) {
        if (row === n) {
            count++;
            return;
        }
        
        let available = ((1 << n) - 1) & (~(cols | diag1 | diag2));
        
        while (available) {
            const pos = available & -available;
            available &= available - 1;
            
            backtrack(
                row + 1,
                cols | pos,
                (diag1 | pos) << 1,
                (diag2 | pos) >> 1
            );
        }
    }
    
    // For even n, we can take advantage of symmetry
    const mid = n % 2 === 0 ? n / 2 : Math.floor(n / 2);
    
    for (let col = 0; col < mid; col++) {
        const pos = 1 << col;
        backtrack(1, pos, pos << 1, pos >> 1);
    }
    
    count *= 2;
    
    // If n is odd, handle the middle column
    if (n % 2 === 1) {
        const pos = 1 << mid;
        backtrack(1, pos, pos << 1, pos >> 1);
    }
    
    return count;
}

// Approach 6: Backtracking with Object for Diagonal Tracking (Alternative Implementation)
// Time complexity: O(n!)
// Space complexity: O(n)
function totalNQueens_v6(n) {
    let count = 0;
    
    function backtrack(row, cols = new Set(), diag1 = new Set(), diag2 = new Set()) {
        if (row === n) {
            count++;
            return;
        }
        
        for (let col = 0; col < n; col++) {
            const d1 = row - col;
            const d2 = row + col;
            
            if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
                continue;
            }
            
            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);
            
            backtrack(row + 1, cols, diag1, diag2);
            
            cols.delete(col);
            diag1.delete(d1);
            diag2.delete(d2);
        }
    }
    
    backtrack(0);
    return count;
}

// Testing the functions
function runTests() {
    const testCases = [
        { input: 1, expected: 1 },  // [Q]
        { input: 2, expected: 0 },  // No solution
        { input: 3, expected: 0 },  // No solution
        { input: 4, expected: 2 },  // 2 solutions
        { input: 5, expected: 10 }, // 10 solutions
        { input: 6, expected: 4 },  // 4 solutions
        { input: 7, expected: 40 }, // 40 solutions
        { input: 8, expected: 92 }  // 92 solutions
    ];
    
    console.log('Running tests for totalNQueens functions...\n');
    
    const versions = [
        { name: 'v1 (Backtracking with Sets)', fn: totalNQueens_v1 },
        { name: 'v2 (Bit Manipulation)', fn: totalNQueens_v2 },
        { name: 'v3 (Iterative Backtracking)', fn: totalNQueens_v3 },
        { name: 'v4 (Array Diagonal Tracking)', fn: totalNQueens_v4 },
        { name: 'v5 (Bitmask with Mirroring)', fn: totalNQueens_v5 },
        { name: 'v6 (Object Diagonal Tracking)', fn: totalNQueens_v6 }
    ];
    
    for (const version of versions) {
        console.log(`Testing ${version.name}:`);
        
        for (const test of testCases) {
            const start = process.hrtime.bigint();
            const result = version.fn(test.input);
            const end = process.hrtime.bigint();
            const timeMs = Number(end - start) / 1e6; // Convert to milliseconds
            
            const status = result === test.expected ? '✅ PASS' : '❌ FAIL';
            console.log(`  n=${test.input}, Result: ${result}, Expected: ${test.expected}, Time: ${timeMs.toFixed(3)}ms - ${status}`);
        }
        
        console.log();
    }
}

// Run the tests
runTests();

// Export the functions for potential use in other files
module.exports = {
    totalNQueens_v1,
    totalNQueens_v2,
    totalNQueens_v3,
    totalNQueens_v4,
    totalNQueens_v5,
    totalNQueens_v6
};
