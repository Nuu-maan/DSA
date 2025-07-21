from typing import List, Tuple

def find_first_last(arr: List[int], x: int) -> Tuple[int, int]:
    """
    Finds the first and last occurrence of x in sorted arr.
    Returns a tuple (first_index, last_index). If not found, returns (-1, -1).
    """
    first, last = -1, -1
    left, right = 0, len(arr) - 1
    # Find first occurrence
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == x:
            first = mid
            right = mid - 1
        elif arr[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
    # Find last occurrence
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == x:
            last = mid
            left = mid + 1
        elif arr[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
    return (first, last)

if __name__ == "__main__":
    # Example 1
    arr1 = [1, 2, 2, 2, 3, 4, 7, 8, 8]
    print(find_first_last(arr1, 8))  # Output: (7, 8)
    # Example 2
    arr2 = [1, 3, 5, 5, 5, 5, 67, 123, 125]
    print(find_first_last(arr2, 5))  # Output: (2, 5) 