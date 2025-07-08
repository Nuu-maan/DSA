"""
LeetCode 400: Nth Digit
Given an integer n, return the nth digit of the infinite integer sequence [1,2,3,4,5,6,...].
"""
def find_nth_digit(n: int) -> int:
    """
    Returns the nth digit (1-indexed) in the infinite sequence of concatenated positive integers.
    """
    length = 1
    count = 9
    start = 1
    while n > length * count:
        n -= length * count
        length += 1
        count *= 10
        start *= 10
    start += (n - 1) // length
    s = str(start)
    return int(s[(n - 1) % length])

if __name__ == "__main__":
    n = 11
    print(find_nth_digit(n))  # Output: 0 