"""
Trapping Rain Water
Source: https://www.geeksforgeeks.org/trapping-rain-water/
"""

def trap_rain_water(arr):
    n = len(arr)
    if n == 0:
        return 0
    left_max = [0] * n
    right_max = [0] * n
    left_max[0] = arr[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i-1], arr[i])
    right_max[n-1] = arr[n-1]
    for i in range(n-2, -1, -1):
        right_max[i] = max(right_max[i+1], arr[i])
    water = 0
    for i in range(n):
        water += min(left_max[i], right_max[i]) - arr[i]
    return water

# Example usage:
if __name__ == "__main__":
    arr = [3, 0, 0, 2, 0, 4]
    print(trap_rain_water(arr))  # Output: 10 