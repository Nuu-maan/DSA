"""
Find the pair with given sum in an array
Source: https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/
"""
def has_pair_with_sum(arr, target):
    seen = set()
    for num in arr:
        if target - num in seen:
            return True
        seen.add(num)
    return False

# Example usage:
# arr = [0, -1, 2, -3, 1]
# target = -2
# print(has_pair_with_sum(arr, target))  # Output: True 