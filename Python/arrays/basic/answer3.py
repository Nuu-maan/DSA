"""
Move all zeroes to end of array
Source: https://www.geeksforgeeks.org/problems/move-all-zeroes-to-end-of-array0751/1
"""

def move_zeroes(arr):
    res = [num for num in arr if num != 0]
    res += [0] * (len(arr) - len(res))
    return res

# Example usage:
if __name__ == "__main__":
    arr = [3, 5, 0, 0, 4]
    print(move_zeroes(arr))  # Output: [3, 5, 4, 0, 0] 