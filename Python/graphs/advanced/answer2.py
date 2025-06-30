"""
Minimum Spanning Tree (Kruskal's Algorithm)
Source: https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm/
"""
def kruskal_mst(V, edges):
    parent = list(range(V))
    def find(u):
        while parent[u] != u:
            parent[u] = parent[parent[u]]
            u = parent[u]
        return u
    def union(u, v):
        u_root, v_root = find(u), find(v)
        if u_root != v_root:
            parent[v_root] = u_root
            return True
        return False
    edges.sort(key=lambda x: x[2])
    mst_weight = 0
    count = 0
    for u, v, w in edges:
        if union(u, v):
            mst_weight += w
            count += 1
            if count == V - 1:
                break
    return mst_weight

# Example usage:
# V = 4
# edges = [(0,1,10),(0,2,6),(0,3,5),(1,3,15),(2,3,4)]
# print(kruskal_mst(V, edges))  # Output: 19 