"""
Group all anagrams in an array of strings.
Source: https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/
"""
from collections import defaultdict

def group_anagrams(words):
    anagrams = defaultdict(list)
    for word in words:
        key = ''.join(sorted(word))
        anagrams[key].append(word)
    return list(anagrams.values())

# Example usage:
if __name__ == "__main__":
    arr1 = ["cat", "dog", "tac", "god", "act"]
    arr2 = ["listen", "silent", "enlist", "google", "gooegl"]
    print(group_anagrams(arr1))  # Output: [['cat', 'tac', 'act'], ['dog', 'god']]
    print(group_anagrams(arr2))  # Output: [['listen', 'silent', 'enlist'], ['google', 'gooegl']] 