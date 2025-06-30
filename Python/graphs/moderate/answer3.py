"""
Dijkstra's Shortest Path Algorithm
Source: https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-graph/
"""
import heapq

def dijkstra(V, adj, S):
    dist = [float('inf')] * V
    dist[S] = 0
    heap = [(0, S)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    return dist

# Example usage:
# V = 5
# adj = [ [(1,2),(2,4)], [(0,2),(2,1),(3,7)], [(0,4),(1,1),(4,3)], [(1,7),(4,1)], [(2,3),(3,1)] ]
# S = 0
# print(dijkstra(V, adj, S))  # Output: [0, 2, 3, 9, 6] 