"""
Climbing Stairs
Source: https://www.geeksforgeeks.org/count-ways-reach-nth-stair/
"""

def count_ways(n):
    if n <= 1:
        return 1
    dp = [0] * (n+1)
    dp[0], dp[1] = 1, 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Example usage:
if __name__ == "__main__":
    print(count_ways(4))  # Output: 5 