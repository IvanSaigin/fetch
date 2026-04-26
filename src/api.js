const BASE_URL = 'http://localhost:3005/todo'

export const getTodos = async (params) => {

    const respons = await fetch(`${BASE_URL}?${params}`);
    if (!respons.ok) throw new Error('Ошибка запроса списка дел');

    return respons.json();

}

export const createTodo = async (title) => {

    const respons = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
            title,
            completed: false
        })
    })
    if (!respons.ok) throw new Error('Ошибка создания дела');

    return respons.json();

}

export const updateTodo = async (id, data) => {

    const respons = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data)
    });

    if (!respons.ok) throw new Error('Ошибка изменения данных');

    return respons.json();

}

export const deleteTodo = async (id) => {

    const respons = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!respons.ok) throw new Error('Ошибка удаления данных');

    return respons.json();
}

export const getTodoById = async (id) => {

    const respons = await fetch(`${BASE_URL}/${id}`);
    if (!respons.ok) throw new Error('Ошибка запроса дела');

    return respons.json();
}