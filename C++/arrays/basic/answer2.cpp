/**
 * Reverse an Array
 * Source: https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/
 * 
 * This program demonstrates how to reverse an array in-place using C++.
 */

#include <iostream>
#include <vector>
#include <utility> // for std::swap
using namespace std;

/**
 * Reverse the elements of an array in-place
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
void reverseArray(vector<int>& arr) {
    size_t left = 0;
    size_t right = arr.size() > 0 ? arr.size() - 1 : 0;
    
    while (left < right) {
        // Swap elements at left and right indices
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
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

// Test function
void testReverseArray() {
    vector<pair<vector<int>, vector<int>>> test_cases = {
        {{1, 2, 3, 4, 5}, {5, 4, 3, 2, 1}},  // Normal case
        {{10, 20, 30}, {30, 20, 10}},         // Odd length
        {{1, 2, 3, 4}, {4, 3, 2, 1}},         // Even length
        {{1}, {1}},                           // Single element
        {{}},                                 // Empty array
        {{1, 1, 1, 1}, {1, 1, 1, 1}},         // All same elements
        {{1, 2, 1, 2}, {2, 1, 2, 1}}          // Repeating pattern
    };
    
    for (auto& [input, expected] : test_cases) {
        cout << "\nOriginal: ";
        printArray(input);
        
        vector<int> arr = input; // Create a copy to modify
        reverseArray(arr);
        
        cout << "Reversed: ";
        printArray(arr);
        
        // Verify the result
        if (arr == expected) {
            cout << "✓ Test passed" << endl;
        } else {
            cout << "✗ Test failed. Expected: ";
            printArray(expected);
        }
    }
}

int main() {
    cout << "=== Reverse an Array ===\n";
    testReverseArray();
    return 0;
}
