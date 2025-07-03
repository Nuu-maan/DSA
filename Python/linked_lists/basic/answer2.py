"""
Find length of a linked list
Source: https://www.geeksforgeeks.org/find-length-of-a-linked-list-iterative-and-recursive/
"""

from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Optional['Node'] = None

def get_length_iterative(head):
    """Returns the length of the linked list (iterative)."""
    count = 0
    current = head
    while current:
        count += 1
        current = current.next
    return count

def get_length_recursive(head):
    """Returns the length of the linked list (recursive)."""
    if not head:
        return 0
    return 1 + get_length_recursive(head.next)

# Example usage:
if __name__ == "__main__":
    # LinkedList: 1->3->1->2->1
    n1 = Node(1)
    n2 = Node(3)
    n3 = Node(1)
    n4 = Node(2)
    n5 = Node(1)
    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n5
    head = n1
    print(get_length_iterative(head))  # Output: 5
    print(get_length_recursive(head))  # Output: 5 