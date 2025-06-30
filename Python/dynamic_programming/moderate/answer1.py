"""
Longest Increasing Subsequence
Source: https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/
"""

def lis(arr):
    n = len(arr)
    dp = [1] * n
    for i in range(1, n):
        for j in range(i):
            if arr[i] > arr[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp) if arr else 0

# Example usage:
if __name__ == "__main__":
    arr = [10, 22, 9, 33, 21, 50, 41, 60, 80]
    print(lis(arr))  # Output: 6 