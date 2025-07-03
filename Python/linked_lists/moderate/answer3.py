"""
Modify contents of Linked List
Source: https://www.geeksforgeeks.org/dsa/modify-contents-linked-list/
"""
from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Optional['Node'] = None

def modify_contents(head: Optional[Node]) -> Optional[Node]:
    if not head or not head.next:
        return head
    # Convert linked list to array
    arr = []
    current = head
    while current:
        arr.append(current.data)
        current = current.next
    n = len(arr)
    # Modify the array as per the problem
    for i in range(n // 2):
        x = arr[i]
        arr[i] = arr[n - i - 1] - x
        arr[n - i - 1] = x
    # Write back to linked list
    current = head
    for val in arr:
        if current is not None:
            current.data = val
            current = current.next
    return head

# Example usage:
if __name__ == "__main__":
    # LinkedList: 10->4->5->3->6
    n1 = Node(10)
    n2 = Node(4)
    n3 = Node(5)
    n4 = Node(3)
    n5 = Node(6)
    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n5
    head = n1
    result = modify_contents(head)
    while result:
        print(result.data, end=' ')
        result = result.next
    print()  # Output: -4 -1 5 4 10 