from typing import List

def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    """
    Find the median of two sorted arrays in O(log(m+n)) time.
    Uses binary search on the smaller array to find the correct partition point.
    
    Args:
        nums1: First sorted array
        nums2: Second sorted array
    Returns:
        float: Median of the two arrays
    """
    # Ensure nums1 is the smaller array
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    left, right = 0, m
    
    while left <= right:
        # Partition points
        partitionX = (left + right) // 2
        partitionY = (m + n + 1) // 2 - partitionX
        
        # Get left and right elements for both arrays
        maxLeftX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
        minRightX = float('inf') if partitionX == m else nums1[partitionX]
        
        maxLeftY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
        minRightY = float('inf') if partitionY == n else nums2[partitionY]
        
        # Check if we found the correct partition
        if maxLeftX <= minRightY and maxLeftY <= minRightX:
            # If total length is odd
            if (m + n) % 2 == 1:
                return float(max(maxLeftX, maxLeftY))
            # If total length is even
            return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0
        
        # Binary search
        elif maxLeftX > minRightY:
            right = partitionX - 1
        else:
            left = partitionX + 1
    
    raise ValueError("Input arrays are not sorted")

# Example usage:
# print(findMedianSortedArrays([1,3], [2]))  # Output: 2.0
# print(findMedianSortedArrays([1,2], [3,4]))  # Output: 2.5 