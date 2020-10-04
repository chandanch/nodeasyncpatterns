/*
 generate function must have * next to the function keyword
 it can be right after the function keyworkd: function* or before the function name:
 function *<func_name>
*/
function* generatorFunction() {
  let x = 5;
  // pause the execution of function
  yield x;
  // increment by 1
  x++;
  // pause execution and get the value from next()
  y = yield x;
  // return the value by taking the current state value(6) and passed value (4)
  // y contains the value recieved from next()
  return x + y;
}

// generator function returns an iterator
let iterator = generatorFunction();
// in order to execute generatorfunction next() must be called on iterator
console.log(iterator.next());
console.log(iterator.next());
// pass value to the generator function
console.log(iterator.next(4));
