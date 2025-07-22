from typing import List

def reversePairs(nums: List[int]) -> int:
    """
    Count the number of reverse pairs in the array.
    A reverse pair is a pair (i,j) where i < j and nums[i] > 2*nums[j].
    Uses modified merge sort algorithm.
    
    Args:
        nums: Array of integers
    Returns:
        int: Number of reverse pairs
    """
    def mergeSort(nums: List[int], start: int, end: int) -> int:
        if end - start <= 1:
            return 0
        
        mid = (start + end) // 2
        count = mergeSort(nums, start, mid) + mergeSort(nums, mid, end)
        
        # Count reverse pairs
        j = mid
        for i in range(start, mid):
            while j < end and nums[i] > 2 * nums[j]:
                j += 1
            count += j - mid
        
        # Merge the sorted halves
        merged = []
        l, r = start, mid
        while l < mid and r < end:
            if nums[l] <= nums[r]:
                merged.append(nums[l])
                l += 1
            else:
                merged.append(nums[r])
                r += 1
        merged.extend(nums[l:mid])
        merged.extend(nums[r:end])
        nums[start:end] = merged
        return count
    
    return mergeSort(nums, 0, len(nums))

# Example usage:
# print(reversePairs([1,3,2,3,1]))  # Output: 2
# print(reversePairs([2,4,3,5,1]))  # Output: 3 