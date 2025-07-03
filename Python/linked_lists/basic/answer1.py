"""
Count nodes of linked list
Source: https://www.geeksforgeeks.org/problems/count-nodes-of-linked-list/1
"""

from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Optional['Node'] = None

def count_nodes(head):
    """Returns the number of nodes in the linked list."""
    count = 0
    current = head
    while current:
        count += 1
        current = current.next
    return count

# Example usage:
if __name__ == "__main__":
    # LinkedList: 1->2->3->4
    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n4 = Node(4)
    n1.next = n2
    n2.next = n3
    n3.next = n4
    head = n1
    print(count_nodes(head))  # Output: 4 