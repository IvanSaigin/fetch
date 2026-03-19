import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAQ5eubMbmXvHr_IvVnwch9gA6erDo5Ot0',
  authDomain: 'todo-3c0e8.firebaseapp.com',
  databaseURL: 'https://todo-3c0e8-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-3c0e8',
  storageBucket: 'todo-3c0e8.firebasestorage.app',
  messagingSenderId: '49051613622',
  appId: '1:49051613622:web:652fa33f68c8468f332917',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
