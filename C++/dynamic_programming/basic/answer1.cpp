#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
#include <cstddef>  // for size_t
using namespace std;

class Solution {
public:
    // Approach 1: Recursive (Brute Force)
    // Time: O(n^n), Space: O(n) for call stack
    int minJumpsRecursive(const vector<int>& arr, size_t start, size_t end) {
        // Base case: when source and destination are same
        if (start == end) return 0;
        
        // When nothing is reachable from the given source
        if (start >= arr.size() || arr[start] == 0) return INT_MAX;
        
        // Traverse through all points reachable from arr[start]
        // Recursively get the minimum number of jumps needed to reach arr[end]
        int min_jumps = INT_MAX;
        const size_t max_jump = min(start + static_cast<size_t>(arr[start]), end);
        for (size_t i = start + 1; i <= max_jump; ++i) {
            int jumps = minJumpsRecursive(arr, i, end);
            if (jumps != INT_MAX && jumps + 1 < min_jumps) {
                min_jumps = jumps + 1;
            }
        }
        return min_jumps;
    }
    
    // Approach 2: Memoization (Top-Down DP)
    // Time: O(n^2), Space: O(n)
    int minJumpsMemo(const vector<int>& arr) {
        const size_t n = arr.size();
        vector<int> memo(n, -1);
        return minJumpsMemoHelper(arr, 0, n - 1, memo);
    }
    
    int minJumpsMemoHelper(const vector<int>& arr, size_t start, size_t end, vector<int>& memo) {
        if (start == end) return 0;
        if (start >= arr.size() || arr[start] == 0) return INT_MAX;
        if (memo[start] != -1) return memo[start];
        
        int min_jumps = INT_MAX;
        const size_t max_jump = min(start + static_cast<size_t>(arr[start]), end);
        for (size_t i = start + 1; i <= max_jump; ++i) {
            int jumps = minJumpsMemoHelper(arr, i, end, memo);
            if (jumps != INT_MAX && jumps + 1 < min_jumps) {
                min_jumps = jumps + 1;
            }
        }
        
        return memo[start] = min_jumps;
    }
    
    // Approach 3: Tabulation (Bottom-Up DP)
    // Time: O(n^2), Space: O(n)
    int minJumpsDP(const vector<int>& arr) {
        const size_t n = arr.size();
        if (n <= 1) return 0;
        
        // dp[i] represents minimum number of jumps needed to reach arr[i] from arr[0]
        vector<int> dp(n, INT_MAX);
        dp[0] = 0; // Base case: 0 jumps needed to reach first element
        
        for (size_t i = 1; i < n; ++i) {
            for (size_t j = 0; j < i; ++j) {
                if (j + static_cast<size_t>(arr[j]) >= i && dp[j] != INT_MAX) {
                    dp[i] = min(dp[i], dp[j] + 1);
                    break; // Once we find the first j that can reach i, it's the minimum for dp[i]
                }
            }
        }
        
        return (dp[n - 1] != INT_MAX) ? dp[n - 1] : -1;
    }
    
    // Approach 4: Greedy (Optimal)
    // Time: O(n), Space: O(1)
    int minJumpsGreedy(const vector<int>& arr) {
        const size_t n = arr.size();
        if (n <= 1) return 0;
        
        int max_reach = arr[0]; // max index that can be reached
        int steps = arr[0];     // steps we can still take
        int jumps = 1;          // number of jumps needed
        
        for (size_t i = 1; i < n; ++i) {
            // If we've reached the end of the array
            if (i == n - 1) return jumps;
            
            // Update max_reach
            max_reach = max(max_reach, static_cast<int>(i) + arr[i]);
            
            // We use a step to get to the current index
            steps--;
            
            // If no more steps are remaining
            if (steps == 0) {
                // We must have used a jump
                jumps++;
                
                // If current max_reach is less than or equal to current index, we can't reach the end
                if (static_cast<int>(i) >= max_reach) return -1;
                
                // Re-initialize the steps to the amount of steps to reach max_reach from position i
                steps = max_reach - static_cast<int>(i);
            }
        }
        
        return -1;
    }
};

// Test function
void testMinJumps() {
    Solution sol;
    
    vector<pair<vector<int>, int>> test_cases = {
        {{1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9}, 3},  // Example 1
        {{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}, 10},  // Example 2
        {{1, 3, 6, 1, 0, 9}, 3},                  // Can reach end with 3 jumps
        {{1, 0, 3, 2, 1, 0, 4}, -1},              // Cannot reach end
        {{2, 3, 1, 1, 4}, 2},                     // LeetCode example 1
        {{2, 3, 0, 1, 4}, 2},                     // LeetCode example 2
        {{0}, 0},                                  // Single element
        {{1, 0, 0}, -1}                           // Cannot move from index 0
    };
    
    for (auto& [arr, expected] : test_cases) {
        cout << "Array: ";
        for (const auto& num : arr) cout << num << " ";
        cout << "\n";
        
        // Test all approaches
        int result1 = arr.empty() ? -1 : sol.minJumpsRecursive(arr, 0, arr.size() - 1);
        int result2 = sol.minJumpsMemo(arr);
        int result3 = sol.minJumpsDP(arr);
        int result4 = sol.minJumpsGreedy(arr);

        // Normalize unreachable INT_MAX to -1 for fair comparison
        if (result1 == INT_MAX) result1 = -1;
        if (result2 == INT_MAX) result2 = -1;
        
        cout << "Recursive: " << (result1 == expected ? "\xE2\x9C\x93" : "\xE2\x9C\x97") 
             << " (" << result1 << ")" << endl;
        cout << "Memoization: " << (result2 == expected ? "\xE2\x9C\x93" : "\xE2\x9C\x97") 
             << " (" << result2 << ")" << endl;
        cout << "DP: " << (result3 == expected ? "\xE2\x9C\x93" : "\xE2\x9C\x97") 
             << " (" << result3 << ")" << endl;
        cout << "Greedy: " << (result4 == expected ? "\xE2\x9C\x93" : "\xE2\x9C\x97") 
             << " (" << result4 << ")" << " [Optimal]" << endl;
        cout << string(40, '-') << endl;
    }
}

int main() {
    testMinJumps();
    return 0;
}
