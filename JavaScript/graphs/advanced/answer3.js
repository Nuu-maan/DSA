/**
 * Articulation Points (Cut Vertices)
 * Source: https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/
 */

// Approach 1: Standard Articulation Points Algorithm with DFS
const articulationPointsStandard = (V, adj) => {
    const visited = new Array(V).fill(false);
    const disc = new Array(V).fill(0); // Discovery times
    const low = new Array(V).fill(0);  // Lowest discovery time reachable
    const parent = new Array(V).fill(-1);
    const ap = new Array(V).fill(false); // Articulation points
    let time = 0;
    
    const dfs = (u) => {
        visited[u] = true;
        disc[u] = low[u] = ++time;
        let children = 0;
        
        // Go through all vertices adjacent to u
        for (const v of adj[u]) {
            // If v is not visited yet, then make it a child of u
            if (!visited[v]) {
                children++;
                parent[v] = u;
                dfs(v);
                
                // Check if subtree rooted with v has a connection to one of the ancestors of u
                low[u] = Math.min(low[u], low[v]);
                
                // u is an articulation point in following cases:
                // (1) u is root of DFS tree and has two or more children.
                if (parent[u] === -1 && children > 1) {
                    ap[u] = true;
                }
                
                // (2) If u is not root and low value of one of its child is more than discovery value of u.
                if (parent[u] !== -1 && low[v] >= disc[u]) {
                    ap[u] = true;
                }
            } else if (v !== parent[u]) { // Update low value of u for back edge
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    };
    
    // Call the recursive helper function to find articulation points
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    
    // Collect all articulation points
    const result = [];
    for (let i = 0; i < V; i++) {
        if (ap[i]) {
            result.push(i);
        }
    }
    
    return result;
};

// Approach 2: Articulation Points with Set-based Tracking
const articulationPointsSet = (V, adj) => {
    const visited = new Set();
    const disc = new Map();
    const low = new Map();
    const parent = new Map();
    const ap = new Set();
    let time = 0;
    
    const dfs = (u) => {
        visited.add(u);
        disc.set(u, ++time);
        low.set(u, time);
        parent.set(u, -1);
        let children = 0;
        
        // Go through all vertices adjacent to u
        for (const v of adj[u]) {
            // If v is not visited yet, then make it a child of u
            if (!visited.has(v)) {
                children++;
                parent.set(v, u);
                dfs(v);
                
                // Check if subtree rooted with v has a connection to one of the ancestors of u
                low.set(u, Math.min(low.get(u), low.get(v)));
                
                // u is an articulation point in following cases:
                // (1) u is root of DFS tree and has two or more children.
                if (parent.get(u) === -1 && children > 1) {
                    ap.add(u);
                }
                
                // (2) If u is not root and low value of one of its child is more than discovery value of u.
                if (parent.get(u) !== -1 && low.get(v) >= disc.get(u)) {
                    ap.add(u);
                }
            } else if (v !== parent.get(u)) { // Update low value of u for back edge
                low.set(u, Math.min(low.get(u), disc.get(v)));
            }
        }
    };
    
    // Call the recursive helper function to find articulation points
    for (let i = 0; i < V; i++) {
        if (!visited.has(i)) {
            dfs(i);
        }
    }
    
    // Convert Set to Array
    return Array.from(ap);
};

// Approach 3: Articulation Points with Functional Approach
const articulationPointsFunctional = (V, adj) => {
    // Functional DFS implementation
    const dfs = (state, u) => {
        const { visited, disc, low, parent, ap, time } = state;
        
        // Update state
        const newState = {
            ...state,
            visited: { ...visited, [u]: true },
            disc: { ...disc, [u]: time + 1 },
            low: { ...low, [u]: time + 1 },
            time: time + 1
        };
        
        // Process neighbors
        const processNeighbors = (acc, v) => {
            if (!acc.visited[v]) {
                const childState = dfs({
                    ...acc,
                    parent: { ...acc.parent, [v]: u },
                    time: acc.time
                }, v);
                
                // Update low value
                const updatedLow = Math.min(childState.low[u] || childState.low[u] === 0 ? childState.low[u] : Infinity, childState.low[v]);
                
                // Check articulation point conditions
                let isAp = childState.ap;
                if (childState.parent[u] === -1 && childState.children >= 1) {
                    isAp = { ...isAp, [u]: true };
                }
                if (childState.parent[u] !== -1 && (childState.low[v] >= (childState.disc[u] || childState.disc[u] === 0 ? childState.disc[u] : Infinity))) {
                    isAp = { ...isAp, [u]: true };
                }
                
                return {
                    ...childState,
                    low: { ...childState.low, [u]: updatedLow },
                    ap: isAp,
                    children: (childState.children || 0) + 1
                };
            } else if (v !== (newState.parent[u] || newState.parent[u] === 0 ? newState.parent[u] : -1)) {
                return {
                    ...newState,
                    low: { ...newState.low, [u]: Math.min(newState.low[u], newState.disc[v]) }
                };
            }
            return newState;
        };
        
        // Process all neighbors
        const finalState = adj[u].reduce(processNeighbors, {
            ...newState,
            children: 0
        });
        
        return finalState;
    };
    
    // Initialize state
    const initialState = {
        visited: {},
        disc: {},
        low: {},
        parent: {},
        ap: {},
        time: 0
    };
    
    // Process all vertices
    let finalState = { ...initialState };
    for (let i = 0; i < V; i++) {
        if (!finalState.visited[i]) {
            finalState = dfs(finalState, i);
        }
    }
    
    // Extract articulation points
    return Object.keys(finalState.ap)
        .filter(key => finalState.ap[key])
        .map(Number);
};

// Approach 4: Articulation Points with Path Tracking
const articulationPointsWithPath = (V, adj) => {
    const visited = new Array(V).fill(false);
    const disc = new Array(V).fill(0);
    const low = new Array(V).fill(0);
    const parent = new Array(V).fill(-1);
    const ap = new Array(V).fill(false);
    const paths = []; // Track DFS paths
    let time = 0;
    
    const dfs = (u, path = []) => {
        visited[u] = true;
        disc[u] = low[u] = ++time;
        const currentPath = [...path, u];
        paths.push({ vertex: u, path: [...currentPath] });
        let children = 0;
        
        for (const v of adj[u]) {
            if (!visited[v]) {
                children++;
                parent[v] = u;
                dfs(v, currentPath);
                
                low[u] = Math.min(low[u], low[v]);
                
                if (parent[u] === -1 && children > 1) {
                    ap[u] = true;
                }
                
                if (parent[u] !== -1 && low[v] >= disc[u]) {
                    ap[u] = true;
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    };
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    
    const result = [];
    for (let i = 0; i < V; i++) {
        if (ap[i]) {
            result.push(i);
        }
    }
    
    return { points: result, paths };
};

// Approach 5: Articulation Points with Generator for Step-by-Step Visualization
function* articulationPointsGenerator(V, adj) {
    const visited = new Array(V).fill(false);
    const disc = new Array(V).fill(0);
    const low = new Array(V).fill(0);
    const parent = new Array(V).fill(-1);
    const ap = new Array(V).fill(false);
    let time = 0;
    
    yield { step: 'initialized data structures', visited: [...visited], disc: [...disc], low: [...low] };
    
    const dfs = function* (u) {
        visited[u] = true;
        disc[u] = low[u] = ++time;
        yield { step: `visited vertex ${u}`, vertex: u, time, disc: [...disc], low: [...low] };
        
        let children = 0;
        
        for (const v of adj[u]) {
            yield { step: `checking neighbor ${v} of vertex ${u}`, u, v };
            
            if (!visited[v]) {
                children++;
                parent[v] = u;
                yield { step: `setting parent of ${v} to ${u}`, parent: [...parent] };
                
                yield* dfs(v);
                
                low[u] = Math.min(low[u], low[v]);
                yield { step: `updated low[${u}] to ${low[u]} after processing child ${v}`, low: [...low] };
                
                if (parent[u] === -1 && children > 1) {
                    ap[u] = true;
                    yield { step: `marked ${u} as articulation point (root with multiple children)`, ap: [...ap] };
                }
                
                if (parent[u] !== -1 && low[v] >= disc[u]) {
                    ap[u] = true;
                    yield { step: `marked ${u} as articulation point (low[${v}] >= disc[${u}])`, ap: [...ap] };
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
                yield { step: `updated low[${u}] to ${low[u]} for back edge to ${v}`, low: [...low] };
            }
        }
    };
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            yield { step: `starting DFS from vertex ${i}`, startVertex: i };
            yield* dfs(i);
        }
    }
    
    const result = [];
    for (let i = 0; i < V; i++) {
        if (ap[i]) {
            result.push(i);
        }
    }
    
    yield { step: 'complete', points: [...result], ap: [...ap] };
    return result;
};

// Approach 6: Articulation Points with Map-based Implementation
const articulationPointsMap = (V, adj) => {
    const visited = new Map();
    const disc = new Map();
    const low = new Map();
    const parent = new Map();
    const ap = new Map();
    let time = 0;
    
    const dfs = (u) => {
        visited.set(u, true);
        disc.set(u, ++time);
        low.set(u, time);
        parent.set(u, -1);
        let children = 0;
        
        for (const v of adj[u]) {
            if (!visited.get(v)) {
                children++;
                parent.set(v, u);
                dfs(v);
                
                low.set(u, Math.min(low.get(u), low.get(v)));
                
                if (parent.get(u) === -1 && children > 1) {
                    ap.set(u, true);
                }
                
                if (parent.get(u) !== -1 && low.get(v) >= disc.get(u)) {
                    ap.set(u, true);
                }
            } else if (v !== parent.get(u)) {
                low.set(u, Math.min(low.get(u), disc.get(v)));
            }
        }
    };
    
    for (let i = 0; i < V; i++) {
        if (!visited.get(i)) {
            dfs(i);
        }
    }
    
    // Collect articulation points
    const result = [];
    for (let i = 0; i < V; i++) {
        if (ap.get(i)) {
            result.push(i);
        }
    }
    
    return result;
};

// Performance comparison utility
const performanceTest = (V, adj, iterations = 1000) => {
    const methods = [
        { name: 'Standard Articulation Points', fn: articulationPointsStandard },
        { name: 'Set-based Articulation Points', fn: articulationPointsSet },
        { name: 'Map-based Articulation Points', fn: articulationPointsMap }
    ];
    
    console.log(`Performance test with ${V} vertices, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn(V, JSON.parse(JSON.stringify(adj)));
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Articulation Points (Cut Vertices) Examples ===\n');
    
    // Test cases
    const testCases = [
        {
            V: 5,
            adj: [
                [1, 2],
                [0, 2],
                [0, 1, 3],
                [2, 4],
                [3]
            ],
            description: 'Simple graph with articulation point'
        },
        {
            V: 4,
            adj: [
                [1, 2],
                [0, 2],
                [0, 1, 3],
                [2]
            ],
            description: 'Graph with multiple articulation points'
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: ${testCase.description}`);
        console.log(`Graph: ${JSON.stringify(testCase.adj)}`);
        
        console.log(`Standard: [${articulationPointsStandard(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).join(', ')}]`);
        console.log(`Set-based: [${articulationPointsSet(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).join(', ')}]`);
        console.log(`Map-based: [${articulationPointsMap(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).join(', ')}]`);
        
        // Path tracking example
        const pathResult = articulationPointsWithPath(testCase.V, JSON.parse(JSON.stringify(testCase.adj)));
        console.log(`With path tracking: Points=[${pathResult.points.join(', ')}], Paths=[${pathResult.paths.map(p => `{${p.vertex}:[${p.path.join('->')}]}`).join(', ')}]`);
        
        console.log('---');
    });
    
    // Demonstrate generator approach
    console.log('\n=== Articulation Points Generator Visualization ===');
    const generator = articulationPointsGenerator(5, [[1, 2], [0, 2], [0, 1, 3], [2, 4], [3]]);
    let step;
    while (!(step = generator.next()).done) {
        console.log(`Step: ${step.value.step}`);
        if (step.value.vertex !== undefined) {
            console.log(`  Visited vertex: ${step.value.vertex}`);
        }
        if (step.value.u !== undefined && step.value.v !== undefined) {
            console.log(`  Checking edge: ${step.value.u}-${step.value.v}`);
        }
        if (step.value.points) {
            console.log(`  Articulation points found: [${step.value.points.join(', ')}]`);
        }
        console.log('');
    }
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    // Destructuring
    const result = articulationPointsWithPath(5, [[1, 2], [0, 2], [0, 1, 3], [2, 4], [3]]);
    const { points, paths } = result;
    console.log('Articulation points:', points);
    console.log('Paths:', paths.map(p => `${p.vertex}:[${p.path.join('->')}]`).join(', '));
    
    // Arrow functions with different syntaxes
    const findAP = (V, adj) => articulationPointsStandard(V, adj);
    const findAPExplicit = (V, adj) => {
        return articulationPointsStandard(V, adj);
    };
    
    console.log('Arrow function (short):', findAP(5, [[1, 2], [0, 2], [0, 1, 3], [2, 4], [3]]));
    console.log('Arrow function (explicit):', findAPExplicit(5, [[1, 2], [0, 2], [0, 1, 3], [2, 4], [3]]));
    
    // Method chaining with array methods
    const graphs = [
        { V: 5, adj: [[1, 2], [0, 2], [0, 1, 3], [2, 4], [3]] },
        { V: 4, adj: [[1, 2], [0, 2], [0, 1, 3], [2]] }
    ];
    
    const apResults = graphs
        .map(graph => ({ ...graph, adj: JSON.parse(JSON.stringify(graph.adj)) }))
        .map(graph => articulationPointsStandard(graph.V, graph.adj))
        .map(result => `[${result.join(', ')}]`);
    
    console.log('Chained operations (copy → compute → format):', apResults);
    
    // Performance test
    const largeAdj = Array.from({ length: 20 }, (_, i) => 
        [[(i+1) % 20], [(i+2) % 20]]
    );
    performanceTest(20, largeAdj, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        articulationPointsStandard,
        articulationPointsSet,
        articulationPointsFunctional,
        articulationPointsWithPath,
        articulationPointsGenerator,
        articulationPointsMap,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Standard Articulation Points: O(V + E) where V is vertices and E is edges
 * - Set-based Articulation Points: O(V + E)
 * - Functional Articulation Points: O(V + E)
 * - Articulation Points with Path Tracking: O(V + E)
 * - Generator Articulation Points: O(V + E)
 * - Map-based Articulation Points: O(V + E)
 * 
 * Space Complexity Analysis:
 * - Standard Articulation Points: O(V) for arrays
 * - Set-based Articulation Points: O(V) for Sets
 * - Functional Articulation Points: O(V) for state objects
 * - Articulation Points with Path Tracking: O(V + E) for arrays and path storage
 * - Generator Articulation Points: O(V) for arrays
 * - Map-based Articulation Points: O(V) for Maps
 * 
 * JavaScript-Specific Notes:
 * - Array destructuring for extracting values
 * - Set.has() is O(1) average case
 * - Map.get() and Map.set() are O(1) average case
 * - Generator functions allow step-by-step visualization
 * - Functional approach with array methods (map, filter, reduce)
 */