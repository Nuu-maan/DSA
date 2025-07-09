from collections import deque
from typing import Deque

class RecentCounter:
    """
    LeetCode 933: Number of Recent Calls
    Maintains a queue of request times and returns the number of requests in the last 3000 ms.
    """
    def __init__(self) -> None:
        self.q: Deque[int] = deque()

    def ping(self, t: int) -> int:
        """Add a new request at time t and return the number of requests in the last 3000 ms."""
        self.q.append(t)
        while self.q and self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)

if __name__ == "__main__":
    rc = RecentCounter()
    print(rc.ping(1))     # Output: 1
    print(rc.ping(100))   # Output: 2
    print(rc.ping(3001))  # Output: 3
    print(rc.ping(3002))  # Output: 3 