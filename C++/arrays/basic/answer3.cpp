/**
 * Find the Kth Smallest Element in an Array
 * Source: https://www.geeksforgeeks.org/kth-smallestlargest-element-unsorted-array/
 * 
 * This program demonstrates how to find the kth smallest element in an unsorted array
 * using the QuickSelect algorithm with average O(n) time complexity.
 */

#include <iostream>
#include <vector>
#include <cstdlib>  // For rand()
#include <ctime>    // For time()
using namespace std;

/**
 * Partitions the array around a random pivot element
 * @return The final position of the pivot element
 */
size_t partition(vector<int>& arr, size_t left, size_t right) {
    // Choose random pivot and move it to the end
    size_t pivotIndex = left + static_cast<size_t>(rand()) % (right - left + 1);
    int pivot = arr[pivotIndex];
    swap(arr[pivotIndex], arr[right]);
    
    // Partition the array
    size_t i = left;
    for (size_t j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    }
    
    // Move pivot to its final position
    swap(arr[i], arr[right]);
    return i;
}

/**
 * Finds the kth smallest element using QuickSelect algorithm
 * @param arr The input array
 * @param k 1-based index of the element to find (1 = smallest, 2 = second smallest, etc.)
 * @return The kth smallest element, or -1 if input is invalid
 */
int findKthSmallest(vector<int>& arr, int k) {
    if (arr.empty() || k < 1 || k > static_cast<int>(arr.size())) {
        return -1; // Invalid input
    }
    
    // Seed the random number generator once at the start
    static bool seeded = false;
    if (!seeded) {
        srand(static_cast<unsigned>(time(nullptr)));
        seeded = true;
    }
    
    size_t left = 0;
    size_t right = arr.size() - 1;
    
    while (left <= right) {
        // Partition the array and get the pivot index
        size_t pivotIndex = partition(arr, left, right);
        size_t kth = static_cast<size_t>(k - 1);
        
        // Check if we found the kth smallest element
        if (pivotIndex == kth) {
            return arr[pivotIndex];
        } 
        // If kth smallest is in the left subarray
        else if (pivotIndex > kth) {
            right = pivotIndex - 1;
        } 
        // If kth smallest is in the right subarray
        else {
            left = pivotIndex + 1;
        }
    }
    
    return -1; // Shouldn't reach here for valid inputs
}

// Utility function to print array
void printArray(const vector<int>& arr) {
    cout << "[";
    for (size_t i = 0; i < arr.size(); ++i) {
        cout << arr[i];
        if (i != arr.size() - 1) cout << ", ";
    }
    cout << "]";
}

// Test function
void testKthSmallest() {
    vector<tuple<vector<int>, int, int>> test_cases = {
        {{7, 10, 4, 3, 20, 15}, 3, 7},    // Normal case
        {{1, 2, 3, 4, 5}, 1, 1},          // First element
        {{5, 4, 3, 2, 1}, 5, 5},          // Last element
        {{1}, 1, 1},                       // Single element
        {{5, 5, 5, 5, 5}, 2, 5},          // All same elements
        {{1, 2, 3, 4, 5, 6, 7}, 4, 4},    // Middle element
        {{9, 3, 2, 11, 7, 10, 4, 5}, 5, 7} // Random case
    };
    
    for (const auto& [arr, k, expected] : test_cases) {
        vector<int> arr_copy = arr; // Create a copy to modify
        int result = findKthSmallest(arr_copy, k);
        
        cout << "Array: ";
        printArray(arr);
        cout << ", k = " << k << "\n";
        cout << "  Result: " << result;
        
        if (result == expected) {
            cout << " ✓" << endl;
        } else {
            cout << " ✗ (Expected: " << expected << ")" << endl;
        }
    }
}

int main() {
    cout << "=== Find Kth Smallest Element in an Array ===\n";
    testKthSmallest();
    return 0;
}
