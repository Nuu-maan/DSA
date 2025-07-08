"""
Check if two numbers are coprime
Source: https://www.geeksforgeeks.org/python-program-to-check-co-prime-numbers/
"""

def are_coprime(a: int, b: int) -> bool:
    """Returns True if a and b are coprime (GCD is 1), False otherwise."""
    def gcd(x: int, y: int) -> int:
        while y:
            x, y = y, x % y
        return abs(x)
    return gcd(a, b) == 1

# Example usage:
if __name__ == "__main__":
    A1, B1 = 5, 9
    A2, B2 = 6, 8
    print(are_coprime(A1, B1))  # Output: True
    print(are_coprime(A2, B2))  # Output: False 