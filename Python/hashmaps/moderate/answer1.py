"""
Find the length of the longest consecutive sequence in an array.
Source: https://www.geeksforgeeks.org/longest-consecutive-subsequence/
"""

def longest_consecutive(nums):
    num_set = set(nums)
    longest = 0
    for num in num_set:
        if num - 1 not in num_set:
            current = num
            streak = 1
            while current + 1 in num_set:
                current += 1
                streak += 1
            longest = max(longest, streak)
    return longest

# Example usage:
if __name__ == "__main__":
    arr1 = [1, 9, 3, 10, 4, 20, 2]
    arr2 = [36, 41, 56, 35, 44, 33, 34, 92, 43, 32, 42]
    print(longest_consecutive(arr1))  # Output: 4
    print(longest_consecutive(arr2))  # Output: 5 