"""
Strongly Connected Components (Kosaraju's Algorithm)
Source: https://www.geeksforgeeks.org/strongly-connected-components/
"""
def kosaraju_scc(V, adj):
    def dfs(v, visited, stack):
        visited[v] = True
        for u in adj[v]:
            if not visited[u]:
                dfs(u, visited, stack)
        stack.append(v)
    def reverse_graph(V, adj):
        rev = [[] for _ in range(V)]
        for v in range(V):
            for u in adj[v]:
                rev[u].append(v)
        return rev
    def dfs_collect(v, visited, component, rev_adj):
        visited[v] = True
        component.append(v)
        for u in rev_adj[v]:
            if not visited[u]:
                dfs_collect(u, visited, component, rev_adj)
    stack = []
    visited = [False] * V
    for v in range(V):
        if not visited[v]:
            dfs(v, visited, stack)
    rev_adj = reverse_graph(V, adj)
    visited = [False] * V
    sccs = []
    while stack:
        v = stack.pop()
        if not visited[v]:
            component = []
            dfs_collect(v, visited, component, rev_adj)
            sccs.append(sorted(component))
    return sccs

# Example usage:
# V = 5
# adj = [[1], [2,3], [0], [4], []]
# print(kosaraju_scc(V, adj))  # Output: [[0,1,2],[3],[4]] 