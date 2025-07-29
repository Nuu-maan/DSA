/**
 * Strongly Connected Components (Kosaraju's Algorithm)
 * Source: https://www.geeksforgeeks.org/strongly-connected-components/
 */

// Approach 1: Standard Kosaraju's Algorithm
const kosarajuStandard = (V, adj) => {
    // Step 1: Create transpose graph
    const transpose = () => {
        const transposed = Array.from({ length: V }, () => []);
        for (let i = 0; i < V; i++) {
            for (const neighbor of adj[i]) {
                transposed[neighbor].push(i);
            }
        }
        return transposed;
    };
    
    // Step 2: DFS to fill stack with finishing order
    const fillOrder = (node, visited, stack) => {
        visited[node] = true;
        
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                fillOrder(neighbor, visited, stack);
            }
        }
        
        stack.push(node);
    };
    
    // Step 3: DFS on transposed graph
    const dfs = (node, visited, component, transposed) => {
        visited[node] = true;
        component.push(node);
        
        for (const neighbor of transposed[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, component, transposed);
            }
        }
    };
    
    // Main algorithm
    const stack = [];
    const visited = new Array(V).fill(false);
    
    // Fill vertices in stack according to their finishing times
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            fillOrder(i, visited, stack);
        }
    }
    
    // Create transpose graph
    const transposed = transpose();
    
    // Mark all vertices as not visited for second DFS
    visited.fill(false);
    
    const scc = [];
    
    // Process vertices in order defined by stack
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited[node]) {
            const component = [];
            dfs(node, visited, component, transposed);
            scc.push(component);
        }
    }
    
    return scc;
};

// Approach 2: Kosaraju with Set for visited tracking
const kosarajuSet = (V, adj) => {
    // Step 1: Create transpose graph
    const transpose = () => {
        const transposed = Array.from({ length: V }, () => []);
        for (let i = 0; i < V; i++) {
            for (const neighbor of adj[i]) {
                transposed[neighbor].push(i);
            }
        }
        return transposed;
    };
    
    // Step 2: DFS to fill stack with finishing order
    const fillOrder = (node, visited, stack) => {
        if (visited.has(node)) return;
        visited.add(node);
        
        for (const neighbor of adj[node]) {
            if (!visited.has(neighbor)) {
                fillOrder(neighbor, visited, stack);
            }
        }
        
        stack.push(node);
    };
    
    // Step 3: DFS on transposed graph
    const dfs = (node, visited, component, transposed) => {
        if (visited.has(node)) return;
        visited.add(node);
        component.push(node);
        
        for (const neighbor of transposed[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor, visited, component, transposed);
            }
        }
    };
    
    // Main algorithm
    const stack = [];
    const visited = new Set();
    
    // Fill vertices in stack according to their finishing times
    for (let i = 0; i < V; i++) {
        if (!visited.has(i)) {
            fillOrder(i, visited, stack);
        }
    }
    
    // Create transpose graph
    const transposed = transpose();
    
    // Reset visited for second DFS
    const visited2 = new Set();
    
    const scc = [];
    
    // Process vertices in order defined by stack
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited2.has(node)) {
            const component = [];
            dfs(node, visited2, component, transposed);
            scc.push(component);
        }
    }
    
    return scc;
};

// Approach 3: Kosaraju with Map for adjacency lists
const kosarajuMap = (V, adj) => {
    // Convert adjacency list to Map
    const adjMap = new Map();
    for (let i = 0; i < V; i++) {
        adjMap.set(i, adj[i]);
    }
    
    // Step 1: Create transpose graph
    const transpose = () => {
        const transposed = new Map();
        for (let i = 0; i < V; i++) {
            transposed.set(i, []);
        }
        
        for (let i = 0; i < V; i++) {
            const neighbors = adjMap.get(i) || [];
            for (const neighbor of neighbors) {
                transposed.get(neighbor).push(i);
            }
        }
        return transposed;
    };
    
    // Step 2: DFS to fill stack with finishing order
    const fillOrder = (node, visited, stack, adjList) => {
        visited[node] = true;
        
        const neighbors = adjList.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited[neighbor]) {
                fillOrder(neighbor, visited, stack, adjList);
            }
        }
        
        stack.push(node);
    };
    
    // Step 3: DFS on transposed graph
    const dfs = (node, visited, component, transposed) => {
        visited[node] = true;
        component.push(node);
        
        const neighbors = transposed.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, component, transposed);
            }
        }
    };
    
    // Main algorithm
    const stack = [];
    const visited = new Array(V).fill(false);
    
    // Fill vertices in stack according to their finishing times
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            fillOrder(i, visited, stack, adjMap);
        }
    }
    
    // Create transpose graph
    const transposed = transpose();
    
    // Mark all vertices as not visited for second DFS
    visited.fill(false);
    
    const scc = [];
    
    // Process vertices in order defined by stack
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited[node]) {
            const component = [];
            dfs(node, visited, component, transposed);
            scc.push(component);
        }
    }
    
    return scc;
};

// Approach 4: Functional approach with reduce
const kosarajuFunctional = (V, adj) => {
    // Create transpose graph
    const transpose = (graph) => {
        const transposed = Array.from({ length: V }, () => []);
        graph.forEach((neighbors, node) => {
            neighbors.forEach(neighbor => {
                transposed[neighbor].push(node);
            });
        });
        return transposed;
    };
    
    // DFS to fill stack with finishing order
    const fillOrder = (node, visited, stack, graph) => {
        if (visited[node]) return;
        visited[node] = true;
        
        (graph[node] || []).forEach(neighbor => {
            if (!visited[neighbor]) {
                fillOrder(neighbor, visited, stack, graph);
            }
        });
        
        stack.push(node);
    };
    
    // DFS on transposed graph
    const dfs = (node, visited, component, transposed) => {
        if (visited[node]) return;
        visited[node] = true;
        component.push(node);
        
        (transposed[node] || []).forEach(neighbor => {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, component, transposed);
            }
        });
    };
    
    // Main algorithm
    const stack = [];
    const visited = new Array(V).fill(false);
    
    // Fill vertices in stack according to their finishing times
    Array.from({ length: V }, (_, i) => i)
        .filter(i => !visited[i])
        .forEach(i => fillOrder(i, visited, stack, adj));
    
    // Create transpose graph
    const transposed = transpose(adj);
    
    // Mark all vertices as not visited for second DFS
    visited.fill(false);
    
    const scc = [];
    
    // Process vertices in order defined by stack
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited[node]) {
            const component = [];
            dfs(node, visited, component, transposed);
            scc.push(component);
        }
    }
    
    return scc;
};

// Approach 5: Kosaraju with Path Tracking
const kosarajuWithPath = (V, adj) => {
    // Step 1: Create transpose graph
    const transpose = () => {
        const transposed = Array.from({ length: V }, () => []);
        for (let i = 0; i < V; i++) {
            for (const neighbor of adj[i]) {
                transposed[neighbor].push(i);
            }
        }
        return transposed;
    };
    
    // Step 2: DFS to fill stack with finishing order and track paths
    const fillOrder = (node, visited, stack, path) => {
        visited[node] = true;
        path.push(node);
        
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                fillOrder(neighbor, visited, stack, path);
            }
        }
        
        stack.push(node);
        return path;
    };
    
    // Step 3: DFS on transposed graph
    const dfs = (node, visited, component, transposed) => {
        visited[node] = true;
        component.push(node);
        
        for (const neighbor of transposed[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, component, transposed);
            }
        }
    };
    
    // Main algorithm
    const stack = [];
    const visited = new Array(V).fill(false);
    const paths = [];
    
    // Fill vertices in stack according to their finishing times
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            const path = [];
            fillOrder(i, visited, stack, path);
            paths.push(path);
        }
    }
    
    // Create transpose graph
    const transposed = transpose();
    
    // Mark all vertices as not visited for second DFS
    visited.fill(false);
    
    const scc = [];
    
    // Process vertices in order defined by stack
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited[node]) {
            const component = [];
            dfs(node, visited, component, transposed);
            scc.push(component);
        }
    }
    
    return { components: scc, paths };
};

// Approach 6: Generator-based Kosaraju for step-by-step visualization
function* kosarajuGenerator(V, adj) {
    // Step 1: Create transpose graph
    const transpose = () => {
        const transposed = Array.from({ length: V }, () => []);
        for (let i = 0; i < V; i++) {
            for (const neighbor of adj[i]) {
                transposed[neighbor].push(i);
            }
        }
        return transposed;
    };
    
    // Step 2: DFS to fill stack with finishing order
    function* fillOrder(node, visited, stack) {
        visited[node] = true;
        yield { step: `fillOrder visiting ${node}`, visited: [...visited], stack: [...stack] };
        
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                yield* fillOrder(neighbor, visited, stack);
            }
        }
        
        stack.push(node);
        yield { step: `fillOrder adding ${node} to stack`, visited: [...visited], stack: [...stack] };
    };
    
    // Step 3: DFS on transposed graph
    function* dfs(node, visited, component, transposed) {
        visited[node] = true;
        component.push(node);
        yield { step: `dfs visiting ${node}`, visited: [...visited], component: [...component] };
        
        for (const neighbor of transposed[node]) {
            if (!visited[neighbor]) {
                yield* dfs(neighbor, visited, component, transposed);
            }
        }
    };
    
    // Main algorithm
    const stack = [];
    const visited = new Array(V).fill(false);
    
    yield { step: 'start', visited: [...visited], stack: [...stack] };
    
    // Fill vertices in stack according to their finishing times
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            yield* fillOrder(i, visited, stack);
        }
    }
    
    yield { step: 'filled stack', visited: [...visited], stack: [...stack] };
    
    // Create transpose graph
    const transposed = transpose();
    yield { step: 'created transpose graph', transposed };
    
    // Mark all vertices as not visited for second DFS
    visited.fill(false);
    
    const scc = [];
    
    // Process vertices in order defined by stack
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited[node]) {
            const component = [];
            yield* dfs(node, visited, component, transposed);
            scc.push(component);
            yield { step: 'found component', component: [...component], scc: [...scc] };
        }
    }
    
    yield { step: 'complete', scc: [...scc] };
    return scc;
};

// Performance comparison utility
const performanceTest = (V, adj, iterations = 1000) => {
    const methods = [
        { name: 'Standard Kosaraju', fn: kosarajuStandard },
        { name: 'Set-based Kosaraju', fn: kosarajuSet },
        { name: 'Map-based Kosaraju', fn: kosarajuMap },
        { name: 'Functional Kosaraju', fn: kosarajuFunctional }
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
    console.log('=== Strongly Connected Components (Kosaraju\'s Algorithm) Examples ===\n');
    
    // Test cases
    const testCases = [
        {
            V: 5,
            adj: [[1], [2], [0, 3], [4], []],
            description: 'Graph with 2 SCCs'
        },
        {
            V: 4,
            adj: [[1], [2], [0, 3], [2]],
            description: 'Graph with 2 SCCs'
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: ${testCase.description}`);
        console.log(`Graph: ${JSON.stringify(testCase.adj)}`);
        
        console.log(`Standard Kosaraju: [${kosarajuStandard(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).map(comp => `[${comp.join(', ')}]`).join(', ')}]`);
        console.log(`Set-based Kosaraju: [${kosarajuSet(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).map(comp => `[${comp.join(', ')}]`).join(', ')}]`);
        console.log(`Map-based Kosaraju: [${kosarajuMap(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).map(comp => `[${comp.join(', ')}]`).join(', ')}]`);
        console.log(`Functional Kosaraju: [${kosarajuFunctional(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).map(comp => `[${comp.join(', ')}]`).join(', ')}]`);
        
        // Path tracking example
        const pathResult = kosarajuWithPath(testCase.V, JSON.parse(JSON.stringify(testCase.adj)));
        console.log(`With path tracking: Components=[${pathResult.components.map(comp => `[${comp.join(', ')}]`).join(', ')}], Paths=[${pathResult.paths.map(path => `[${path.join(' → ')}]`).join(', ')}]`);
        
        console.log('---');
    });
    
    // Demonstrate generator approach
    console.log('\n=== Kosaraju\'s Generator Visualization ===');
    const generator = kosarajuGenerator(4, [[1], [2], [0], [2]]);
    let step;
    while (!(step = generator.next()).done) {
        console.log(`Step: ${step.value.step}`);
        if (step.value.visited) {
            console.log(`  Visited: [${step.value.visited.map(v => v ? 'T' : 'F').join(', ')}]`);
        }
        if (step.value.stack) {
            console.log(`  Stack: [${step.value.stack.join(', ')}]`);
        }
        if (step.value.component) {
            console.log(`  Component: [${step.value.component.join(', ')}]`);
        }
        if (step.value.scc) {
            console.log(`  SCCs so far: [${step.value.scc.map(comp => `[${comp.join(', ')}]`).join(', ')}]`);
        }
        console.log('');
    }
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    // Destructuring
    const result = kosarajuStandard(3, [[1], [2], [0]]);
    const [firstComponent, ...otherComponents] = result;
    console.log('First component:', firstComponent);
    console.log('Other components:', otherComponents);
    
    // Arrow functions with different syntaxes
    const findSCC = (V, adj) => kosarajuStandard(V, adj);
    const findSCCExplicit = (V, adj) => {
        return kosarajuStandard(V, adj);
    };
    
    console.log('Arrow function (short):', findSCC(3, [[1], [2], [0]]));
    console.log('Arrow function (explicit):', findSCCExplicit(3, [[1], [2], [0]]));
    
    // Method chaining with array methods
    const graphs = [
        { V: 3, adj: [[1], [2], [0]] },
        { V: 4, adj: [[1], [2], [0, 3], [2]] }
    ];
    
    const sccResults = graphs
        .map(graph => ({ ...graph, adj: JSON.parse(JSON.stringify(graph.adj)) }))
        .map(graph => kosarajuStandard(graph.V, graph.adj))
        .map(result => `SCCs: [${result.map(comp => `[${comp.join(', ')}]`).join(', ')}]`);
    
    console.log('Chained operations (copy → compute → format):', sccResults);
    
    // Performance test
    const largeAdj = Array.from({ length: 50 }, (_, i) => 
        [[(i+1) % 50], [(i+2) % 50]]
    );
    performanceTest(50, largeAdj, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        kosarajuStandard,
        kosarajuSet,
        kosarajuMap,
        kosarajuFunctional,
        kosarajuWithPath,
        kosarajuGenerator,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Standard Kosaraju: O(V + E) where V is vertices and E is edges
 * - Set-based Kosaraju: O(V + E)
 * - Map-based Kosaraju: O(V + E)
 * - Functional Kosaraju: O(V + E)
 * - Kosaraju with Path Tracking: O(V + E)
 * - Generator Kosaraju: O(V + E)
 * 
 * Space Complexity Analysis:
 * - Standard Kosaraju: O(V + E) for adjacency lists, O(V) for visited arrays and stack
 * - Set-based Kosaraju: O(V + E) for adjacency lists, O(V) for Sets and stack
 * - Map-based Kosaraju: O(V + E) for Maps, O(V) for visited arrays and stack
 * - Functional Kosaraju: O(V + E) for adjacency lists, O(V) for visited arrays and stack
 * - Kosaraju with Path Tracking: O(V + E) for adjacency lists, O(V) for visited arrays, stack, and paths
 * - Generator Kosaraju: O(V + E) for adjacency lists, O(V) for visited arrays and stack
 * 
 * JavaScript-Specific Notes:
 * - Set.has() is O(1) average case
 * - Map.get() and Map.set() are O(1) average case
 * - Generator functions allow step-by-step visualization
 * - Functional approach with array methods
 * - Kosaraju's algorithm requires two DFS passes and graph transposition
 */