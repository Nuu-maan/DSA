"""
Smallest Range Having Elements From K Lists
Source: https://www.geeksforgeeks.org/find-smallest-range-containing-elements-from-k-lists/
"""

import heapq

def smallest_range_k_lists(arr):
    k = len(arr)
    heap = []
    max_val = float('-inf')
    for i in range(k):
        heapq.heappush(heap, (arr[i][0], i, 0))
        max_val = max(max_val, arr[i][0])
    best_range = float('-inf'), float('inf')
    while True:
        min_val, row, idx = heapq.heappop(heap)
        if max_val - min_val < best_range[1] - best_range[0]:
            best_range = (min_val, max_val)
        if idx + 1 == len(arr[row]):
            break
        next_val = arr[row][idx + 1]
        heapq.heappush(heap, (next_val, row, idx + 1))
        max_val = max(max_val, next_val)
    return list(best_range)

# Example usage:
if __name__ == "__main__":
    arr = [[4, 7, 9, 12, 15], [0, 8, 10, 14, 20], [6, 12, 16, 30, 50]]
    print(smallest_range_k_lists(arr))  # Output: [6, 8] 