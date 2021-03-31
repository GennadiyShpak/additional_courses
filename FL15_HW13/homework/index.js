const THOUSAND = 1000,
  SECONDSINMINUTE = 60,
  HOURSPERDAY = 24,
  toProgrammersDay = 255,
  week = 7,
  MSPERDAY = THOUSAND * SECONDSINMINUTE * SECONDSINMINUTE * HOURSPERDAY;

  
const getMonth = date => {
  const march = 2,
    april = 3,
    may = 4,
    june = 5,
    july = 6,
    august = 7,
    september = 8,
    october = 9,
    november = 10;
  const myDate = new Date(date);
  const month = myDate.getMonth();
  switch (month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case march:
      return 'March';
    case april:
      return 'April';
    case may:
      return 'May';
    case june:
      return 'June';
    case july:
      return 'July';
    case august:
      return 'August';
    case september:
      return 'September';
    case october:
      return 'October';
    case november:
      return 'November';
    default:
      return 'December';
  }
};

const getAge = str => {
  const getCurrentYear = new Date(Date.now()).getFullYear();
  const getBirthdayYear = new Date(str).getFullYear();
  return getCurrentYear - getBirthdayYear;
};

const getWeekDay = date => {
  const tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5;
  const myDate = new Date(date);
  const day = myDate.getDay();
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case tuesday:
      return 'Tuesday';
    case wednesday:
      return 'Wednesday';
    case thursday:
      return 'Thursday';
    case friday:
      return 'Friday';
    default:
      return 'Saturday';
  }
};

const getAmountDaysToNewYear = () => {
  const today = new Date();
  const newYear = new Date('December 31, 2021');
  const diffMS = newYear - today;
  const getDayToNy = Math.round(diffMS / MSPERDAY);
  return getDayToNy;
};

const getProgrammersDay = year => {
  const date = Date.parse(year, 0, 1),
    searchingDateInMS = date + MSPERDAY * toProgrammersDay,
    searchingDate = new Date(searchingDateInMS),
    day = searchingDate.getDate(),
    month = getMonth(searchingDate),
    searhimgYear = searchingDate.getFullYear(),
    dayOfWeek = getWeekDay(searchingDate);
  return `${day} ${month} ${searhimgYear} (${dayOfWeek})`;
};

const howFarIs = str => {
  const currentDate = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let temp, counter;
  const currentDay = getWeekDay(currentDate).toLowerCase();
  const searchingDay = str.toLowerCase();
  const specifiedWeekday = capitalize(searchingDay);

  if (currentDay === searchingDay) {
    return `Hey, today is ${specifiedWeekday} =)`;
  } else {
    temp = days.findIndex(item => item.toLowerCase() === searchingDay);
    if (temp > currentDate.getDay()) {
      counter = temp - currentDate.getDay();
    } else {
      counter = temp + week - currentDate.getDay();
    }
    return `It's ${counter} day(s) left till ${specifiedWeekday}`;
  }
};

const isValidIdentifier = str => {
  const regExp = /^[^0-9]+[\w$]{1,}$/;
  return regExp.test(str);
};

function capitalize(str) {
  return str.replace(/\b\w/g, first => first.toUpperCase());
}

const isValidAudioFile = str => /^[a-z]+\.(mp3|flac|alac|aac)/i.test(str);

const getHexadecimalColors = str => {
  let colorsArr = [];
  colorsArr.push(str.match(/#(?:[0-9a-f]{3}\b|[0-9a-f]{6}\b)/gi));
  return colorsArr;
};

const isValidPassword = str => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/.test(str);

const addThousandsSeparators = value => String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

const getAllUrlsFromText = str => {
  if(!str) {
    return '(error)'
  } else {
    const regExp = /([^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
    const arr = [];
    arr.push(str.match(regExp));
    return arr;
  }
 
};