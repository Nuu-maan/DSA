from typing import List, Dict, Set
from functools import lru_cache


def word_break(s: str, word_dict: List[str]) -> List[str]:
    """Find all possible sentences that can be formed from a string using dictionary words.

    This function uses dynamic programming with memoization and a trie data structure
    for efficient word lookup to find all possible ways to break the input string
    into valid dictionary words.

    Args:
        s (str): Input string to break into words
        word_dict (List[str]): Dictionary of valid words

    Returns:
        List[str]: All possible sentences that can be formed

    Time Complexity: O(2^n * n) where n is the length of string s
    Space Complexity: O(2^n * n) to store all possible combinations

    Example:
        >>> word_break("catsanddog", ["cat","cats","and","sand","dog"])
        ['cats and dog', 'cat sand dog']
        >>> word_break("pineapplepenapple", ["apple","pen","applepen","pine","pineapple"])
        ['pine apple pen apple', 'pineapple pen apple', 'pine applepen apple']
        >>> word_break("catsandog", ["cats","dog","sand","and","cat"])
        []
    """
    # Build trie for efficient word lookup
    trie: Dict[str, Dict] = {}
    for word in word_dict:
        node = trie
        for char in word:
            node = node.setdefault(char, {})
        node['$'] = word  # Mark end of word
    
    @lru_cache(maxsize=None)
    def find_words(start: int) -> List[List[str]]:
        """Find all possible word combinations from start index to end.
        
        Args:
            start (int): Starting index in string s
            
        Returns:
            List[List[str]]: List of all possible word combinations
        """
        if start == len(s):
            return [[]]  # Empty list of words is valid at end
        
        results = []
        node = trie
        
        # Try to find words starting at current position
        for i in range(start, len(s)):
            char = s[i]
            if char not in node:
                break
            node = node[char]
            
            # If we found a complete word
            if '$' in node:
                # Recursively find all combinations for remaining string
                sub_results = find_words(i + 1)
                word = node['$']
                
                # Add current word to each sub-result
                for sub in sub_results:
                    results.append([word] + sub)
        
        return results
    
    # Convert list of words to space-separated sentences
    return [' '.join(words) for words in find_words(0)]


def main() -> None:
    """Process test cases from standard input."""
    test_cases = [
        ("catsanddog", ["cat", "cats", "and", "sand", "dog"]),
        ("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]),
        ("catsandog", ["cats", "dog", "sand", "and", "cat"]),
        ("", []),
        ("a", ["a"]),
        ("aaaa", ["a", "aa", "aaa"]),
        ("leetcode", ["leet", "code"]),
        ("abcd", ["a", "b", "c", "d", "ab", "cd"]),
        ("aaaaaa", ["a", "aa", "aaa"]),
        ("impossible", ["possible"]),
    ]
    
    for s, word_dict in test_cases:
        result = word_break(s, word_dict)
        print(f'Input: s = "{s}", wordDict = {word_dict}')
        print(f'Output: {result}')
        print()


if __name__ == "__main__":
    main() 