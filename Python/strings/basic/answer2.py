from typing import List


def longest_common_prefix(strs: List[str]) -> str:
    """Find the longest common prefix string amongst an array of strings.

    This function takes a list of strings and returns the longest string that is
    a prefix of all strings in the list. If no common prefix exists, returns an
    empty string.

    Args:
        strs (List[str]): List of strings to find common prefix from

    Returns:
        str: The longest common prefix string, or empty string if none exists

    Time Complexity: O(S) where S is the sum of all characters in all strings
    Space Complexity: O(1) as we only store the result string

    Example:
        >>> longest_common_prefix(["flower", "flow", "flight"])
        'fl'
        >>> longest_common_prefix(["dog", "racecar", "car"])
        ''
        >>> longest_common_prefix(["interspecies", "interstellar", "interstate"])
        'inters'
    """
    if not strs:
        return ""
    
    if len(strs) == 1:
        return strs[0]
    
    # Find shortest string length (no point checking beyond this)
    min_len = min(len(s) for s in strs)
    
    # Compare characters from each string at the same position
    for i in range(min_len):
        char = strs[0][i]  # Get character to compare from first string
        for string in strs[1:]:
            if string[i] != char:
                # Found a mismatch, return prefix up to this point
                return strs[0][:i]
    
    # If we get here, the shortest string is a prefix of all others
    return strs[0][:min_len]


def main() -> None:
    """Process test cases from standard input."""
    test_cases = [
        ["flower", "flow", "flight"],
        ["dog", "racecar", "car"],
        ["interspecies", "interstellar", "interstate"],
        ["hello"],
        ["", "b"],
        ["a", "a", "a"],
        ["prefix", "prefix", "prefix"],
        ["abc", "abcd", "abcde"],
    ]
    
    for test in test_cases:
        result = longest_common_prefix(test)
        print(f'Input: {test}')
        print(f'Output: "{result}"')
        print()


if __name__ == "__main__":
    main() 