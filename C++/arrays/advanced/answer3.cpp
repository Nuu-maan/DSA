/**
 * Minimum Window Subsequence
 * Source: https://leetcode.com/problems/minimum-window-subsequence/
 * 
 * This program finds the minimum window in string s that contains all characters of string t
 * in order, using dynamic programming with O(n*m) time and O(n*m) space complexity.
 */

#include <iostream>
#include <vector>
#include <string>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    /**
     * Find the minimum window in s which will contain all the characters in t in order
     * @param s The input string to search in
     * @param t The target string to find as a subsequence
     * @return The minimum window substring, or empty string if not found
     */
    string minWindow(string s, string t) {
        const size_t m = s.size();
        const size_t n = t.size();
        
        // dp[i][j] represents the starting index of the minimum window in s[0..i-1] 
        // that contains t[0..j-1] as a subsequence
        vector<vector<long long>> dp(m + 1, vector<long long>(n + 1, -1));
        
        // Initialize the first column: empty string is a subsequence of any string
        for (size_t i = 0; i <= m; ++i) {
            dp[i][0] = static_cast<long long>(i);
        }
        
        size_t min_len = string::npos;
        size_t start_pos = string::npos;
        
        // Fill the DP table
        for (size_t i = 1; i <= m; ++i) {
            for (size_t j = 1; j <= n; ++j) {
                // If characters match, we can extend the previous subsequence
                if (s[i-1] == t[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    // Otherwise, carry forward the previous position
                    dp[i][j] = dp[i-1][j];
                }
                
                // If we've found a complete subsequence, update the minimum window
                if (j == n && dp[i][j] != -1) {
                    const size_t current_len = i - static_cast<size_t>(dp[i][j]);
                    if (min_len == string::npos || current_len < min_len) {
                        min_len = current_len;
                        start_pos = static_cast<size_t>(dp[i][j]);
                    }
                }
            }
        }
        
        return (start_pos == string::npos) ? "" : s.substr(start_pos, min_len);
    }
    
    /**
     * Optimized version with O(n) space complexity
     */
    string minWindowOptimized(string s, string t) {
        const size_t m = s.size();
        const size_t n = t.size();
        
        // dp[i] represents the starting index of the minimum window in s[0..i-1]
        // that contains t[0..j-1] as a subsequence (for the current j)
        vector<long long> dp_prev(m + 1, -1);
        vector<long long> dp_curr(m + 1, -1);
        
        // Initialize dp_prev for empty string t
        for (size_t i = 0; i <= m; ++i) {
            dp_prev[i] = static_cast<long long>(i);
        }
        
        size_t min_len = string::npos;
        size_t start_pos = string::npos;
        
        for (size_t j = 1; j <= n; ++j) {
            // Initialize dp_curr[0] to -1 for j > 0
            dp_curr[0] = -1;
            
            for (size_t i = 1; i <= m; ++i) {
                if (s[i-1] == t[j-1]) {
                    dp_curr[i] = dp_prev[i-1];
                } else {
                    dp_curr[i] = dp_curr[i-1];
                }
                
                // If we've found a complete subsequence, update the minimum window
                if (j == n && dp_curr[i] != -1) {
                    const size_t current_len = i - static_cast<size_t>(dp_curr[i]);
                    if (min_len == string::npos || current_len < min_len) {
                        min_len = current_len;
                        start_pos = static_cast<size_t>(dp_curr[i]);
                    }
                }
            }
            
            // Swap dp_prev and dp_curr for next iteration
            swap(dp_prev, dp_curr);
        }
        
        return (start_pos == string::npos) ? "" : s.substr(start_pos, min_len);
    }
};

// Test function
void testMinWindow() {
    Solution solution;
    
    vector<tuple<string, string, string>> test_cases = {
        // Test case format: {s, t, expected_result}
        {"abcdebdde", "bde", "bcde"},
        {"jmeqksfrsdcmsiwvaovztaqenprpvnbstl", "u", ""},
        {"fgrqsqsnodwmxzkzxwqegkndaa", "kzed", "kzxwqegknd"},
        {"abcdebdde", "bde", "bcde"},
        {"ffynmlzesdshlvugsigobutgaetsnjlizvqjdpccdylclqcbghhixpjihximvhapymfkjxyyxfwdwmmhjpqphmqknj", "ntimcimzah", ""}, // No valid window exists
        {"abc", "ac", "abc"},
        {"abc", "", ""},
        {"", "abc", ""},
        {"a", "a", "a"},
        {"a", "b", ""}
    };
    
    for (size_t i = 0; i < test_cases.size(); ++i) {
        const auto& test_case = test_cases[i];
        const string& s = get<0>(test_case);
        const string& t = get<1>(test_case);
        const string& expected = get<2>(test_case);
        
        cout << "Test Case " << i + 1 << ":" << endl;
        cout << "  s: \"" << s << "\"" << endl;
        cout << "  t: \"" << t << "\"" << endl;
        
        // Test both implementations
        string result_dp = solution.minWindow(s, t);
        string result_opt = solution.minWindowOptimized(s, t);
        
        // Print results
        cout << "  Expected: \"" << expected << "\"" << endl;
        cout << "  DP Result: \"" << result_dp << "\"";
        cout << (result_dp == expected ? " \u2705" : " \u274C") << endl; // Checkmark or X
        
        cout << "  Optimized Result: \"" << result_opt << "\"";
        cout << (result_opt == expected ? " \u2705" : " \u274C") << endl;
        
        // Print visualization if the string is not too long
        if (s.length() <= 50) {
            cout << "  Visualization:" << endl;
            if (!result_dp.empty()) {
                cout << "    " << s << endl;
                cout << "    ";
                for (size_t j = 0; j < s.length(); ++j) {
                    if (j >= result_dp.length() || s[j] != result_dp[j]) {
                        cout << " ";
                    } else {
                        cout << "^";
                    }
                }
                cout << "  (DP)" << endl;
                
                if (result_opt != result_dp) {
                    cout << "    ";
                    for (size_t j = 0; j < s.length(); ++j) {
                        if (j >= result_opt.length() || s[j] != result_opt[j]) {
                            cout << " ";
                        } else {
                            cout << "^";
                        }
                    }
                    cout << "  (Optimized)" << endl;
                }
            } else {
                cout << "    No valid window found" << endl;
            }
        }
        
        cout << string(60, '-') << endl;
    }
}

int main() {
    cout << "=== Minimum Window Subsequence ===\n";
    testMinWindow();
    return 0;
}
