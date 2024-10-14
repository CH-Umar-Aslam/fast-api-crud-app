// src/App.js

import { useState, useEffect } from 'react';
import IdeaForm from './components/IdeaForm';
import { fetchIdeas, createIdea, updateIdea, deleteIdea } from './components/api';

const App = () => {
  const [ideas, setIdeas] = useState([]);
  const [editingIdea, setEditingIdea] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const fetchedIdeas = await fetchIdeas();
        setIdeas(fetchedIdeas);
      } catch (error) {
        setError('Error fetching ideas. Please try again.');
        console.error('Error fetching ideas:', error);
      }
    };

    loadIdeas();
  }, []);

  const handleAddIdea = async (newIdea) => {
    try {
      const createdIdea = await createIdea(newIdea);
      setIdeas([...ideas, createdIdea]);
      setError(''); // Clear any previous errors
    } catch (error) {
      setError('Error creating idea. Please try again.');
      console.error('Error creating idea:', error);
    }
  };

  const handleUpdateIdea = async (ideaId, updatedIdea) => {
    try {
      const updated = await updateIdea(ideaId, updatedIdea);
      setIdeas(ideas.map(idea => (idea.id === ideaId ? updated : idea)));
      setEditingIdea(null);
      setError(''); // Clear any previous errors
    } catch (error) {
      setError('Error updating idea. Please try again.');
      console.error('Error updating idea:', error);
    }
  };

  const handleDeleteIdea = async (ideaId) => {
    try {
      await deleteIdea(ideaId);
      setIdeas(ideas.filter(idea => idea.id !== ideaId));
      setError(''); // Clear any previous errors
    } catch (error) {
      setError('Error deleting idea. Please try again.');
      console.error('Error deleting idea:', error);
    }
  };
console.log(ideas)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ideas Full Stack APP</h1>
      {error && <p className="text-red-500">{error}</p>}
      <IdeaForm
        onAddIdea={editingIdea ? (idea) => handleUpdateIdea(editingIdea.id, idea) : handleAddIdea}
        existingIdea={editingIdea}
      />
      <ul className="space-y-4">
        {ideas.map(idea => (
          <li key={idea.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{idea.title}</h2>
            <p>{idea.description}</p>
          
            <p className="text-gray-500">
            <br /> <span className='text-black'>Tags: </span>
              {idea?.tags?.split(',')?.map((tag)=>(
                <button className='bg-gray-300 mx-2 rounded-lg p-2'>{tag}</button>
              ))}
            </p>
            <div className="mt-2">
              <button onClick={() => setEditingIdea(idea)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded mr-2">Edit</button>
              <button onClick={() => handleDeleteIdea(idea.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
