import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../config/firebaseConfig";

// Khởi tạo Messaging instance
const messaging = getMessaging(app);

// Yêu cầu quyền & lấy token FCM
export const requestFCMToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY" // thay bằng VAPID Key thật
    });
    if (currentToken) {
      console.log("✅ FCM Token:", currentToken);
      return currentToken;
    } else {
      console.warn("⚠️ Không có token FCM.");
      return null;
    }
  } catch (error) {
    console.error("❌ Lỗi lấy FCM Token:", error);
    return null;
  }
};

// Lắng nghe tin nhắn FCM khi app đang mở
export const onFCMMessage = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("📩 Tin nhắn nhận:", payload);
    callback(payload);
  });
};
