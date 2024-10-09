#include <iostream>
using namespace std;

// Function to count swaps during sorting
int countSwapSorting(int arr[], int size, bool ascending) {
    int swapCount = 0;
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (ascending) {
                // Ascending order swap
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapCount++;
                }
            } else {
                // Descending order swap
                if (arr[j] < arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapCount++;
                }
            }
        }
    }
    return swapCount;
}

int main() {
    int N = 5;
    int arr[5] = {1, 2, 3, 5, 4}; // Array input
    int ascSwapCount = countSwapSorting(arr, N, true);  // Ascending order swaps
    int descSwapCount = countSwapSorting(arr, N, false); // Descending order swaps

    // Output the minimum number of swaps required
    if (ascSwapCount > descSwapCount) {
        cout << "Minimum Swapping required is: " << descSwapCount << endl;
    } else {
        cout << "Minimum Swapping required is: " << ascSwapCount << endl;
    }

    return 0;
}
