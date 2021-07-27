const { REACT_APP_GOOGLE_LOGIN_CLIENT_ID } = process.env;

export const todo = "todo";

const d = new Date();
export const Today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const GoogleLoginClientId = REACT_APP_GOOGLE_LOGIN_CLIENT_ID || "";
