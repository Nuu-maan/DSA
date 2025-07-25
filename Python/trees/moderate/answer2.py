"""
Lowest Common Ancestor of a Binary Tree
Source: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root, p, q):
    """
    Finds the lowest common ancestor of two nodes in a binary tree.
    
    Args:
        root: TreeNode - The root of the binary tree
        p: TreeNode - First target node
        q: TreeNode - Second target node
        
    Returns:
        TreeNode - The lowest common ancestor
    """
    if not root or root == p or root == q:
        return root
    
    # Search in left and right subtrees
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    
    # If both left and right are not None, current node is LCA
    if left and right:
        return root
    
    # Otherwise, return the non-None result
    return left if left else right

def lowest_common_ancestor_with_path(root, p, q):
    """
    Alternative approach using path finding.
    
    Args:
        root: TreeNode - The root of the binary tree
        p: TreeNode - First target node
        q: TreeNode - Second target node
        
    Returns:
        TreeNode - The lowest common ancestor
    """
    def find_path(node, target, path):
        if not node:
            return False
        
        path.append(node)
        
        if node == target:
            return True
        
        if (find_path(node.left, target, path) or 
            find_path(node.right, target, path)):
            return True
        
        path.pop()
        return False
    
    path_p = []
    path_q = []
    
    find_path(root, p, path_p)
    find_path(root, q, path_q)
    
    # Find the last common node in both paths
    lca = None
    for i in range(min(len(path_p), len(path_q))):
        if path_p[i] == path_q[i]:
            lca = path_p[i]
        else:
            break
    
    return lca

# Example usage:
if __name__ == "__main__":
    # Create tree: [3,5,1,6,2,0,8,null,null,7,4]
    #     3
    #    / \
    #   5   1
    #  / \ / \
    # 6  2 0  8
    #   / \
    #  7   4
    root = TreeNode(3)
    root.left = TreeNode(5)
    root.right = TreeNode(1)
    root.left.left = TreeNode(6)
    root.left.right = TreeNode(2)
    root.right.left = TreeNode(0)
    root.right.right = TreeNode(8)
    root.left.right.left = TreeNode(7)
    root.left.right.right = TreeNode(4)
    
    # Test case 1: LCA of 5 and 1
    p1 = root.left  # Node 5
    q1 = root.right  # Node 1
    result1 = lowest_common_ancestor(root, p1, q1)
    print(f"LCA of {p1.val} and {q1.val}: {result1.val}")  # Output: 3
    
    # Test case 2: LCA of 5 and 4
    p2 = root.left  # Node 5
    q2 = root.left.right.right  # Node 4
    result2 = lowest_common_ancestor(root, p2, q2)
    print(f"LCA of {p2.val} and {q2.val}: {result2.val}")  # Output: 5
