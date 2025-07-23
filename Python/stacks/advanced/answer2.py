from typing import List


def longest_valid_parentheses(s: str) -> int:
    """Find the length of the longest valid parentheses substring.
    
    Uses a stack-based approach to track indices of unmatched parentheses.
    The key idea is to keep track of the indices of unmatched parentheses
    and use them to calculate valid substring lengths.
    
    Args:
        s (str): String containing only '(' and ')'
        
    Returns:
        int: Length of the longest valid parentheses substring
    """
    if not s:
        return 0
    
    stack: List[int] = [-1]  # Initialize with -1 as base index
    max_length = 0
    
    for i, char in enumerate(s):
        if char == '(':
            # Push index of opening parenthesis
            stack.append(i)
        else:  # char == ')'
            # Pop the last unmatched opening parenthesis
            stack.pop()
            
            if not stack:
                # No matching opening parenthesis, start new valid sequence
                stack.append(i)
            else:
                # Calculate length of valid sequence
                # Current index - last unmatched index
                current_length = i - stack[-1]
                max_length = max(max_length, current_length)
    
    return max_length


def longest_valid_parentheses_constant_space(s: str) -> int:
    """Alternative solution using constant space.
    
    Makes two passes through the string:
    1. Left to right: Count opening and closing parentheses
    2. Right to left: Handle cases where opening parentheses are more
    
    Args:
        s (str): String containing only '(' and ')'
        
    Returns:
        int: Length of the longest valid parentheses substring
    """
    n = len(s)
    max_length = 0
    
    # First pass: left to right
    open_count = close_count = 0
    for i in range(n):
        if s[i] == '(':
            open_count += 1
        else:
            close_count += 1
        
        if open_count == close_count:
            # Valid sequence found
            max_length = max(max_length, 2 * open_count)
        elif close_count > open_count:
            # Reset counts if we have more closing than opening
            open_count = close_count = 0
    
    # Second pass: right to left
    open_count = close_count = 0
    for i in range(n-1, -1, -1):
        if s[i] == '(':
            open_count += 1
        else:
            close_count += 1
        
        if open_count == close_count:
            # Valid sequence found
            max_length = max(max_length, 2 * open_count)
        elif open_count > close_count:
            # Reset counts if we have more opening than closing
            open_count = close_count = 0
    
    return max_length


def test_longest_valid_parentheses() -> None:
    """Test both implementations with example cases."""
    test_cases = [
        "(()",
        ")()())",
        "",
        "((())",
        "()(())"
    ]
    expected = [2, 4, 0, 4, 6]
    
    print("Testing stack-based solution:")
    for s, exp in zip(test_cases, expected):
        result = longest_valid_parentheses(s)
        print(f'Input: "{s}"')
        print(f"Expected: {exp}")
        print(f"Got: {result}")
        assert result == exp
        print()
    
    print("\nTesting constant space solution:")
    for s, exp in zip(test_cases, expected):
        result = longest_valid_parentheses_constant_space(s)
        print(f'Input: "{s}"')
        print(f"Expected: {exp}")
        print(f"Got: {result}")
        assert result == exp
        print()


if __name__ == "__main__":
    test_longest_valid_parentheses() 