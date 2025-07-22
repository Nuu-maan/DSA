import heapq
from typing import List

class MedianFinder:
    """
    Data structure to efficiently add numbers and find the median.
    Uses two heaps to maintain the lower and upper halves.
    """
    def __init__(self) -> None:
        self.small: List[int] = []  # Max heap (invert values)
        self.large: List[int] = []  # Min heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        if self.small and self.large and (-self.small[0] > self.large[0]):
            heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0

# Example usage:
# mf = MedianFinder()
# mf.addNum(1)
# mf.addNum(2)
# print(mf.findMedian())  # Output: 1.5
# mf.addNum(3)
# print(mf.findMedian())  # Output: 2.0 