#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Approach 1: Interval DP (Bottom-Up)
    // Time: O(n^3), Space: O(n^2)
    int maxCoinsDP(vector<int> nums) {
        const int n = static_cast<int>(nums.size());
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        const int m = n + 2;
        vector<vector<int>> dp(m, vector<int>(m, 0));
        for (int len = 2; len < m; ++len) { // interval length
            for (int l = 0; l + len < m; ++l) {
                int r = l + len;
                // last balloon to burst in (l, r)
                int best = 0;
                for (int k = l + 1; k < r; ++k) {
                    best = max(best, dp[l][k] + dp[k][r] + nums[l] * nums[k] * nums[r]);
                }
                dp[l][r] = best;
            }
        }
        return dp[0][m - 1];
    }

    // Approach 2: Memoized recursion (Top-Down)
    // Time: O(n^3), Space: O(n^2)
    int maxCoinsMemo(vector<int> nums) {
        const int n = static_cast<int>(nums.size());
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        const int m = n + 2;
        vector<vector<int>> memo(m, vector<int>(m, -1));
        function<int(int,int)> dfs = [&](int l, int r) -> int {
            if (l + 1 >= r) return 0;
            int &res = memo[l][r];
            if (res != -1) return res;
            int best = 0;
            for (int k = l + 1; k < r; ++k) {
                best = max(best, dfs(l, k) + dfs(k, r) + nums[l] * nums[k] * nums[r]);
            }
            return res = best;
        };
        return dfs(0, m - 1);
    }
};

static void runTests() {
    Solution sol;
    vector<vector<int>> tests = {
        {3,1,5,8},
        {1,5},
        {},
        {7},
        {9,76,64,21},
    };
    for (auto t : tests) {
        int a = sol.maxCoinsDP(t);
        int b = sol.maxCoinsMemo(t);
        cout << "nums=["; for (size_t i=0;i<t.size();++i){ if(i) cout<<","; cout<<t[i]; } cout << "]\n";
        cout << "DP:   " << a << "\n";
        cout << "Memo: " << b << "\n";
        cout << string(40,'-') << "\n";
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    runTests();
    return 0;
}
