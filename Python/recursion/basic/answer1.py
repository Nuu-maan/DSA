from typing import List

def combine(arr: List[int], r: int) -> List[List[int]]:
    """
    Generate all possible combinations of r elements in the given array.

    Args:
        arr (List[int]): The input array.
        r (int): Number of elements in each combination.

    Returns:
        List[List[int]]: A list of all combinations, each combination is a list of integers.
    """
    result: List[List[int]] = []
    def backtrack(start: int, path: List[int]) -> None:
        if len(path) == r:
            result.append(path.copy())
            return
        for i in range(start, len(arr)):
            path.append(arr[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result

if __name__ == "__main__":
    arr = [1, 2, 3, 4]
    r = 2
    combinations = combine(arr, r)
    for combo in combinations:
        print(' '.join(map(str, combo))) 