console.log('Heap sort');

function heapSort(arr){
    let len = arr.length,
        end = len-1;

    heapify(arr, len);

    while(end > 0){
        swap(arr, end--, 0);
        siftDown(arr, 0, end);
    }
    return arr;
}
function heapify(arr, len){
    let mid = Math.floor((len-2)/2);
    while(mid >= 0){
        siftDown(arr, mid--, len-1);
    }
}
function siftDown(arr, start, end){
    let root = start,
        child = root*2+1,
        toSwap = root;
    while(child <= end){
        if(arr[toSwap] < arr[child]){
            swap(arr, toSwap, child);
        }
        if(child+1 <= end && arr[toSwap] < arr[child+1]){
            swap(arr, toSwap, child+1)
        }
        if(toSwap !== root){
            swap(arr, root, toSwap);
            root = toSwap;
        } else{
            return;
        }
        toSwap = root;
        child = root*2+1;
    }
}

function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


console.log(heapSort([7,5,2,4,3,9])); //[2, 3, 4, 5, 7, 9]
console.log(heapSort([9,7,5,4,3,1])); //[1, 3, 4, 5, 7, 9]
console.log(heapSort([1,2,3,4,5,6])); //[1, 2, 3, 4, 5, 6]

// function heapSort(inputArray) {
//     //     if (inputArray.length < 2) {
//     //  return inputArray; 
//     // }
//         let arrLength = inputArray.length;
//         for (let i = Math.floor(inputArray.length/2)-1; i>= 0; i--) {
//             sortParentChild(inputArray, arrLength, i)
//         }
//         for (let i = inputArray.length-1;i>0; i--) {
//             swap(inputArray, 0, i)
//             arrLength--
//             sortParentChild(inputArray, arrLength, 0)
//         }
//         return inputArray
//     }
//     function sortParentChild(inputArray, arrLength, parentIndex) {
//         const leftIndex = parentIndex*2+1,
//               rightIndex = parentIndex*2+2;
//         let maxIndex = parentIndex;
//         if (leftIndex < arrLength && inputArray[leftIndex] > inputArray[maxIndex]) {
//             maxIndex = leftIndex;
//         }
//         if (rightIndex < arrLength && inputArray[rightIndex] > inputArray[maxIndex]) {
//             maxIndex = rightIndex;
//         }
//         if (maxIndex !== parentIndex) {
//             swap(inputArray, parentIndex, maxIndex)
//             sortParentChild(inputArray, arrLength, maxIndex)
//         }
//     }
//     function swap(inputArray, index1, index2) {
//         let temp = inputArray[index1]
//         inputArray[index1] =inputArray[index2]
//         inputArray[index2] = temp
//     console.log('temp', JSON.stringify(temp));
//         console.log('inputArray[index1]', JSON.stringify(inputArray[index1]));
//     console.log('inputArray[index2]', JSON.stringify(inputArray[index2]));
//     }