from typing import List, Any

class CircularQueue:
    """
    Circular Queue implementation using an array (list) with fixed capacity.
    """
    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.arr: List[Any] = [None] * capacity
        self.front_idx = 0
        self.rear_idx = 0
        self.size = 0

    def enqueue(self, x: Any) -> None:
        if self.is_full():
            raise OverflowError("Queue is full")
        self.arr[self.rear_idx] = x
        self.rear_idx = (self.rear_idx + 1) % self.capacity
        self.size += 1

    def dequeue(self) -> Any:
        if self.is_empty():
            raise IndexError("Queue is empty")
        x = self.arr[self.front_idx]
        self.front_idx = (self.front_idx + 1) % self.capacity
        self.size -= 1
        return x

    def front(self) -> Any:
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.arr[self.front_idx]

    def is_empty(self) -> bool:
        return self.size == 0

    def is_full(self) -> bool:
        return self.size == self.capacity

if __name__ == "__main__":
    cq = CircularQueue(3)
    cq.enqueue(1)
    cq.enqueue(2)
    cq.enqueue(3)
    print(cq.is_full())  # Output: True
    print(cq.dequeue())  # Output: 1
    cq.enqueue(4)
    print(cq.front())    # Output: 2 