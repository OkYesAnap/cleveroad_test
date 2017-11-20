module.exports = {
  STATUS_200: 200,
  STATUS_401: 401,
  LOGIN_422: 422,
  LOGIN_422_BODY: { field: "password", message: "Wrong email or password" },
  REGISTER_422: 422,
  REGISTER_422_BODY: {
    field: "current_password",
    message: "Wrong current password"
  },
  ME: "Привет"
};
