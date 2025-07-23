from typing import List, Tuple
from dataclasses import dataclass, field


@dataclass
class MinStack:
    """A stack that supports constant time push, pop, top, and minimum element retrieval.
    
    Uses an auxiliary stack to track minimum values at each level.
    Each element in min_stack is a tuple of (value, count) where count tracks
    how many times this minimum appears in the main stack.
    
    Attributes:
        stack (List[int]): Main stack storing all elements
        min_stack (List[Tuple[int, int]]): Auxiliary stack storing (min_value, count) pairs
    """
    
    stack: List[int] = field(default_factory=list)
    min_stack: List[Tuple[int, int]] = field(default_factory=list)
    
    def push(self, val: int) -> None:
        """Push an element onto the stack.
        
        Updates min_stack if the new value is less than or equal to current minimum.
        
        Args:
            val (int): Value to push onto stack
        """
        self.stack.append(val)
        
        # If min_stack is empty or val is new minimum
        if not self.min_stack or val < self.min_stack[-1][0]:
            self.min_stack.append((val, 1))
        # If val equals current minimum, increment its count
        elif val == self.min_stack[-1][0]:
            value, count = self.min_stack[-1]
            self.min_stack[-1] = (value, count + 1)
    
    def pop(self) -> None:
        """Remove the element on top of the stack.
        
        Updates min_stack if the popped value was a minimum.
        """
        if not self.stack:
            return
            
        val = self.stack.pop()
        
        # If popped value is current minimum
        if val == self.min_stack[-1][0]:
            # If this was the last occurrence of this minimum
            if self.min_stack[-1][1] == 1:
                self.min_stack.pop()
            # Otherwise decrement its count
            else:
                value, count = self.min_stack[-1]
                self.min_stack[-1] = (value, count - 1)
    
    def top(self) -> int:
        """Get the top element of the stack.
        
        Returns:
            int: The top element
        """
        if self.stack:
            return self.stack[-1]
        return 0  # Per problem constraints, will not be called on empty stack
    
    def getMin(self) -> int:
        """Get the minimum element in the stack.
        
        Returns:
            int: The minimum element
        """
        if self.min_stack:
            return self.min_stack[-1][0]
        return 0  # Per problem constraints, will not be called on empty stack


# Example usage:
def test_min_stack() -> None:
    """Test the MinStack implementation with the example from problem description."""
    min_stack = MinStack()
    min_stack.push(-2)
    min_stack.push(0)
    min_stack.push(-3)
    print(min_stack.getMin())  # return -3
    min_stack.pop()
    print(min_stack.top())     # return 0
    print(min_stack.getMin())  # return -2


if __name__ == "__main__":
    test_min_stack() 