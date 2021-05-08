const complexFunction = function (arg1, arg2) {
  return arg1 + arg2;
};

const cache = function (foo) {
  const cache = new Map();
  return function (a, b) {
    const cacheItem = [...arguments].join('&');
    if (cache.has(cacheItem)) {
      return cache.get(cacheItem);
    }
    const result = foo(a, b);
    cache.set(cacheItem, result);
    return result;
  };
};

const cachedFunction = cache(complexFunction);

cachedFunction(3, 2);
cachedFunction(3, 2);
cachedFunction('foo', 'baz');
cachedFunction('foo', 'baz');
