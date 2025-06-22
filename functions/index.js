const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// 🟢 Function tự chấm điểm
exports.autoGrade = functions.https.onCall(async (data, context) => {
  const {examId, userId, answers} = data;

  const examRef = db.collection("exams").doc(examId);
  const examSnap = await examRef.get();

  if (!examSnap.exists) {
    throw new functions.https.HttpsError("not-found", "Exam not found.");
  }

  const examData = examSnap.data();
  const questions = examData.questions || [];

  let correctCount = 0;
  questions.forEach((q) => {
    if (answers[q.id] === q.correctAnswer) correctCount++;
  });

  const score = (correctCount / questions.length) * 10;

  await examRef.collection("submissions").doc(userId).set(
      {
        answers,
        score,
        gradedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
  );

  return {score};
});

// 🟢 Function gửi FCM notification
exports.sendNotification = functions.https.onCall(async (data, context) => {
  const {token, title, body} = data;

  const message = {
    notification: {title, body},
    token,
  };

  await admin.messaging().send(message);

  return {success: true};
});
