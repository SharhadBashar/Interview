//Quick Sort
class QuickSort {
  int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
      if(arr[j] <= pivot) {
        i++;
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
  }

  void sort(int[] arr, int low, int high) {
    if (low < high) {
      int pi = partition (arr, low, high);
      sort(arr, low, pi + 1);
      sort(arr, pi, high);
    }
  }

  public static void main(String args[]) {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = arr.length;
    QuickSort ob = new QuickSort();
    ob.sort(arr, 0, n - 1);
  }
}

class MergeSort {
  void merge(int[] arr, int l, int r, int m) {
    //find length of 2 subarrays to be merged
    int n1 = m - l + 1;
    int n2 = r - m;

    //Create temp array of those size
    int[] L = new int[n1];
    int[] R = new int[n2];

    //Copy data into temp arrays
    for (int i = 0; i < n1; i++) {
      L[i] = arr[l + i];
    }
    for (int j = 0; j < n2; j++) {
      R[j] = arr[m + 1 + j];
    }

    //Merge the temp arrays
    //initialize index of first and second subarray
    int i = 0;
    int j = 0;
    //initialize index of merged subarray
    int k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      }
      else {
        arr[k] = R[j];
        j++
      }
      k++;
    }

    //copy over remaining terms of 1st subarray
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }

    //copy over remaining terms of 2nd subarray
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }
  }


  void sort(int[] arr, int l, int r) {
    if (l < r) {
      int m = (l + r) / 2;
      sort(arr, l, m);
      sort(arr, m + 1, r);

      merge(arr, l , r, m);
    }
  }

  public static void main(String args[]) {
    int arr[] = {12, 11, 13, 5, 6, 7};
    MergeSort ob = new MergeSort();
    ob.sort(arr, 0, arr.length - 1);
  }
}




class BubbleSort {
  void sort(int[] arr) {
    for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < a.length - 1; j++) {
                if (a[j] > a[j + 1]) {
                    int temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                    numSwaps++;
                }
            }
        }
  }

  public static void main(String args[]) {
    int arr[] = {12, 11, 13, 5, 6, 7};
    BubbleSort ob = new BubbleSort();
    ob.sort(arr);
  }
}



class InsertionSort {
  void sort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
      int key = arr[i];
      int j = i - 1;

      /* Move elements of arr[0..i-1], that are
               greater than key, to one position ahead
               of their current position */
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
    }
  }


  public static void main(String args[]) {
    int arr[] = {12, 11, 13, 5, 6, 7};
    InsertionSort ob = new InsertionSort();
    ob.sort(arr);
  }
}