const reverseData = data => {
  const day = data.slice(-2, data.length);
  const month = data.slice(-5, data.length - 3);
  const year = data.slice(0, 4);
  return `${day}-${month}-${year}`;
};

export default reverseData;
