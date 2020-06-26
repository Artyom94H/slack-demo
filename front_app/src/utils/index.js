export const getError = (errorsArray, key = '') => {
  if (!Array.isArray(errorsArray)) return null;

  return errorsArray.find(i => i.key.toLowerCase() === key.toLowerCase());
};

export const debounce = (func, delay = 200) => {
  let timeoutId;

  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  }
};

let timerId;

export const throttle = function (func, delay) {
  if (timerId) {
    return
  }

  return (...args) => {
    timerId  =  setTimeout(function () {
      func(...args)
      timerId  =  undefined;
    }, delay)
  }
}

export const getWorkspaceUrl = subDomain => {
  const currentSubdomain = getSubdomain();
  const hostName = window.location.hostname.replace(`${ currentSubdomain }.`, '');
  return `${ window.location.protocol }//${ subDomain }.${ hostName }${ window.location.port ? `:${window.location.port}` : '' }?token=${ getToken() }`;
}

export const getSubdomain = () => {
  return window.location.host.split('.')[1] ? window.location.host.split('.')[0] : undefined;
}

export const getToken = () => {
  return localStorage.getItem('auth_token');
}

