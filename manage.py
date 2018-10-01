// A recursive function that constructs Segment Tree for array[ss..se]. 
// si is index of current node in segment tree st 
int constructSTUtil(int arr[], int ss, int se, int *st, int si) 
{ 
    // If there is one element in array, store it in current node of 
    // segment tree and return 
    if (ss == se) 
    { 
        st[si] = arr[ss]; 
        return arr[ss]; 
    } 
  
    // If there are more than one elements, then recur for left and 
    // right subtrees and store the sum of values in this node 
    int mid = getMid(ss, se); 
    st[si] =  constructSTUtil(arr, ss, mid, st, si*2+1) + 
              constructSTUtil(arr, mid+1, se, st, si*2+2); 
    return st[si]; 
} 
  
/* Function to construct segment tree from given array. This function 
   allocates memory for segment tree and calls constructSTUtil() to 
   fill the allocated memory */
int *constructST(int arr[], int n) 
{ 
    // Allocate memory for the segment tree 
  
    //Height of segment tree 
    int x = (int)(ceil(log2(n)));  
  
    //Maximum size of segment tree 
    int max_size = 2*(int)pow(2, x) - 1;  
  
    // Allocate memory 
    int *st = new int[max_size]; 
  
    // Fill the allocated memory st 
    constructSTUtil(arr, 0, n-1, st, 0); 
  
    // Return the constructed segment tree 
    return st; 
} 
  
// Driver program to test above functions 
int main() 
{ 
    int arr[] = {1, 3, 5, 7, 9, 11}; 
    int n = sizeof(arr)/sizeof(arr[0]); 
  
    // Build segment tree from given array 
    int *st = constructST(arr, n); 
  
    // Print sum of values in array from index 1 to 3 
    printf("Sum of values in given range = %dn",  
            getSum(st, n, 1, 3)); 
  
    // Update: set arr[1] = 10 and update corresponding  
    // segment tree nodes 
    updateValue(arr, st, n, 1, 10); 
  
    // Find sum after the value is updated 
    printf("Updated sum of values in given range = %dn", 
             getSum(st, n, 1, 3)); 
    return 0; 
}    execute_from_command_line(sys.argv)
