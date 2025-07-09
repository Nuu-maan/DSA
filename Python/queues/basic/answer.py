from typing import List, Any

class Queue:
    """
    Queue implementation using an array (list) with fixed capacity.
    """
    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.arr: List[Any] = [None] * capacity
        self.front_idx = 0
        self.rear_idx = 0
        self.size = 0

    def enqueue(self, x: Any) -> None:
        """Add element x to the end of the queue."""
        if self.size == self.capacity:
            raise OverflowError("Queue is full")
        self.arr[self.rear_idx] = x
        self.rear_idx = (self.rear_idx + 1) % self.capacity
        self.size += 1

    def dequeue(self) -> Any:
        """Remove and return the element from the front of the queue."""
        if self.is_empty():
            raise IndexError("Queue is empty")
        x = self.arr[self.front_idx]
        self.front_idx = (self.front_idx + 1) % self.capacity
        self.size -= 1
        return x

    def front(self) -> Any:
        """Return the element at the front without removing it."""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.arr[self.front_idx]

    def is_empty(self) -> bool:
        """Return True if the queue is empty, else False."""
        return self.size == 0

if __name__ == "__main__":
    q = Queue(5)
    q.enqueue(10)
    q.enqueue(20)
    q.enqueue(30)
    print(q.dequeue())  # Output: 10
    print(q.front())    # Output: 20 