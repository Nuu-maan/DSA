"""
Check if Linked List is Palindrome
Source: https://www.geeksforgeeks.org/problems/check-if-linked-list-is-pallindrome/1
"""
from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Optional['Node'] = None

def is_palindrome(head: Optional[Node]) -> bool:
    """Checks if the linked list is a palindrome."""
    # Find the middle of the linked list
    slow = fast = head
    stack = []
    while fast is not None and getattr(fast, 'next', None) is not None:
        if slow is not None:
            stack.append(slow.data)
            slow = slow.next
        fast = fast.next.next if fast.next is not None else None
    # If odd number of elements, skip the middle
    if fast is not None:
        slow = slow.next if slow is not None else None
    # Compare the second half with the stack
    while slow is not None:
        if stack.pop() != slow.data:
            return False
        slow = slow.next
    return True

# Example usage:
if __name__ == "__main__":
    # LinkedList: 1->2->1
    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(1)
    n1.next = n2
    n2.next = n3
    head = n1
    print(is_palindrome(head))  # Output: True
    # LinkedList: 1->2->3
    m1 = Node(1)
    m2 = Node(2)
    m3 = Node(3)
    m1.next = m2
    m2.next = m3
    head2 = m1
    print(is_palindrome(head2))  # Output: False 