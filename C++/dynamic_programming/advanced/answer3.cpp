#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Approach 1: Bottom-Up DP (classic)
    // dp[i][j] = min edits to convert word1[0..i) to word2[0..j)
    // Time: O(n*m), Space: O(n*m)
    int minDistanceDP(const string& a, const string& b) {
        const size_t n = a.size(), m = b.size();
        vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
        for (size_t i = 0; i <= n; ++i) dp[i][0] = (int)i;
        for (size_t j = 0; j <= m; ++j) dp[0][j] = (int)j;
        for (size_t i = 1; i <= n; ++i) {
            for (size_t j = 1; j <= m; ++j) {
                if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1];
                else dp[i][j] = 1 + min({ dp[i-1][j],    // delete
                                          dp[i][j-1],    // insert
                                          dp[i-1][j-1] });// replace
            }
        }
        return dp[n][m];
    }

    // Approach 2: Space-optimized 1D DP
    // Time: O(n*m), Space: O(min(n,m)) if we roll rows by shorter string
    int minDistance1D(const string& a, const string& b) {
        const string &s = (a.size() < b.size() ? a : b);
        const string &t = (a.size() < b.size() ? b : a);
        const size_t n = s.size(), m = t.size();
        vector<int> prev(n+1), cur(n+1);
        iota(prev.begin(), prev.end(), 0); // prev[j] = j
        for (size_t i = 1; i <= m; ++i) {
            cur[0] = (int)i;
            for (size_t j = 1; j <= n; ++j) {
                if (t[i-1] == s[j-1]) cur[j] = prev[j-1];
                else cur[j] = 1 + min({ prev[j],    // delete from t
                                         cur[j-1],   // insert into t
                                         prev[j-1] });// replace
            }
            swap(prev, cur);
        }
        return prev[n];
    }

    // Approach 3: Memoized recursion
    int minDistanceMemo(const string& a, const string& b) {
        const size_t n = a.size(), m = b.size();
        vector<vector<int>> memo(n+1, vector<int>(m+1, -1));
        function<int(size_t,size_t)> dfs = [&](size_t i, size_t j) -> int {
            if (i == n) return (int)(m - j);
            if (j == m) return (int)(n - i);
            int &res = memo[i][j];
            if (res != -1) return res;
            if (a[i] == b[j]) return res = dfs(i+1, j+1);
            int ins = 1 + dfs(i, j+1);
            int del = 1 + dfs(i+1, j);
            int rep = 1 + dfs(i+1, j+1);
            return res = min({ins, del, rep});
        };
        return dfs(0, 0);
    }
};

static void runTests() {
    Solution sol;
    struct T { string a, b; int exp; };
    vector<T> tests = {
        {"horse","ros", 3},
        {"intention","execution", 5},
        {"","", 0},
        {"","a", 1},
        {"a","", 1},
        {"abc","yabd", 2}, // replace a->y, insert d
    };
    for (const auto& t : tests) {
        int a = sol.minDistanceDP(t.a, t.b);
        int b = sol.minDistance1D(t.a, t.b);
        int c = sol.minDistanceMemo(t.a, t.b);
        cout << "(\""<<t.a<<"\", \""<<t.b<<"\") exp="<<t.exp<<"\n";
        cout << "DP2D: " << (a==t.exp? "[OK]":"[X]") << " ("<<a<<")\n";
        cout << "DP1D: " << (b==t.exp? "[OK]":"[X]") << " ("<<b<<")\n";
        cout << "Memo: " << (c==t.exp? "[OK]":"[X]") << " ("<<c<<")\n";
        cout << string(40,'-') << "\n";
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    runTests();
    return 0;
}
