export const validateResponse = (res, dispatch) => {
  if (res.status === 401 && res.headers.get('invalid-session')) {
    dispatch({ type: 'USER_SESSION_EXPIRED' });
    throw Error(
      `Error occurred calling back end API. ${res.status} ${res.statusText}`
    );
  } else if (!res.ok) {
    throw Error(
      `Error occurred calling back end API. ${res.status} ${res.statusText}`
    );
  } else {
    return res.text();
  }
};

export const standardApiHeaders = {
  'Content-Type': 'application/json',
  cache: 'no-cache'
};
