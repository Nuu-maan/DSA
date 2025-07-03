"""
Search an element in a linked list
Source: https://www.geeksforgeeks.org/search-an-element-in-a-linked-list-iterative-and-recursive/
"""

from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Optional['Node'] = None

def search_iterative(head, key):
    """Returns True if key is present in the linked list (iterative)."""
    current = head
    while current:
        if current.data == key:
            return True
        current = current.next
    return False

def search_recursive(head, key):
    """Returns True if key is present in the linked list (recursive)."""
    if not head:
        return False
    if head.data == key:
        return True
    return search_recursive(head.next, key)

# Example usage:
if __name__ == "__main__":
    # LinkedList: 14->21->11->30->10
    n1 = Node(14)
    n2 = Node(21)
    n3 = Node(11)
    n4 = Node(30)
    n5 = Node(10)
    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n5
    head = n1
    print(search_iterative(head, 14))  # Output: True
    print(search_iterative(head, 13))  # Output: False
    print(search_recursive(head, 14))  # Output: True
    print(search_recursive(head, 13))  # Output: False 