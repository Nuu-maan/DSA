/**
 * Minimum Spanning Tree (Kruskal's Algorithm)
 * Source: https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/
 */

// Approach 1: Standard Kruskal's Algorithm with Union-Find
const kruskalStandard = (V, adj) => {
    // Convert adjacency list to edge list
    const edges = [];
    for (let i = 0; i < V; i++) {
        for (const [neighbor, weight] of adj[i]) {
            if (i < neighbor) { // Avoid duplicate edges in undirected graph
                edges.push([weight, i, neighbor]);
            }
        }
    }
    
    // Sort edges by weight
    edges.sort((a, b) => a[0] - b[0]);
    
    // Union-Find data structure
    class UnionFind {
        constructor(size) {
            this.parent = Array.from({ length: size }, (_, i) => i);
            this.rank = new Array(size).fill(0);
        }
        
        find(x) {
            if (this.parent[x] !== x) {
                this.parent[x] = this.find(this.parent[x]); // Path compression
            }
            return this.parent[x];
        }
        
        union(x, y) {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX === rootY) return false; // Already in same set
            
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
    const mst = [];
    let mstWeight = 0;
    
    // Process edges in sorted order
    for (const [weight, u, v] of edges) {
        if (uf.union(u, v)) {
            mst.push([u, v, weight]);
            mstWeight += weight;
            
            // MST is complete when we have V-1 edges
            if (mst.length === V - 1) break;
        }
    }
    
    return { edges: mst, weight: mstWeight };
};

// Approach 2: Kruskal with Set-based Union-Find
const kruskalSet = (V, adj) => {
    // Convert adjacency list to edge list
    const edges = [];
    for (let i = 0; i < V; i++) {
        for (const [neighbor, weight] of adj[i]) {
            if (i < neighbor) { // Avoid duplicate edges in undirected graph
                edges.push([weight, i, neighbor]);
            }
        }
    }
    
    // Sort edges by weight
    edges.sort((a, b) => a[0] - b[0]);
    
    // Set-based Union-Find
    class SetUnionFind {
        constructor(size) {
            this.parent = new Map();
            this.rank = new Map();
            for (let i = 0; i < size; i++) {
                this.parent.set(i, i);
                this.rank.set(i, 0);
            }
        }
        
        find(x) {
            if (this.parent.get(x) !== x) {
                this.parent.set(x, this.find(this.parent.get(x))); // Path compression
            }
            return this.parent.get(x);
        }
        
        union(x, y) {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX === rootY) return false; // Already in same set
            
            // Union by rank
            const rankX = this.rank.get(rootX);
            const rankY = this.rank.get(rootY);
            
            if (rankX < rankY) {
                this.parent.set(rootX, rootY);
            } else if (rankX > rankY) {
                this.parent.set(rootY, rootX);
            } else {
                this.parent.set(rootY, rootX);
                this.rank.set(rootX, rankX + 1);
            }
            return true;
        }
    }
    
    const uf = new SetUnionFind(V);
    const mst = [];
    let mstWeight = 0;
    
    // Process edges in sorted order
    for (const [weight, u, v] of edges) {
        if (uf.union(u, v)) {
            mst.push([u, v, weight]);
            mstWeight += weight;
            
            // MST is complete when we have V-1 edges
            if (mst.length === V - 1) break;
        }
    }
    
    return { edges: mst, weight: mstWeight };
};

// Approach 3: Kruskal with Functional Approach
const kruskalFunctional = (V, adj) => {
    // Convert adjacency list to edge list using functional approach
    const edges = adj
        .flatMap((neighbors, i) => 
            neighbors
                .filter(([neighbor]) => i < neighbor) // Avoid duplicate edges
                .map(([neighbor, weight]) => [weight, i, neighbor])
        )
        .sort((a, b) => a[0] - b[0]);
    
    // Functional Union-Find
    const createUnionFind = (size) => {
        let parent = Array.from({ length: size }, (_, i) => i);
        let rank = new Array(size).fill(0);
        
        const find = (x) => {
            if (parent[x] !== x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        };
        
        const union = (x, y) => {
            const rootX = find(x);
            const rootY = find(y);
            
            if (rootX === rootY) return false; // Already in same set
            
            // Union by rank
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            return true;
        };
        
        return { find, union };
    };
    
    const uf = createUnionFind(V);
    
    // Process edges using reduce
    const result = edges.reduce((acc, [weight, u, v]) => {
        if (acc.mst.length < V - 1 && uf.union(u, v)) {
            acc.mst.push([u, v, weight]);
            acc.weight += weight;
        }
        return acc;
    }, { mst: [], weight: 0 });
    
    return result;
};

// Approach 4: Kruskal with Priority Queue
const kruskalPQ = (V, adj) => {
    // Priority Queue implementation
    class PriorityQueue {
        constructor() {
            this.heap = [];
        }
        
        push(weight, u, v) {
            this.heap.push({ weight, u, v });
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
                if (this.heap[parentIndex].weight <= this.heap[index].weight) break;
                
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
                    this.heap[leftChild].weight < this.heap[minIndex].weight) {
                    minIndex = leftChild;
                }
                
                if (rightChild < this.heap.length && 
                    this.heap[rightChild].weight < this.heap[minIndex].weight) {
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
    
    // Union-Find data structure
    class UnionFind {
        constructor(size) {
            this.parent = Array.from({ length: size }, (_, i) => i);
            this.rank = new Array(size).fill(0);
        }
        
        find(x) {
            if (this.parent[x] !== x) {
                this.parent[x] = this.find(this.parent[x]); // Path compression
            }
            return this.parent[x];
        }
        
        union(x, y) {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX === rootY) return false; // Already in same set
            
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
    
    // Add all edges to priority queue
    const pq = new PriorityQueue();
    for (let i = 0; i < V; i++) {
        for (const [neighbor, weight] of adj[i]) {
            if (i < neighbor) { // Avoid duplicate edges
                pq.push(weight, i, neighbor);
            }
        }
    }
    
    const uf = new UnionFind(V);
    const mst = [];
    let mstWeight = 0;
    
    // Process edges from priority queue
    while (!pq.isEmpty() && mst.length < V - 1) {
        const { weight, u, v } = pq.pop();
        
        if (uf.union(u, v)) {
            mst.push([u, v, weight]);
            mstWeight += weight;
        }
    }
    
    return { edges: mst, weight: mstWeight };
};

// Approach 5: Kruskal with Path Tracking
const kruskalWithPath = (V, adj) => {
    // Convert adjacency list to edge list
    const edges = [];
    for (let i = 0; i < V; i++) {
        for (const [neighbor, weight] of adj[i]) {
            if (i < neighbor) { // Avoid duplicate edges in undirected graph
                edges.push([weight, i, neighbor]);
            }
        }
    }
    
    // Sort edges by weight
    edges.sort((a, b) => a[0] - b[0]);
    
    // Union-Find with path tracking
    class UnionFindWithPath {
        constructor(size) {
            this.parent = Array.from({ length: size }, (_, i) => i);
            this.rank = new Array(size).fill(0);
            this.paths = [];
        }
        
        find(x) {
            if (this.parent[x] !== x) {
                this.parent[x] = this.find(this.parent[x]); // Path compression
            }
            return this.parent[x];
        }
        
        union(x, y, weight) {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX === rootY) return false; // Already in same set
            
            // Union by rank
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            
            this.paths.push({ x, y, weight, rootX, rootY });
            return true;
        }
    }
    
    const uf = new UnionFindWithPath(V);
    const mst = [];
    let mstWeight = 0;
    
    // Process edges in sorted order
    for (const [weight, u, v] of edges) {
        if (uf.union(u, v, weight)) {
            mst.push([u, v, weight]);
            mstWeight += weight;
            
            // MST is complete when we have V-1 edges
            if (mst.length === V - 1) break;
        }
    }
    
    return { edges: mst, weight: mstWeight, paths: uf.paths };
};

// Approach 6: Generator-based Kruskal for step-by-step visualization
function* kruskalGenerator(V, adj) {
    // Convert adjacency list to edge list
    const edges = [];
    for (let i = 0; i < V; i++) {
        for (const [neighbor, weight] of adj[i]) {
            if (i < neighbor) { // Avoid duplicate edges in undirected graph
                edges.push([weight, i, neighbor]);
            }
        }
    }
    
    yield { step: 'created edge list', edges: [...edges] };
    
    // Sort edges by weight
    edges.sort((a, b) => a[0] - b[0]);
    yield { step: 'sorted edges', edges: [...edges] };
    
    // Union-Find data structure
    class UnionFind {
        constructor(size) {
            this.parent = Array.from({ length: size }, (_, i) => i);
            this.rank = new Array(size).fill(0);
        }
        
        find(x) {
            if (this.parent[x] !== x) {
                this.parent[x] = this.find(this.parent[x]); // Path compression
            }
            return this.parent[x];
        }
        
        union(x, y) {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX === rootY) return false; // Already in same set
            
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
    const mst = [];
    let mstWeight = 0;
    
    yield { step: 'initialized Union-Find', mst: [...mst], weight: mstWeight };
    
    // Process edges in sorted order
    for (const [weight, u, v] of edges) {
        yield { step: `processing edge ${u}-${v} with weight ${weight}`, mst: [...mst], weight: mstWeight };
        
        if (uf.union(u, v)) {
            mst.push([u, v, weight]);
            mstWeight += weight;
            yield { step: `added edge ${u}-${v} to MST`, mst: [...mst], weight: mstWeight };
            
            // MST is complete when we have V-1 edges
            if (mst.length === V - 1) break;
        } else {
            yield { step: `skipped edge ${u}-${v} (would create cycle)`, mst: [...mst], weight: mstWeight };
        }
    }
    
    yield { step: 'complete', mst: [...mst], weight: mstWeight };
    return { edges: mst, weight: mstWeight };
};

// Performance comparison utility
const performanceTest = (V, adj, iterations = 1000) => {
    const methods = [
        { name: 'Standard Kruskal', fn: kruskalStandard },
        { name: 'Set-based Kruskal', fn: kruskalSet },
        { name: 'Functional Kruskal', fn: kruskalFunctional },
        { name: 'Priority Queue Kruskal', fn: kruskalPQ }
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
    console.log('=== Minimum Spanning Tree (Kruskal\'s Algorithm) Examples ===\n');
    
    // Test cases
    const testCases = [
        {
            V: 4,
            adj: [
                [[1, 1], [2, 3]],
                [[0, 1], [2, 1], [3, 4]],
                [[0, 3], [1, 1], [3, 2]],
                [[1, 4], [2, 2]]
            ],
            description: 'Simple weighted undirected graph'
        },
        {
            V: 5,
            adj: [
                [[1, 2], [2, 1]],
                [[0, 2], [2, 3], [3, 1]],
                [[0, 1], [1, 3], [4, 2]],
                [[1, 1], [4, 4]],
                [[2, 2], [3, 4]]
            ],
            description: 'Weighted undirected graph with 5 vertices'
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: ${testCase.description}`);
        console.log(`Graph: ${JSON.stringify(testCase.adj)}`);
        
        console.log(`Standard Kruskal: Weight=${kruskalStandard(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).weight}, Edges=[${kruskalStandard(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).edges.map(e => `${e[0]}-${e[1]}(${e[2]})`).join(', ')}]`);
        console.log(`Set-based Kruskal: Weight=${kruskalSet(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).weight}, Edges=[${kruskalSet(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).edges.map(e => `${e[0]}-${e[1]}(${e[2]})`).join(', ')}]`);
        console.log(`Functional Kruskal: Weight=${kruskalFunctional(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).weight}, Edges=[${kruskalFunctional(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).edges.map(e => `${e[0]}-${e[1]}(${e[2]})`).join(', ')}]`);
        console.log(`Priority Queue Kruskal: Weight=${kruskalPQ(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).weight}, Edges=[${kruskalPQ(testCase.V, JSON.parse(JSON.stringify(testCase.adj))).edges.map(e => `${e[0]}-${e[1]}(${e[2]})`).join(', ')}]`);
        
        // Path tracking example
        const pathResult = kruskalWithPath(testCase.V, JSON.parse(JSON.stringify(testCase.adj)));
        console.log(`With path tracking: Weight=${pathResult.weight}, Edges=[${pathResult.edges.map(e => `${e[0]}-${e[1]}(${e[2]})`).join(', ')}], Paths=[${pathResult.paths.map(p => `${p.x}-${p.y}(${p.weight})`).join(', ')}]`);
        
        console.log('---');
    });
    
    // Demonstrate generator approach
    console.log('\n=== Kruskal\'s Generator Visualization ===');
    const generator = kruskalGenerator(4, [[[1, 1], [2, 3]], [[0, 1], [2, 1], [3, 4]], [[0, 3], [1, 1], [3, 2]], [[1, 4], [2, 2]]]);
    let step;
    while (!(step = generator.next()).done) {
        console.log(`Step: ${step.value.step}`);
        if (step.value.edges) {
            console.log(`  Edges: [${step.value.edges.map(e => `${e[0]}-${e[1]}(${e[2]})`).join(', ')}]`);
        }
        if (step.value.mst) {
            console.log(`  MST so far: [${step.value.mst.map(e => `${e[0]}-${e[1]}(${e[2]})`).join(', ')}]`);
        }
        if (step.value.weight !== undefined) {
            console.log(`  Total weight: ${step.value.weight}`);
        }
        console.log('');
    }
    
    // Demonstrate ES6+ features
    console.log('\n=== ES6+ Features Showcase ===');
    
    // Destructuring
    const result = kruskalStandard(3, [[[1, 1]], [[0, 1], [2, 2]], [[1, 2]]]);
    const { edges: mstEdges, weight: mstWeight } = result;
    console.log('MST edges:', mstEdges);
    console.log('MST weight:', mstWeight);
    
    // Arrow functions with different syntaxes
    const findMST = (V, adj) => kruskalStandard(V, adj);
    const findMSTExplicit = (V, adj) => {
        return kruskalStandard(V, adj);
    };
    
    console.log('Arrow function (short):', findMST(3, [[[1, 1]], [[0, 1], [2, 2]], [[1, 2]]]));
    console.log('Arrow function (explicit):', findMSTExplicit(3, [[[1, 1]], [[0, 1], [2, 2]], [[1, 2]]]));
    
    // Method chaining with array methods
    const graphs = [
        { V: 3, adj: [[[1, 1]], [[0, 1], [2, 2]], [[1, 2]]] },
        { V: 4, adj: [[[1, 1], [2, 3]], [[0, 1], [2, 1], [3, 4]], [[0, 3], [1, 1], [3, 2]], [[1, 4], [2, 2]]] }
    ];
    
    const mstResults = graphs
        .map(graph => ({ ...graph, adj: JSON.parse(JSON.stringify(graph.adj)) }))
        .map(graph => kruskalStandard(graph.V, graph.adj))
        .map(result => `Weight: ${result.weight}, Edges: [${result.edges.map(e => `${e[0]}-${e[1]}(${e[2]})`).join(', ')}]`);
    
    console.log('Chained operations (copy → compute → format):', mstResults);
    
    // Performance test
    const largeAdj = Array.from({ length: 20 }, (_, i) => 
        [[(i+1) % 20, Math.floor(Math.random() * 10) + 1]]
    );
    performanceTest(20, largeAdj, 100);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        kruskalStandard,
        kruskalSet,
        kruskalFunctional,
        kruskalPQ,
        kruskalWithPath,
        kruskalGenerator,
        performanceTest
    };
}

/**
 * Time Complexity Analysis:
 * - Standard Kruskal: O(E log E) where E is edges (sorting dominates)
 * - Set-based Kruskal: O(E log E)
 * - Functional Kruskal: O(E log E)
 * - Priority Queue Kruskal: O(E log E)
 * - Kruskal with Path Tracking: O(E log E)
 * - Generator Kruskal: O(E log E)
 * 
 * Space Complexity Analysis:
 * - Standard Kruskal: O(V + E) for Union-Find and edge storage
 * - Set-based Kruskal: O(V + E) for Union-Find and edge storage
 * - Functional Kruskal: O(V + E) for Union-Find and edge storage
 * - Priority Queue Kruskal: O(V + E) for Union-Find and priority queue
 * - Kruskal with Path Tracking: O(V + E) for Union-Find, edge storage, and path tracking
 * - Generator Kruskal: O(V + E) for Union-Find and edge storage
 * 
 * JavaScript-Specific Notes:
 * - Array destructuring for extracting values
 * - Set.has() is O(1) average case
 * - Map.get() and Map.set() are O(1) average case
 * - Generator functions allow step-by-step visualization
 * - Priority Queue implementation using Min-Heap
 * - Functional approach with array methods (map, filter, reduce, flatMap)
 */