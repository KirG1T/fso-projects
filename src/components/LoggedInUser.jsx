const LoggedInUser = ({ user, handleUser }) => {
  return (
    <>
      {user ? (
        <div style={{ display: 'flex', height: '20px', margin: '30px 0', alignItems: 'center' }}>
          <p>{`${user.username} logged in `}</p>
          <button onClick={() => handleUser(null)}>Logout</button>
        </div>
      ) : null}
    </>
  );
};

export default LoggedInUser;
