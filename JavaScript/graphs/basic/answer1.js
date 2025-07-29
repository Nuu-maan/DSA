/**
 * Breadth First Search (BFS) of Graph
 * Source: https://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/
 */

// Approach 1: Standard BFS using Queue (ES6+ implementation)
const bfsOfGraphStandard = (V, adj) => {
    const visited = new Array(V).fill(false);
    const queue = [0]; // Start from vertex 0
    visited[0] = true;
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift(); // Dequeue
        result.push(node);
        
        // Visit all neighbors
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor); // Enqueue
            }
        }
    }
    
    return result;
};

// Approach 2: BFS using Set for visited tracking (functional approach)
const bfsOfGraphSet = (V, adj) => {
    const visited = new Set();
    const queue = [0];
    visited.add(0);
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        // Filter unvisited neighbors and add them
        adj[node]
            .filter(neighbor => !visited.has(neighbor))
            .forEach(neighbor => {
                visited.add(neighbor);
                queue.push(neighbor);
            });
    }
    
    return result;
};

// Approach 3: BFS with Map for adjacency list (showcasing Map usage)
const bfsOfGraphMap = (V, adj) => {
    // Convert adjacency list to Map
    const adjMap = new Map();
    for (let i = 0; i < V; i++) {
        adjMap.set(i, adj[i]);
    }
    
    const visited = new Array(V).fill(false);
    const queue = [0];
    visited[0] = true;
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        const neighbors = adjMap.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
    
    return result;
};

// Approach 4: BFS with generator for step-by-step visualization
function* bfsOfGraphGenerator(V, adj) {
    const visited = new Array(V).fill(false);
    const queue = [0];
    visited[0] = true;
    
    yield { step: 'start', queue: [...queue], visited: [...visited], result: [] };
    
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        yield { step: `visiting ${node}`, queue: [...queue], visited: [...visited], result: [...result] };
        
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
                yield { step: `adding ${neighbor}`, queue: [...queue], visited: [...visited], result: [...result] };
            }
        }
    }
    
    yield { step: 'complete', queue: [], visited: [...visited], result: [...result] };
    return result;
};

// Approach 5: BFS with async/await for non-blocking execution
const bfsOfGraphAsync = async (V, adj) => {
    const visited = new Array(V).fill(false);
    const queue = [0];
    visited[0] = true;
    const result = [];
    
    while (queue.length > 0) {
        // Non-blocking execution
        await new Promise(resolve => setTimeout(resolve, 0));
        
        const node = queue.shift();
        result.push(node);
        
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
    
    return result;
};

// Approach 6: BFS with functional programming and reduce
const bfsOfGraphFunctional = (V, adj) => {
    const initialState = {
        visited: new Array(V).fill(false),
        queue: [0],
        result: []
    };
    
    initialState.visited[0] = true;
    
    // Process queue until empty
    const finalState = [...Array(V)].reduce((state) => {
        if (state.queue.length === 0) return state;
        
        const [node, ...remainingQueue] = state.queue;
        const result = [...state.result, node];
        
        // Add unvisited neighbors
        const newNeighbors = adj[node].filter(neighbor => !state.visited[neighbor]);
        const updatedVisited = [...state.visited];
        newNeighbors.forEach(neighbor => updatedVisited[neighbor] = true);
        
        return {
            visited: updatedVisited,
            queue: [...remainingQueue, ...newNeighbors],
            result
        };
    }, initialState);
    
    return finalState.result;
};

// Performance comparison utility
const performanceTest = (V, adj, iterations = 10000) => {
    const methods = [
        { name: 'Standard BFS', fn: bfsOfGraphStandard },
        { name: 'Set-based BFS', fn: bfsOfGraphSet },
        { name: 'Map-based BFS', fn: bfsOfGraphMap },
        { name: 'Functional BFS', fn: bfsOfGraphFunctional }
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
    console.log('=== BFS of Graph Examples ===\n');
    
    // Test cases
    const testCases = [
        { V: 5, adj: [[1,2,3], [0], [0,4], [0], [2]], description: 'Connected graph' },
        { V: 3, adj: [[1], [0,2], [1]], description: 'Linear graph' },
        { V: 4, adj: [[1], [0,2], [1,3], [2]], description: 'Path graph' }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: ${testCase.description}`);
        console.log(`Graph: ${JSON.stringify(testCase.adj)}`);
        console.log(`Standard BFS: [${bfsOfGraphStandard(testCase.V, testCase.adj).join(', ')}]`);
        console.log(`Set-based BFS: [${bfsOfGraphSet(testCase.V, testCase.adj).join(', ')}]`);
        console.log(`Map-based BFS: [${bfsOfGraphMap(testCase.V, testCase.adj).join(', ')}]`);
        console.log(`Functional BFS: [${bfsOfGraphFunctional(testCase.V, testCase.adj).join(', ')}]`);
        console.log('---');
    });
    
    // Demonstrate generator approach
    console.log('\n=== BFS Generator Visualization ===');
    const generator = bfsOfGraphGenerator(5, [[1,2,3], [0], [0,4], [0], [2]]);
    let step;
    while (!(step = generator.next()).done) {
        console.log(`Step: ${step.value.step}`);
        console.log(`  Queue: [${step.value.queue.join(', ')}]`);
        console.log(`  Visited: [${step.value.visited.map(v => v ? 'T' : 'F').join(', ')}]`);
        console.log(`  Result: [${step.value.result.join(', ')}]`);
        console.log('');
    }
    
    // Demonstrate async approach
    console.log('=== Async BFS Example ===');
    bfsOfGraphAsync(5, [[1,2,3], [0], [0,4], [0], [2]]).then(result => {
        console.log(`Async BFS result: [${result.join(', ')}]`);
    });
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    // Destructuring and spread
    const [first, ...rest] = bfsOfGraphStandard(5, [[1,2,3], [0], [0,4], [0], [2]]);
    console.log('First element:', first);
    console.log('Rest elements:', rest);
    
    // Arrow functions with different syntaxes
    const bfsShort = (V, adj) => bfsOfGraphStandard(V, adj);
    const bfsExplicit = (V, adj) => {
        return bfsOfGraphStandard(V, adj);
    };
    
    console.log('Arrow function (short):', bfsShort(3, [[1], [0,2], [1]]));
    console.log('Arrow function (explicit):', bfsExplicit(3, [[1], [0,2], [1]]));
    
    // Method chaining
    const processedResult = bfsOfGraphStandard(5, [[1,2,3], [0], [0,4], [0], [2]])
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
        bfsOfGraphStandard,
        bfsOfGraphSet,
        bfsOfGraphMap,
        bfsOfGraphGenerator,
        bfsOfGraphAsync,
        bfsOfGraphFunctional,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - All approaches: O(V + E) where V is vertices and E is edges
 * 
 * Space Complexity Analysis:
 * - Standard BFS: O(V) for visited array and queue
 * - Set-based BFS: O(V) for Set and queue
 * - Map-based BFS: O(V + E) for Map storage plus O(V) for visited and queue
 * - Generator BFS: O(V) for visited array and queue
 * - Async BFS: O(V) for visited array and queue
 * - Functional BFS: O(V) for visited array and queue
 * 
 * JavaScript-Specific Notes:
 * - Array.shift() is O(n) but acceptable for small graphs
 * - Set.has() is O(1) average case, better than Array.includes() O(n)
 * - Map.get() is O(1) average case
 * - Generator functions allow step-by-step visualization
 * - Async/await enables non-blocking execution
 */