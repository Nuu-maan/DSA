"""
Find the minimum window in a string containing all characters of another string.
Source: https://www.geeksforgeeks.org/find-the-smallest-window-in-a-string-containing-all-characters-of-another-string/
"""
from collections import Counter

def min_window(s, t):
    if not t or not s:
        return ""
    dict_t = Counter(t)
    required = len(dict_t)
    l, r = 0, 0
    formed = 0
    window_counts = {}
    ans = float("inf"), None, None
    while r < len(s):
        character = s[r]
        window_counts[character] = window_counts.get(character, 0) + 1
        if character in dict_t and window_counts[character] == dict_t[character]:
            formed += 1
        while l <= r and formed == required:
            character = s[l]
            if r - l + 1 < ans[0]:
                ans = (r - l + 1, l, r)
            window_counts[character] -= 1
            if character in dict_t and window_counts[character] < dict_t[character]:
                formed -= 1
            l += 1
        r += 1
    return "" if ans[0] == float("inf") else s[ans[1]:ans[2]+1]

# Example usage:
if __name__ == "__main__":
    S1, T1 = "ADOBECODEBANC", "ABC"
    S2, T2 = "a", "a"
    print(min_window(S1, T1))  # Output: "BANC"
    print(min_window(S2, T2))  # Output: "a" 