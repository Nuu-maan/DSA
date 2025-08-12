/**
 * Median of Two Sorted Arrays
 * Source: https://leetcode.com/problems/median-of-two-sorted-arrays/
 * 
 * This program finds the median of two sorted arrays using a binary search approach
 * with O(log(min(m,n))) time complexity.
 */

#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    /**
     * Find the median of two sorted arrays
     * @param nums1 First sorted array
     * @param nums2 Second sorted array
     * @return The median of the two arrays
     */
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Ensure nums1 is the smaller array to minimize binary search space
        if (nums1.size() > nums2.size()) {
            return findMedianSortedArrays(nums2, nums1);
        }
        
        const size_t m = nums1.size();
        const size_t n = nums2.size();
        const size_t total = m + n;
        size_t left = 0, right = m;
        
        while (left <= right) {
            // Partition nums1 and nums2
            size_t partitionX = (left + right) / 2;
            size_t partitionY = (total + 1) / 2 - partitionX;
            
            // Handle edge cases for partitionX = 0 or partitionX = m
            const int maxLeftX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
            const int minRightX = (partitionX == m) ? INT_MAX : nums1[partitionX];
            
            // Handle edge cases for partitionY = 0 or partitionY = n
            const int maxLeftY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
            const int minRightY = (partitionY == n) ? INT_MAX : nums2[partitionY];
            
            // Check if we've found the correct partition
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                // Calculate median based on even or total elements
                if (total % 2 == 0) {
                    return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0;
                } else {
                    return max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                // Move partition to the left in nums1
                right = partitionX - 1;
            } else {
                // Move partition to the right in nums1
                left = partitionX + 1;
            }
        }
        
        // Should never reach here for valid inputs
        return 0.0;
    }
};

// Test function
void testFindMedian() {
    Solution solution;
    
    vector<tuple<vector<int>, vector<int>, double>> test_cases = {
        // Test case format: {nums1, nums2, expected_median}
        {{1, 3}, {2}, 2.0},
        {{1, 2}, {3, 4}, 2.5},
        {{}, {1}, 1.0},
        {{}, {2, 3}, 2.5},
        {{0, 0}, {0, 0}, 0.0},
        {{1, 2, 3, 4, 5}, {6, 7, 8, 9, 10}, 5.5},
        {{1, 3, 5, 7, 9}, {2, 4, 6, 8, 10}, 5.5},
        {{1, 2, 3}, {4, 5, 6, 7, 8, 9, 10}, 5.5}
    };
    
    for (size_t i = 0; i < test_cases.size(); ++i) {
        const auto& test_case = test_cases[i];
        const vector<int>& nums1 = get<0>(test_case);
        const vector<int>& nums2 = get<1>(test_case);
        double expected = get<2>(test_case);
        
        cout << "Test Case " << i + 1 << ": " << endl;
        
        // Print input arrays
        cout << "  nums1: [";
        for (size_t j = 0; j < nums1.size(); ++j) {
            cout << nums1[j];
            if (j != nums1.size() - 1) cout << ", ";
        }
        cout << "]" << endl;
        
        cout << "  nums2: [";
        for (size_t j = 0; j < nums2.size(); ++j) {
            cout << nums2[j];
            if (j != nums2.size() - 1) cout << ", ";
        }
        cout << "]" << endl;
        
        // Calculate result
        double result = solution.findMedianSortedArrays(
            const_cast<vector<int>&>(nums1), 
            const_cast<vector<int>&>(nums2)
        );
        
        // Print expected and actual results
        cout.precision(5);
        cout << "  Expected: " << fixed << expected << endl;
        cout << "  Result:   " << fixed << result;
        
        // Check if result matches expected (allowing for floating point imprecision)
        if (abs(result - expected) < 1e-9) {
            cout << " \u2705" << endl; // Checkmark for passed test
        } else {
            cout << " \u274C" << endl; // X for failed test
        }
        
        // Print visualization of merged array
        vector<int> merged = nums1;
        merged.insert(merged.end(), nums2.begin(), nums2.end());
        sort(merged.begin(), merged.end());
        
        cout << "  Merged array: [";
        for (size_t j = 0; j < merged.size(); ++j) {
            cout << merged[j];
            if (j != merged.size() - 1) cout << ", ";
        }
        cout << "]" << endl;
        
        // Calculate and print median position(s)
        if (!merged.empty()) {
            if (merged.size() % 2 == 1) {
                cout << "  Median is at index " << merged.size()/2 
                     << " (value: " << merged[merged.size()/2] << ")" << endl;
            } else {
                cout << "  Median is average of elements at indices " 
                     << (merged.size()/2 - 1) << " and " << merged.size()/2 
                     << " (values: " << merged[merged.size()/2 - 1] 
                     << " and " << merged[merged.size()/2] << ")" << endl;
            }
        }
        
        cout << string(60, '-') << endl;
    }
}

int main() {
    cout << "=== Median of Two Sorted Arrays ===\n";
    testFindMedian();
    return 0;
}
