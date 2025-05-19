const stylesError = {
  border: '3px solid red',
  borderRadius: '10px',
  color: 'red',
  width: 'fit-content',
  fontSize: '18px',
  margin: '20px 0',
  padding: '10px',
  backgroundColor: '#ebe7e7',
};

const stylesMessage = {
  border: '3px solid green',
  borderRadius: '10px',
  color: 'green',
  width: 'fit-content',
  fontSize: '18px',
  margin: '20px 0',
  padding: '10px',
  backgroundColor: '#ebe7e7',
};

const Notification = ({ errorMessage, message }) => {
  if (message && !errorMessage) {
    return <div style={stylesMessage}>{message}</div>;
  }

  if (errorMessage) {
    return (
      <div data-testid="error" style={stylesError}>
        {errorMessage}
      </div>
    );
  }

  return null;
};

export default Notification;
