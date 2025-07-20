from typing import List

def generate_strings(char_set: List[str], k: int) -> List[str]:
    """
    Generate all possible strings of length k from the given set of characters.

    Args:
        char_set (List[str]): The set of characters.
        k (int): The length of strings to generate.

    Returns:
        List[str]: All possible strings of length k.
    """
    result: List[str] = []
    def backtrack(current: List[str]) -> None:
        if len(current) == k:
            result.append(''.join(current))
            return
        for char in char_set:
            current.append(char)
            backtrack(current)
            current.pop()
    backtrack([])
    return result

if __name__ == "__main__":
    char_set = ['a', 'b']
    k = 3
    strings = generate_strings(char_set, k)
    for s in strings:
        print(s) 