"""
Recover Binary Search Tree
Source: https://leetcode.com/problems/recover-binary-search-tree/
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def recover_tree(root):
    """
    Recovers a BST where exactly two nodes were swapped.
    Uses O(n) space approach with inorder traversal.
    
    Args:
        root: TreeNode - The root of the corrupted BST
    """
    def inorder(node):
        if not node:
            return []
        return inorder(node.left) + [node] + inorder(node.right)
    
    # Get all nodes in inorder
    nodes = inorder(root)
    
    # Find the two swapped nodes
    first = second = None
    for i in range(len(nodes) - 1):
        if nodes[i].val > nodes[i + 1].val:
            if not first:
                first = nodes[i]
            second = nodes[i + 1]
    
    # Swap the values
    if first and second:
        first.val, second.val = second.val, first.val

def recover_tree_constant_space(root):
    """
    Recovers a BST using Morris Traversal for O(1) space complexity.
    
    Args:
        root: TreeNode - The root of the corrupted BST
    """
    first = second = prev = None
    
    current = root
    while current:
        if not current.left:
            # Process current node
            if prev and prev.val > current.val:
                if not first:
                    first = prev
                second = current
            prev = current
            current = current.right
        else:
            # Find inorder predecessor
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right
            
            if not predecessor.right:
                # Make current the right child of its inorder predecessor
                predecessor.right = current
                current = current.left
            else:
                # Revert the changes made
                predecessor.right = None
                
                # Process current node
                if prev and prev.val > current.val:
                    if not first:
                        first = prev
                    second = current
                prev = current
                current = current.right
    
    # Swap the values
    if first and second:
        first.val, second.val = second.val, first.val

def recover_tree_iterative(root):
    """
    Iterative approach using stack for inorder traversal.
    
    Args:
        root: TreeNode - The root of the corrupted BST
    """
    stack = []
    current = root
    prev = None
    first = second = None
    
    while stack or current:
        # Go to leftmost node
        while current:
            stack.append(current)
            current = current.left
        
        # Process current node
        current = stack.pop()
        
        if prev and prev.val > current.val:
            if not first:
                first = prev
            second = current
        
        prev = current
        current = current.right
    
    # Swap the values
    if first and second:
        first.val, second.val = second.val, first.val

def recover_tree_recursive(root):
    """
    Recursive approach with global variables.
    
    Args:
        root: TreeNode - The root of the corrupted BST
    """
    def inorder_traverse(node):
        nonlocal first, second, prev
        
        if not node:
            return
        
        inorder_traverse(node.left)
        
        # Process current node
        if prev and prev.val > node.val:
            if not first:
                first = prev
            second = node
        prev = node
        
        inorder_traverse(node.right)
    
    first = second = prev = None
    inorder_traverse(root)
    
    # Swap the values
    if first and second:
        first.val, second.val = second.val, first.val

# Helper function to print inorder traversal
def inorder_print(root):
    """Helper function to print inorder traversal for testing."""
    if not root:
        return []
    return inorder_print(root.left) + [root.val] + inorder_print(root.right)

# Example usage:
if __name__ == "__main__":
    # Test case 1: [1,3,null,null,2] -> [3,1,null,null,2]
    #    1              3
    #   /      ->      /
    #  3              1
    #   \              \
    #    2              2
    root1 = TreeNode(1)
    root1.left = TreeNode(3)
    root1.left.right = TreeNode(2)
    
    print("Before recovery:", inorder_print(root1))  # [3, 2, 1]
    recover_tree(root1)
    print("After recovery:", inorder_print(root1))   # [1, 2, 3]
    
    # Test case 2: [3,1,4,null,null,2] -> [2,1,4,null,null,3]
    #      3              2
    #    /   \    ->    /   \
    #   1     4        1     4
    #        /              /
    #       2              3
    root2 = TreeNode(3)
    root2.left = TreeNode(1)
    root2.right = TreeNode(4)
    root2.right.left = TreeNode(2)
    
    print("Before recovery:", inorder_print(root2))  # [1, 2, 3, 4]
    # Note: This tree is actually already correct, but let's swap 3 and 2
    root2.val, root2.right.left.val = root2.right.left.val, root2.val
    print("After swapping 3,2:", inorder_print(root2))  # [1, 3, 2, 4]
    recover_tree_constant_space(root2)
    print("After recovery:", inorder_print(root2))   # [1, 2, 3, 4]
