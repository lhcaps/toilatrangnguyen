import { rtdb } from "../config/firebaseConfig";
import { ref, onValue, set, update, remove, onDisconnect } from "firebase/database";

// Lắng nghe trạng thái phòng thi Realtime
export const listenExamRoom = (examId, callback) => {
  const roomRef = ref(rtdb, `examRooms/${examId}`);
  return onValue(roomRef, (snapshot) => {
    callback(snapshot.val());
  });
};

// Cập nhật trạng thái của người dùng trong phòng thi
export const updateParticipantStatus = (examId, userId, data) => {
  const participantRef = ref(rtdb, `examRooms/${examId}/participants/${userId}`);
  return update(participantRef, data);
};

// Thiết lập presence: tự động đánh dấu offline khi disconnect
export const setupPresence = (examId, userId) => {
  const participantRef = ref(rtdb, `examRooms/${examId}/participants/${userId}/connected`);
  set(participantRef, true);
  const onDc = onDisconnect(participantRef);
  onDc.set(false);
};
