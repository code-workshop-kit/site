export const checkAuth = async () => {
  let result;
  try {
    const response = await fetch('/api/users/current', {
      credentials: 'include',
    });
    if (response.status === 200) {
      result = await response.json();
      if (result.status === 'success') {
        if (!result.data.username) {
          window.location.href = './set-username';
        }
      } else if (
        !window.location.pathname.endsWith('/login') &&
        !window.location.pathname.endsWith('/login.html')
      ) {
        window.location.href = './login';
      }
    }
  } catch (e) {
    throw new Error(e);
  }

  return result.data;
};
