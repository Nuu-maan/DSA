"""
Add 1 to a number represented as linked list
Source: https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1
"""
from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Optional['Node'] = None

def reverse(head: Optional[Node]) -> Optional[Node]:
    prev = None
    current = head
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    return prev

def add_one(head: Optional[Node]) -> Optional[Node]:
    head = reverse(head)
    current = head
    carry = 1
    while current:
        total = current.data + carry
        current.data = total % 10
        carry = total // 10
        if not current.next and carry:
            current.next = Node(0)
        current = current.next
        if carry == 0:
            break
    return reverse(head)

# Example usage:
if __name__ == "__main__":
    # LinkedList: 4->5->6
    n1 = Node(4)
    n2 = Node(5)
    n3 = Node(6)
    n1.next = n2
    n2.next = n3
    head = n1
    result = add_one(head)
    while result:
        print(result.data, end=' ')
        result = result.next
    print()  # Output: 4 5 7
    # LinkedList: 9->9->9
    m1 = Node(9)
    m2 = Node(9)
    m3 = Node(9)
    m1.next = m2
    m2.next = m3
    head2 = m1
    result2 = add_one(head2)
    while result2:
        print(result2.data, end=' ')
        result2 = result2.next
    print()  # Output: 1 0 0 0 