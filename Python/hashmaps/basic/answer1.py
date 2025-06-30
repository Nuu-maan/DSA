"""
Find whether an array is a subset of another array
Source: https://www.geeksforgeeks.org/find-whether-an-array-is-subset-of-another-array-set-1/
"""
def is_subset(a, b):
    set_a = set(a)
    for elem in b:
        if elem not in set_a:
            return False
    return True

# Example usage:
# a = [11, 1, 13, 21, 3, 7]
# b = [11, 3, 7, 1]
# print(is_subset(a, b))  # Output: True 