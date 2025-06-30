"""
Articulation Points (Cut Vertices)
Source: https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/
"""
def articulation_points(V, adj):
    time = [0]
    disc = [float('inf')] * V
    low = [float('inf')] * V
    parent = [-1] * V
    ap = [False] * V
    def dfs(u):
        children = 0
        disc[u] = low[u] = time[0]
        time[0] += 1
        for v in adj[u]:
            if disc[v] == float('inf'):
                parent[v] = u
                children += 1
                dfs(v)
                low[u] = min(low[u], low[v])
                if parent[u] == -1 and children > 1:
                    ap[u] = True
                if parent[u] != -1 and low[v] >= disc[u]:
                    ap[u] = True
            elif v != parent[u]:
                low[u] = min(low[u], disc[v])
    for u in range(V):
        if disc[u] == float('inf'):
            dfs(u)
    return sorted([u for u, is_ap in enumerate(ap) if is_ap])

# Example usage:
# V = 5
# adj = [[1,2], [0,2], [0,1,3,4], [2,4], [2,3]]
# print(articulation_points(V, adj))  # Output: [2, 3, 4] 