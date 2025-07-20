from typing import List

def permute(nums: List[int]) -> List[List[int]]:
    """
    Generate all possible permutations of a list of distinct integers.

    Args:
        nums (List[int]): The list of distinct integers.

    Returns:
        List[List[int]]: All possible permutations.
    """
    result: List[List[int]] = []
    def backtrack(path: List[int], used: List[bool]) -> None:
        if len(path) == len(nums):
            result.append(path.copy())
            return
        for i in range(len(nums)):
            if not used[i]:
                used[i] = True
                path.append(nums[i])
                backtrack(path, used)
                path.pop()
                used[i] = False
    backtrack([], [False] * len(nums))
    return result

if __name__ == "__main__":
    nums = [1, 2, 3]
    permutations = permute(nums)
    for p in permutations:
        print(p) 