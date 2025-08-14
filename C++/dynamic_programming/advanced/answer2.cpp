#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Approach 1: Bottom-Up DP
    // dp[i][j] -> s[0..i) matches p[0..j)
    // Time: O(n*m), Space: O(n*m)
    bool isMatchDP(const string& s, const string& p) {
        const size_t n = s.size(), m = p.size();
        vector<vector<char>> dp(n+1, vector<char>(m+1, 0));
        dp[0][0] = 1;
        for (size_t j = 1; j <= m; ++j)
            if (p[j-1] == '*') dp[0][j] = dp[0][j-1];
        for (size_t i = 1; i <= n; ++i) {
            for (size_t j = 1; j <= m; ++j) {
                if (p[j-1] == '*') {
                    // '*' matches empty (dp[i][j-1]) or one more char (dp[i-1][j])
                    dp[i][j] = dp[i][j-1] || dp[i-1][j];
                } else if (p[j-1] == '?' || p[j-1] == s[i-1]) {
                    dp[i][j] = dp[i-1][j-1];
                }
            }
        }
        return dp[n][m];
    }

    // Approach 2: Greedy two pointers
    // Time: O(n + m) average, worst O(n*m) due to backtracking on star
    bool isMatchGreedy(const string& s, const string& p) {
        size_t i = 0, j = 0, star = string::npos, match = 0;
        const size_t n = s.size(), m = p.size();
        while (i < n) {
            if (j < m && (p[j] == '?' || p[j] == s[i])) { ++i; ++j; }
            else if (j < m && p[j] == '*') { star = j++; match = i; }
            else if (star != string::npos) { j = star + 1; i = ++match; }
            else return false;
        }
        while (j < m && p[j] == '*') ++j;
        return j == m;
    }

    // Approach 3: Memoized recursion
    bool isMatchMemo(const string& s, const string& p) {
        const size_t n = s.size(), m = p.size();
        vector<vector<int>> memo(n+1, vector<int>(m+1, -1));
        function<int(size_t,size_t)> dfs = [&](size_t i, size_t j) -> int {
            if (j == m) return i == n;
            int &res = memo[i][j];
            if (res != -1) return res;
            bool ans = false;
            if (p[j] == '*') {
                // consume zero (*) or one char
                ans = dfs(i, j+1) || (i < n && dfs(i+1, j));
            } else {
                if (i < n && (p[j] == '?' || p[j] == s[i])) ans = dfs(i+1, j+1);
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
        {"aa","*", true},
        {"cb","?a", false},
        {"adceb","*a*b", true},
        {"acdcb","a*c?b", false},
        {"","*", true},
        {"","?", false},
    };
    for (const auto& t : tests) {
        bool a = sol.isMatchDP(t.s, t.p);
        bool b = sol.isMatchGreedy(t.s, t.p);
        bool c = sol.isMatchMemo(t.s, t.p);
        cout << "s=\""<<t.s<<"\", p=\""<<t.p<<"\"\n";
        cout << "DP:     " << (a==t.exp? "[OK]":"[X]") << " ("<<(a?"true":"false")<<")\n";
        cout << "Greedy: " << (b==t.exp? "[OK]":"[X]") << " ("<<(b?"true":"false")<<")\n";
        cout << "Memo:   " << (c==t.exp? "[OK]":"[X]") << " ("<<(c?"true":"false")<<")\n";
        cout << string(40,'-') << "\n";
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    runTests();
    return 0;
}
