from functools import lru_cache


def num_distinct(s: str, t: str) -> int:
    """Count the number of distinct subsequences of s that equal t.

    This function uses dynamic programming with memoization to count how many
    different ways we can form string t by deleting characters from string s
    while maintaining relative order.

    Args:
        s (str): Source string
        t (str): Target string to form from s

    Returns:
        int: Number of distinct subsequences of s that equal t

    Time Complexity: O(m*n) where m and n are lengths of s and t respectively
    Space Complexity: O(m*n) for the memoization cache

    Example:
        >>> num_distinct("rabbbit", "rabbit")
        3
        >>> num_distinct("babgbag", "bag")
        5
        >>> num_distinct("abc", "abc")
        1
    """
    @lru_cache(maxsize=None)
    def dp(i: int, j: int) -> int:
        """Recursive helper function with memoization.
        
        Args:
            i (int): Current position in string s
            j (int): Current position in string t
            
        Returns:
            int: Number of ways to form t[j:] from s[i:]
        """
        # Base cases
        if j == len(t):  # Formed entire target string
            return 1
        if i == len(s):  # Source exhausted but target remains
            return 0
        
        # If current characters match, we have two choices:
        # 1. Use current character: move forward in both strings
        # 2. Skip current character: move forward only in source string
        result = dp(i + 1, j)  # Always try skipping current character
        if s[i] == t[j]:
            result += dp(i + 1, j + 1)  # If characters match, also try using it
        
        return result
    
    return dp(0, 0)


def main() -> None:
    """Process test cases from standard input."""
    test_cases = [
        ("rabbbit", "rabbit"),
        ("babgbag", "bag"),
        ("abc", "abc"),
        ("", ""),
        ("abc", ""),
        ("", "abc"),
        ("aaa", "aa"),
        ("ABCDE", "ACE"),
        ("ABCDE", "AEC"),
        ("aaaaa", "aa"),
    ]
    
    for s, t in test_cases:
        result = num_distinct(s, t)
        print(f'Input: s = "{s}", t = "{t}"')
        print(f'Output: {result}')
        print()


if __name__ == "__main__":
    main() 