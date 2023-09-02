// Action: LoginStart
// Ini adalah aksi yang digunakan untuk menandai permulaan proses login.
export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

// Action: LoginSuccess
// Ini adalah aksi yang digunakan untuk menandai keberhasilan login.
// Payload berisi data pengguna yang berhasil masuk.
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
