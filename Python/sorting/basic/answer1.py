from typing import List

def reverse_in_groups(arr: List[int], k: int) -> List[int]:
    """
    Reverses every sub-array group of size k in the given array.
    If the remaining elements are fewer than k, reverse them as well.
    Args:
        arr: List of integers.
        k: Size of the groups to reverse.
    Returns:
        List[int]: The modified array after reversing in groups.
    """
    n = len(arr)
    for i in range(0, n, k):
        arr[i:i+k] = arr[i:i+k][::-1]
    return arr

# Example usage:
# print(reverse_in_groups([1,2,3,4,5], 3))  # Output: [3,2,1,5,4] 