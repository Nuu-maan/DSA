#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Approach 1: Bottom-Up DP
    // dp[i][j] -> does s[0..i) match p[0..j)
    // Time: O(n*m), Space: O(n*m)
    bool isMatchDP(const string& s, const string& p) {
        const size_t n = s.size(), m = p.size();
        vector<vector<char>> dp(n + 1, vector<char>(m + 1, 0));
        dp[0][0] = 1;
        // patterns like a*b*c* can match empty
        for (size_t j = 2; j <= m; ++j) {
            if (p[j-1] == '*' && dp[0][j-2]) dp[0][j] = 1;
        }
        auto matches = [&](size_t i, size_t j) {
            return i>0 && (p[j-1] == '.' || p[j-1] == s[i-1]);
        };
        for (size_t i = 1; i <= n; ++i) {
            for (size_t j = 1; j <= m; ++j) {
                if (p[j-1] == '*') {
                    // zero of preceding
                    dp[i][j] = dp[i][j] || dp[i][j-2];
                    // one or more of preceding
                    if (matches(i, j-1)) dp[i][j] = dp[i][j] || dp[i-1][j];
                } else {
                    if (matches(i, j)) dp[i][j] = dp[i][j] || dp[i-1][j-1];
                }
            }
        }
        return dp[n][m];
    }

    // Approach 2: Top-Down Memoization
    // Time: O(n*m)
    bool isMatchMemo(const string& s, const string& p) {
        const size_t n = s.size(), m = p.size();
        vector<vector<int>> memo(n+1, vector<int>(m+1, -1));
        function<int(size_t,size_t)> dfs = [&](size_t i, size_t j) -> int {
            if (j == m) return i == n;
            int &res = memo[i][j];
            if (res != -1) return res;
            bool first = (i < n) && (p[j] == '.' || p[j] == s[i]);
            bool ans;
            if (j + 1 < m && p[j+1] == '*') {
                ans = (dfs(i, j+2) || (first && dfs(i+1, j)));
            } else {
                ans = first && dfs(i+1, j+1);
            }
            return res = ans ? 1 : 0;
        };
        return dfs(0, 0);
    }
};

static void runTests() {
    Solution sol;
    struct T { string s, p; bool exp; };
    vector<T> tests = {
        {"aa","a", false},
        {"aa","a*", true},
        {"ab",".*", true},
        {"aab","c*a*b", true},
        {"mississippi","mis*is*p*.", false},
        {"","c*", false},
        {"","a*b*", true},
    };
    for (const auto& t : tests) {
        bool a = sol.isMatchDP(t.s, t.p);
        bool b = sol.isMatchMemo(t.s, t.p);
        cout << "s=\""<<t.s<<"\", p=\""<<t.p<<"\"\n";
        cout << "DP:   " << (a==t.exp? "[OK]":"[X]") << " ("<<(a?"true":"false")<<")\n";
        cout << "Memo: " << (b==t.exp? "[OK]":"[X]") << " ("<<(b?"true":"false")<<")\n";
        cout << string(40,'-') << "\n";
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    runTests();
    return 0;
}
