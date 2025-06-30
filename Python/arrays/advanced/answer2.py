"""
Maximum Circular Subarray Sum
Source: https://www.geeksforgeeks.org/maximum-contiguous-circular-sum/
"""

def max_circular_sum(arr):
    def kadane(nums):
        max_end = max_so_far = nums[0]
        for x in nums[1:]:
            max_end = max(x, max_end + x)
            max_so_far = max(max_so_far, max_end)
        return max_so_far
    max_kadane = kadane(arr)
    max_wrap = sum(arr) + kadane([-x for x in arr])
    if max_wrap == 0:
        return max_kadane
    return max(max_kadane, max_wrap)

# Example usage:
if __name__ == "__main__":
    arr = [8, -8, 9, -9, 10, -11, 12]
    print(max_circular_sum(arr))  # Output: 22 