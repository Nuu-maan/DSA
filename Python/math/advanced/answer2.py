"""
Segmented Sieve: Count primes in a range [L, R] (1 <= L <= R <= 10^12)
LeetCode Hard / GeeksforGeeks
"""
from math import isqrt
from typing import List

def count_primes_in_range(L: int, R: int) -> int:
    """
    Returns the number of prime numbers in the inclusive range [L, R] using the segmented sieve algorithm.
    """
    if L < 2:
        L = 2
    limit = isqrt(R) + 1
    is_prime_small = [True] * limit
    for i in range(2, isqrt(limit) + 1):
        if is_prime_small[i]:
            for j in range(i * i, limit, i):
                is_prime_small[j] = False
    primes = [i for i, val in enumerate(is_prime_small) if i >= 2 and val]
    is_prime = [True] * (R - L + 1)
    for p in primes:
        start = max(p * p, ((L + p - 1) // p) * p)
        for j in range(start, R + 1, p):
            is_prime[j - L] = False
    return sum(is_prime)

if __name__ == "__main__":
    L = 10
    R = 20
    print(count_primes_in_range(L, R))  # Output: 4 