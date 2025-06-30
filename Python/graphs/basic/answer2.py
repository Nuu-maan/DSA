"""
Depth First Search (DFS) of Graph
Source: https://www.geeksforgeeks.org/depth-first-traversal-for-a-graph/
"""
def dfs_of_graph(V, adj):
    visited = [False] * V
    result = []
    def dfs(node):
        visited[node] = True
        result.append(node)
        for neighbor in adj[node]:
            if not visited[neighbor]:
                dfs(neighbor)
    dfs(0)
    return result

# Example usage:
# V = 4
# adj = [[1,2,3], [0], [0], [0]]
# print(dfs_of_graph(V, adj))  # Output: [0, 1, 2, 3] 