from collections import deque
from typing import List

def max_sliding_window(nums: List[int], k: int) -> List[int]:
    """
    LeetCode 239: Sliding Window Maximum
    Returns a list of the maximums of each sliding window of size k.
    """
    if not nums or k == 0:
        return []
    dq = deque()  # stores indices
    result = []
    for i, num in enumerate(nums):
        # Remove indices out of the current window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Remove indices whose corresponding values are less than num
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        # Append the current max to the result
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result

if __name__ == "__main__":
    nums = [1,3,-1,-3,5,3,6,7]
    k = 3
    print(max_sliding_window(nums, k))  # Output: [3, 3, 5, 5, 6, 7] 