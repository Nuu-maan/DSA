from typing import List

def subsets(nums: List[int]) -> List[List[int]]:
    """
    Generate all possible subsets (the power set) of a list of unique integers.

    Args:
        nums (List[int]): The list of unique integers.

    Returns:
        List[List[int]]: All possible subsets.
    """
    result: List[List[int]] = []
    def backtrack(start: int, path: List[int]) -> None:
        result.append(path.copy())
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result

if __name__ == "__main__":
    nums = [1, 2, 3]
    all_subsets = subsets(nums)
    for s in all_subsets:
        print(s) 