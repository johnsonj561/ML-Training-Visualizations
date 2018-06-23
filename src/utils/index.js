import * as R from 'ramda';


const toFixed = R.curry((length, number) => number.toFixed(length));

const getRandomFromRange = (min, max) => R.compose(
  toFixed(3),
  () => Math.random() * (max - min) + min
)();
  
const getMinMax = arr => arr.reduce((accum, val) => ({
  min: Math.min(accum.min, val),
  max: Math.max(accum.max, val)
}), { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER});

const signFunction = R.curry((threshold, value) => value >= threshold ? 1 : 0);

const prependColumn = R.curry((value, array) => [value, ...array]);
const prependBias = prependColumn(1);


export default {
  toFixed,
  getRandomFromRange,
  getMinMax,
  signFunction,
  prependBias
}