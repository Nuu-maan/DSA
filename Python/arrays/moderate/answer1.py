"""
Find the smallest missing number
Source: https://www.geeksforgeeks.org/find-the-smallest-missing-number/
"""

def find_smallest_missing(arr, m):
    n = len(arr)
    left, right = 0, n - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == mid:
            left = mid + 1
        else:
            right = mid - 1
    return left

# Example usage:
if __name__ == "__main__":
    arr = [0, 1, 2, 6, 9]
    m = 10
    print(find_smallest_missing(arr, m))  # Output: 3 