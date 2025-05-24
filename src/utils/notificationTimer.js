let timeoutId = null;

export const setNotificationWithTimeout = (dispatch, type, message, duration = 5000) => {
  dispatch({ type, payload: { message } });

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch({ type: 'TIMER' });
    timeoutId = null;
  }, duration);
};
