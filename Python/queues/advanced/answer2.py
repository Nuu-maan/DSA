from collections import deque
from typing import List

def shortestSubarray(nums: List[int], k: int) -> int:
    """
    LeetCode 862: Shortest Subarray with Sum at Least K
    Returns the length of the shortest non-empty subarray with sum at least k, or -1 if none exists.
    """
    n = len(nums)
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]
    dq = deque()
    res = n + 1
    for i in range(n + 1):
        while dq and prefix[i] - prefix[dq[0]] >= k:
            res = min(res, i - dq.popleft())
        while dq and prefix[i] <= prefix[dq[-1]]:
            dq.pop()
        dq.append(i)
    return res if res <= n else -1

if __name__ == "__main__":
    print(shortestSubarray([1], 1))           # Output: 1
    print(shortestSubarray([1,2], 4))         # Output: -1
    print(shortestSubarray([2,-1,2], 3))      # Output: 3 