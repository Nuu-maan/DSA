from typing import List

def split_array(nums: List[int], m: int) -> int:
    """
    Splits nums into m subarrays to minimize the largest sum among them.
    Uses binary search and greedy check. O(n log(sum(nums))) time.
    """
    def can_split(max_sum: int) -> bool:
        count, curr = 1, 0
        for num in nums:
            if curr + num > max_sum:
                count += 1
                curr = 0
            curr += num
        return count <= m
    left, right = max(nums), sum(nums)
    while left < right:
        mid = (left + right) // 2
        if can_split(mid):
            right = mid
        else:
            left = mid + 1
    return left

if __name__ == "__main__":
    # Example 1
    print(split_array([7,2,5,10,8], 2))  # Output: 18
    # Example 2
    print(split_array([1,2,3,4,5], 2))  # Output: 9 