/**
 * Stack Implementation using Array
 * 
 * Approach 1: Using Array with push/pop (LIFO)
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is number of elements in stack
 */
class Stack {
    constructor() {
        this.items = [];
    }
    
    // Push element onto the stack
    push(element) {
        this.items.push(element);
    }
    
    // Remove and return the top element
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack underflow");
        }
        return this.items.pop();
    }
    
    // Return the top element without removing it
    top() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }
    
    // Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }
    
    // Return the size of the stack
    size() {
        return this.items.length;
    }
}

/**
 * Approach 2: Using Array with unshift/shift (LIFO)
 * Note: This approach is less efficient for large stacks as unshift is O(n)
 */
class StackUnshift {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.unshift(element);
    }
    
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack underflow");
        }
        return this.items.shift();
    }
    
    top() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[0];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
}

/**
 * Approach 3: Using a fixed-size array (circular buffer)
 * This approach is more memory efficient for known maximum sizes
 */
class FixedSizeStack {
    constructor(maxSize = 1000) {
        this.maxSize = maxSize;
        this.items = new Array(maxSize);
        this.topIndex = -1;
    }
    
    push(element) {
        if (this.topIndex === this.maxSize - 1) {
            throw new Error("Stack overflow");
        }
        this.items[++this.topIndex] = element;
    }
    
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack underflow");
        }
        return this.items[this.topIndex--];
    }
    
    top() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.topIndex];
    }
    
    isEmpty() {
        return this.topIndex === -1;
    }
    
    size() {
        return this.topIndex + 1;
    }
}

// Test cases
function testStackImplementation() {
    // Test Approach 1
    const stack1 = new Stack();
    stack1.push(1);
    stack1.push(2);
    console.assert(stack1.top() === 2, "Test 1 failed: Top should be 2");
    console.assert(stack1.pop() === 2, "Test 2 failed: Pop should return 2");
    console.assert(stack1.isEmpty() === false, "Test 3 failed: Stack should not be empty");
    console.assert(stack1.size() === 1, "Test 4 failed: Size should be 1");
    
    // Test Approach 2
    const stack2 = new StackUnshift();
    stack2.push(1);
    stack2.push(2);
    console.assert(stack2.top() === 2, "Test 5 failed: Top should be 2");
    console.assert(stack2.pop() === 2, "Test 6 failed: Pop should return 2");
    console.assert(stack2.isEmpty() === false, "Test 7 failed: Stack should not be empty");
    
    // Test Approach 3
    const stack3 = new FixedSizeStack(5);
    stack3.push(1);
    stack3.push(2);
    console.assert(stack3.top() === 2, "Test 8 failed: Top should be 2");
    console.assert(stack3.pop() === 2, "Test 9 failed: Pop should return 2");
    console.assert(stack3.isEmpty() === false, "Test 10 failed: Stack should not be empty");
    
    console.log("All stack implementation tests passed!");
}

// Run the tests
try {
    testStackImplementation();
} catch (error) {
    console.error("Test failed:", error);
}
