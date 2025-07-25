"""
Level Order Traversal
Source: https://www.geeksforgeeks.org/level-order-tree-traversal/
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    """
    Performs level order traversal of a binary tree.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        List[List[int]] - Level order traversal result
    """
    if not root:
        return []
    
    from collections import deque
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result

def level_order_flat(root):
    """
    Returns a flat list of values in level order.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        List[int] - Flat level order traversal result
    """
    if not root:
        return []
    
    from collections import deque
    result = []
    queue = deque([root])
    
    while queue:
        node = queue.popleft()
        result.append(node.val)
        
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    
    return result

# Example usage:
if __name__ == "__main__":
    # Create tree: [3,9,20,null,null,15,7]
    #     3
    #    / \
    #   9  20
    #     /  \
    #    15   7
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    
    print("Level by level:", level_order(root))  # Output: [[3], [9, 20], [15, 7]]
    print("Flat traversal:", level_order_flat(root))  # Output: [3, 9, 20, 15, 7]
    
    # Test with single node
    single_node = TreeNode(1)
    print("Single node:", level_order(single_node))  # Output: [[1]]
