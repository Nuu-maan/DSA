from typing import List, Dict
from collections import deque


class TrieNode:
    """A node in the trie data structure.
    
    Attributes:
        children (Dict[str, TrieNode]): Map of character to child nodes
        is_word (bool): Whether this node represents the end of a word
    """
    def __init__(self) -> None:
        self.children: Dict[str, 'TrieNode'] = {}
        self.is_word: bool = False


class StreamChecker:
    """A class to check if any word from a dictionary is a suffix of a character stream.

    This class uses a trie data structure with words stored in reverse to efficiently
    check if any dictionary word is a suffix of the stream. It maintains a queue of
    active trie nodes to track potential matches.

    Time Complexity:
        - Constructor: O(sum(len(w) for w in words))
        - query: O(min(max_word_length, stream_length))
    Space Complexity: O(sum(len(w) for w in words))

    Example:
        >>> checker = StreamChecker(["cd","f","kl"])
        >>> checker.query('a')  # returns False
        False
        >>> checker.query('b')  # returns False
        False
        >>> checker.query('c')  # returns False
        False
        >>> checker.query('d')  # returns True ('cd' is a suffix)
        True
    """
    def __init__(self, words: List[str]) -> None:
        """Initialize the StreamChecker with a list of words.

        Args:
            words (List[str]): Dictionary of words to check for
        """
        self.root = TrieNode()
        self.stream = deque()
        self.max_length = 0
        
        # Build trie with reversed words
        for word in words:
            self.max_length = max(self.max_length, len(word))
            node = self.root
            # Add word in reverse
            for char in reversed(word):
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.is_word = True

    def query(self, letter: str) -> bool:
        """Check if the new letter forms a suffix that matches any dictionary word.

        Args:
            letter (str): New character from the stream

        Returns:
            bool: True if any dictionary word is a suffix of the stream
        """
        # Add new letter to stream
        self.stream.appendleft(letter)
        
        # Maintain only necessary characters
        if len(self.stream) > self.max_length:
            self.stream.pop()
        
        # Try to match from current letter
        node = self.root
        for char in self.stream:
            if char not in node.children:
                return False
            node = node.children[char]
            if node.is_word:
                return True
        
        return False


def main() -> None:
    """Process test cases from standard input."""
    # Test case 1: Basic functionality
    print("Test case 1:")
    checker1 = StreamChecker(["cd", "f", "kl"])
    test1 = list("abcdefghijkl")
    for char in test1:
        result = checker1.query(char)
        print(f'query("{char}") -> {result}')
    print()
    
    # Test case 2: Multiple matches
    print("Test case 2:")
    checker2 = StreamChecker(["aa", "aaa", "aaaa"])
    test2 = list("aaaaa")
    for char in test2:
        result = checker2.query(char)
        print(f'query("{char}") -> {result}')
    print()
    
    # Test case 3: No matches
    print("Test case 3:")
    checker3 = StreamChecker(["xyz"])
    test3 = list("abc")
    for char in test3:
        result = checker3.query(char)
        print(f'query("{char}") -> {result}')
    print()
    
    # Test case 4: Single character words
    print("Test case 4:")
    checker4 = StreamChecker(["a", "b", "c"])
    test4 = list("abcd")
    for char in test4:
        result = checker4.query(char)
        print(f'query("{char}") -> {result}')
    print()
    
    # Test case 5: Long words
    print("Test case 5:")
    checker5 = StreamChecker(["apple", "app", "banana"])
    test5 = list("bananapple")
    for char in test5:
        result = checker5.query(char)
        print(f'query("{char}") -> {result}')


if __name__ == "__main__":
    main() 