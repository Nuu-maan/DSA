"""
LeetCode 2447: Number of Subarrays With GCD Equal to K
Given an array of integers nums and an integer k, return the number of subarrays with GCD equal to k.
"""
from math import gcd
from typing import List

def subarray_gcd(nums: List[int], k: int) -> int:
    """
    Returns the number of (contiguous) subarrays whose GCD is exactly k.
    """
    n = len(nums)
    count = 0
    for i in range(n):
        g = 0
        for j in range(i, n):
            g = gcd(g, nums[j])
            if g == k:
                count += 1
            elif g < k:
                break
    return count

if __name__ == "__main__":
    nums = [9, 3, 1, 2, 6, 3]
    k = 3
    print(subarray_gcd(nums, k))  # Output: 4 