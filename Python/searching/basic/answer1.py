from typing import List

def linear_search(arr: List[int], x: int) -> int:
    """
    Performs linear search for x in arr.
    Returns the index if found, else -1.
    """
    for i, num in enumerate(arr):
        if num == x:
            return i
    return -1

if __name__ == "__main__":
    # Example 1
    arr1 = [1, 10, 30, 15]
    print(linear_search(arr1, 30))  # Output: 2
    # Example 2
    arr2 = [5, 8, 1, 3]
    print(linear_search(arr2, 4))   # Output: -1 