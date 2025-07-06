"""
Check if a number is prime
Source: https://www.geeksforgeeks.org/python-program-to-check-whether-a-number-is-prime-or-not/
"""

def is_prime(n: int) -> bool:
    """Return True if n is a prime number, else False."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False

    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6

    return True


# Example Usage 

print (is_prime(8))
print (is_prime(10))
print (is_prime(99999999999999))

if __name__ == "__main__":
    print(is_prime(11))  # Output: True
    print(is_prime(15))  # Output: False
