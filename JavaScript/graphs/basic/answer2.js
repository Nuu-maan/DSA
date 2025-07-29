/**
 * Depth First Search (DFS) of Graph
 * Source: https://www.geeksforgeeks.org/depth-first-traversal-for-a-graph/
 */

// Approach 1: Standard DFS using Recursion (ES6+ implementation)
const dfsOfGraphStandard = (V, adj) => {
    const visited = new Array(V).fill(false);
    const result = [];
    
    const dfs = (node) => {
        visited[node] = true;
        result.push(node);
        
        // Visit all neighbors
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    };
    
    dfs(0); // Start from vertex 0
    return result;
};

// Approach 2: DFS using Stack (Iterative approach)
const dfsOfGraphIterative = (V, adj) => {
    const visited = new Array(V).fill(false);
    const stack = [0]; // Start from vertex 0
    visited[0] = true;
    const result = [];
    
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node);
        
        // Add unvisited neighbors to stack (in reverse order for consistent traversal)
        for (let i = adj[node].length - 1; i >= 0; i--) {
            const neighbor = adj[node][i];
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                stack.push(neighbor);
            }
        }
    }
    
    return result;
};

// Approach 3: DFS using Set for visited tracking (functional approach)
const dfsOfGraphSet = (V, adj) => {
    const visited = new Set();
    const result = [];
    
    const dfs = (node) => {
        visited.add(node);
        result.push(node);
        
        // Filter unvisited neighbors and visit them
        adj[node]
            .filter(neighbor => !visited.has(neighbor))
            .forEach(neighbor => dfs(neighbor));
    };
    
    dfs(0); // Start from vertex 0
    return result;
};

// Approach 4: DFS with Map for adjacency list (showcasing Map usage)
const dfsOfGraphMap = (V, adj) => {
    // Convert adjacency list to Map
    const adjMap = new Map();
    for (let i = 0; i < V; i++) {
        adjMap.set(i, adj[i]);
    }
    
    const visited = new Array(V).fill(false);
    const result = [];
    
    const dfs = (node) => {
        visited[node] = true;
        result.push(node);
        
        const neighbors = adjMap.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    };
    
    dfs(0); // Start from vertex 0
    return result;
};

// Approach 5: DFS with generator for step-by-step visualization
function* dfsOfGraphGenerator(V, adj) {
    const visited = new Array(V).fill(false);
    
    function* dfs(node) {
        visited[node] = true;
        yield { step: `visiting ${node}`, visited: [...visited], result: [node] };
        
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                yield* dfs(neighbor);
            }
        }
    }
    
    yield { step: 'start', visited: [...visited], result: [] };
    yield* dfs(0); // Start from vertex 0
    yield { step: 'complete', visited: [...visited], result: [] };
};

// Approach 6: DFS with async/await for non-blocking execution
const dfsOfGraphAsync = async (V, adj) => {
    const visited = new Array(V).fill(false);
    const result = [];
    
    const dfs = async (node) => {
        // Non-blocking execution
        await new Promise(resolve => setTimeout(resolve, 0));
        
        visited[node] = true;
        result.push(node);
        
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                await dfs(neighbor);
            }
        }
    };
    
    await dfs(0); // Start from vertex 0
    return result;
};

// Approach 7: DFS with functional programming and reduce
const dfsOfGraphFunctional = (V, adj) => {
    const visited = new Set();
    
    const traverse = (node) => {
        if (visited.has(node)) return [];
        visited.add(node);
        
        // Reduce neighbors to get complete traversal
        return adj[node].reduce((acc, neighbor) => {
            return [...acc, ...traverse(neighbor)];
        }, [node]);
    };
    
    return traverse(0); // Start from vertex 0
};

// Performance comparison utility
const performanceTest = (V, adj, iterations = 10000) => {
    const methods = [
        { name: 'Standard DFS', fn: dfsOfGraphStandard },
        { name: 'Iterative DFS', fn: dfsOfGraphIterative },
        { name: 'Set-based DFS', fn: dfsOfGraphSet },
        { name: 'Map-based DFS', fn: dfsOfGraphMap },
        { name: 'Functional DFS', fn: dfsOfGraphFunctional }
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
    console.log('=== DFS of Graph Examples ===\n');
    
    // Test cases
    const testCases = [
        { V: 4, adj: [[1,2,3], [0], [0], [0]], description: 'Star graph' },
        { V: 3, adj: [[1], [0,2], [1]], description: 'Linear graph' },
        { V: 4, adj: [[1], [0,2], [1,3], [2]], description: 'Path graph' }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: ${testCase.description}`);
        console.log(`Graph: ${JSON.stringify(testCase.adj)}`);
        console.log(`Standard DFS: [${dfsOfGraphStandard(testCase.V, testCase.adj).join(', ')}]`);
        console.log(`Iterative DFS: [${dfsOfGraphIterative(testCase.V, testCase.adj).join(', ')}]`);
        console.log(`Set-based DFS: [${dfsOfGraphSet(testCase.V, testCase.adj).join(', ')}]`);
        console.log(`Map-based DFS: [${dfsOfGraphMap(testCase.V, testCase.adj).join(', ')}]`);
        console.log(`Functional DFS: [${dfsOfGraphFunctional(testCase.V, testCase.adj).join(', ')}]`);
        console.log('---');
    });
    
    // Demonstrate generator approach
    console.log('\n=== DFS Generator Visualization ===');
    const generator = dfsOfGraphGenerator(4, [[1,2,3], [0], [0], [0]]);
    let step;
    while (!(step = generator.next()).done) {
        console.log(`Step: ${step.value.step}`);
        if (step.value.visited) {
            console.log(`  Visited: [${step.value.visited.map(v => v ? 'T' : 'F').join(', ')}]`);
        }
        if (step.value.result && step.value.result.length > 0) {
            console.log(`  Result: [${step.value.result.join(', ')}]`);
        }
        console.log('');
    }
    
    // Demonstrate async approach
    console.log('=== Async DFS Example ===');
    dfsOfGraphAsync(4, [[1,2,3], [0], [0], [0]]).then(result => {
        console.log(`Async DFS result: [${result.join(', ')}]`);
    });
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    // Destructuring and spread
    const [first, ...rest] = dfsOfGraphStandard(4, [[1,2,3], [0], [0], [0]]);
    console.log('First element:', first);
    console.log('Rest elements:', rest);
    
    // Arrow functions with different syntaxes
    const dfsShort = (V, adj) => dfsOfGraphStandard(V, adj);
    const dfsExplicit = (V, adj) => {
        return dfsOfGraphStandard(V, adj);
    };
    
    console.log('Arrow function (short):', dfsShort(3, [[1], [0,2], [1]]));
    console.log('Arrow function (explicit):', dfsExplicit(3, [[1], [0,2], [1]]));
    
    // Method chaining
    const processedResult = dfsOfGraphStandard(4, [[1,2,3], [0], [0], [0]])
        .filter(x => x % 2 === 0)  // Keep even numbers
        .map(x => x * 2)           // Double them
        .reverse();                // Reverse the result
    
    console.log('Chained operations (even → double → reverse):', processedResult);
    
    // Performance test with larger graph
    const largeAdj = Array.from({ length: 100 }, (_, i) => 
        [i-1, i+1].filter(x => x >= 0 && x < 100)
    );
    performanceTest(100, largeAdj, 1000);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        dfsOfGraphStandard,
        dfsOfGraphIterative,
        dfsOfGraphSet,
        dfsOfGraphMap,
        dfsOfGraphGenerator,
        dfsOfGraphAsync,
        dfsOfGraphFunctional,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - All approaches: O(V + E) where V is vertices and E is edges
 * 
 * Space Complexity Analysis:
 * - Standard DFS: O(V) for visited array and O(V) for recursion stack
 * - Iterative DFS: O(V) for visited array and stack
 * - Set-based DFS: O(V) for Set and O(V) for recursion stack
 * - Map-based DFS: O(V + E) for Map storage plus O(V) for visited and recursion stack
 * - Generator DFS: O(V) for visited array and O(V) for recursion stack
 * - Async DFS: O(V) for visited array and O(V) for recursion stack
 * - Functional DFS: O(V) for Set and O(V) for recursion stack
 * 
 * JavaScript-Specific Notes:
 * - Recursion depth limit in JavaScript engines
 * - Set.has() is O(1) average case, better than Array.includes() O(n)
 * - Map.get() is O(1) average case
 * - Generator functions allow step-by-step visualization
 * - Async/await enables non-blocking execution
 * - Functional approach with reduce can be less efficient due to array spreading
 */