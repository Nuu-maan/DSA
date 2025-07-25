"""
Validate Binary Search Tree
Source: https://leetcode.com/problems/validate-binary-search-tree/
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root):
    """
    Determines if a binary tree is a valid binary search tree.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        bool - True if valid BST, False otherwise
    """
    def validate(node, min_val, max_val):
        if not node:
            return True
        
        if node.val <= min_val or node.val >= max_val:
            return False
        
        return (validate(node.left, min_val, node.val) and 
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))

def is_valid_bst_inorder(root):
    """
    Alternative approach using inorder traversal.
    A valid BST should have strictly increasing inorder traversal.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        bool - True if valid BST, False otherwise
    """
    def inorder(node):
        if not node:
            return []
        return inorder(node.left) + [node.val] + inorder(node.right)
    
    values = inorder(root)
    for i in range(1, len(values)):
        if values[i] <= values[i-1]:
            return False
    return True

def is_valid_bst_iterative(root):
    """
    Iterative approach using stack and bounds.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        bool - True if valid BST, False otherwise
    """
    if not root:
        return True
    
    stack = [(root, float('-inf'), float('inf'))]
    
    while stack:
        node, min_val, max_val = stack.pop()
        
        if node.val <= min_val or node.val >= max_val:
            return False
        
        if node.right:
            stack.append((node.right, node.val, max_val))
        if node.left:
            stack.append((node.left, min_val, node.val))
    
    return True

# Example usage:
if __name__ == "__main__":
    # Test case 1: Valid BST [2,1,3]
    #     2
    #    / \
    #   1   3
    root1 = TreeNode(2)
    root1.left = TreeNode(1)
    root1.right = TreeNode(3)
    print("Test 1 (Valid):", is_valid_bst(root1))  # Output: True
    
    # Test case 2: Invalid BST [5,1,4,null,null,3,6]
    #     5
    #    / \
    #   1   4
    #      / \
    #     3   6
    root2 = TreeNode(5)
    root2.left = TreeNode(1)
    root2.right = TreeNode(4)
    root2.right.left = TreeNode(3)
    root2.right.right = TreeNode(6)
    print("Test 2 (Invalid):", is_valid_bst(root2))  # Output: False
