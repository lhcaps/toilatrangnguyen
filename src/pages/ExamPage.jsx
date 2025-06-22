import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExam } from "../services/firestoreService";
import { auth } from "../config/firebaseConfig";
import { callAutoGrade, callSendNotification } from "../services/functionsService";
import { getDatabase, ref, update, increment } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth"; // 👈 Thêm để xử lý userId an toàn
import { requestFCMToken } from "../services/fcmService"; // 👈 Bỏ comment là chạy

const ExamPage = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);

  // ✅ Theo dõi Auth user chuẩn
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Load exam & setup log tab switch
  useEffect(() => {
    const loadExam = async () => {
      try {
        const data = await getExam(examId);
        if (data) {
          setExam(data);
          setTimeLeft(data.duration * 60);
        } else {
          setError("Exam not found!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadExam();

    // 🟢 Log tab switch
    const handleBlur = () => {
      if (!userId) return;
      const db = getDatabase();
      const participantRef = ref(db, `exams/${examId}/participants/${userId}`);
      update(participantRef, {
        tabSwitchCount: increment(1)
      });
    };
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [examId, userId]);

  // ✅ Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleChange = (qId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!userId) {
        alert("⚠️ Bạn chưa đăng nhập!");
        return;
      }
      if (submitted) return;

      const result = await callAutoGrade(examId, userId, answers);
      alert(`✅ Bài thi đã nộp! Điểm: ${result.score.toFixed(2)}`);

      // 🟢 Gửi FCM nếu có token
      const token = await requestFCMToken();
      if (token) {
        await callSendNotification(token, "Kết quả thi", `Bạn được ${result.score.toFixed(2)}`);
      }

      setSubmitted(true);
    } catch (err) {
      alert("❌ Lỗi khi nộp bài: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>{exam?.title || "Exam Page"}</h1>
      <h3>⏳ Thời gian còn lại: {formatTime(timeLeft)}</h3>

      <form>
        {exam?.questions?.map((q, idx) => (
          <div key={q.id || idx} style={{ marginBottom: "20px" }}>
            <p><b>Câu {idx + 1}:</b> {q.content}</p>
            {q.options?.map((opt, i) => (
              <label key={i} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`q_${idx}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                  disabled={submitted}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
      </form>

      <button onClick={handleSubmit} disabled={submitted}>📝 Nộp bài</button>

      <hr />
      <h4>Debug</h4>
      <pre>{JSON.stringify(answers, null, 2)}</pre>
    </div>
  );
};

export default ExamPage;
