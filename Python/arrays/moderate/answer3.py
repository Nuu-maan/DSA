"""
Majority Element
Source: https://www.geeksforgeeks.org/majority-element/
"""

def majority_element(arr):
    count = 0
    candidate = None
    for num in arr:
        if count == 0:
            candidate = num
        count += (1 if num == candidate else -1)
    if arr.count(candidate) > len(arr) // 2:
        return candidate
    return -1

# Example usage:
if __name__ == "__main__":
    arr = [3, 1, 3, 3, 2]
    print(majority_element(arr))  # Output: 3 