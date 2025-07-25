"""
Height of Binary Tree
Source: https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    """
    Finds the maximum depth (height) of a binary tree.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        int - The height of the tree
    """
    if not root:
        return 0
    
    # Recursively find the depth of left and right subtrees
    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)
    
    # Return the maximum depth + 1 (for current node)
    return max(left_depth, right_depth) + 1

def max_depth_iterative(root):
    """
    Iterative approach using level-order traversal.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        int - The height of the tree
    """
    if not root:
        return 0
    
    from collections import deque
    queue = deque([(root, 1)])  # (node, depth)
    max_depth = 0
    
    while queue:
        node, depth = queue.popleft()
        max_depth = max(max_depth, depth)
        
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))
    
    return max_depth

# Example usage:
if __name__ == "__main__":
    # Create tree:
    #     1
    #    / \
    #   2   3
    #  / \
    # 4   5
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    
    print("Recursive:", max_depth(root))  # Output: 3
    print("Iterative:", max_depth_iterative(root))  # Output: 3
    
    # Test with empty tree
    print("Empty tree:", max_depth(None))  # Output: 0
