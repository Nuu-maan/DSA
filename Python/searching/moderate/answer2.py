from typing import List

def search_rotated(nums: List[int], target: int) -> int:
    """
    Searches for target in a rotated sorted array nums.
    Returns the index if found, else -1. O(log n) time.
    """
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1

if __name__ == "__main__":
    # Example 1
    print(search_rotated([4,5,6,7,0,1,2], 0))  # Output: 4
    # Example 2
    print(search_rotated([4,5,6,7,0,1,2], 3))  # Output: -1 