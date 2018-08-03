/**
 * Returns the first element to be returned by an Observable
 *
 * @param {Observable} input Input Observable
 * @return {Observable} New Observable
 */

const first = input => {
  let out;
  input.subscribe(x => {
    if (!out) out = x;
  });
  return out;
};

first._name = 'first';

export default first;
