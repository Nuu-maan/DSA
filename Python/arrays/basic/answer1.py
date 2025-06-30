"""
Reverse an Array
Source: https://www.geeksforgeeks.org/problems/reverse-an-array/1
"""

def reverse_array(arr):
    return arr[::-1]

# Example usage:
if __name__ == "__main__":
    arr = [1, 2, 3, 4]
    print(reverse_array(arr))  # Output: [4, 3, 2, 1] 