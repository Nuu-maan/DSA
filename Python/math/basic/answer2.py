"""
Find the factorial of a number
Source: https://www.geeksforgeeks.org/factorial-of-a-number-using-python/
"""
from typing import Any

def factorial(n: int) -> int:
    """Returns the factorial of a non-negative integer n."""
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers.")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Example usage:
if __name__ == "__main__":
    N1 = 5
    N2 = 0
    print(factorial(N1))  # Output: 120
    print(factorial(N2))  # Output: 1 