/**
 * Detect Cycle in an Undirected Graph
 * Source: https://www.geeksforgeeks.org/detect-cycle-undirected-graph/
 */

// Approach 1: Standard DFS with Parent Tracking (ES6+ implementation)
const isCycleStandard = (V, adj) => {
    const visited = new Array(V).fill(false);
    
    const dfs = (node, parent) => {
        visited[node] = true;
        
        // Visit all neighbors
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                if (dfs(neighbor, node)) {
                    return true;
                }
            } else if (neighbor !== parent) {
                // Back edge found - cycle detected
                return true;
            }
        }
        return false;
    };
    
    // Check for cycle in each connected component
    for (let v = 0; v < V; v++) {
        if (!visited[v]) {
            if (dfs(v, -1)) {
                return true;
            }
        }
    }
    
    return false;
};

// Approach 2: BFS with Parent Tracking
const isCycleBFS = (V, adj) => {
    const visited = new Array(V).fill(false);
    
    const bfs = (start) => {
        const queue = [[start, -1]]; // [node, parent]
        visited[start] = true;
        
        while (queue.length > 0) {
            const [node, parent] = queue.shift();
            
            // Visit all neighbors
            for (const neighbor of adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push([neighbor, node]);
                } else if (neighbor !== parent) {
                    // Back edge found - cycle detected
                    return true;
                }
            }
        }
        return false;
    };
    
    // Check for cycle in each connected component
    for (let v = 0; v < V; v++) {
        if (!visited[v]) {
            if (bfs(v)) {
                return true;
            }
        }
    }
    
    return false;
};

// Approach 3: Union-Find (Disjoint Set) Approach
const isCycleUnionFind = (V, adj) => {
    // Union-Find data structure
    class UnionFind {
        constructor(size) {
            this.parent = Array.from({ length: size }, (_, i) => i);
            this.rank = new Array(size).fill(0);
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
            
            if (rootX === rootY) {
                return false; // Cycle detected
            }
            
            // Union by rank
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            
            return true;
        }
    }
    
    const uf = new UnionFind(V);
    
    // Process all edges
    for (let u = 0; u < V; u++) {
        for (const v of adj[u]) {
            // Only process each edge once (since undirected)
            if (u < v) {
                if (!uf.union(u, v)) {
                    return true; // Cycle detected
                }
            }
        }
    }
    
    return false;
};

// Approach 4: Using Set for visited tracking (functional approach)
const isCycleSet = (V, adj) => {
    const visited = new Set();
    
    const dfs = (node, parent) => {
        visited.add(node);
        
        // Filter unvisited neighbors and visit them
        for (const neighbor of adj[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, node)) {
                    return true;
                }
            } else if (neighbor !== parent) {
                // Back edge found - cycle detected
                return true;
            }
        }
        return false;
    };
    
    // Check for cycle in each connected component
    for (let v = 0; v < V; v++) {
        if (!visited.has(v)) {
            if (dfs(v, -1)) {
                return true;
            }
        }
    }
    
    return false;
};

// Approach 5: Using Map for adjacency list (showcasing Map usage)
const isCycleMap = (V, adj) => {
    // Convert adjacency list to Map
    const adjMap = new Map();
    for (let i = 0; i < V; i++) {
        adjMap.set(i, adj[i]);
    }
    
    const visited = new Array(V).fill(false);
    
    const dfs = (node, parent) => {
        visited[node] = true;
        
        const neighbors = adjMap.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited[neighbor]) {
                if (dfs(neighbor, node)) {
                    return true;
                }
            } else if (neighbor !== parent) {
                // Back edge found - cycle detected
                return true;
            }
        }
        return false;
    };
    
    // Check for cycle in each connected component
    for (let v = 0; v < V; v++) {
        if (!visited[v]) {
            if (dfs(v, -1)) {
                return true;
            }
        }
    }
    
    return false;
};

// Approach 6: Generator-based DFS for step-by-step visualization
function* isCycleGenerator(V, adj) {
    const visited = new Array(V).fill(false);
    let cycleDetected = false;
    
    function* dfs(node, parent) {
        visited[node] = true;
        yield { step: `visiting ${node}`, visited: [...visited], parent };
        
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                yield* dfs(neighbor, node);
                if (cycleDetected) return;
            } else if (neighbor !== parent) {
                // Back edge found - cycle detected
                cycleDetected = true;
                yield { step: `cycle detected between ${node} and ${neighbor}`, visited: [...visited], parent, cycle: true };
                return;
            }
        }
    }
    
    yield { step: 'start', visited: [...visited], cycle: false };
    
    // Check for cycle in each connected component
    for (let v = 0; v < V; v++) {
        if (!visited[v] && !cycleDetected) {
            yield* dfs(v, -1);
        }
    }
    
    yield { step: 'complete', visited: [...visited], cycle: cycleDetected };
    return cycleDetected;
};

// Performance comparison utility
const performanceTest = (V, adj, iterations = 10000) => {
    const methods = [
        { name: 'Standard DFS', fn: isCycleStandard },
        { name: 'BFS Approach', fn: isCycleBFS },
        { name: 'Union-Find', fn: isCycleUnionFind },
        { name: 'Set-based DFS', fn: isCycleSet },
        { name: 'Map-based DFS', fn: isCycleMap }
    ];
    
    console.log(`Performance test with ${V} vertices, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn(V, JSON.parse(JSON.stringify(adj))); // Fresh copy each iteration
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Detect Cycle in Undirected Graph Examples ===\n');
    
    // Test cases
    const testCases = [
        { 
            V: 5, 
            adj: [[1], [0,2,4], [1,3], [2], [1]], 
            hasCycle: false,
            description: 'Linear graph (no cycle)' 
        },
        { 
            V: 4, 
            adj: [[1,2], [0,2], [0,1,3], [2]], 
            hasCycle: true,
            description: 'Graph with triangle (has cycle)' 
        },
        { 
            V: 3, 
            adj: [[1], [0,2], [1]], 
            hasCycle: false,
            description: 'Path graph (no cycle)' 
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: ${testCase.description}`);
        console.log(`Graph: ${JSON.stringify(testCase.adj)}`);
        console.log(`Expected: ${testCase.hasCycle ? 'Cycle detected' : 'No cycle'}`);
        console.log(`Standard DFS: ${isCycleStandard(testCase.V, testCase.adj) ? 'Cycle detected' : 'No cycle'}`);
        console.log(`BFS Approach: ${isCycleBFS(testCase.V, testCase.adj) ? 'Cycle detected' : 'No cycle'}`);
        console.log(`Union-Find: ${isCycleUnionFind(testCase.V, testCase.adj) ? 'Cycle detected' : 'No cycle'}`);
        console.log(`Set-based DFS: ${isCycleSet(testCase.V, testCase.adj) ? 'Cycle detected' : 'No cycle'}`);
        console.log(`Map-based DFS: ${isCycleMap(testCase.V, testCase.adj) ? 'Cycle detected' : 'No cycle'}`);
        console.log('---');
    });
    
    // Demonstrate generator approach
    console.log('\n=== Cycle Detection Generator Visualization ===');
    const generator = isCycleGenerator(4, [[1,2], [0,2], [0,1,3], [2]]);
    let step;
    while (!(step = generator.next()).done) {
        console.log(`Step: ${step.value.step}`);
        if (step.value.visited) {
            console.log(`  Visited: [${step.value.visited.map(v => v ? 'T' : 'F').join(', ')}]`);
        }
        if (step.value.parent !== undefined) {
            console.log(`  Parent: ${step.value.parent}`);
        }
        if (step.value.cycle !== undefined) {
            console.log(`  Cycle: ${step.value.cycle}`);
        }
        console.log('');
    }
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    // Destructuring
    const result = isCycleStandard(4, [[1,2], [0,2], [0,1,3], [2]]);
    console.log('Cycle detected:', result);
    
    // Arrow functions with different syntaxes
    const cycleCheckShort = (V, adj) => isCycleStandard(V, adj);
    const cycleCheckExplicit = (V, adj) => {
        return isCycleStandard(V, adj);
    };
    
    console.log('Arrow function (short):', cycleCheckShort(3, [[1], [0,2], [1]]));
    console.log('Arrow function (explicit):', cycleCheckExplicit(3, [[1], [0,2], [1]]));
    
    // Method chaining with array methods
    const graphs = [
        { V: 3, adj: [[1], [0,2], [1]] },
        { V: 4, adj: [[1,2], [0,2], [0,1,3], [2]] }
    ];
    
    const cycleResults = graphs
        .map(graph => isCycleStandard(graph.V, graph.adj))
        .map(result => result ? 'Cycle' : 'No cycle');
    
    console.log('Chained operations (check → map results):', cycleResults);
    
    // Performance test
    const largeAdj = Array.from({ length: 100 }, (_, i) => 
        [i-1, i+1].filter(x => x >= 0 && x < 100)
    );
    performanceTest(100, largeAdj, 1000);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isCycleStandard,
        isCycleBFS,
        isCycleUnionFind,
        isCycleSet,
        isCycleMap,
        isCycleGenerator,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Standard DFS: O(V + E) where V is vertices and E is edges
 * - BFS Approach: O(V + E)
 * - Union-Find: O(E * α(V)) where α is the inverse Ackermann function
 * - Set-based DFS: O(V + E)
 * - Map-based DFS: O(V + E)
 * - Generator DFS: O(V + E)
 * 
 * Space Complexity Analysis:
 * - Standard DFS: O(V) for visited array and O(V) for recursion stack
 * - BFS Approach: O(V) for visited array and queue
 * - Union-Find: O(V) for parent and rank arrays
 * - Set-based DFS: O(V) for Set and O(V) for recursion stack
 * - Map-based DFS: O(V + E) for Map storage plus O(V) for visited and recursion stack
 * - Generator DFS: O(V) for visited array and O(V) for recursion stack
 * 
 * JavaScript-Specific Notes:
 * - Recursion depth limit in JavaScript engines
 * - Set.has() is O(1) average case, better than Array.includes() O(n)
 * - Map.get() is O(1) average case
 * - Generator functions allow step-by-step visualization
 * - Union-Find with path compression and union by rank is nearly O(1) per operation
 */