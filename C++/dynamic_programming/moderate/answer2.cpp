#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Approach 1: Bottom-Up DP from bottom-right
    // Time: O(m*n), Space: O(m*n)
    int calculateMinimumHP_DP(const vector<vector<int>>& dungeon) {
        if (dungeon.empty() || dungeon[0].empty()) return 1;
        const int m = (int)dungeon.size();
        const int n = (int)dungeon[0].size();
        const int INF = 1e9;
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, INF));
        dp[m][n - 1] = dp[m - 1][n] = 1; // virtual cells to simplify transitions
        for (int i = m - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                int need = min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
                dp[i][j] = max(1, need);
            }
        }
        return dp[0][0];
    }

    // Approach 2: Top-Down Memoization
    // Time: O(m*n), Space: O(m*n)
    int calculateMinimumHP_Memo(const vector<vector<int>>& dungeon) {
        if (dungeon.empty() || dungeon[0].empty()) return 1;
        const int m = (int)dungeon.size();
        const int n = (int)dungeon[0].size();
        const int INF = 1e9;
        vector<vector<int>> memo(m, vector<int>(n, -1));
        function<int(int,int)> dfs = [&](int i, int j) -> int {
            if (i == m - 1 && j == n - 1) {
                return max(1, 1 - dungeon[i][j]);
            }
            int &res = memo[i][j];
            if (res != -1) return res;
            int down = (i + 1 < m) ? dfs(i + 1, j) : INF;
            int right = (j + 1 < n) ? dfs(i, j + 1) : INF;
            int needNext = min(down, right);
            int needHere = needNext - dungeon[i][j];
            return res = max(1, needHere);
        };
        return dfs(0, 0);
    }
};

static void runTests() {
    Solution sol;
    struct T { vector<vector<int>> d; int exp; };
    vector<T> tests = {
        {{{-2,-3,3},{-5,-10,1},{10,30,-5}}, 7},
        {{{0}}, 1},
        {{{100}}, 1},
        {{{-1}}, 2},
        {{{1,-3,3},{0,-2,0},{-3,-3,-3}}, 3}, // common extra test
    };
    for (const auto& t : tests) {
        int a = sol.calculateMinimumHP_DP(t.d);
        int b = sol.calculateMinimumHP_Memo(t.d);
        cout << "Expected=" << t.exp << "\n";
        cout << "DP:   " << (a==t.exp? "[OK]":"[X]") << " ("<<a<<")\n";
        cout << "Memo: " << (b==t.exp? "[OK]":"[X]") << " ("<<b<<")\n";
        cout << string(40,'-') << "\n";
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    runTests();
    return 0;
}
