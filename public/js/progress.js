const value = Object.values(arr[0]);
function check(value) {
  let sum = 0;
  value.forEach((el) => (el === true ? sum += 1 : null));
  const procent = Math.floor(sum / 12 * 100);
  return procent;
}
