import React, { useState } from 'react';

const TempBoard = ({ onClose }) => {
  const [postContent, setPostContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Content:', postContent);
    console.log('Image URL:', imageUrl);
    setPostContent('');
    setImageUrl('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mb-2">
            Post Content
          </label>
          <textarea
            id="postContent"
            name="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full h-32 border p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border p-2"
          />
        </div>

        {imageUrl && (
          <div className="mb-4">
            <img src={imageUrl} alt="Image Preview" className="w-full h-48 object-cover" />
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default TempBoard;
