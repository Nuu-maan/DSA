"""
Find GCD of two numbers
Source: https://www.geeksforgeeks.org/python-program-to-find-gcd-or-hcf-of-two-numbers/
"""

def gcd(a: int, b: int) -> int:
    """Returns the Greatest Common Divisor (GCD) of a and b using the Euclidean algorithm."""
    while b:
        a, b = b, a % b
    return abs(a)

# Example usage:
if __name__ == "__main__":
    A = 54
    B = 24
    print(gcd(A, B))  # Output: 6 