"""
Serialize and Deserialize Binary Tree
Source: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    """
    Codec class for serializing and deserializing binary trees.
    """
    
    def serialize(self, root):
        """
        Encodes a tree to a single string using preorder traversal.
        
        Args:
            root: TreeNode - The root of the binary tree
            
        Returns:
            str - Serialized representation of the tree
        """
        def preorder(node):
            if not node:
                vals.append("null")
            else:
                vals.append(str(node.val))
                preorder(node.left)
                preorder(node.right)
        
        vals = []
        preorder(root)
        return ','.join(vals)
    
    def deserialize(self, data):
        """
        Decodes your encoded data to tree.
        
        Args:
            data: str - Serialized representation of the tree
            
        Returns:
            TreeNode - The root of the reconstructed tree
        """
        def build():
            val = next(vals)
            if val == "null":
                return None
            
            node = TreeNode(int(val))
            node.left = build()
            node.right = build()
            return node
        
        vals = iter(data.split(','))
        return build()

class CodecLevelOrder:
    """
    Alternative implementation using level-order traversal.
    """
    
    def serialize(self, root):
        """
        Serializes using level-order traversal (BFS).
        """
        if not root:
            return ""
        
        from collections import deque
        queue = deque([root])
        result = []
        
        while queue:
            node = queue.popleft()
            if node:
                result.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
            else:
                result.append("null")
        
        # Remove trailing nulls
        while result and result[-1] == "null":
            result.pop()
        
        return ','.join(result)
    
    def deserialize(self, data):
        """
        Deserializes using level-order reconstruction.
        """
        if not data:
            return None
        
        from collections import deque
        vals = data.split(',')
        root = TreeNode(int(vals[0]))
        queue = deque([root])
        i = 1
        
        while queue and i < len(vals):
            node = queue.popleft()
            
            # Process left child
            if i < len(vals) and vals[i] != "null":
                node.left = TreeNode(int(vals[i]))
                queue.append(node.left)
            i += 1
            
            # Process right child
            if i < len(vals) and vals[i] != "null":
                node.right = TreeNode(int(vals[i]))
                queue.append(node.right)
            i += 1
        
        return root

# Example usage:
if __name__ == "__main__":
    # Create test tree: [1,2,3,null,null,4,5]
    #     1
    #    / \
    #   2   3
    #      / \
    #     4   5
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.right.left = TreeNode(4)
    root.right.right = TreeNode(5)
    
    # Test preorder serialization
    codec = Codec()
    serialized = codec.serialize(root)
    print("Serialized (preorder):", serialized)
    
    deserialized = codec.deserialize(serialized)
    print("Deserialized successfully:", deserialized.val)
    
    # Test level-order serialization
    codec_level = CodecLevelOrder()
    serialized_level = codec_level.serialize(root)
    print("Serialized (level-order):", serialized_level)
    
    deserialized_level = codec_level.deserialize(serialized_level)
    print("Deserialized successfully:", deserialized_level.val)
    
    # Test with empty tree
    empty_serialized = codec.serialize(None)
    print("Empty tree serialized:", repr(empty_serialized))
    empty_deserialized = codec.deserialize(empty_serialized)
    print("Empty tree deserialized:", empty_deserialized)
