"""
LeetCode 1863: Sum of All Subset XOR Totals
Given an array of integers, return the sum of all XOR totals for every subset.
"""
from typing import List

def subset_xor_sum(nums: List[int]) -> int:
    """
    Returns the sum of all XOR totals for every subset of nums.
    """
    def dfs(i: int, curr: int) -> int:
        if i == len(nums):
            return curr
        return dfs(i + 1, curr ^ nums[i]) + dfs(i + 1, curr)
    return dfs(0, 0)

if __name__ == "__main__":
    nums = [1, 3]
    print(subset_xor_sum(nums))  # Output: 6 