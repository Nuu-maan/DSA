from typing import List

def countSmaller(nums: List[int]) -> List[int]:
    """
    For each element, count the number of smaller elements to its right.
    Args:
        nums: List of integers.
    Returns:
        List[int]: List of counts.
    """
    result = [0] * len(nums)
    enum = list(enumerate(nums))

    def merge_sort(enum):
        mid = len(enum) // 2
        if mid:
            left, right = merge_sort(enum[:mid]), merge_sort(enum[mid:])
            m, n = len(left), len(right)
            i = j = 0
            merged = []
            while i < m or j < n:
                if j == n or (i < m and left[i][1] > right[j][1]):
                    result[left[i][0]] += j
                    merged.append(left[i])
                    i += 1
                else:
                    merged.append(right[j])
                    j += 1
            return merged
        else:
            return enum
    merge_sort(enum)
    return result

# Example usage:
# print(countSmaller([5,2,6,1]))  # Output: [2,1,1,0] 