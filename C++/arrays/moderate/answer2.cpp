/**
 * 3Sum
 * Source: https://leetcode.com/problems/3sum/
 * 
 * This program finds all unique triplets in the array which gives the sum of zero.
 * The solution uses sorting and two-pointer technique for optimal performance.
 */

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> result;
        const size_t n = nums.size();
        
        // Sort the array to enable two-pointer technique
        sort(nums.begin(), nums.end());
        
        for (size_t i = 0; i < n; ) {
            // Skip duplicates for the first number
            if (i > 0 && nums[i] == nums[i-1]) {
                i++;
                continue;
            }
            
            int target = -nums[i];
            size_t left = i + 1;
            size_t right = n - 1;
            
            while (left < right) {
                int sum = nums[left] + nums[right];
                
                if (sum < target) {
                    left++;
                } else if (sum > target) {
                    right--;
                } else {
                    // Found a valid triplet
                    result.push_back({nums[i], nums[left], nums[right]});
                    
                    // Skip duplicates for the second number
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    // Skip duplicates for the third number
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    
                    left++;
                    right--;
                }
            }
            
            // Move to the next unique first number
            i++;
        }
        
        return result;
    }
};

// Helper function to print a vector of vectors
void printResult(const vector<vector<int>>& result) {
    cout << "[";
    for (size_t i = 0; i < result.size(); ++i) {
        cout << "[";
        for (size_t j = 0; j < result[i].size(); ++j) {
            cout << result[i][j];
            if (j != result[i].size() - 1) cout << ",";
        }
        cout << "]";
        if (i != result.size() - 1) cout << ",";
    }
    cout << "]\n";
}

// Test function
void testThreeSum() {
    Solution solution;
    
    // Test cases
    vector<pair<vector<int>, vector<vector<int>>>> test_cases = {
        {{-1,0,1,2,-1,-4}, {{-1,-1,2}, {-1,0,1}}},
        {{0,1,1}, {}},
        {{0,0,0}, {{0,0,0}}},
        {{-2,0,1,1,2}, {{-2,0,2}, {-2,1,1}}},
        {{-1,0,1,2,-1,-4,-2,-3,3,0,4}, {{-4,0,4},{-4,1,3},{-3,-1,4},{-3,0,3},{-3,1,2},{-2,-1,3},{-2,0,2},{-1,-1,2},{-1,0,1}}}
    };
    
    for (size_t i = 0; i < test_cases.size(); ++i) {
        const auto& test_case = test_cases[i];
        const vector<int>& input = test_case.first;
        const vector<vector<int>>& expected = test_case.second;
        
        // Make a copy of input since the function modifies it
        vector<int> nums = input;
        
        cout << "Test Case " << i + 1 << ": ";
        cout << "[";
        for (size_t j = 0; j < input.size(); ++j) {
            cout << input[j];
            if (j != input.size() - 1) cout << ",";
        }
        cout << "]\n";
        
        vector<vector<int>> result = solution.threeSum(nums);
        
        cout << "  Expected: ";
        printResult(expected);
        
        cout << "  Result:   ";
        printResult(result);
        
        // Simple check if results match (order doesn't matter)
        bool match = (result.size() == expected.size());
        if (match) {
            // For each expected triplet, check if it exists in result
            for (const auto& triplet : expected) {
                bool found = false;
                for (const auto& res_triplet : result) {
                    if (triplet == res_triplet) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    match = false;
                    break;
                }
            }
        }
        
        if (match) {
            cout << "  \u2705 Test Passed\n";
        } else {
            cout << "  \u274C Test Failed\n";
        }
        
        cout << string(40, '-') << endl;
    }
}

int main() {
    cout << "=== 3Sum ===\n";
    testThreeSum();
    return 0;
}
