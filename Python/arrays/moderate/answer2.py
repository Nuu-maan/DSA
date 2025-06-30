"""
Count Inversions of an Array
Source: https://www.geeksforgeeks.org/count-inversions-array/
"""

def merge_count(arr):
    def merge_sort(arr):
        if len(arr) <= 1:
            return arr, 0
        mid = len(arr) // 2
        left, inv_left = merge_sort(arr[:mid])
        right, inv_right = merge_sort(arr[mid:])
        merged, inv_split = merge(left, right)
        return merged, inv_left + inv_right + inv_split

    def merge(left, right):
        result = []
        i = j = inv_count = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                inv_count += len(left) - i
                j += 1
        result += left[i:]
        result += right[j:]
        return result, inv_count

    _, count = merge_sort(arr)
    return count

# Example usage:
if __name__ == "__main__":
    arr = [1, 20, 6, 4, 5]
    print(merge_count(arr))  # Output: 5 