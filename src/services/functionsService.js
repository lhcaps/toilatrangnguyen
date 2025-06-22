import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../config/firebaseConfig";

const functions = getFunctions(app);

// 🟢 Tự động chấm điểm
export const callAutoGrade = async (examId, userId, answers) => {
  const autoGrade = httpsCallable(functions, "autoGrade");
  const result = await autoGrade({ examId, userId, answers });
  return result.data;
};

// 🟢 Gửi FCM notification
export const callSendNotification = async (token, title, body) => {
  const sendNotification = httpsCallable(functions, "sendNotification");
  const result = await sendNotification({ token, title, body });
  return result.data;
};
