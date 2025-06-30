"""
Breadth First Search (BFS) of Graph
Source: https://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/
"""
from collections import deque

def bfs_of_graph(V, adj):
    visited = [False] * V
    queue = deque([0])
    visited[0] = True
    result = []
    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in adj[node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)
    return result

# Example usage:
# V = 5
# adj = [[1,2,3], [0], [0,4], [0], [2]]
# print(bfs_of_graph(V, adj))  # Output: [0, 1, 2, 3, 4] 