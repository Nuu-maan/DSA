"""
Fibonacci Numbers
Source: https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/
"""

def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b

# Example usage:
if __name__ == "__main__":
    print(fibonacci(9))  # Output: 34 