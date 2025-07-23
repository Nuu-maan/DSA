from typing import Optional, List
from dataclasses import dataclass


class StackFullError(Exception):
    """Exception raised when attempting to push to a full stack."""
    pass


class StackEmptyError(Exception):
    """Exception raised when attempting to access elements from an empty stack."""
    pass


@dataclass
class Stack:
    """A fixed-size stack implementation with type hints and error handling.
    
    Attributes:
        capacity (int): Maximum number of elements the stack can hold
        items (List[int]): List storing the stack elements
        top (int): Index of the top element (-1 if stack is empty)
    """
    
    capacity: int
    items: List[int]
    top: int

    def __init__(self, capacity: int = 1000) -> None:
        """Initialize an empty stack with given capacity.
        
        Args:
            capacity (int, optional): Maximum size of stack. Defaults to 1000.
        """
        self.capacity = capacity
        self.items = [0] * capacity  # Pre-allocate list for better performance
        self.top = -1

    def push(self, x: int) -> None:
        """Push an element onto the stack.
        
        Args:
            x (int): Element to push
            
        Raises:
            StackFullError: If stack is at capacity
        """
        if self.top >= self.capacity - 1:
            raise StackFullError("Stack is full")
        self.top += 1
        self.items[self.top] = x

    def pop(self) -> int:
        """Remove and return the top element from the stack.
        
        Returns:
            int: The top element that was removed
            
        Raises:
            StackEmptyError: If stack is empty
        """
        if self.is_empty():
            raise StackEmptyError("Stack is empty")
        value = self.items[self.top]
        self.top -= 1
        return value

    def peek(self) -> int:
        """Return the top element without removing it.
        
        Returns:
            int: The top element
            
        Raises:
            StackEmptyError: If stack is empty
        """
        if self.is_empty():
            raise StackEmptyError("Stack is empty")
        return self.items[self.top]

    def is_empty(self) -> bool:
        """Check if the stack is empty.
        
        Returns:
            bool: True if stack is empty, False otherwise
        """
        return self.top == -1

    def size(self) -> int:
        """Get the current number of elements in the stack.
        
        Returns:
            int: Number of elements in stack
        """
        return self.top + 1


def process_operations() -> None:
    """Process stack operations from standard input and print results."""
    n = int(input().strip())
    stack = Stack()

    for _ in range(n):
        operation = input().strip().split()
        cmd = operation[0]

        try:
            if cmd == "push":
                x = int(operation[1])
                stack.push(x)
                print("null")
            elif cmd == "pop":
                print(stack.pop())
            elif cmd == "peek":
                print(stack.peek())
            elif cmd == "is_empty":
                print(str(stack.is_empty()).lower())
            elif cmd == "size":
                print(stack.size())
        except StackFullError:
            print("Stack is full")
        except StackEmptyError:
            print("Stack is empty")


if __name__ == "__main__":
    process_operations() 