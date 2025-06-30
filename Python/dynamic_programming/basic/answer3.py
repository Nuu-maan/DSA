"""
Minimum Number of Coins
Source: https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/
"""

def min_coins(coins, V):
    dp = [float('inf')] * (V + 1)
    dp[0] = 0
    for i in range(1, V + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[V] if dp[V] != float('inf') else -1

# Example usage:
if __name__ == "__main__":
    print(min_coins([25, 10, 5], 30))  # Output: 2 