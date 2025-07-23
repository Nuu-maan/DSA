from typing import List


def largest_rectangle_area(heights: List[int]) -> int:
    """Find the area of the largest rectangle in the histogram.
    
    Uses a stack-based approach to achieve O(n) time complexity.
    For each bar, we find the first smaller bar on left and right
    to determine the maximum width of rectangle with current height.
    
    Args:
        heights (List[int]): Array of histogram bar heights
        
    Returns:
        int: Area of the largest rectangle
    """
    n = len(heights)
    stack: List[int] = []  # Stack to store indices
    max_area = 0
    
    # Process all bars from left to right
    for i in range(n + 1):
        # Use height 0 for last iteration to pop all remaining bars
        h = heights[i] if i < n else 0
        
        # Pop bars that are taller than current bar
        while stack and heights[stack[-1]] > h:
            # Height of rectangle is the popped bar's height
            height = heights[stack.pop()]
            
            # Width is distance between first smaller bars on left and right
            # Left smaller bar is the new top of stack (or -1 if stack empty)
            # Right smaller bar is the current position i
            width = i - (stack[-1] if stack else -1) - 1
            
            max_area = max(max_area, height * width)
        
        stack.append(i)
    
    return max_area


def test_largest_rectangle() -> None:
    """Test the largest_rectangle_area function with example cases."""
    # Test case 1: [2,1,5,6,2,3]
    heights1 = [2, 1, 5, 6, 2, 3]
    print(f"Test case 1: {heights1}")
    print(f"Expected: 10")
    print(f"Got: {largest_rectangle_area(heights1)}\n")
    
    # Test case 2: [2,4]
    heights2 = [2, 4]
    print(f"Test case 2: {heights2}")
    print(f"Expected: 4")
    print(f"Got: {largest_rectangle_area(heights2)}\n")
    
    # Test case 3: [1,1]
    heights3 = [1, 1]
    print(f"Test case 3: {heights3}")
    print(f"Expected: 2")
    print(f"Got: {largest_rectangle_area(heights3)}")


if __name__ == "__main__":
    test_largest_rectangle() 