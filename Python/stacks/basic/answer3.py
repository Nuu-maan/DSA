from typing import List


def find_next_greater_elements(arr: List[int]) -> List[int]:
    """Find the next greater element for each element in the array.
    
    Uses a stack-based approach to achieve O(n) time complexity.
    
    Args:
        arr (List[int]): Input array of integers
        
    Returns:
        List[int]: Array where each element is the next greater element
                  for the corresponding element in input array
    """
    n = len(arr)
    result = [-1] * n  # Initialize result with -1
    stack: List[int] = []  # Stack to store indices
    
    # Process all elements from right to left
    for i in range(n-1, -1, -1):
        # Remove elements smaller than current element
        while stack and arr[stack[-1]] <= arr[i]:
            stack.pop()
            
        # If stack is not empty, top element is the next greater
        if stack:
            result[i] = arr[stack[-1]]
            
        # Push current element's index to stack
        stack.append(i)
    
    return result


def process_test_cases() -> None:
    """Process multiple test cases for finding next greater elements."""
    T = int(input().strip())
    
    for _ in range(T):
        N = int(input().strip())
        arr = list(map(int, input().strip().split()))
        
        # Find next greater elements
        result = find_next_greater_elements(arr)
        
        # Print result
        print(' '.join(map(str, result)))


if __name__ == "__main__":
    process_test_cases() 