"""
Remove loop in Linked List
Source: https://www.geeksforgeeks.org/problems/remove-loop-in-linked-list/1
"""
from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Optional['Node'] = None

def remove_loop(head: Optional[Node]) -> None:
    """Removes a loop in the linked list if present."""
    slow = fast = head
    # Detect loop using Floyd's cycle-finding algorithm
    while fast is not None and getattr(fast, 'next', None) is not None:
        slow = slow.next if slow is not None else None
        fast = fast.next.next if fast.next is not None else None
        if slow == fast:
            break
    else:
        return  # No loop
    # Find the start of the loop
    slow = head
    prev = None
    while slow != fast:
        prev = fast
        slow = slow.next if slow is not None else None
        fast = fast.next if fast is not None else None
    # Remove the loop
    if prev is not None:
        prev.next = None

# Example usage:
if __name__ == "__main__":
    # LinkedList: 1->3->4, with loop from 4 to 3
    n1 = Node(1)
    n2 = Node(3)
    n3 = Node(4)
    n1.next = n2
    n2.next = n3
    n3.next = n2  # loop
    remove_loop(n1)
    # Print list to verify loop is removed
    current = n1
    count = 0
    while current and count < 10:
        print(current.data, end=' ')
        current = current.next
        count += 1
    print()  # Output: 1 3 4 