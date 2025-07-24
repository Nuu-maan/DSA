from collections import Counter, defaultdict


def min_window(s: str, t: str) -> str:
    """Find the minimum window in s that contains all characters of t.

    This function uses the sliding window technique with two pointers to find
    the minimum substring of s that contains all characters from t, including
    duplicates.

    Args:
        s (str): The source string to search in
        t (str): The target string containing characters to find

    Returns:
        str: The minimum window substring, or empty string if no such window exists

    Time Complexity: O(|s| + |t|) where |s| and |t| are the lengths of the strings
    Space Complexity: O(|t|) to store the character frequency maps

    Example:
        >>> min_window("ADOBECODEBANC", "ABC")
        'BANC'
        >>> min_window("a", "a")
        'a'
        >>> min_window("a", "aa")
        ''
    """
    if not s or not t:
        return ""

    # Count required characters
    required = Counter(t)
    required_chars = len(required)
    
    # Initialize window
    window = defaultdict(int)
    have = 0  # Count of characters with sufficient frequency
    
    # Initialize result
    min_len = float('inf')
    result = ""
    
    # Initialize sliding window pointers
    left = 0
    
    # Expand window with right pointer
    for right in range(len(s)):
        # Add right character to window
        char = s[right]
        window[char] += 1
        
        # Check if this character helps meet requirements
        if char in required and window[char] == required[char]:
            have += 1
        
        # Try to minimize window by moving left pointer
        while have == required_chars:
            # Update result if current window is smaller
            if right - left + 1 < min_len:
                min_len = right - left + 1
                result = s[left:right + 1]
            
            # Remove left character from window
            char = s[left]
            window[char] -= 1
            
            # Check if removing this character breaks requirements
            if char in required and window[char] < required[char]:
                have -= 1
            
            left += 1
    
    return result


def main() -> None:
    """Process test cases from standard input."""
    test_cases = [
        ("ADOBECODEBANC", "ABC"),
        ("a", "a"),
        ("a", "aa"),
        ("ABCDEFGHIJK", "DEF"),
        ("aaaaaaaaaa", "aa"),
        ("ADOBECODEBANC", "ABBC"),
        ("", ""),
        ("xyz", ""),
        ("", "xyz"),
        ("AAAAABBBCCCC", "ABC"),
    ]
    
    for s, t in test_cases:
        result = min_window(s, t)
        print(f'Input: s = "{s}", t = "{t}"')
        print(f'Output: "{result}"')
        print()


if __name__ == "__main__":
    main() 