def is_rotated_by_two(s1: str, s2: str) -> bool:
    """Check if s2 is a rotation of s1 by exactly 2 places.

    This function checks if s2 can be obtained by rotating s1 either left or right
    by exactly 2 places. A left rotation removes characters from the start and adds
    them to the end, while a right rotation removes from the end and adds to the start.

    Args:
        s1 (str): First string
        s2 (str): Second string to check for rotation

    Returns:
        bool: True if s2 is a 2-place rotation of s1, False otherwise

    Time Complexity: O(1) as we only do string slicing operations
    Space Complexity: O(1) as we only create small substrings

    Example:
        >>> is_rotated_by_two("amazon", "azonam")
        True
        >>> is_rotated_by_two("amazon", "onamaz")
        True
        >>> is_rotated_by_two("geeks", "eksge")
        True
        >>> is_rotated_by_two("geeks", "geeks")
        False
    """
    if not s1 or not s2 or len(s1) != len(s2) or len(s1) < 2:
        return False
    
    # Check left rotation (first 2 chars moved to end)
    left_rotation = s1[2:] + s1[:2]
    
    # Check right rotation (last 2 chars moved to start)
    right_rotation = s1[-2:] + s1[:-2]
    
    # Return True if s2 matches either rotation
    return s2 == left_rotation or s2 == right_rotation


def main() -> None:
    """Process test cases from standard input."""
    test_cases = [
        ("amazon", "azonam"),  # Left rotation
        ("amazon", "onamaz"),  # Right rotation
        ("geeks", "eksge"),    # Left rotation
        ("geeks", "geeks"),    # No rotation
        ("a", "a"),            # Too short
        ("", ""),              # Empty strings
        ("hello", "elloh"),    # Left rotation
        ("hello", "lohel"),    # Right rotation
        ("abcde", "cdeab"),    # Left rotation
        ("abcde", "deabc"),    # Right rotation
    ]
    
    for s1, s2 in test_cases:
        result = is_rotated_by_two(s1, s2)
        print(f'Input: s1 = "{s1}", s2 = "{s2}"')
        print(f'Output: {result}')
        print()


if __name__ == "__main__":
    main() 