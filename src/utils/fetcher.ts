import axios from "axios";

/**
 * getFetcher
 * @param {string} url
 * @return {Promise}
 */
export function getFetcher(url: string) {
  return axios.get(url).then(({ data }) => data);
}

/**
 * postFetcher
 * @param {string} url
 * @param {Record<string, any>} body
 * @return {Promise}
 */
export function postFetcher(url: string, body: Record<string, any>) {
  return axios.post(url, body).then(({ data }) => data);
}

/**
 * postFetcher
 * @param {string} url
 * @param {Record<string, any>} body
 * @return {Promise}
 */
export function putFetcher(url: string, body: Record<string, any>) {
  return axios.put(url, body).then(({ data }) => data);
}

/**
 * noneAuthorizationGetFetcher
 * @param {string} url
 * @return {Promise}
 */

export function noneAuthorizationGetFetcher(url: string) {
  return axios
    .get(url, { headers: { Authorization: undefined } })
    .then(({ data }) => data);
}

/**
 * noneAuthorizationPostFetcher
 * @param {string} url
 * @param {Record<string, any>} body
 * @return {Promise}
 */
export function noneAuthorizationPostFetcher(
  url: string,
  body: Record<string, any>
) {
  return axios
    .post(url, body, { headers: { Authorization: undefined } })
    .then(({ data }) => data);
}

/**
 * noneAuthorizationPutFetcher
 * @param {string} url
 * @param {Record<string, any>} body
 * @return {Promise}
 */
export function noneAuthorizationPutFetcher(
  url: string,
  body: Record<string, any>
) {
  return axios
    .put(url, body, { headers: { Authorization: undefined } })
    .then(({ data }) => data);
}

/**
 * getS3Fetcher
 * @param {string} path
 * @return {Promise}
 */
export function getS3Fetcher(path: string) {
  return axios
    .get(
      `${process.env.VITE_S3_URL || process.env.NEXT_PUBLIC_S3_URL}/${path}`,
      {
        headers: { Authorization: undefined },
      }
    )
    .then(({ data }) => data);
}

/**
 * sendPost
 * useSWRMutation 과 함께 사용하기 위해 만든 함수
 * @param {string} url
 * @param {Record<string, any>} body
 * @return {Promise}
 */
export const sendPost = (url: string, { arg }: any) =>
  axios.post(url, arg).then(({ data }) => data);

/**
 * sendPut
 * useSWRMutation 과 함께 사용하기 위해 만든 함수
 * @param {string} url
 * @param {Record<string, any>} body
 * @return {Promise}
 */
export const sendPut = (url: string, { arg }: any) =>
  axios.put(url, arg).then(({ data }) => data);

/**
 * sendDelete
 * useSWRMutation 과 함께 사용하기 위해 만든 함수
 * @param {string} url
 * @param {Record<string, any>} body
 * @return {Promise}
 */
export const sendDelete = (url: string, { arg }: any) =>
  axios.delete(url, arg).then(({ data }) => data);
