/**
 * Maximum Frequency Stack
 * 
 * Approach 1: Using Stack of Stacks
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is the number of elements
 */
class FreqStack {
    constructor() {
        this.freq = new Map();         // Map of element to its frequency
        this.group = new Map();        // Map of frequency to stack of elements
        this.maxFreq = 0;              // Track current maximum frequency
    }

    /**
     * Push element x onto stack
     * @param {number} x
     * @return {void}
     */
    push(x) {
        // Update frequency
        const freq = (this.freq.get(x) || 0) + 1;
        this.freq.set(x, freq);
        
        // Update max frequency
        this.maxFreq = Math.max(this.maxFreq, freq);
        
        // Add to group
        if (!this.group.has(freq)) {
            this.group.set(freq, []);
        }
        this.group.get(freq).push(x);
    }

    /**
     * Pop the most frequent element from the stack
     * @return {number}
     */
    pop() {
        // Get the most frequent element
        const x = this.group.get(this.maxFreq).pop();
        
        // Update frequency
        this.freq.set(x, this.freq.get(x) - 1);
        
        // If the group is now empty, decrement maxFreq
        if (this.group.get(this.maxFreq).length === 0) {
            this.group.delete(this.maxFreq);
            this.maxFreq--;
        }
        
        return x;
    }
}

/**
 * Approach 2: Using Priority Queue (Max Heap)
 * Time Complexity: O(log n) for push, O(1) for pop (amortized)
 * Space Complexity: O(n)
 */
class FreqStackWithHeap {
    constructor() {
        this.heap = [];
        this.freq = new Map();
        this.pushOrder = 0;  // To break ties in heap
    }
    
    /**
     * Push element x onto stack
     * @param {number} x
     * @return {void}
     */
    push(x) {
        // Update frequency
        const freq = (this.freq.get(x) || 0) + 1;
        this.freq.set(x, freq);
        
        // Add to max heap with frequency and push order
        this.heap.push({ val: x, freq, order: this.pushOrder++ });
        this.heap.sort((a, b) => {
            if (a.freq !== b.freq) return b.freq - a.freq;
            return b.order - a.order;
        });
    }
    
    /**
     * Pop the most frequent element from the stack
     * @return {number}
     */
    pop() {
        if (this.heap.length === 0) return -1;
        
        const { val } = this.heap.shift();
        
        // Update frequency
        const freq = this.freq.get(val) - 1;
        if (freq === 0) {
            this.freq.delete(val);
        } else {
            this.freq.set(val, freq);
        }
        
        return val;
    }
}

/**
 * Approach 3: Using Map of Stacks with Frequency
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n)
 */
class FreqStackOptimized {
    constructor() {
        this.freq = new Map();         // element -> frequency
        this.group = new Map();        // frequency -> stack of elements
        this.maxFreq = 0;              // current maximum frequency
    }
    
    /**
     * Push element x onto stack
     * @param {number} x
     * @return {void}
     */
    push(x) {
        const freq = (this.freq.get(x) || 0) + 1;
        this.freq.set(x, freq);
        
        if (!this.group.has(freq)) {
            this.group.set(freq, []);
        }
        this.group.get(freq).push(x);
        
        this.maxFreq = Math.max(this.maxFreq, freq);
    }
    
    /**
     * Pop the most frequent element from the stack
     * @return {number}
     */
    pop() {
        const x = this.group.get(this.maxFreq).pop();
        
        // Update frequency
        this.freq.set(x, this.freq.get(x) - 1);
        
        // If the group is now empty, decrement maxFreq
        if (this.group.get(this.maxFreq).length === 0) {
            this.maxFreq--;
        }
        
        return x;
    }
}

// Test cases
function testFreqStack() {
    console.log("Testing FreqStack (Stack of Stacks):");
    const fs1 = new FreqStack();
    fs1.push(5); fs1.push(7); fs1.push(5); fs1.push(7); fs1.push(4); fs1.push(5);
    
    console.assert(fs1.pop() === 5, "First pop should be 5 (most frequent, most recent)");
    console.assert(fs1.pop() === 7, "Second pop should be 7 (tie in frequency, most recent)");
    console.assert(fs1.pop() === 5, "Third pop should be 5");
    console.assert(fs1.pop() === 4, "Fourth pop should be 4");
    
    console.log("Testing FreqStackWithHeap (Priority Queue):");
    const fs2 = new FreqStackWithHeap();
    fs2.push(5); fs2.push(7); fs2.push(5); fs2.push(7); fs2.push(4); fs2.push(5);
    
    console.assert(fs2.pop() === 5, "First pop should be 5 (most frequent, most recent)");
    console.assert(fs2.pop() === 7, "Second pop should be 7 (tie in frequency, most recent)");
    console.assert(fs2.pop() === 5, "Third pop should be 5");
    console.assert(fs2.pop() === 4, "Fourth pop should be 4");
    
    console.log("Testing FreqStackOptimized (Optimized Map of Stacks):");
    const fs3 = new FreqStackOptimized();
    fs3.push(5); fs3.push(7); fs3.push(5); fs3.push(7); fs3.push(4); fs3.push(5);
    
    console.assert(fs3.pop() === 5, "First pop should be 5 (most frequent, most recent)");
    console.assert(fs3.pop() === 7, "Second pop should be 7 (tie in frequency, most recent)");
    console.assert(fs3.pop() === 5, "Third pop should be 5");
    console.assert(fs3.pop() === 4, "Fourth pop should be 4");
    
    console.log("All maximum frequency stack tests passed!");
}

// Run the tests
try {
    testFreqStack();
} catch (error) {
    console.error("Test failed:", error);
}
