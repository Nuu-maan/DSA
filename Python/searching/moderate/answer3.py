from typing import List

def smallest_distance_pair(nums: List[int], k: int) -> int:
    """
    Finds the k-th smallest distance among all pairs in nums.
    Uses binary search and two pointers. O(n log n + n log W) time.
    """
    nums.sort()
    n = len(nums)
    left, right = 0, nums[-1] - nums[0]
    def count_pairs(mid: int) -> int:
        count = left = 0
        for right_ptr in range(n):
            while nums[right_ptr] - nums[left] > mid:
                left += 1
            count += right_ptr - left
        return count
    while left < right:
        mid = (left + right) // 2
        if count_pairs(mid) < k:
            left = mid + 1
        else:
            right = mid
    return left

if __name__ == "__main__":
    # Example 1
    print(smallest_distance_pair([1,3,1], 1))  # Output: 0
    # Example 2
    print(smallest_distance_pair([1,6,1], 3))  # Output: 5 