import heapq
from typing import List

def shortestDistance(maze: List[List[int]], start: List[int], destination: List[int]) -> int:
    """
    LeetCode 505: The Maze II
    Returns the shortest distance for the ball to stop at the destination, or -1 if not possible.
    """
    m, n = len(maze), len(maze[0])
    heap = [(0, start[0], start[1])]
    dist = [[float('inf')] * n for _ in range(m)]
    dist[start[0]][start[1]] = 0
    directions = [(-1,0), (1,0), (0,-1), (0,1)]
    while heap:
        d, x, y = heapq.heappop(heap)
        if [x, y] == destination:
            return d
        for dx, dy in directions:
            nx, ny, nd = x, y, d
            while 0 <= nx+dx < m and 0 <= ny+dy < n and maze[nx+dx][ny+dy] == 0:
                nx += dx
                ny += dy
                nd += 1
            if dist[nx][ny] > nd:
                dist[nx][ny] = nd
                heapq.heappush(heap, (nd, nx, ny))
    return -1

if __name__ == "__main__":
    maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]]
    start = [0,4]
    destination = [4,4]
    print(shortestDistance(maze, start, destination))  # Output: 12 