from collections import deque
from typing import Deque

class HitCounter:
    """
    LeetCode 362: Design Hit Counter
    Counts the number of hits received in the past 5 minutes (300 seconds).
    """
    def __init__(self) -> None:
        self.hits: Deque[int] = deque()

    def hit(self, timestamp: int) -> None:
        """Record a hit at the given timestamp (in seconds)."""
        self.hits.append(timestamp)

    def getHits(self, timestamp: int) -> int:
        """Return the number of hits in the past 5 minutes from timestamp."""
        while self.hits and self.hits[0] <= timestamp - 300:
            self.hits.popleft()
        return len(self.hits)

if __name__ == "__main__":
    hc = HitCounter()
    hc.hit(1)
    hc.hit(2)
    hc.hit(3)
    print(hc.getHits(4))    # Output: 3
    hc.hit(300)
    print(hc.getHits(300))  # Output: 4
    print(hc.getHits(301))  # Output: 3 