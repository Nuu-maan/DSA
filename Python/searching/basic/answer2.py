from typing import List

def binary_search(arr: List[int], x: int) -> int:
    """
    Performs binary search for x in sorted arr.
    Returns the index if found, else -1.
    """
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
    return -1

if __name__ == "__main__":
    # Example 1
    arr1 = [1, 5, 8, 12, 20]
    print(binary_search(arr1, 12))  # Output: 3
    # Example 2
    arr2 = [2, 4, 6, 8, 10]
    print(binary_search(arr2, 7))   # Output: -1 