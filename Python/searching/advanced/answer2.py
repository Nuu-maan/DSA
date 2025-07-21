from typing import List

def find_duplicate(nums: List[int]) -> int:
    """
    Finds the duplicate number in nums using Floyd's Tortoise and Hare algorithm.
    Does not modify the array and uses constant extra space.
    """
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow

if __name__ == "__main__":
    # Example 1
    print(find_duplicate([1,3,4,2,2]))  # Output: 2
    # Example 2
    print(find_duplicate([3,1,3,4,2]))  # Output: 3 