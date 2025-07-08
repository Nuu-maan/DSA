"""
LeetCode 357: Count Numbers with Unique Digits
Given an integer n, return the count of all numbers with unique digits in the range [0, 10^n).
"""
def count_numbers_with_unique_digits(n: int) -> int:
    """
    Returns the count of all numbers with unique digits in the range [0, 10^n).
    """
    if n == 0:
        return 1
    count = 10
    unique_digits = 9
    available_number = 9
    for i in range(2, n + 1):
        unique_digits *= available_number
        count += unique_digits
        available_number -= 1
    return count

if __name__ == "__main__":
    n = 2
    print(count_numbers_with_unique_digits(n))  # Output: 91 