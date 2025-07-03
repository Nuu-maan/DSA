"""
Remove duplicates from an unsorted linked list
Source: https://www.geeksforgeeks.org/problems/remove-duplicates-from-an-unsorted-linked-list/1
"""
from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Optional['Node'] = None

def remove_duplicates(head: Optional[Node]) -> Optional[Node]:
    """Removes duplicates from an unsorted linked list."""
    seen = set()
    current = head
    prev = None
    while current:
        if current.data in seen:
            if prev is not None:
                prev.next = current.next
        else:
            seen.add(current.data)
            prev = current
        current = current.next
    return head

# Example usage:
if __name__ == "__main__":
    # LinkedList: 5->2->2->4->5->2
    n1 = Node(5)
    n2 = Node(2)
    n3 = Node(2)
    n4 = Node(4)
    n5 = Node(5)
    n6 = Node(2)
    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n5
    n5.next = n6
    head = n1
    result = remove_duplicates(head)
    while result:
        print(result.data, end=' ')
        result = result.next
    print()  # Output: 5 2 4 