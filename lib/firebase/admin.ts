import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      // Since it's local-first, the developer will need a service account key or ADC set locally
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const adminDb = admin.firestore();
const adminStorage = admin.storage();

export { adminDb, adminStorage };
