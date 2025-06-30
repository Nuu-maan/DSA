"""
Detect Cycle in an Undirected Graph
Source: https://www.geeksforgeeks.org/detect-cycle-in-an-undirected-graph/
"""
def is_cycle(V, adj):
    visited = [False] * V
    def dfs(node, parent):
        visited[node] = True
        for neighbor in adj[node]:
            if not visited[neighbor]:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True
        return False
    for v in range(V):
        if not visited[v]:
            if dfs(v, -1):
                return True
    return False

# Example usage:
# V = 5
# adj = [[1], [0,2,4], [1,3], [2,4], [1,3]]
# print(is_cycle(V, adj))  # Output: True 