import { setNotification } from '../reducers/notificationReducer';

let timeoutId = null;

export const setNotificationWithTimeout = (dispatch, message, duration = 5000) => {
  dispatch(setNotification(message));

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch(setNotification(''));
    timeoutId = null;
  }, duration);
};
