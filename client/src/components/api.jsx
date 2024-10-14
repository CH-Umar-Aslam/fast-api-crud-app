// src/api.js

const BASE_URL = 'http://127.0.0.1:8000/ideas';

export const fetchIdeas = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch ideas');
    }
    return await response.json();
};
// src/components/api.js

export const createIdea = async (idea) => {
    const response = await fetch('http://127.0.0.1:8000/ideas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idea),
    });
    if (!response.ok) {
        throw new Error('Failed to create idea');
    }
    return response.json();
};

// Similarly, update the updateIdea function...


export const updateIdea = async (ideaId, idea) => {
    const response = await fetch(`${BASE_URL}/${ideaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idea),
    });
    if (!response.ok) {
        throw new Error('Failed to update idea');
    }
    return await response.json();
};

export const deleteIdea = async (ideaId) => {
    const response = await fetch(`${BASE_URL}/${ideaId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete idea');
    }
    return await response.json();
};
