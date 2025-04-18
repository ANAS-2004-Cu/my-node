const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get('/', (req, res) => {
  res.send('🚀 Firebase Admin API is running!');
});

// ✅ ده هو اللي بيحذف المستخدم
app.post('/delete-user', async (req, res) => {
  const { uid } = req.body;
  console.log('Received delete request for UID:', uid);

  try {
    await admin.auth().deleteUser(uid);
    console.log('✅ Successfully deleted user:', uid);
    res.status(200).send({ message: 'User deleted from Firebase Authentication' });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).send({ message: 'Error deleting user', error });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
