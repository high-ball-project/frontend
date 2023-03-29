/**
 * queryStringToObject 함수는 URLSearchParams object를 받아서 object로 변환해주는 함수입니다.
 * @param {URLSearchParams} params
 * @return {Record<string, any>}
 */
export const queryStringToObject = (
  params: URLSearchParams
): Record<any, any> =>
  [...params.entries()].reduce((acc: any, tuple) => {
    // getting the key and value from each tuple
    const [key, val] = tuple;
    if (acc.hasOwnProperty(key)) {
      // if the current key is already an array, we'll add the value to it
      if (Array.isArray(acc[key])) {
        acc[key] = [...acc[key], val];
      } else {
        // if it's not an array, but contains a value, we'll convert it into an array
        // and add the current value to it
        acc[key] = [acc[key], val];
      }
    } else {
      // plain assignment if no special case is present
      acc[key] = val;
    }

    return acc;
  }, {});
/**
 * objectToQueryString 함수는 object를 받아서 Querystring으로 변환해주는 함수입니다.
 * @param {any} obj
 * @return {URLSearchParams}
 */
export const objToQueryString = (obj: any): string => {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      if (obj[p] !== undefined || obj[p] !== null)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
