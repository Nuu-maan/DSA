"""
LeetCode-style: Count coprime pairs in an array
Given an array of N integers, count the number of unordered pairs (i, j) such that i < j and GCD(A[i], A[j]) = 1.
"""
from math import gcd
from typing import List

def count_coprime_pairs(arr: List[int]) -> int:
    """
    Returns the number of unordered pairs (i, j) such that i < j and GCD(arr[i], arr[j]) == 1.
    """
    n = len(arr)
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            if gcd(arr[i], arr[j]) == 1:
                count += 1
    return count

if __name__ == "__main__":
    A = [2, 3, 4, 5]
    print(count_coprime_pairs(A))  # Output: 4 