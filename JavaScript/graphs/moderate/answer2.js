/**
 * Topological Sort
 * Source: https://www.geeksforgeeks.org/topological-sorting/
 */

// Approach 1: Standard DFS with Stack (ES6+ implementation)
const topoSortStandard = (V, adj) => {
    const visited = new Array(V).fill(false);
    const stack = [];
    
    const dfs = (node) => {
        visited[node] = true;
        
        // Visit all neighbors
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
        
        // Push node to stack after visiting all neighbors
        stack.push(node);
    };
    
    // Call DFS for each unvisited vertex
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    
    // Return reversed stack (topological order)
    return stack.reverse();
};

// Approach 2: Kahn's Algorithm (BFS-based)
const topoSortKahn = (V, adj) => {
    // Calculate in-degrees
    const inDegree = new Array(V).fill(0);
    for (let i = 0; i < V; i++) {
        for (const neighbor of adj[i]) {
            inDegree[neighbor]++;
        }
    }
    
    // Initialize queue with nodes having in-degree 0
    const queue = [];
    for (let i = 0; i < V; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        // Reduce in-degree of neighbors
        for (const neighbor of adj[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // Check for cycles
    if (result.length !== V) {
        throw new Error('Graph has a cycle');
    }
    
    return result;
};

// Approach 3: Using Set for visited tracking (functional approach)
const topoSortSet = (V, adj) => {
    const visited = new Set();
    const stack = [];
    
    const dfs = (node) => {
        if (visited.has(node)) return;
        visited.add(node);
        
        // Visit all neighbors
        adj[node].forEach(neighbor => {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        });
        
        // Push node to stack after visiting all neighbors
        stack.push(node);
    };
    
    // Call DFS for each unvisited vertex
    for (let i = 0; i < V; i++) {
        if (!visited.has(i)) {
            dfs(i);
        }
    }
    
    // Return reversed stack (topological order)
    return stack.reverse();
};

// Approach 4: Using Map for adjacency list (showcasing Map usage)
const topoSortMap = (V, adj) => {
    // Convert adjacency list to Map
    const adjMap = new Map();
    for (let i = 0; i < V; i++) {
        adjMap.set(i, adj[i]);
    }
    
    const visited = new Array(V).fill(false);
    const stack = [];
    
    const dfs = (node) => {
        visited[node] = true;
        
        // Visit all neighbors
        const neighbors = adjMap.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
        
        // Push node to stack after visiting all neighbors
        stack.push(node);
    };
    
    // Call DFS for each unvisited vertex
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    
    // Return reversed stack (topological order)
    return stack.reverse();
};

// Approach 5: Kahn's Algorithm with Set and Map
const topoSortKahnMap = (V, adj) => {
    // Calculate in-degrees using Map
    const inDegree = new Map();
    for (let i = 0; i < V; i++) {
        inDegree.set(i, 0);
    }
    
    for (let i = 0; i < V; i++) {
        for (const neighbor of adj[i]) {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
        }
    }
    
    // Initialize queue with nodes having in-degree 0
    const queue = [];
    for (let i = 0; i < V; i++) {
        if (inDegree.get(i) === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        // Reduce in-degree of neighbors
        for (const neighbor of adj[node]) {
            const newInDegree = (inDegree.get(neighbor) || 0) - 1;
            inDegree.set(neighbor, newInDegree);
            if (newInDegree === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // Check for cycles
    if (result.length !== V) {
        throw new Error('Graph has a cycle');
    }
    
    return result;
};

// Approach 6: Generator-based DFS for step-by-step visualization
function* topoSortGenerator(V, adj) {
    const visited = new Array(V).fill(false);
    const stack = [];
    
    function* dfs(node) {
        visited[node] = true;
        yield { step: `visiting ${node}`, visited: [...visited], stack: [...stack] };
        
        // Visit all neighbors
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                yield* dfs(neighbor);
            }
        }
        
        // Push node to stack after visiting all neighbors
        stack.push(node);
        yield { step: `adding ${node} to stack`, visited: [...visited], stack: [...stack] };
    }
    
    yield { step: 'start', visited: [...visited], stack: [...stack] };
    
    // Call DFS for each unvisited vertex
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            yield* dfs(i);
        }
    }
    
    yield { step: 'complete', visited: [...visited], stack: [...stack], result: [...stack].reverse() };
    return stack.reverse();
};

// Performance comparison utility
const performanceTest = (V, adj, iterations = 10000) => {
    const methods = [
        { name: 'Standard DFS', fn: topoSortStandard },
        { name: 'Kahn\'s Algorithm', fn: topoSortKahn },
        { name: 'Set-based DFS', fn: topoSortSet },
        { name: 'Map-based DFS', fn: topoSortMap },
        { name: 'Kahn\'s with Map', fn: topoSortKahnMap }
    ];
    
    console.log(`Performance test with ${V} vertices, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            try {
                fn(V, JSON.parse(JSON.stringify(adj))); // Fresh copy each iteration
            } catch (e) {
                // Ignore cycle errors for performance testing
            }
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Topological Sort Examples ===\n');
    
    // Test cases
    const testCases = [
        {
            V: 6,
            adj: [[2,3], [3,4], [], [4], [], []],
            description: 'DAG with multiple paths'
        },
        {
            V: 4,
            adj: [[1], [2], [3], []],
            description: 'Linear DAG'
        },
        {
            V: 3,
            adj: [[1], [2], [0]],
            description: 'Cyclic graph (should throw error in Kahn\'s)'
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: ${testCase.description}`);
        console.log(`Graph: ${JSON.stringify(testCase.adj)}`);
        
        try {
            console.log(`Standard DFS: [${topoSortStandard(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).join(', ')}]`);
        } catch (e) {
            console.log(`Standard DFS: Error - ${e.message}`);
        }
        
        try {
            console.log(`Kahn's Algorithm: [${topoSortKahn(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).join(', ')}]`);
        } catch (e) {
            console.log(`Kahn's Algorithm: Error - ${e.message}`);
        }
        
        try {
            console.log(`Set-based DFS: [${topoSortSet(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).join(', ')}]`);
        } catch (e) {
            console.log(`Set-based DFS: Error - ${e.message}`);
        }
        
        try {
            console.log(`Map-based DFS: [${topoSortMap(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).join(', ')}]`);
        } catch (e) {
            console.log(`Map-based DFS: Error - ${e.message}`);
        }
        
        try {
            console.log(`Kahn's with Map: [${topoSortKahnMap(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).join(', ')}]`);
        } catch (e) {
            console.log(`Kahn's with Map: Error - ${e.message}`);
        }
        
        console.log('---');
    });
    
    // Demonstrate generator approach
    console.log('\n=== Topological Sort Generator Visualization ===');
    const generator = topoSortGenerator(4, [[1], [2], [3], []]);
    let step;
    while (!(step = generator.next()).done) {
        console.log(`Step: ${step.value.step}`);
        if (step.value.visited) {
            console.log(`  Visited: [${step.value.visited.map(v => v ? 'T' : 'F').join(', ')}]`);
        }
        if (step.value.stack) {
            console.log(`  Stack: [${step.value.stack.join(', ')}]`);
        }
        if (step.value.result) {
            console.log(`  Result: [${step.value.result.join(', ')}]`);
        }
        console.log('');
    }
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    // Destructuring
    const result = topoSortStandard(4, [[1], [2], [3], []]);
    const [first, ...rest] = result;
    console.log('First element:', first);
    console.log('Rest elements:', rest);
    
    // Arrow functions with different syntaxes
    const sortShort = (V, adj) => topoSortStandard(V, adj);
    const sortExplicit = (V, adj) => {
        return topoSortStandard(V, adj);
    };
    
    console.log('Arrow function (short):', sortShort(3, [[1], [2], []]));
    console.log('Arrow function (explicit):', sortExplicit(3, [[1], [2], []]));
    
    // Method chaining with array methods
    const graphs = [
        { V: 3, adj: [[1], [2], []] },
        { V: 4, adj: [[1], [2], [3], []] }
    ];
    
    const sortResults = graphs
        .map(graph => ({ ...graph, adj: JSON.parse(JSON.stringify(graph.adj)) }))
        .map(graph => topoSortStandard(graph.V, graph.adj))
        .map(result => `Order: [${result.join(' → ')}]`);
    
    console.log('Chained operations (copy → sort → format):', sortResults);
    
    // Performance test
    const largeAdj = Array.from({ length: 100 }, (_, i) => 
        [i+1].filter(x => x < 100)
    );
    performanceTest(100, largeAdj, 1000);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        topoSortStandard,
        topoSortKahn,
        topoSortSet,
        topoSortMap,
        topoSortKahnMap,
        topoSortGenerator,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Standard DFS: O(V + E) where V is vertices and E is edges
 * - Kahn's Algorithm: O(V + E)
 * - Set-based DFS: O(V + E)
 * - Map-based DFS: O(V + E)
 * - Kahn's with Map: O(V + E)
 * - Generator DFS: O(V + E)
 * 
 * Space Complexity Analysis:
 * - Standard DFS: O(V) for visited array and O(V) for recursion stack
 * - Kahn's Algorithm: O(V) for in-degree array and queue
 * - Set-based DFS: O(V) for Set and O(V) for recursion stack
 * - Map-based DFS: O(V + E) for Map storage plus O(V) for visited and recursion stack
 * - Kahn's with Map: O(V + E) for Maps and queue
 * - Generator DFS: O(V) for visited array and O(V) for recursion stack
 * 
 * JavaScript-Specific Notes:
 * - Recursion depth limit in JavaScript engines
 * - Set.has() is O(1) average case, better than Array.includes() O(n)
 * - Map.get() is O(1) average case
 * - Generator functions allow step-by-step visualization
 * - Kahn's algorithm can detect cycles in directed graphs
 */