from typing import List

def wiggleSort(nums: List[int]) -> None:
    """
    Reorders the array so that nums[0] < nums[1] > nums[2] < nums[3] ...
    Modifies nums in-place.
    Args:
        nums: List of integers.
    Returns:
        None
    """
    n = len(nums)
    nums.sort()
    half = (n + 1) // 2
    small = nums[:half][::-1]
    large = nums[half:][::-1]
    nums[:] = [None] * n
    nums[::2] = small
    nums[1::2] = large

# Example usage:
# arr = [1,5,1,1,6,4]
# wiggleSort(arr)
# print(arr)  # Output: [1,6,1,5,1,4] or any valid wiggle sort 