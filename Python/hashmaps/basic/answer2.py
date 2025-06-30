"""
Find the first non-repeating character in a string
Source: https://www.geeksforgeeks.org/given-a-string-find-its-first-non-repeating-character/
"""
def first_non_repeating_char(s):
    freq = {}
    for c in s:
        freq[c] = freq.get(c, 0) + 1
    for c in s:
        if freq[c] == 1:
            return c
    return -1

# Example usage:
# s = 'geeksforgeeks'
# print(first_non_repeating_char(s))  # Output: f 