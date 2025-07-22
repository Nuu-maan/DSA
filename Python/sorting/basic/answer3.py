from typing import List

def merge_without_extra_space(arr1: List[int], arr2: List[int]) -> None:
    """
    Merges two sorted arrays arr1 and arr2 in-place without using extra space.
    After merging, arr1 contains the first n elements and arr2 contains the last m elements of the merged array.
    Args:
        arr1: First sorted list (length n).
        arr2: Second sorted list (length m).
    Returns:
        None. The arrays are modified in-place.
    """
    n, m = len(arr1), len(arr2)
    i, j = n - 1, 0
    while i >= 0 and j < m and arr1[i] > arr2[j]:
        arr1[i], arr2[j] = arr2[j], arr1[i]
        i -= 1
        j += 1
    arr1.sort()
    arr2.sort()

# Example usage:
# arr1 = [1, 3, 5, 7]
# arr2 = [0, 2, 6, 8, 9]
# merge_without_extra_space(arr1, arr2)
# print(arr1)  # Output: [0, 1, 2, 3]
# print(arr2)  # Output: [5, 6, 7, 8, 9] 