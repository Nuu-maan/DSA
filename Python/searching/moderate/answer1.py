from typing import List

def find_median_sorted_arrays(nums1: List[int], nums2: List[int]) -> float:
    """
    Finds the median of two sorted arrays in O(log(min(m, n))) time.
    """
    A, B = nums1, nums2
    m, n = len(A), len(B)
    if m > n:
        A, B, m, n = B, A, n, m
    imin, imax, half_len = 0, m, (m + n + 1) // 2
    while imin <= imax:
        i = (imin + imax) // 2
        j = half_len - i
        if i < m and B[j-1] > A[i]:
            imin = i + 1
        elif i > 0 and A[i-1] > B[j]:
            imax = i - 1
        else:
            if i == 0: max_of_left = B[j-1]
            elif j == 0: max_of_left = A[i-1]
            else: max_of_left = max(A[i-1], B[j-1])
            if (m + n) % 2 == 1:
                return float(max_of_left)
            if i == m: min_of_right = B[j]
            elif j == n: min_of_right = A[i]
            else: min_of_right = min(A[i], B[j])
            return (max_of_left + min_of_right) / 2.0
    raise ValueError("Input arrays are not sorted or empty.")

if __name__ == "__main__":
    # Example 1
    print(find_median_sorted_arrays([1,3], [2]))  # Output: 2.0
    # Example 2
    print(find_median_sorted_arrays([1,2], [3,4]))  # Output: 2.5 