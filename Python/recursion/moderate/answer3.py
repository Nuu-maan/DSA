from typing import List

def letter_case_permutation(s: str) -> List[str]:
    """
    Generate all possible strings by transforming each letter to lowercase or uppercase.

    Args:
        s (str): The input string.

    Returns:
        List[str]: All possible letter case permutations.
    """
    result: List[str] = []
    def backtrack(index: int, path: List[str]) -> None:
        if index == len(s):
            result.append(''.join(path))
            return
        if s[index].isalpha():
            path.append(s[index].lower())
            backtrack(index + 1, path)
            path.pop()
            path.append(s[index].upper())
            backtrack(index + 1, path)
            path.pop()
        else:
            path.append(s[index])
            backtrack(index + 1, path)
            path.pop()
    backtrack(0, [])
    return result

if __name__ == "__main__":
    s = "a1b2"
    permutations = letter_case_permutation(s)
    for p in permutations:
        print(p) 