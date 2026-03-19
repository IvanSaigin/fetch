import { ref, onValue, push, update, remove } from 'firebase/database';
import { db } from './firebaseConfig';

export const getTodos = () => {
  return new Promise((resolve) => {
    const DbRef = ref(db, 'posts');

    onValue(DbRef, (snapshot) => {
      const data = snapshot.val() || {};

      const todos = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      resolve(todos);
    });
  });
};

export const createTodo = async (title) => {
  const DbRef = ref(db, 'posts');

  const newRef = await push(DbRef, {
    title,
    completed: false,
  });

  return {
    id: newRef.key,
    title,
    completed: false,
  };
};

export const updateTodo = async (id, data) => {
  const DbRef = ref(db, `posts/${id}`);

  update(DbRef, data);
};

export const deleteTodo = async (id) => {
  const DbRef = ref(db, `posts/${id}`);

  remove(DbRef);
};
