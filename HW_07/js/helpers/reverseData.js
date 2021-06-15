const getMonth = date => {
  const myDate = new Date(date);
  const month = myDate.getMonth();
  switch (month) {
    case 0:
      return 'jan';
    case 1:
      return 'feb';
    case 2:
      return 'mar';
    case 3:
      return 'apr';
    case 4:
      return 'may';
    case 5:
      return 'jun';
    case 6:
      return 'jul';
    case 7:
      return 'aug';
    case 8:
      return 'sep';
    case 9:
      return 'oct';
    case 10:
      return 'nov';
    default:
      return 'dec';
  }
};

const reverseData = data => {
  const day = data.slice(-2, data.length);
  const month = getMonth(data);
  const year = data.slice(0, 4);
  return `${day} ${month}, ${year}`;
};

export default reverseData;
