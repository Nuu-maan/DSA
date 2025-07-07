"""
Check if a number is a palindrome
Source: https://www.geeksforgeeks.org/check-if-a-number-is-palindrome/
"""

def is_palindrome(n: int) -> bool:
    """Returns True if n is a palindrome, False otherwise."""
    original = n
    reversed_num = 0
    while n > 0:
        reversed_num = reversed_num * 10 + n % 10
        n //= 10
    return original == reversed_num

# Example usage:
if __name__ == "__main__":
    N1 = 121
    N2 = 123
    print(is_palindrome(N1))  # Output: True
    print(is_palindrome(N2))  # Output: False 