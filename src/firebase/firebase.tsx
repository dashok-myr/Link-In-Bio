import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { IAuthUser, IUser } from "../context/UserProvider.tsx";
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

export async function updateFirebaseUser(
  userUid: string,
  userData: Partial<IUser>
) {
  await setDoc(doc(db, "users", userUid), userData, { merge: true });
}

export const getOrCreateFirebaseUser = async (authUser: IAuthUser) => {
  let userDocRef = doc(db, "users", authUser.uid);
  let userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as IUser;
  }

  const { email } = authUser;
  const createdAt = new Date();
  await updateFirebaseUser(authUser.uid, {
    uid: authUser.uid,
    email,
    createdAt,
  });

  userDocRef = doc(db, "users", authUser.uid);
  userSnapshot = await getDoc(userDocRef);
  return userSnapshot.data() as IUser;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
