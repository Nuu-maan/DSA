#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Approach 1: O(n^2) DP
    int lengthOfLIS_DP(const vector<int>& nums) {
        if (nums.empty()) return 0;
        const size_t n = nums.size();
        vector<int> dp(n, 1);
        int best = 1;
        for (size_t i = 1; i < n; ++i) {
            for (size_t j = 0; j < i; ++j) {
                if (nums[j] < nums[i]) dp[i] = max(dp[i], dp[j] + 1);
            }
            best = max(best, dp[i]);
        }
        return best;
    }

    // Approach 2: Patience Sorting (O(n log n))
    int lengthOfLIS_BinarySearch(const vector<int>& nums) {
        vector<int> tails; // tails[len-1] = min possible tail value of an LIS of length len
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) tails.push_back(x);
            else *it = x;
        }
        return static_cast<int>(tails.size());
    }

    // Approach 3: Memoized recursion (for completeness)
    int lengthOfLIS_Memo(const vector<int>& nums) {
        const size_t n = nums.size();
        vector<int> memo(n, -1);
        function<int(size_t)> dfs = [&](size_t i) -> int {
            if (memo[i] != -1) return memo[i];
            int best = 1;
            for (size_t j = 0; j < i; ++j) {
                if (nums[j] < nums[i]) best = max(best, dfs(j) + 1);
            }
            return memo[i] = best;
        };
        int ans = 0;
        for (size_t i = 0; i < n; ++i) ans = max(ans, dfs(i));
        return ans;
    }
};

static void runTests() {
    Solution sol;
    struct T { vector<int> arr; int exp; };
    vector<T> tests = {
        {{10,9,2,5,3,7,101,18}, 4},
        {{0,1,0,3,2,3}, 4},
        {{7,7,7,7,7,7,7}, 1},
        {{}, 0},
        {{1}, 1},
        {{4,10,4,3,8,9}, 3}, // 4,8,9
    };

    for (const auto& t : tests) {
        int a = sol.lengthOfLIS_DP(t.arr);
        int b = sol.lengthOfLIS_BinarySearch(t.arr);
        int c = sol.lengthOfLIS_Memo(t.arr);
        cout << "arr=["; for (size_t i=0;i<t.arr.size();++i){ if(i) cout<<","; cout<<t.arr[i]; } cout << "]\n";
        cout << "DP O(n^2):        " << (a==t.exp? "\xE2\x9C\x93":"\xE2\x9C\x97") << " ("<<a<<")\n";
        cout << "BinarySearch O(nlogn): " << (b==t.exp? "\xE2\x9C\x93":"\xE2\x9C\x97") << " ("<<b<<")\n";
        cout << "Memoized:         " << (c==t.exp? "\xE2\x9C\x93":"\xE2\x9C\x97") << " ("<<c<<")\n";
        cout << string(40,'-') << "\n";
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    runTests();
    return 0;
}
