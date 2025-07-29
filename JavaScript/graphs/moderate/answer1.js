/**
 * Number of Islands
 * Source: https://www.geeksforgeeks.org/find-number-of-islands/
 */

// Approach 1: Standard DFS (ES6+ implementation)
const numIslandsStandard = (grid) => {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    const dfs = (row, col) => {
        // Check boundaries and if cell is water
        if (row < 0 || col < 0 || row >= rows || col >= cols || grid[row][col] === '0') {
            return;
        }
        
        // Mark cell as visited by setting it to '0'
        grid[row][col] = '0';
        
        // Visit all 4 neighbors
        dfs(row + 1, col); // Down
        dfs(row - 1, col); // Up
        dfs(row, col + 1); // Right
        dfs(row, col - 1); // Left
    };
    
    // Iterate through each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j); // Explore entire island
            }
        }
    }
    
    return count;
};

// Approach 2: BFS Approach
const numIslandsBFS = (grid) => {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    const bfs = (startRow, startCol) => {
        const queue = [[startRow, startCol]];
        grid[startRow][startCol] = '0'; // Mark as visited
        
        while (queue.length > 0) {
            const [row, col] = queue.shift();
            
            // Check all 4 neighbors
            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                // Check boundaries and if cell is land
                if (newRow >= 0 && newCol >= 0 && newRow < rows && newCol < cols && grid[newRow][newCol] === '1') {
                    grid[newRow][newCol] = '0'; // Mark as visited
                    queue.push([newRow, newCol]);
                }
            }
        }
    };
    
    // Iterate through each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                bfs(i, j); // Explore entire island
            }
        }
    }
    
    return count;
};

// Approach 3: Union-Find (Disjoint Set) Approach
const numIslandsUnionFind = (grid) => {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Union-Find data structure
    class UnionFind {
        constructor(size) {
            this.parent = Array.from({ length: size }, (_, i) => i);
            this.rank = new Array(size).fill(0);
            this.count = size; // Number of components
        }
        
        find(x) {
            if (this.parent[x] !== x) {
                // Path compression
                this.parent[x] = this.find(this.parent[x]);
            }
            return this.parent[x];
        }
        
        union(x, y) {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX !== rootY) {
                // Union by rank
                if (this.rank[rootX] < this.rank[rootY]) {
                    this.parent[rootX] = rootY;
                } else if (this.rank[rootX] > this.rank[rootY]) {
                    this.parent[rootY] = rootX;
                } else {
                    this.parent[rootY] = rootX;
                    this.rank[rootX]++;
                }
                this.count--;
            }
        }
    }
    
    // Count water cells
    let waterCount = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '0') {
                waterCount++;
            }
        }
    }
    
    // Initialize Union-Find for all cells
    const uf = new UnionFind(rows * cols);
    
    // Connect adjacent land cells
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                // Check right and down neighbors
                if (j + 1 < cols && grid[i][j + 1] === '1') {
                    uf.union(i * cols + j, i * cols + j + 1);
                }
                if (i + 1 < rows && grid[i + 1][j] === '1') {
                    uf.union(i * cols + j, (i + 1) * cols + j);
                }
            }
        }
    }
    
    // Count unique components of land cells
    const landComponents = new Set();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                landComponents.add(uf.find(i * cols + j));
            }
        }
    }
    
    return landComponents.size;
};

// Approach 4: Using Set for tracking visited cells (functional approach)
const numIslandsSet = (grid) => {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = new Set();
    let count = 0;
    
    const getKey = (row, col) => `${row},${col}`;
    
    const dfs = (row, col) => {
        // Check boundaries, if cell is water, or already visited
        if (row < 0 || col < 0 || row >= rows || col >= cols || 
            grid[row][col] === '0' || visited.has(getKey(row, col))) {
            return;
        }
        
        // Mark cell as visited
        visited.add(getKey(row, col));
        
        // Visit all 4 neighbors
        dfs(row + 1, col); // Down
        dfs(row - 1, col); // Up
        dfs(row, col + 1); // Right
        dfs(row, col - 1); // Left
    };
    
    // Iterate through each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1' && !visited.has(getKey(i, j))) {
                count++;
                dfs(i, j); // Explore entire island
            }
        }
    }
    
    return count;
};

// Approach 5: Using Map for grid representation (showcasing Map usage)
const numIslandsMap = (grid) => {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Convert grid to Map for demonstration
    const gridMap = new Map();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            gridMap.set(`${i},${j}`, grid[i][j]);
        }
    }
    
    let count = 0;
    
    const dfs = (row, col) => {
        // Check boundaries and if cell is water
        if (row < 0 || col < 0 || row >= rows || col >= cols || 
            gridMap.get(`${row},${col}`) === '0') {
            return;
        }
        
        // Mark cell as visited by setting it to '0'
        gridMap.set(`${row},${col}`, '0');
        
        // Visit all 4 neighbors
        dfs(row + 1, col); // Down
        dfs(row - 1, col); // Up
        dfs(row, col + 1); // Right
        dfs(row, col - 1); // Left
    };
    
    // Iterate through each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (gridMap.get(`${i},${j}`) === '1') {
                count++;
                dfs(i, j); // Explore entire island
            }
        }
    }
    
    return count;
};

// Approach 6: Generator-based DFS for step-by-step visualization
function* numIslandsGenerator(grid) {
    if (!grid || grid.length === 0) {
        yield { step: 'complete', count: 0 };
        return 0;
    }
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    function* dfs(row, col, islandId) {
        // Check boundaries and if cell is water
        if (row < 0 || col < 0 || row >= rows || col >= cols || grid[row][col] === '0') {
            return;
        }
        
        // Mark cell as visited by setting it to '0'
        grid[row][col] = '0';
        yield { step: `visiting (${row},${col}) for island ${islandId}`, grid: JSON.parse(JSON.stringify(grid)), count };
        
        // Visit all 4 neighbors
        yield* dfs(row + 1, col, islandId); // Down
        yield* dfs(row - 1, col, islandId); // Up
        yield* dfs(row, col + 1, islandId); // Right
        yield* dfs(row, col - 1, islandId); // Left
    }
    
    yield { step: 'start', grid: JSON.parse(JSON.stringify(grid)), count };
    
    // Iterate through each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                yield { step: `found island ${count} at (${i},${j})`, grid: JSON.parse(JSON.stringify(grid)), count };
                yield* dfs(i, j, count); // Explore entire island
            }
        }
    }
    
    yield { step: 'complete', grid: JSON.parse(JSON.stringify(grid)), count };
    return count;
};

// Performance comparison utility
const performanceTest = (grid, iterations = 1000) => {
    const methods = [
        { name: 'Standard DFS', fn: numIslandsStandard },
        { name: 'BFS Approach', fn: numIslandsBFS },
        { name: 'Union-Find', fn: numIslandsUnionFind },
        { name: 'Set-based DFS', fn: numIslandsSet },
        { name: 'Map-based DFS', fn: numIslandsMap }
    ];
    
    console.log(`Performance test with ${grid.length}x${grid[0].length} grid, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn(JSON.parse(JSON.stringify(grid))); // Fresh copy each iteration
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Number of Islands Examples ===\n');
    
    // Test cases
    const testCases = [
        {
            grid: [
                ['1','1','1','1','0'],
                ['1','1','0','1','0'],
                ['1','1','0','0','0'],
                ['0','0','0','0','0']
            ],
            expected: 1,
            description: 'Single large island'
        },
        {
            grid: [
                ['1','1','0','0','0'],
                ['1','1','0','0','0'],
                ['0','0','1','0','0'],
                ['0','0','0','1','1']
            ],
            expected: 3,
            description: 'Three separate islands'
        },
        {
            grid: [
                ['0','0','0','0','0'],
                ['0','0','0','0','0'],
                ['0','0','0','0','0']
            ],
            expected: 0,
            description: 'No islands (all water)'
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: ${testCase.description}`);
        console.log(`Grid: ${JSON.stringify(testCase.grid)}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Standard DFS: ${numIslandsStandard(JSON.parse(JSON.stringify(testCase.grid)))}`);
        console.log(`BFS Approach: ${numIslandsBFS(JSON.parse(JSON.stringify(testCase.grid)))}`);
        console.log(`Union-Find: ${numIslandsUnionFind(JSON.parse(JSON.stringify(testCase.grid)))}`);
        console.log(`Set-based DFS: ${numIslandsSet(JSON.parse(JSON.stringify(testCase.grid)))}`);
        console.log(`Map-based DFS: ${numIslandsMap(JSON.parse(JSON.stringify(testCase.grid)))}`);
        console.log('---');
    });
    
    // Demonstrate generator approach
    console.log('\n=== Number of Islands Generator Visualization ===');
    const generatorGrid = [
        ['1','1','0','0','0'],
        ['1','1','0','0','0'],
        ['0','0','1','0','0'],
        ['0','0','0','1','1']
    ];
    const generator = numIslandsGenerator(JSON.parse(JSON.stringify(generatorGrid)));
    let step;
    while (!(step = generator.next()).done) {
        console.log(`Step: ${step.value.step}`);
        if (step.value.count !== undefined) {
            console.log(`  Count: ${step.value.count}`);
        }
        console.log('');
    }
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    // Destructuring
    const grid = [
        ['1','1','0','0','0'],
        ['1','1','0','0','0'],
        ['0','0','1','0','0'],
        ['0','0','0','1','1']
    ];
    const result = numIslandsStandard(JSON.parse(JSON.stringify(grid)));
    console.log('Number of islands:', result);
    
    // Arrow functions with different syntaxes
    const countIslandsShort = (grid) => numIslandsStandard(grid);
    const countIslandsExplicit = (grid) => {
        return numIslandsStandard(grid);
    };
    
    console.log('Arrow function (short):', countIslandsShort(JSON.parse(JSON.stringify(grid))));
    console.log('Arrow function (explicit):', countIslandsExplicit(JSON.parse(JSON.stringify(grid))));
    
    // Method chaining with array methods
    const grids = [
        [
            ['1','1','0'],
            ['1','0','0'],
            ['0','0','1']
        ],
        [
            ['1','0','1'],
            ['0','0','0'],
            ['1','0','1']
        ]
    ];
    
    const islandCounts = grids
        .map(g => JSON.parse(JSON.stringify(g)))
        .map(grid => numIslandsStandard(grid))
        .map(count => `Found ${count} island(s)`);
    
    console.log('Chained operations (copy → count → format):', islandCounts);
    
    // Performance test
    const largeGrid = Array.from({ length: 50 }, () => 
        Array.from({ length: 50 }, () => Math.random() > 0.7 ? '1' : '0')
    );
    performanceTest(largeGrid, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        numIslandsStandard,
        numIslandsBFS,
        numIslandsUnionFind,
        numIslandsSet,
        numIslandsMap,
        numIslandsGenerator,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Standard DFS: O(M * N) where M is rows and N is columns
 * - BFS Approach: O(M * N)
 * - Union-Find: O(M * N * α(M*N)) where α is the inverse Ackermann function
 * - Set-based DFS: O(M * N)
 * - Map-based DFS: O(M * N)
 * - Generator DFS: O(M * N)
 * 
 * Space Complexity Analysis:
 * - Standard DFS: O(M * N) for recursion stack in worst case
 * - BFS Approach: O(min(M, N)) for queue in worst case
 * - Union-Find: O(M * N) for parent and rank arrays
 * - Set-based DFS: O(M * N) for Set and O(M * N) for recursion stack
 * - Map-based DFS: O(M * N) for Map and O(M * N) for recursion stack
 * - Generator DFS: O(M * N) for recursion stack
 * 
 * JavaScript-Specific Notes:
 * - Recursion depth limit in JavaScript engines
 * - Set.has() is O(1) average case, better than Array.includes() O(n)
 * - Map.get() is O(1) average case
 * - Generator functions allow step-by-step visualization
 * - Union-Find with path compression and union by rank is nearly O(1) per operation
 */