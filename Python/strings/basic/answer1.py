from typing import List


def reverse_words(s: str) -> str:
    """Reverse the order of words in a string while preserving whitespace.

    This function takes a string containing words separated by spaces and returns
    a new string with the words in reverse order, maintaining all whitespace.

    Args:
        s (str): Input string containing words and spaces

    Returns:
        str: String with words reversed but whitespace preserved

    Time Complexity: O(n) where n is the length of the string
    Space Complexity: O(n) to store the result string

    Example:
        >>> reverse_words("the sky is blue")
        'blue is sky the'
        >>> reverse_words("  hello   world  ")
        '  world   hello  '
        >>> reverse_words("a")
        'a'
    """
    if not s:
        return s

    # Split string into words and spaces
    words: List[str] = []
    spaces: List[str] = []
    current_word = []
    current_space = []
    
    # First character's type determines initial state
    is_space = s[0].isspace()
    
    for char in s:
        if char.isspace():
            if not is_space:  # Transition from word to space
                words.append(''.join(current_word))
                current_word = []
                is_space = True
            current_space.append(char)
        else:
            if is_space:  # Transition from space to word
                spaces.append(''.join(current_space))
                current_space = []
                is_space = False
            current_word.append(char)
    
    # Append final word/space
    if current_word:
        words.append(''.join(current_word))
    if current_space:
        spaces.append(''.join(current_space))
    
    # Reverse words while keeping spaces in original positions
    words.reverse()
    
    # Reconstruct the string
    result = []
    if s[0].isspace():  # Started with space
        for i in range(len(words)):
            result.append(spaces[i])
            result.append(words[i])
        if len(spaces) > len(words):  # Handle trailing space
            result.append(spaces[-1])
    else:  # Started with word
        for i in range(len(spaces)):
            result.append(words[i])
            result.append(spaces[i])
        if len(words) > len(spaces):  # Handle trailing word
            result.append(words[-1])
    
    return ''.join(result)


def main() -> None:
    """Process test cases from standard input."""
    test_cases = [
        "the sky is blue",
        "  hello   world  ",
        "a",
        "   ",
        "word",
        "first   second  third",
    ]
    
    for test in test_cases:
        result = reverse_words(test)
        print(f'Input: "{test}"')
        print(f'Output: "{result}"')
        print()


if __name__ == "__main__":
    main() 