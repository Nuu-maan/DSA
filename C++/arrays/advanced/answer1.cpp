/**
 * Sliding Window Maximum
 * Source: https://leetcode.com/problems/sliding-window-maximum/
 * 
 * This program finds the maximum element in each sliding window of size k
 * using a deque-based approach for optimal O(n) time complexity.
 */

#include <iostream>
#include <vector>
#include <deque>
#include <tuple>
#include <algorithm>
using namespace std;

class Solution {
public:
    /**
     * Find maximum values in sliding windows of size k
     * @param nums Input array of integers
     * @param k Size of the sliding window
     * @return Vector containing maximum values for each window position
     */
    vector<int> maxSlidingWindow(const vector<int>& nums, size_t k) {
        vector<int> result;
        if (nums.empty() || k == 0) return result;
        if (k == 1) return nums;  // Each element is its own maximum
        
        deque<size_t> dq;  // Stores indices of elements in the current window
        
        // Initialize the deque for first window
        for (size_t i = 0; i < k; ++i) {
            while (!dq.empty() && nums[i] >= nums[dq.back()]) {
                dq.pop_back();
            }
            dq.push_back(i);
        }
        result.push_back(nums[dq.front()]);
        
        // Process remaining windows
        for (size_t i = k; i < nums.size(); ++i) {
            // Remove elements outside the current window from front
            while (!dq.empty() && dq.front() <= i - k) {
                dq.pop_front();
            }
            
            // Remove smaller elements from back as they won't be needed
            while (!dq.empty() && nums[i] >= nums[dq.back()]) {
                dq.pop_back();
            }
            
            // Add current element to the deque
            dq.push_back(i);
            
            // The front of deque is the maximum for the current window
            result.push_back(nums[dq.front()]);
        }
        
        return result;
    }
};

// Test function
void testMaxSlidingWindow() {
    Solution solution;
    
    vector<tuple<vector<int>, size_t, vector<int>>> test_cases = {
        // Test case format: {nums, k, expected_result}
        make_tuple(vector<int>{1,3,-1,-3,5,3,6,7}, static_cast<size_t>(3), vector<int>{3,3,5,5,6,7}),
        make_tuple(vector<int>{1}, static_cast<size_t>(1), vector<int>{1}),
        make_tuple(vector<int>{1,-1}, static_cast<size_t>(1), vector<int>{1, -1}),
        make_tuple(vector<int>{9,11}, static_cast<size_t>(2), vector<int>{11}),
        make_tuple(vector<int>{4,-2}, static_cast<size_t>(2), vector<int>{4}),
        make_tuple(vector<int>{1,3,1,2,0,5}, static_cast<size_t>(3), vector<int>{3,3,2,5}),
        make_tuple(vector<int>{1,3,1,2,0,5,4}, static_cast<size_t>(4), vector<int>{3,3,5,5}),
        make_tuple(vector<int>{}, static_cast<size_t>(0), vector<int>{}),
        make_tuple(vector<int>{-1,-2,-3,-4,-5}, static_cast<size_t>(2), vector<int>{-1,-2,-3,-4})
    };
    
    for (size_t i = 0; i < test_cases.size(); ++i) {
        const auto& test_case = test_cases[i];
        const vector<int>& nums = get<0>(test_case);
        size_t k = get<1>(test_case);
        const vector<int>& expected = get<2>(test_case);
        
        cout << "Test Case " << i + 1 << ": ";
        cout << "nums = [";
        for (size_t j = 0; j < nums.size(); ++j) {
            cout << nums[j];
            if (j != nums.size() - 1) cout << ",";
        }
        cout << "], k = " << k << endl;
        
        vector<int> result = solution.maxSlidingWindow(nums, static_cast<size_t>(k));
        
        cout << "  Expected: [";
        for (size_t j = 0; j < expected.size(); ++j) {
            cout << expected[j];
            if (j != expected.size() - 1) cout << ", ";
        }
        cout << "]" << endl;
        
        cout << "  Result:   [";
        for (size_t j = 0; j < result.size(); ++j) {
            cout << result[j];
            if (j != result.size() - 1) cout << ", ";
        }
        cout << "]";
        
        if (result == expected) {
            cout << " \u2705" << endl; // Checkmark for passed test
        } else {
            cout << " \u274C" << endl; // X for failed test
        }
        
        // Print visualization for non-empty cases
        if (!nums.empty() && k > 0 && k <= nums.size()) {
            cout << "  Window positions and maximums:" << endl;
            for (size_t start = 0; start + k <= nums.size(); ++start) {
                cout << "  [";
                for (size_t j = 0; j < k; ++j) {
                    cout << nums[start + j];
                    if (j != k - 1) cout << " ";
                }
                cout << "]";
                
                // Calculate the maximum in the current window
                int current_max = nums[start];
                for (size_t j = 1; j < k; ++j) {
                    if (nums[start + j] > current_max) {
                        current_max = nums[start + j];
                    }
                }
                
                cout << " => " << current_max << endl;
            }
        }
        
        cout << string(60, '-') << endl;
    }
}

int main() {
    cout << "=== Sliding Window Maximum ===\n";
    testMaxSlidingWindow();
    return 0;
}
