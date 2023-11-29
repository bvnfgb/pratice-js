import React, { useEffect, useRef, useState } from 'react';

// ... (other imports and components)

// ... (other imports and components)

const TempBoard = ({ onClose, selectedPost, current_state1, setCurrent_state1 }) => {
  const [postContent, setPostContent] = useState(selectedPost?.content || '');
  const [imageUrl, setImageUrl] = useState(selectedPost?.title || '');
  const [selectedCategory, setSelectedCategory] = useState(selectedPost?.category || '');

  useEffect(() => {
    setSelectedCategory(selectedPost?.category || '');
    setPostContent(selectedPost?.content || '');
    setImageUrl(selectedPost?.title || '');
  }, [selectedPost]);

  const selected_op = useRef();

  const handleserver = async () => {
    try {
      const response = await fetch('http://10.125.121.205:8080/api/party/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memId: localStorage.getItem('user'),
          content: postContent,
          title: imageUrl,
          category: selected_op.current.value,
        }),
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error(' 실패2');
      }
    } catch (error) {
      console.error('오류 발생2', error);
    }
  };

  const handleModify = () => {
    setCurrent_state1(3);
  };

  const handleCancel = () => {
    // Reset state or perform any other cancel logic
    setCurrent_state1(/* Set the appropriate value for cancel state */);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleserver();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mb-2">
            Post Content
          </label>
          {current_state1 === 1 ? (
            <textarea
              id="postContent"
              name="postContent"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full h-32 border p-2"
              required
            />
          ) : current_state1 === 2 ? (
            <div className="w-full h-32 border p-2">{postContent}</div>
          ) : (
            /* Handle state 3 specific content or display nothing for other states */
            <div />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          {current_state1 === 1 ? (
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border p-2"
            />
          ) : current_state1 === 2 ? (
            <div className="w-full border p-2">{imageUrl}</div>
          ) : (
            /* Handle state 3 specific content or display nothing for other states */
            <div />
          )}
        </div>

        <div className="">
          <label htmlFor="cat">Category</label>
          {current_state1 === 1 ? (
            <select
              ref={selected_op}
              name="cat"
              id="cat"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border p-2"
            >
              {[
                'lol',
                'fifa',
                'valo',
                'lostark',
                'sudden',
                'over',
                'maple',
                'battle',
                'starc',
                'dungeon',
              ].map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          ) : current_state1 === 2 ? (
            <div className="w-full border p-2">{selectedCategory}</div>
          ) : (
            /* Handle state 3 specific content or display nothing for other states */
            <div />
          )}
        </div>

        <div className="flex justify-between items-center">
          {current_state1 === 1 ? (
            <>
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
              <button
                type="button"
                onClick={handleModify}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline-yellow"
              >
                Modify
              </button>
            </>
          ) : current_state1 === 2 ? (
            <>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline-yellow"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Close
              </button>
            </>
          ) : (
            /* Handle state 3 specific buttons or display nothing for other states */
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline-yellow"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default TempBoard;
