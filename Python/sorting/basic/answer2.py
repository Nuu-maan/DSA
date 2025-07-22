from typing import List

def sort_012(arr: List[int]) -> List[int]:
    """
    Sorts an array consisting only of 0s, 1s, and 2s in ascending order.
    Args:
        arr: List of integers (0, 1, 2).
    Returns:
        List[int]: Sorted array.
    """
    low, mid, high = 0, 0, len(arr) - 1
    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 1:
            mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
    return arr

# Example usage:
# print(sort_012([0, 2, 1, 2, 0]))  # Output: [0, 0, 1, 2, 2] 