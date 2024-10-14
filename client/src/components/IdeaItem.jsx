const IdeaItem = ({ idea, onDelete, onEdit }) => {
    return (
        <div className="border p-4 mb-4">
            <h2 className="font-bold">{idea.title}</h2>
            <p>{idea.description}</p>
            <p className="text-gray-600">Tags: {idea.tags}</p>
            <button onClick={() => onEdit(idea)} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>
            <button onClick={() => onDelete(idea.id)} className="bg-red-500 text-white p-1">Delete</button>
        </div>
    );
};

export default IdeaItem;
