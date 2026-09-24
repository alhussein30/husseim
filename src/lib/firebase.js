// Loaded lazily (only when the contact form is submitted) to keep the
// initial bundle small. Uses Firestore Lite, a much lighter REST-based client.

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let dbPromise

async function getDb() {
  if (!config.apiKey || !config.projectId) {
    throw new Error('Firebase is not configured. Add VITE_FIREBASE_* variables to .env')
  }
  dbPromise ??= Promise.all([import('firebase/app'), import('firebase/firestore/lite')]).then(
    ([{ initializeApp, getApps }, { getFirestore }]) =>
      getFirestore(getApps()[0] ?? initializeApp(config)),
  )
  return dbPromise
}

export async function saveLead({ name, phone, projectType, message, lang }) {
  const db = await getDb()
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore/lite')
  return addDoc(collection(db, 'leads'), {
    name,
    phone,
    projectType,
    message,
    lang,
    createdAt: serverTimestamp(),
  })
}
