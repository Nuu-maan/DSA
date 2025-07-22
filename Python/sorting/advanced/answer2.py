from typing import List

def countRangeSum(nums: List[int], lower: int, upper: int) -> int:
    """
    Count the number of range sums that lie in [lower, upper] inclusive.
    Uses merge sort with custom counting logic.
    
    Args:
        nums: Array of integers
        lower: Lower bound of range sum
        upper: Upper bound of range sum
    Returns:
        int: Number of range sums in [lower, upper]
    """
    def mergeSort(sums: List[int], start: int, end: int) -> int:
        if end - start <= 1:
            return 0
        
        mid = (start + end) // 2
        count = mergeSort(sums, start, mid) + mergeSort(sums, mid, end)
        
        # Count ranges that cross the middle
        i = j = mid
        for left in sums[start:mid]:
            while i < end and sums[i] - left < lower:
                i += 1
            while j < end and sums[j] - left <= upper:
                j += 1
            count += j - i
        
        # Merge the sorted halves
        merged = []
        l, r = start, mid
        while l < mid and r < end:
            if sums[l] <= sums[r]:
                merged.append(sums[l])
                l += 1
            else:
                merged.append(sums[r])
                r += 1
        merged.extend(sums[l:mid])
        merged.extend(sums[r:end])
        sums[start:end] = merged
        return count

    # Calculate prefix sums
    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)
    
    return mergeSort(prefix, 0, len(prefix))

# Example usage:
# print(countRangeSum([-2,5,-1], -2, 2))  # Output: 3
# print(countRangeSum([0], 0, 0))  # Output: 1 