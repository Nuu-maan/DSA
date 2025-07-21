from typing import List

def find_min(nums: List[int]) -> int:
    """
    Finds the minimum element in a rotated sorted array that may contain duplicates.
    Uses modified binary search. O(log n) average time.
    """
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < nums[right]:
            right = mid
        elif nums[mid] > nums[right]:
            left = mid + 1
        else:
            right -= 1
    return nums[left]

if __name__ == "__main__":
    # Example 1
    print(find_min([2,2,2,0,1]))  # Output: 0
    # Example 2
    print(find_min([1,3,5]))      # Output: 1 