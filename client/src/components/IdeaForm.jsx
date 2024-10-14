import { useState } from 'react';

const IdeaForm = ({ onAddIdea, existingIdea }) => {
    const [title, setTitle] = useState(existingIdea?.title || '');
    const [description, setDescription] = useState(existingIdea?.description || '');
    const [tags, setTags] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Title and description are required.");
            return;
        }

        // Create the new idea object
        const newIdea = {
            title,
            description,
            tags // Keep tags as an array
        };

        onAddIdea(newIdea); // Pass the new idea to the parent component
        setTitle('');
        setDescription('');
        setTags("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">{existingIdea ? 'Edit Idea' : 'Add Idea'}</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter idea title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Enter idea description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="tags">Tags (comma-separated)</label>
                <input
                    type="text"
                    id="tags"
                    placeholder="e.g., tag1, tag2"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
                {existingIdea ? 'Update Idea' : 'Add Idea'}
            </button>
        </form>
    );
};

export default IdeaForm;
