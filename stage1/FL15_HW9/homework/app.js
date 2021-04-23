const four = 4,
      seven = 7,
      eight = 8,
      ten = 10;

function reverseNumber(num) {
    let revertString = '';
    const modifiedNum = String(num)
    if (num < 0) {
        revertString += '-';
        for (let i = modifiedNum.length-1; i >= 1; i -= 1) {
            revertString+=modifiedNum[i];
        }; 
    } else {
        for (let i = modifiedNum.length-1; i >= 0; i -= 1) {
            revertString+=modifiedNum[i];
        }
    }
    return revertString;
}

function forEach(arr, func) {
    for (let i = 0; i < arr.length; i += 1 ) {
        arr[i] = func(arr[i])
    }
}


function map(arr, func) {
    let madifiedArr = [];
    for (let i = 0; i < arr.length; i += 1) {
        madifiedArr.push(func(arr[i]))
    }
    return madifiedArr
}



function filter(arr, func) {
    let filteredArr = [];
    for (let i = 0; i < arr.length; i += 1) {
    if (func(arr[i])) {
            filteredArr.push(arr[i])
        }  
    }
    return filteredArr
}



function getAdultAppleLovers(data) {
    const minAge = 18;
    let filteredData = [];
    for (let i = 0; i < data.length; i +=1) {
       if (data[i].favoriteFruit === 'apple' && data[i].age > minAge) {
            filteredData.push(data[i].name);
       } 
    }
    return filteredData;
}

function getKeys(obj) {
    let objectKeys = [];
    for (let item in obj) {
        if (item) {
            objectKeys.push(item);
        } 
    }
    return objectKeys;
}

function getValues(obj) {
    let keyValue =[];
    for (let item in obj) {
        if (item) {
            keyValue.push(obj[item]);
        } 
    }
    return keyValue;
}

function showFormattedDate(dateObj) {
    const dateString = dateObj.toDateString();
    let year = dateString.slice(-four);
    let month = dateString.slice(four,seven);
    let date = dateString.slice(eight,ten);
    return `It is ${date} of ${month}, ${year}`
}