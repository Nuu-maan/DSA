#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Approach 1: Moves-based DP
    // dp[m][k] = maximum floors that can be checked with m moves and k eggs
    // Transition: dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1
    // Find minimal m such that dp[m][k] >= n
    // Time: O(k * m) where m is answer (typically ~ O(k log n))
    int superEggDrop_MovesDP(int k, int n) {
        if (n == 0 || n == 1) return n;
        if (k == 1) return n;
        vector<long long> dp(k + 1, 0);
        int moves = 0;
        while (dp[k] < n) {
            ++moves;
            for (int e = k; e >= 1; --e) {
                dp[e] = dp[e] + dp[e - 1] + 1; // in place update from high to low eggs
            }
        }
        return moves;
    }

    // Approach 2: Top-Down with Binary Search on dropping floor
    // f(k, n) = 1 + min_x max(f(k-1,x-1), f(k, n-x))
    // Use monotonicity to binary-search x. Memoize (k,n).
    // Time: ~O(k * n log n) worst-case for moderate constraints; good for smaller n.
    int superEggDrop_MemoBS(int k, int n) {
        unordered_map<long long, int> memo; // key = ((long long)k<<32) | n
        function<int(int,int)> dfs = [&](int kk, int nn) -> int {
            if (nn == 0 || nn == 1) return nn;
            if (kk == 1) return nn;
            long long key = (static_cast<long long>(kk) << 32) | static_cast<unsigned int>(nn);
            if (auto it = memo.find(key); it != memo.end()) return it->second;
            int lo = 1, hi = nn, best = nn; // upper bound nn
            while (lo <= hi) {
                int mid = lo + (hi - lo) / 2;
                int broken = dfs(kk - 1, mid - 1);   // egg breaks
                int notBroken = dfs(kk, nn - mid);   // egg survives
                best = min(best, 1 + max(broken, notBroken));
                if (broken < notBroken) lo = mid + 1; // move up
                else hi = mid - 1;                    // move down
            }
            return memo[key] = best;
        };
        return dfs(k, n);
    }
};

static void runTests() {
    Solution sol;
    struct T { int k; int n; int exp; };
    vector<T> tests = {
        {1, 2, 2},
        {2, 6, 3},
        {3, 14, 4},
        {2, 1, 1},
        {2, 2, 2},
        {3, 0, 0},
        {3, 1, 1},
        {4, 100, 8}, // known result
    };
    for (const auto& t : tests) {
        int a = sol.superEggDrop_MovesDP(t.k, t.n);
        int b = sol.superEggDrop_MemoBS(t.k, t.n);
        cout << "k=" << t.k << ", n=" << t.n << ", exp=" << t.exp << "\n";
        cout << "MovesDP: " << (a==t.exp? "[OK]":"[X]") << " ("<<a<<")\n";
        cout << "MemoBS:  " << (b==t.exp? "[OK]":"[X]") << " ("<<b<<")\n";
        cout << string(40,'-') << "\n";
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    runTests();
    return 0;
}
