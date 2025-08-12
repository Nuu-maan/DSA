/**
 * Find Minimum and Maximum Element in an Array
 * Source: https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/
 * 
 * This program finds the minimum and maximum elements in an array
 * using the most efficient approach (Compare in Pairs).
 */

#include <iostream>
#include <vector>
#include <climits>
using namespace std;

/**
 * Find minimum and maximum elements in an array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Comparisons: 3*(n-1)/2 (for odd n) or 3n/2 - 2 (for even n)
 */
pair<int, int> findMinMax(const vector<int>& arr) {
    const size_t n = arr.size();
    if (n == 0) return {INT_MAX, INT_MIN};
    
    int min_val, max_val;
    size_t i;
    
    // Initialize min and max for even length array
    if (n % 2 == 0) {
        if (arr[0] > arr[1]) {
            max_val = arr[0];
            min_val = arr[1];
        } else {
            max_val = arr[1];
            min_val = arr[0];
        }
        i = 2; // Start from index 2
    } else {
        min_val = max_val = arr[0];
        i = 1; // Start from index 1
    }
    
    // Process elements in pairs
    while (i < n - 1) {
        if (arr[i] < arr[i + 1]) {
            min_val = min(min_val, arr[i]);
            max_val = max(max_val, arr[i + 1]);
        } else {
            min_val = min(min_val, arr[i + 1]);
            max_val = max(max_val, arr[i]);
        }
        i += 2; // Move to next pair
    }
    
    return {min_val, max_val};
}

// Utility function to print array
void printArray(const vector<int>& arr) {
    cout << "[";
    for (size_t i = 0; i < arr.size(); ++i) {
        cout << arr[i];
        if (i != arr.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
}

int main() {
    cout << "=== Find Minimum and Maximum Element in an Array ===\n";
    
    // Test cases
    vector<vector<int>> test_cases = {
        {1000, 11, 445, 1, 330, 3000},  // Normal case
        {10, 20, 30, 40, 50},           // Sorted ascending
        {50, 40, 30, 20, 10},           // Sorted descending
        {1, 1, 1, 1},                   // All same elements
        {1},                            // Single element
        {}                               // Empty array
    };
    
    for (const auto& test_case : test_cases) {
        cout << "\nArray: ";
        printArray(test_case);
        
        auto result = findMinMax(test_case);
        
        if (test_case.empty()) {
            cout << "Array is empty" << endl;
        } else {
            cout << "Minimum: " << result.first << "\n";
            cout << "Maximum: " << result.second << "\n";
        }
    }
    
    return 0;
}
