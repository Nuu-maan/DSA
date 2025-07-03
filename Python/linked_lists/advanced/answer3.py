"""
Kth node from end of linked list
Source: https://www.geeksforgeeks.org/problems/nth-node-from-end-of-linked-list/1
"""
from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Optional['Node'] = None

def kth_from_end(head: Optional[Node], k: int) -> int:
    """Returns the value of the kth node from the end of the linked list, or -1 if not present."""
    first = head
    count = 0
    while first and count < k:
        first = first.next
        count += 1
    if count < k:
        return -1
    second = head
    while first:
        first = first.next
        if second is not None:
            second = second.next
    return second.data if second else -1

# Example usage:
if __name__ == "__main__":
    # LinkedList: 1->2->3->4->5, k = 2
    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n4 = Node(4)
    n5 = Node(5)
    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n5
    head = n1
    print(kth_from_end(head, 2))  # Output: 4
    print(kth_from_end(head, 6))  # Output: -1 