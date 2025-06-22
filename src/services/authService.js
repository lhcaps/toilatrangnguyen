import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Đăng ký tài khoản
export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Đăng nhập
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Đăng xuất
export const logout = () => {
  return signOut(auth);
};
