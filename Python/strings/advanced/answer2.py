from typing import List, Dict, Set
from collections import defaultdict


class TrieNode:
    """A node in the trie data structure.
    
    Attributes:
        children (Dict[str, TrieNode]): Map of character to child nodes
        word_idx (int): Index of word ending at this node (-1 if not a word end)
        palindrome_below (List[int]): Indices of words that form palindromes below
    """
    def __init__(self) -> None:
        self.children: Dict[str, 'TrieNode'] = {}
        self.word_idx: int = -1
        self.palindrome_below: List[int] = []


def palindrome_pairs(words: List[str]) -> List[List[int]]:
    """Find all pairs of words that form palindromes when concatenated.

    This function uses a trie data structure to efficiently find all pairs of
    words that form palindromes when concatenated. It handles empty strings
    and considers both forward and reverse word combinations.

    Args:
        words (List[str]): List of unique words

    Returns:
        List[List[int]]: List of pairs [i,j] where words[i] + words[j] is palindrome

    Time Complexity: O(n * k^2) where n is number of words and k is max word length
    Space Complexity: O(n * k) for the trie structure

    Example:
        >>> palindrome_pairs(["abcd","dcba","lls","s","sssll"])
        [[0,1],[1,0],[3,2],[2,4]]
        >>> palindrome_pairs(["bat","tab","cat"])
        [[0,1],[1,0]]
        >>> palindrome_pairs(["a",""])
        [[0,1],[1,0]]
    """
    def is_palindrome(word: str, start: int, end: int) -> bool:
        """Check if substring word[start:end] is a palindrome."""
        while start < end - 1:
            if word[start] != word[end - 1]:
                return False
            start += 1
            end -= 1
        return True

    def add_word(root: TrieNode, word: str, index: int) -> None:
        """Add a word to the trie."""
        node = root
        # Add word in reverse
        for i, char in enumerate(reversed(word)):
            # If remaining suffix is palindrome, add to current node
            if is_palindrome(word, 0, len(word) - i):
                node.palindrome_below.append(index)
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word_idx = index
        # Empty string is palindrome
        node.palindrome_below.append(index)

    def find_pairs(root: TrieNode, word: str, index: int, result: List[List[int]]) -> None:
        """Find all palindrome pairs for a word."""
        node = root
        
        # Case 1: Current word is longer
        for i, char in enumerate(word):
            # If we found a word ending here and rest of current word is palindrome
            if node.word_idx >= 0 and node.word_idx != index and is_palindrome(word, i, len(word)):
                result.append([index, node.word_idx])
            if char not in node.children:
                return
            node = node.children[char]
        
        # Case 2: Current word is shorter
        if node.word_idx >= 0 and node.word_idx != index:
            result.append([index, node.word_idx])
        
        # Case 3: Words that can append to current word to form palindrome
        for j in node.palindrome_below:
            if j != index:
                result.append([index, j])

    # Build trie with words in reverse
    root = TrieNode()
    for i, word in enumerate(words):
        add_word(root, word, i)
    
    # Find all palindrome pairs
    result: List[List[int]] = []
    for i, word in enumerate(words):
        find_pairs(root, word, i, result)
    
    return result


def main() -> None:
    """Process test cases from standard input."""
    test_cases = [
        ["abcd", "dcba", "lls", "s", "sssll"],
        ["bat", "tab", "cat"],
        ["a", ""],
        ["a"],
        [""],
        ["a", "b", "c", "ab", "ac", "aa"],
        ["aaa", "aa", "a"],
        ["aba", "bab", "cdc"],
        ["radar", "level", "noon"],
        ["abc", "cba", "def", "fed"],
    ]
    
    for words in test_cases:
        result = palindrome_pairs(words)
        print(f'Input: words = {words}')
        print(f'Output: {result}')
        print()


if __name__ == "__main__":
    main() 