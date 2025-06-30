"""
Topological Sort
Source: https://www.geeksforgeeks.org/topological-sorting/
"""
def topo_sort(V, adj):
    visited = [False] * V
    stack = []
    def dfs(v):
        visited[v] = True
        for neighbor in adj[v]:
            if not visited[neighbor]:
                dfs(neighbor)
        stack.append(v)
    for v in range(V):
        if not visited[v]:
            dfs(v)
    return stack[::-1]

# Example usage:
# V = 6
# adj = [[2,3], [3,4], [], [4], [], []]
# print(topo_sort(V, adj))  # Output: [1, 0, 2, 3, 4, 5] (one possible order) 