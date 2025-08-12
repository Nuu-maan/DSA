/**
 * Container With Most Water
 * Source: https://leetcode.com/problems/container-with-most-water/
 * 
 * This program finds two lines that together with the x-axis form a container
 * that can hold the most water, using an efficient two-pointer approach.
 */

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    /**
     * Calculate the maximum amount of water a container can store
     * @param height Vector of non-negative integers representing the height of each line
     * @return Maximum area of water that can be contained
     */
    int maxArea(const vector<int>& height) {
        int max_water = 0;
        size_t left = 0;
        size_t right = height.size() > 0 ? height.size() - 1 : 0;
        
        while (left < right) {
            // Calculate current area
            int current_height = min(height[left], height[right]);
            int current_width = static_cast<int>(right - left);
            int current_area = current_height * current_width;
            
            // Update max_water if current area is larger
            if (current_area > max_water) {
                max_water = current_area;
            }
            
            // Move the pointer pointing to the shorter line
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return max_water;
    }
};

// Helper function to print a separator line
void printSeparator() {
    for (int i = 0; i < 40; ++i) {
        cout << "-";
    }
    cout << endl;
}

// Test function
void testMaxArea() {
    Solution solution;
    
    // Test cases
    vector<pair<vector<int>, int>> test_cases = {
        {{1,8,6,2,5,4,8,3,7}, 49},  // Example 1
        {{1,1}, 1},                  // Example 2
        {{1,2,1}, 2},                // Small array
        {{4,3,2,1,4}, 16},           // Maximum at the ends
        {{1,2,4,3}, 4},              // Maximum in the middle
        {{1,3,2,5,25,24,5}, 24}      // LeetCode test case
    };
    
    for (size_t i = 0; i < test_cases.size(); ++i) {
        const auto& test_case = test_cases[i];
        const vector<int>& input = test_case.first;
        int expected = test_case.second;
        
        int result = solution.maxArea(input);
        
        cout << "Test Case " << i + 1 << ": ";
        cout << "[";
        for (size_t j = 0; j < input.size(); ++j) {
            cout << input[j];
            if (j != input.size() - 1) cout << ",";
        }
        cout << "]\n";
        cout << "  Expected: " << expected << "\n";
        cout << "  Result:   " << result;
        
        if (result == expected) {
            cout << " \u2705" << endl; // Checkmark for passed test
        } else {
            cout << " \u274C" << endl; // X for failed test
        }
        printSeparator();
    }
}

int main() {
    cout << "=== Container With Most Water ===\n";
    testMaxArea();
    return 0;
}
