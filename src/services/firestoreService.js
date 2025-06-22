import { db } from "../config/firebaseConfig"; // ✅ Sửa đường dẫn

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

// Hàm lấy thông tin kỳ thi
export const getExam = async (examId) => {
  const examRef = doc(db, "exams", examId);
  const snapshot = await getDoc(examRef);
  return snapshot.exists() ? snapshot.data() : null;
};

// Hàm tạo bài làm submission
export const createSubmission = async (examId, userId, answers) => {
  const submissionRef = doc(db, `exams/${examId}/submissions/${userId}`);
  await setDoc(submissionRef, {
    answers: answers,
    submittedAt: Date.now(),
  });
};

// Hàm lấy toàn bộ kỳ thi của user đã đăng ký (nếu cần)
export const getMyExams = async (userId) => {
  const examsQuery = query(
    collection(db, "exams"),
    where("participants", "array-contains", userId)
  );
  const snapshot = await getDocs(examsQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
