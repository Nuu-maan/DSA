#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Approach 1: Memoization (Top-Down)
    // Time: O(n * V), Space: O(V)
    int minCoinsMemo(const vector<int>& coins, int V) {
        vector<int> memo(static_cast<size_t>(V) + 1, -2); // -2 = uncomputed, -1 = impossible
        memo[0] = 0;
        function<int(int)> dfs = [&](int amount) -> int {
            if (amount < 0) return -1;
            if (memo[static_cast<size_t>(amount)] != -2) return memo[static_cast<size_t>(amount)];
            int best = INT_MAX;
            for (int c : coins) {
                int sub = dfs(amount - c);
                if (sub >= 0) best = min(best, sub + 1);
            }
            memo[static_cast<size_t>(amount)] = (best == INT_MAX ? -1 : best);
            return memo[static_cast<size_t>(amount)];
        };
        return dfs(V);
    }

    // Approach 2: Bottom-Up 1D DP
    // Time: O(n * V), Space: O(V)
    int minCoinsDP(const vector<int>& coins, int V) {
        const int INF = 1e9;
        vector<int> dp(static_cast<size_t>(V) + 1, INF);
        dp[0] = 0;
        for (int a = 1; a <= V; ++a) {
            for (int c : coins) {
                if (a - c >= 0 && dp[static_cast<size_t>(a - c)] != INF) {
                    dp[static_cast<size_t>(a)] = min(dp[static_cast<size_t>(a)], dp[static_cast<size_t>(a - c)] + 1);
                }
            }
        }
        return dp[static_cast<size_t>(V)] >= INF ? -1 : dp[static_cast<size_t>(V)];
    }

    // Approach 3: BFS on amounts (optional alternative)
    // Time: O(n * V) in worst case, Space: O(V)
    int minCoinsBFS(const vector<int>& coins, int V) {
        if (V == 0) return 0;
        vector<int> dist(static_cast<size_t>(V) + 1, -1);
        queue<int> q;
        dist[0] = 0; q.push(0);
        while (!q.empty()) {
            int cur = q.front(); q.pop();
            for (int c : coins) {
                int nxt = cur + c;
                if (nxt > V) continue;
                if (dist[static_cast<size_t>(nxt)] == -1) {
                    dist[static_cast<size_t>(nxt)] = dist[static_cast<size_t>(cur)] + 1;
                    if (nxt == V) return dist[static_cast<size_t>(nxt)];
                    q.push(nxt);
                }
            }
        }
        return -1;
    }
};

static void runTests() {
    Solution sol;
    struct T { vector<int> coins; int V; int exp; };
    vector<T> tests = {
        {{1,2,5}, 11, 3},     // 5+5+1
        {{2}, 3, -1},         // impossible
        {{1}, 0, 0},          // zero amount
        {{1,3,4}, 6, 2},      // 3+3 or 4+1+1 (best is 2)
        {{2,5,10,1}, 27, 4},  // 10+10+5+2
    };

    for (const auto& t : tests) {
        int a = sol.minCoinsMemo(t.coins, t.V);
        int b = sol.minCoinsDP(t.coins, t.V);
        int c = sol.minCoinsBFS(t.coins, t.V);
        cout << "V=" << t.V << ", coins=["; for (size_t i=0;i<t.coins.size();++i){ if(i) cout<<","; cout<<t.coins[i]; } cout << "]\n";
        cout << "Memo:   " << (a==t.exp? "\xE2\x9C\x93":"\xE2\x9C\x97") << " ("<<a<<")\n";
        cout << "DP:     " << (b==t.exp? "\xE2\x9C\x93":"\xE2\x9C\x97") << " ("<<b<<")\n";
        cout << "BFS:    " << (c==t.exp? "\xE2\x9C\x93":"\xE2\x9C\x97") << " ("<<c<<")\n";
        cout << string(40,'-') << "\n";
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    runTests();
    return 0;
}
