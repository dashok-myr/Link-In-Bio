import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { IUser } from "../context/UserProvider.tsx";
import { ILink } from "../context/LinksProvider.tsx";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const signInWithPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (
  callback: (user: IUser | null) => void
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return onAuthStateChanged(auth, callback);
};
export const db = getFirestore();

export function getLinksDocRef(userUid: string) {
  return doc(db, "links", userUid);
}

export async function updateFirebaseLink(
  userUid: string,
  linkData: { links: ILink[] }
) {
  await setDoc(getLinksDocRef(userUid), linkData, { merge: true });
}

async function updateFirebaseUser(userUid: string, userData: Partial<IUser>) {
  await setDoc(doc(db, "users", userUid), userData, { merge: true });
}

export const createUserDocFromAuth = async (userAuth: IUser) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await updateFirebaseUser(userAuth.uid, {
        uid: userAuth.uid,
        email,
        createdAt,
      });
    } catch (error: any) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
