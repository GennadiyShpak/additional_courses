function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}

const pipe = (value, ...funcs) => {
  try {
    return funcs.reduce((foo1, foo2) => foo2(foo1), value);
  } catch (error) {
    const notFoo = funcs.findIndex(foo => typeof foo !== 'function');
    return `Provided argument at position ${notFoo} is not a function!`;
  }
};

const replaceUnderscoreWithSpace = value => value.replace(/_/g, ' ');
const capitalize = value =>
  value
    .split(' ')
    .map(val => val.charAt(0).toUpperCase() + val.slice(1))
    .join(' ');
const appendGreeting = value => `Hello, ${value}!`;

// const error = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, '');

// alert(error); // Provided argument at position 2 is not a function!

const result = pipe(
  'john_doe',
  replaceUnderscoreWithSpace,
  capitalize,
  appendGreeting,
);

alert(result); // Hello, John Doe!
// console.log(pipe('ivan', replaceUnderscoreWithSpace, appendGreeting));
