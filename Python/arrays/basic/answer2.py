"""
Find the minimum and maximum element in an array
Source: https://practice.geeksforgeeks.org/problems/find-minimum-and-maximum-element-in-an-array4428/1
"""

def get_min_max(arr):
    return min(arr), max(arr)

# Example usage:
if __name__ == "__main__":
    arr = [3, 2, 1, 56, 10000, 167]
    print(get_min_max(arr))  # Output: (1, 10000) 