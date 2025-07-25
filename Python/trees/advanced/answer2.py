"""
Binary Tree Maximum Path Sum
Source: https://leetcode.com/problems/binary-tree-maximum-path-sum/
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_path_sum(root):
    """
    Finds the maximum path sum in a binary tree.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        int - The maximum path sum
    """
    max_sum = float('-inf')
    
    def max_gain(node):
        nonlocal max_sum
        
        if not node:
            return 0
        
        # Maximum sum on the left and right sub-trees of node
        left_gain = max(max_gain(node.left), 0)
        right_gain = max(max_gain(node.right), 0)
        
        # The price to start a new path where `node` is a highest node
        price_newpath = node.val + left_gain + right_gain
        
        # Update max_sum if it's better to start a new path
        max_sum = max(max_sum, price_newpath)
        
        # For recursion, return the max gain if continue the same path
        return node.val + max(left_gain, right_gain)
    
    max_gain(root)
    return max_sum

def max_path_sum_iterative(root):
    """
    Alternative iterative approach using post-order traversal.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        int - The maximum path sum
    """
    if not root:
        return 0
    
    stack = []
    node = root
    last_visited = None
    node_gains = {}
    max_sum = float('-inf')
    
    while stack or node:
        if node:
            stack.append(node)
            node = node.left
        else:
            peek_node = stack[-1]
            
            # If right child exists and hasn't been processed yet
            if peek_node.right and last_visited != peek_node.right:
                node = peek_node.right
            else:
                # Process current node
                left_gain = max(node_gains.get(peek_node.left, 0), 0)
                right_gain = max(node_gains.get(peek_node.right, 0), 0)
                
                # Calculate max path through this node
                current_max = peek_node.val + left_gain + right_gain
                max_sum = max(max_sum, current_max)
                
                # Store the max gain for this node
                node_gains[peek_node] = peek_node.val + max(left_gain, right_gain)
                
                last_visited = stack.pop()
    
    return max_sum

def max_path_sum_with_path(root):
    """
    Returns both the maximum path sum and the actual path.
    
    Args:
        root: TreeNode - The root of the binary tree
        
    Returns:
        tuple: (max_sum, path) where path is list of node values
    """
    max_sum = float('-inf')
    best_path = []
    
    def max_gain(node, path):
        nonlocal max_sum, best_path
        
        if not node:
            return 0, []
        
        left_gain, left_path = max_gain(node.left, path + [node.val])
        right_gain, right_path = max_gain(node.right, path + [node.val])
        
        left_gain = max(left_gain, 0)
        right_gain = max(right_gain, 0)
        
        # Current path sum through this node
        current_sum = node.val + left_gain + right_gain
        
        if current_sum > max_sum:
            max_sum = current_sum
            # Construct the path
            best_path = []
            if left_gain > 0:
                best_path.extend(reversed(left_path))
            best_path.append(node.val)
            if right_gain > 0:
                best_path.extend(right_path)
        
        # Return max gain for recursion
        if left_gain > right_gain:
            return node.val + left_gain, [node.val] + left_path
        else:
            return node.val + right_gain, [node.val] + right_path
    
    max_gain(root, [])
    return max_sum, best_path

# Example usage:
if __name__ == "__main__":
    # Test case 1: [1,2,3]
    #    1
    #   / \
    #  2   3
    root1 = TreeNode(1)
    root1.left = TreeNode(2)
    root1.right = TreeNode(3)
    print("Test 1:", max_path_sum(root1))  # Output: 6
    
    # Test case 2: [-10,9,20,null,null,15,7]
    #     -10
    #    /   \
    #   9     20
    #        /  \
    #       15   7
    root2 = TreeNode(-10)
    root2.left = TreeNode(9)
    root2.right = TreeNode(20)
    root2.right.left = TreeNode(15)
    root2.right.right = TreeNode(7)
    print("Test 2:", max_path_sum(root2))  # Output: 42
    
    # Test case 3: Single negative node
    root3 = TreeNode(-3)
    print("Test 3:", max_path_sum(root3))  # Output: -3
