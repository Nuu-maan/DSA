"""
Binary Tree Right Side View
Source: https://leetcode.com/problems/binary-tree-right-side-view/
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def right_side_view(root):
    """
    Returns the right side view of a binary tree using level order traversal.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        List[int] - Values visible from the right side
    """
    if not root:
        return []
    
    from collections import deque
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        
        for i in range(level_size):
            node = queue.popleft()
            
            # If this is the last node in the current level, add to result
            if i == level_size - 1:
                result.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    
    return result

def right_side_view_dfs(root):
    """
    Alternative approach using DFS (Depth-First Search).
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        List[int] - Values visible from the right side
    """
    result = []
    
    def dfs(node, level):
        if not node:
            return
        
        # If this is the first node we've seen at this level
        if level == len(result):
            result.append(node.val)
        
        # Visit right subtree first, then left
        dfs(node.right, level + 1)
        dfs(node.left, level + 1)
    
    dfs(root, 0)
    return result

def right_side_view_reverse_level_order(root):
    """
    Another approach using reverse level order (right to left).
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        List[int] - Values visible from the right side
    """
    if not root:
        return []
    
    from collections import deque
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level_nodes = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level_nodes.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        # Take the rightmost node from each level
        result.append(level_nodes[-1])
    
    return result

# Example usage:
if __name__ == "__main__":
    # Test case 1: [1,2,3,null,5,null,4]
    #    1            <---
    #  /   \
    # 2     3         <---
    #  \     \
    #   5     4       <---
    root1 = TreeNode(1)
    root1.left = TreeNode(2)
    root1.right = TreeNode(3)
    root1.left.right = TreeNode(5)
    root1.right.right = TreeNode(4)
    
    print("Test 1 (BFS):", right_side_view(root1))  # Output: [1, 3, 4]
    print("Test 1 (DFS):", right_side_view_dfs(root1))  # Output: [1, 3, 4]
    
    # Test case 2: [1,null,3]
    #    1            <---
    #     \
    #      3          <---
    root2 = TreeNode(1)
    root2.right = TreeNode(3)
    
    print("Test 2:", right_side_view(root2))  # Output: [1, 3]
    
    # Test case 3: Empty tree
    print("Empty tree:", right_side_view(None))  # Output: []
