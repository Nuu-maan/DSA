/**
 * Dijkstra's Shortest Path Algorithm
 * Source: https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
 */

// Approach 1: Standard Dijkstra with Array-based Min-Heap
const dijkstraStandard = (V, adj, S) => {
    // Initialize distances array with infinity
    const dist = new Array(V).fill(Infinity);
    dist[S] = 0;
    
    // Track visited vertices
    const visited = new Array(V).fill(false);
    
    // For each vertex
    for (let i = 0; i < V; i++) {
        // Find minimum distance vertex not yet processed
        let minDist = Infinity;
        let minIndex = -1;
        
        for (let v = 0; v < V; v++) {
            if (!visited[v] && dist[v] < minDist) {
                minDist = dist[v];
                minIndex = v;
            }
        }
        
        // Mark the picked vertex as processed
        visited[minIndex] = true;
        
        // Update distance values of adjacent vertices
        for (const [neighbor, weight] of adj[minIndex]) {
            if (!visited[neighbor] && dist[minIndex] + weight < dist[neighbor]) {
                dist[neighbor] = dist[minIndex] + weight;
            }
        }
    }
    
    return dist;
};

// Approach 2: Dijkstra with Priority Queue (Min-Heap implementation)
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(node, distance) {
        this.heap.push({ node, distance });
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].distance <= this.heap[index].distance) break;
            
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    
    bubbleDown(index) {
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && 
                this.heap[leftChild].distance < this.heap[minIndex].distance) {
                minIndex = leftChild;
            }
            
            if (rightChild < this.heap.length && 
                this.heap[rightChild].distance < this.heap[minIndex].distance) {
                minIndex = rightChild;
            }
            
            if (minIndex === index) break;
            
            [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}

const dijkstraPQ = (V, adj, S) => {
    const dist = new Array(V).fill(Infinity);
    dist[S] = 0;
    
    const pq = new MinHeap();
    pq.push(S, 0);
    
    while (!pq.isEmpty()) {
        const { node, distance } = pq.pop();
        
        // Skip if we've already found a better path
        if (distance > dist[node]) continue;
        
        // Check neighbors
        for (const [neighbor, weight] of adj[node]) {
            const newDist = dist[node] + weight;
            
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push(neighbor, newDist);
            }
        }
    }
    
    return dist;
};

// Approach 3: Using Set for unvisited vertices (functional approach)
const dijkstraSet = (V, adj, S) => {
    const dist = new Array(V).fill(Infinity);
    dist[S] = 0;
    
    // Set of unvisited vertices
    const unvisited = new Set(Array.from({ length: V }, (_, i) => i));
    
    while (unvisited.size > 0) {
        // Find vertex with minimum distance
        let current = null;
        let minDist = Infinity;
        
        for (const vertex of unvisited) {
            if (dist[vertex] < minDist) {
                minDist = dist[vertex];
                current = vertex;
            }
        }
        
        // Remove current from unvisited
        unvisited.delete(current);
        
        // If current is unreachable, remaining vertices are also unreachable
        if (dist[current] === Infinity) break;
        
        // Update distances of neighbors
        for (const [neighbor, weight] of adj[current]) {
            if (unvisited.has(neighbor)) {
                const newDist = dist[current] + weight;
                if (newDist < dist[neighbor]) {
                    dist[neighbor] = newDist;
                }
            }
        }
    }
    
    return dist;
};

// Approach 4: Using Map for adjacency list and distances
const dijkstraMap = (V, adj, S) => {
    // Convert adjacency list to Map
    const adjMap = new Map();
    for (let i = 0; i < V; i++) {
        adjMap.set(i, adj[i]);
    }
    
    // Use Map for distances
    const dist = new Map();
    for (let i = 0; i < V; i++) {
        dist.set(i, Infinity);
    }
    dist.set(S, 0);
    
    const visited = new Set();
    
    while (visited.size < V) {
        // Find vertex with minimum distance
        let current = null;
        let minDist = Infinity;
        
        for (let i = 0; i < V; i++) {
            if (!visited.has(i) && dist.get(i) < minDist) {
                minDist = dist.get(i);
                current = i;
            }
        }
        
        // If all remaining vertices are unreachable
        if (current === null) break;
        
        visited.add(current);
        
        // Update distances of neighbors
        const neighbors = adjMap.get(current) || [];
        for (const [neighbor, weight] of neighbors) {
            if (!visited.has(neighbor)) {
                const newDist = dist.get(current) + weight;
                if (newDist < dist.get(neighbor)) {
                    dist.set(neighbor, newDist);
                }
            }
        }
    }
    
    // Convert Map back to array
    return Array.from({ length: V }, (_, i) => dist.get(i));
};

// Approach 5: Dijkstra with Path Tracking
const dijkstraWithPath = (V, adj, S) => {
    const dist = new Array(V).fill(Infinity);
    const parent = new Array(V).fill(-1);
    dist[S] = 0;
    
    const visited = new Array(V).fill(false);
    
    for (let i = 0; i < V; i++) {
        let minDist = Infinity;
        let minIndex = -1;
        
        for (let v = 0; v < V; v++) {
            if (!visited[v] && dist[v] < minDist) {
                minDist = dist[v];
                minIndex = v;
            }
        }
        
        visited[minIndex] = true;
        
        for (const [neighbor, weight] of adj[minIndex]) {
            if (!visited[neighbor] && dist[minIndex] + weight < dist[neighbor]) {
                dist[neighbor] = dist[minIndex] + weight;
                parent[neighbor] = minIndex;
            }
        }
    }
    
    // Reconstruct paths
    const getPath = (target) => {
        const path = [];
        let current = target;
        
        while (current !== -1) {
            path.unshift(current);
            current = parent[current];
        }
        
        return path;
    };
    
    return { distances: dist, getPath };
};

// Approach 6: Generator-based Dijkstra for step-by-step visualization
function* dijkstraGenerator(V, adj, S) {
    const dist = new Array(V).fill(Infinity);
    dist[S] = 0;
    
    const visited = new Array(V).fill(false);
    
    yield { step: 'initialization', distances: [...dist], visited: [...visited] };
    
    for (let i = 0; i < V; i++) {
        let minDist = Infinity;
        let minIndex = -1;
        
        for (let v = 0; v < V; v++) {
            if (!visited[v] && dist[v] < minDist) {
                minDist = dist[v];
                minIndex = v;
            }
        }
        
        visited[minIndex] = true;
        yield { step: `visiting ${minIndex}`, current: minIndex, distances: [...dist], visited: [...visited] };
        
        for (const [neighbor, weight] of adj[minIndex]) {
            if (!visited[neighbor] && dist[minIndex] + weight < dist[neighbor]) {
                dist[neighbor] = dist[minIndex] + weight;
                yield { step: `updating distance to ${neighbor}`, updated: neighbor, distances: [...dist] };
            }
        }
    }
    
    yield { step: 'complete', distances: [...dist] };
    return dist;
};

// Performance comparison utility
const performanceTest = (V, adj, S, iterations = 1000) => {
    const methods = [
        { name: 'Standard Dijkstra', fn: dijkstraStandard },
        { name: 'Priority Queue', fn: dijkstraPQ },
        { name: 'Set-based', fn: dijkstraSet },
        { name: 'Map-based', fn: dijkstraMap }
    ];
    
    console.log(`Performance test with ${V} vertices, source ${S}, ${iterations} iterations:`);
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            fn(V, JSON.parse(JSON.stringify(adj)), S);
        }
        
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
};

// Example usage and demonstrations
if (typeof window === 'undefined') { // Node.js environment
    console.log('=== Dijkstra\'s Algorithm Examples ===\n');
    
    // Test cases
    const testCases = [
        {
            V: 5,
            adj: [
                [[1, 2], [4, 1]],
                [[2, 3], [4, 2]],
                [[3, 6]],
                [[], []],
                [[2, 2], [3, 4]]
            ],
            S: 0,
            description: 'Simple weighted graph'
        },
        {
            V: 4,
            adj: [
                [[1, 4], [2, 1]],
                [[3, 1]],
                [[1, 2], [3, 5]],
                []
            ],
            S: 0,
            description: 'Graph with multiple paths'
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: ${testCase.description}`);
        console.log(`Graph: ${JSON.stringify(testCase.adj)}`);
        console.log(`Source: ${testCase.S}`);
        
        console.log(`Standard Dijkstra: [${dijkstraStandard(testCase.V, JSON.parse(JSON.stringify(testCase.adj)), testCase.S).join(', ')}]`);
        console.log(`Priority Queue: [${dijkstraPQ(testCase.V, JSON.parse(JSON.stringify(testCase.adj)), testCase.S).join(', ')}]`);
        console.log(`Set-based: [${dijkstraSet(testCase.V, JSON.parse(JSON.stringify(testCase.adj)), testCase.S).join(', ')}]`);
        console.log(`Map-based: [${dijkstraMap(testCase.V, JSON.parse(JSON.stringify(testCase.adj)), testCase.S).join(', ')}]`);
        
        // Path tracking example
        const pathResult = dijkstraWithPath(testCase.V, JSON.parse(JSON.stringify(testCase.adj)), testCase.S);
        console.log(`With path tracking to node 3: Distance=${pathResult.distances[3]}, Path=[${pathResult.getPath(3).join(' → ')}]`);
        
        console.log('---');
    });
    
    // Demonstrate generator approach
    console.log('\n=== Dijkstra\'s Generator Visualization ===');
    const generator = dijkstraGenerator(4, [[[1, 1], [2, 4]], [[2, 2], [3, 6]], [[3, 3]], []], 0);
    let step;
    while (!(step = generator.next()).done) {
        console.log(`Step: ${step.value.step}`);
        if (step.value.distances) {
            console.log(`  Distances: [${step.value.distances.join(', ')}]`);
        }
        if (step.value.visited) {
            console.log(`  Visited: [${step.value.visited.map(v => v ? 'T' : 'F').join(', ')}]`);
        }
        if (step.value.current !== undefined) {
            console.log(`  Current: ${step.value.current}`);
        }
        console.log('');
    }
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    // Destructuring
    const result = dijkstraStandard(3, [[[1, 1]], [[2, 2]], []], 0);
    const [sourceDist, ...otherDists] = result;
    console.log('Source distance:', sourceDist);
    console.log('Other distances:', otherDists);
    
    // Arrow functions with different syntaxes
    const shortest = (V, adj, S) => dijkstraStandard(V, adj, S);
    const shortestExplicit = (V, adj, S) => {
        return dijkstraStandard(V, adj, S);
    };
    
    console.log('Arrow function (short):', shortest(3, [[[1, 1]], [[2, 2]], []], 0));
    console.log('Arrow function (explicit):', shortestExplicit(3, [[[1, 1]], [[2, 2]], []], 0));
    
    // Method chaining with array methods
    const graphs = [
        { V: 3, adj: [[[1, 1]], [[2, 2]], []], S: 0 },
        { V: 4, adj: [[[1, 1], [2, 4]], [[2, 2], [3, 6]], [[3, 3]], []], S: 0 }
    ];
    
    const shortestResults = graphs
        .map(graph => ({ ...graph, adj: JSON.parse(JSON.stringify(graph.adj)) }))
        .map(graph => dijkstraStandard(graph.V, graph.adj, graph.S))
        .map(result => `Distances: [${result.join(', ')}]`);
    
    console.log('Chained operations (copy → compute → format):', shortestResults);
    
    // Performance test
    const largeAdj = Array.from({ length: 50 }, (_, i) => 
        [[(i+1) % 50, 1], [(i+2) % 50, 2]]
    );
    performanceTest(50, largeAdj, 0, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        dijkstraStandard,
        dijkstraPQ,
        dijkstraSet,
        dijkstraMap,
        dijkstraWithPath,
        dijkstraGenerator,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Standard Dijkstra: O(V^2) where V is vertices
 * - Priority Queue Dijkstra: O((V + E) log V) where E is edges
 * - Set-based Dijkstra: O(V^2)
 * - Map-based Dijkstra: O(V^2)
 * - Dijkstra with Path Tracking: O(V^2)
 * - Generator Dijkstra: O(V^2)
 * 
 * Space Complexity Analysis:
 * - Standard Dijkstra: O(V) for distances and visited arrays
 * - Priority Queue Dijkstra: O(V) for distances, O(V) for priority queue
 * - Set-based Dijkstra: O(V) for distances, O(V) for Set
 * - Map-based Dijkstra: O(V + E) for Maps
 * - Dijkstra with Path Tracking: O(V) for distances and parent arrays
 * - Generator Dijkstra: O(V) for distances and visited arrays
 * 
 * JavaScript-Specific Notes:
 * - Array destructuring for extracting values
 * - Set.has() is O(1) average case
 * - Map.get() and Map.set() are O(1) average case
 * - Generator functions allow step-by-step visualization
 * - Priority Queue implementation using Min-Heap
 */