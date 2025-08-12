/**
 * Trapping Rain Water
 * Source: https://leetcode.com/problems/trapping-rain-water/
 * 
 * This program calculates how much water can be trapped between the bars
 * of an elevation map using an efficient two-pointer approach.
 */

 #include <iostream>
 #include <vector>
 #include <algorithm>
 using namespace std;
 
 class Solution {
 public:
     /**
      * Calculate the total amount of trapped water
      * @param height Vector of non-negative integers representing the elevation map
      * @return Total units of water that can be trapped
      */
     int trap(vector<int>& height) {
         const size_t n = height.size();
         if (n < 3) return 0;  // Need at least 3 bars to trap water
         
         // Two pointers approach
         size_t left = 0;
         size_t right = n - 1;
         int left_max = 0;
         int right_max = 0;
         int water = 0;
         
         while (left < right) {
             if (height[left] < height[right]) {
                 if (height[left] >= left_max) {
                     left_max = height[left];
                 } else {
                     water += left_max - height[left];
                 }
                 ++left;
             } else {
                 if (height[right] >= right_max) {
                     right_max = height[right];
                 } else {
                     water += right_max - height[right];
                 }
                 --right;
             }
         }
         
         return water;
     }
 };
 
 // Test function
 void testTrap() {
     Solution solution;
     
     // Test cases with explicit pair construction
     vector<pair<vector<int>, int>> test_cases;
     test_cases.push_back({{0,1,0,2,1,0,1,3,2,1,2,1}, 6});  // Example 1
     test_cases.push_back({{4,2,0,3,2,5}, 9});              // Example 2
     test_cases.push_back({{}, 0});                         // Empty case
     test_cases.push_back({{1}, 0});                        // Single bar
     test_cases.push_back({{1,0,1}, 1});                    // Simple trap
     test_cases.push_back({{5,4,3,2,1,2,3,4,5}, 16});       // Valley shape
     test_cases.push_back({{2,0,2}, 2});                    // Simple U-shape
     test_cases.push_back({{0,1,2,3,4,5,4,3,2,1,0}, 0});    // No trap
     test_cases.push_back({{5,4,1,2}, 1});                  // Single trap on right
     test_cases.push_back({{2,1,0,2}, 3});                  // Multiple traps
     
     for (size_t i = 0; i < test_cases.size(); ++i) {
         const auto& test_case = test_cases[i];
         const vector<int>& height = test_case.first;
         int expected = test_case.second;
         
         // Make a copy of the input for display
         vector<int> input = height;
         
         cout << "Test Case " << i + 1 << ": ";
         if (input.empty()) {
             cout << "[]\n";
         } else {
             cout << "[";
             for (size_t j = 0; j < input.size(); ++j) {
                 cout << input[j];
                 if (j != input.size() - 1) cout << ",";
             }
             cout << "]\n";
         }
         
         int result = solution.trap(input);
         
         cout << "  Expected: " << expected << "\n";
         cout << "  Result:   " << result;
         
         if (result == expected) {
             cout << " \u2705" << endl; // Checkmark for passed test
         } else {
             cout << " \u274C" << endl; // X for failed test
         }
         
         // Print visualization for non-empty cases
         if (!height.empty()) {
             int max_height = *max_element(height.begin(), height.end());
             
             for (int h = max_height; h >= 0; --h) {
                 cout << "  ";
                 // Use index-based loop instead of range-based to track position
                 for (size_t idx = 0; idx < height.size(); ++idx) {
                     int val = height[idx];
                     if (val > h) {
                         cout << "# ";
                     } else {
                         // Check if this cell would hold water
                         bool has_left_wall = false;
                         bool has_right_wall = false;
                         
                         // Check left wall
                         for (size_t j = 0; j < idx; ++j) {
                             if (height[j] > h) {
                                 has_left_wall = true;
                                 break;
                             }
                         }
                         
                         // Check right wall
                         for (size_t j = idx + 1; j < height.size(); ++j) {
                             if (height[j] > h) {
                                 has_right_wall = true;
                                 break;
                             }
                         }
                         
                         bool is_water = has_left_wall && has_right_wall && val <= h;
                         cout << (is_water ? "~ " : "  ");
                     }
                 }
                 cout << endl;
             }
             
             // Print the base
             cout << "  ";
             for (size_t j = 0; j < height.size(); ++j) {
                 cout << "--";
             }
             cout << endl;
             
             // Print indices for reference
             cout << "  ";
             for (size_t j = 0; j < height.size(); ++j) {
                 cout << j % 10 << " ";
             }
             cout << endl;
         }
         
         cout << string(60, '-') << endl;
     }
 }
 
 int main() {
     cout << "=== Trapping Rain Water ===\n";
     testTrap();
     return 0;
 }