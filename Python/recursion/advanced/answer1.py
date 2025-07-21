from typing import List, Dict

class TrieNode:
    def __init__(self):
        self.children: Dict[str, TrieNode] = {}
        self.word: str = ""

def findWords(board: List[List[str]], words: List[str]) -> List[str]:
    """
    Find all words from the list that can be formed in the board by sequentially adjacent cells.

    Args:
        board (List[List[str]]): 2D board of characters.
        words (List[str]): List of words to search for.

    Returns:
        List[str]: All words found in the board.
    """
    def build_trie(words: List[str]) -> TrieNode:
        root = TrieNode()
        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = word
        return root

    def dfs(node: TrieNode, x: int, y: int):
        char = board[x][y]
        child = node.children.get(char)
        if not child:
            return
        if child.word:
            result.append(child.word)
            child.word = ""  # Avoid duplicates
        board[x][y] = "#"
        for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < len(board) and 0 <= ny < len(board[0]) and board[nx][ny] != "#":
                dfs(child, nx, ny)
        board[x][y] = char

    result: List[str] = []
    root = build_trie(words)
    for i in range(len(board)):
        for j in range(len(board[0])):
            dfs(root, i, j)
    return result

if __name__ == "__main__":
    board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
    words = ["oath","pea","eat","rain"]
    found = findWords(board, words)
    print(found) 