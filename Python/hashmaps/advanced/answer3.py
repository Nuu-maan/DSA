"""
Find the longest substring with k unique characters.
Source: https://www.geeksforgeeks.org/find-the-longest-substring-with-k-unique-characters-in-a-given-string/
"""
def longest_k_substring(s, k):
    n = len(s)
    if n * k == 0:
        return 0
    left = 0
    right = 0
    max_len = 0
    char_count = {}
    while right < n:
        char_count[s[right]] = char_count.get(s[right], 0) + 1
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1
        if len(char_count) == k:
            max_len = max(max_len, right - left + 1)
        right += 1
    return max_len

# Example usage:
if __name__ == "__main__":
    print(longest_k_substring("aabbcc", 1))  # Output: 2
    print(longest_k_substring("aabbcc", 2))  # Output: 4
    print(longest_k_substring("aabbcc", 3))  # Output: 6 