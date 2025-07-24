from functools import lru_cache
from typing import Tuple


def is_match(s: str, p: str) -> bool:
    """Implement regular expression matching with support for '.' and '*'.

    This function uses dynamic programming with memoization to implement regex
    matching. It supports '.' for any character and '*' for zero or more of
    the preceding element.

    Args:
        s (str): Input string to match
        p (str): Pattern to match against

    Returns:
        bool: True if the pattern matches the entire string, False otherwise

    Time Complexity: O(m*n) where m and n are lengths of s and p respectively
    Space Complexity: O(m*n) for the memoization cache

    Example:
        >>> is_match("aa", "a")
        False
        >>> is_match("aa", "a*")
        True
        >>> is_match("ab", ".*")
        True
        >>> is_match("mississippi", "mis*is*p*.")
        False
    """
    @lru_cache(maxsize=None)
    def dp(i: int, j: int) -> bool:
        """Recursive helper function with memoization.
        
        Args:
            i (int): Current position in string s
            j (int): Current position in pattern p
            
        Returns:
            bool: Whether the remaining pattern matches the remaining string
        """
        # Base case: if pattern is exhausted
        if j >= len(p):
            return i >= len(s)  # True only if string is also exhausted
        
        # Check if current characters match
        match = i < len(s) and (p[j] == s[i] or p[j] == '.')
        
        # If next character is '*', we have two options:
        # 1. Skip the pattern element and its '*' (use zero occurrences)
        # 2. Use current pattern element and stay on same pattern (try one more occurrence)
        if j + 1 < len(p) and p[j + 1] == '*':
            return dp(i, j + 2) or (match and dp(i + 1, j))
        
        # For normal characters, both string and pattern must match and we advance both
        return match and dp(i + 1, j + 1)
    
    return dp(0, 0)


def main() -> None:
    """Process test cases from standard input."""
    test_cases = [
        ("aa", "a"),
        ("aa", "a*"),
        ("ab", ".*"),
        ("mississippi", "mis*is*p*."),
        ("aab", "c*a*b"),
        ("", ".*"),
        ("a", "ab*"),
        ("aaa", "a*a"),
        ("ab", ".*c"),
        ("aaa", "a*a*a*"),
    ]
    
    for s, p in test_cases:
        result = is_match(s, p)
        print(f'Input: s = "{s}", p = "{p}"')
        print(f'Output: {result}')
        print()


if __name__ == "__main__":
    main() 