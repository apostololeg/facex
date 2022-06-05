import { stringify } from 'tools/queryParams';

function parseResponse(res) {
  try {
    return JSON.parse(res);
  } catch (e) {} // eslint-disable-line

  return res;
}

function setHeaders(xhr, headers) {
  Object.entries(headers).forEach(([name, value]) =>
    xhr.setRequestHeader(name, value)
  );
}

function setProgressCallback(xhr, callback, isGet) {
  if (isGet) {
    xhr.onprogress = callback;
  } else {
    xhr.upload.onprogress = callback;
  }
}

/**
 * https://github.com/github/fetch/issues/89
 *
 * @param  {String} url
 * @param  {String} options.method
 * @param  {Object} options.headers
 * @param  {*} options.data
 * @param  {Function} onProgress
 *
 * @return {Promise}
 */
function request(url, params = {}, onProgress) {
  const xhr = new XMLHttpRequest();
  const { method, headers = {}, data } = params;
  const isGet = method === 'GET';

  if (data) headers['Content-Type'] = 'application/json;charset=UTF-8';

  if (isGet) url += stringify(data); // eslint-disable-line

  return new Promise((resolve, reject) => {
    xhr.open(method, url);
    xhr.onreadystatechange = () => {
      const { readyState, status } = xhr;

      if (readyState === XMLHttpRequest.DONE) {
        /200|201/.test(status)
          ? resolve(parseResponse(xhr.response))
          : reject(xhr);
      }
    };

    setHeaders(xhr, headers);

    if (onProgress) setProgressCallback(xhr, onProgress, isGet);

    xhr.send(JSON.stringify(data));
  });
}

const requestInterface = {
  get: (url, params = {}, onProgress) => {
    return request(url, { ...params, method: 'GET' }, onProgress);
  },
  post: (url, params = {}, onProgress) => {
    return request(url, { ...params, method: 'POST' }, onProgress);
  },
  delete: (url, params = {}, onProgress) => {
    return request(url, { ...params, method: 'DELETE' }, onProgress);
  },
};

export const api = {
  get: (url, ...args) => requestInterface.get(`/api${url}`, ...args),
  post: (url, ...args) => requestInterface.post(`/api${url}`, ...args),
  delete: (url, ...args) => requestInterface.delete(`/api${url}`, ...args),
};

export default requestInterface;
