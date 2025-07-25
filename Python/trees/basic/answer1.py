"""
Binary Tree Inorder Traversal
Source: https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    """
    Performs inorder traversal of a binary tree.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        List[int] - Inorder traversal result
    """
    result = []
    
    def inorder(node):
        if node:
            inorder(node.left)   # Visit left subtree
            result.append(node.val)  # Visit root
            inorder(node.right)  # Visit right subtree
    
    inorder(root)
    return result

def inorder_traversal_iterative(root):
    """
    Iterative approach using stack.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        List[int] - Inorder traversal result
    """
    result = []
    stack = []
    current = root
    
    while stack or current:
        # Go to the leftmost node
        while current:
            stack.append(current)
            current = current.left
        
        # Current is None, pop from stack
        current = stack.pop()
        result.append(current.val)
        
        # Visit right subtree
        current = current.right
    
    return result

# Example usage:
if __name__ == "__main__":
    # Create tree: [1,null,2,3]
    #   1
    #    \
    #     2
    #    /
    #   3
    root = TreeNode(1)
    root.right = TreeNode(2)
    root.right.left = TreeNode(3)
    
    print("Recursive:", inorder_traversal(root))  # Output: [1, 3, 2]
    print("Iterative:", inorder_traversal_iterative(root))  # Output: [1, 3, 2]
