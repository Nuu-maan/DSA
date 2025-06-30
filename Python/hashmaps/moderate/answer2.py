"""
Find the first repeating element in an array.
Source: https://www.geeksforgeeks.org/find-first-repeating-element-array-integers/
"""

def first_repeating(arr):
    seen = set()
    first_repeat = -1
    for num in reversed(arr):
        if num in seen:
            first_repeat = num
        else:
            seen.add(num)
    return first_repeat

# Example usage:
if __name__ == "__main__":
    arr1 = [10, 5, 3, 4, 3, 5, 6]
    arr2 = [6, 10, 5, 4, 9, 120]
    print(first_repeating(arr1))  # Output: 5
    print(first_repeating(arr2))  # Output: -1 