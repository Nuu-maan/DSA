from typing import Any, List

class QueueUsingStacks:
    """
    Queue implementation using two stacks.
    """
    def __init__(self) -> None:
        self.stack_in: List[Any] = []
        self.stack_out: List[Any] = []

    def enqueue(self, x: Any) -> None:
        self.stack_in.append(x)

    def dequeue(self) -> Any:
        if self.is_empty():
            raise IndexError("Queue is empty")
        if not self.stack_out:
            while self.stack_in:
                self.stack_out.append(self.stack_in.pop())
        return self.stack_out.pop()

    def is_empty(self) -> bool:
        return not self.stack_in and not self.stack_out

if __name__ == "__main__":
    q = QueueUsingStacks()
    q.enqueue(10)
    q.enqueue(20)
    print(q.dequeue())  # Output: 10
    q.enqueue(30)
    print(q.dequeue())  # Output: 20 