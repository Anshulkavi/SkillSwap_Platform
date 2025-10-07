// // src/components/UploadVideoModal.jsx

// import React, { useState } from 'react';
// import api from '../api/axios';
// import { X, Loader2 } from 'lucide-react';

// const UploadVideoModal = ({ isOpen, onClose, onVideoUploaded }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     video_url: '',
//     thumbnail_url: '',
//     duration: '',
//     category: 'Programming',
//     level: 'Beginner',
//     tags: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const categories = ['Programming', 'Art', 'Music', 'Cooking', 'Photography', 'Design'];
//   const levels = ['Beginner', 'Intermediate', 'Advanced'];

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.video_url) {
//       setError('Title and Video URL are required fields.');
//       return;
//     }
//     setLoading(true);
//     setError('');

//     try {
//       // Convert tags from a comma-separated string to an array
//       const postData = {
//         ...formData,
//         tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
//       };

//       const response = await api.post('/api/videos', postData);
      
//       onVideoUploaded(response.data); 
//       onClose(); // Close the modal on success

//     } catch (err) {
//       const errorMessage = err.response?.data?.detail || err.message || "Failed to upload video.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-800">Upload Your Video</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X size={24} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
          
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">Video Title*</label>
//             <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
//           </div>
          
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="video_url" className="block text-sm font-medium text-gray-700">Video URL*</label>
//               <input type="url" name="video_url" value={formData.video_url} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
//             </div>
//              <div>
//               <label htmlFor="thumbnail_url" className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
//               <input type="url" name="thumbnail_url" value={formData.thumbnail_url} onChange={handleChange} placeholder="https://example.com/image.png" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//                 <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
//                 <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 15:32" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" />
//             </div>
//             <div>
//                 <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//                 <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
//                     {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                 </select>
//             </div>
//             <div>
//                 <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
//                 <select name="level" value={formData.level} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
//                     {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
//                 </select>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
//             <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., react, hooks, javascript" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" />
//           </div>

//           <div className="pt-6 border-t flex justify-end space-x-3">
//             <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300">
//               Cancel
//             </button>
//             <button type="submit" disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 disabled:bg-purple-300 flex items-center">
//               {loading && <Loader2 className="animate-spin mr-2" size={16} />}
//               Upload Video
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadVideoModal;

// src/components/UploadVideoModal.jsx

import React, { useState } from 'react';
import api from '../api/axios';
import { X, Loader2, UploadCloud } from 'lucide-react';

const UploadVideoModal = ({ isOpen, onClose, onVideoUploaded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    level: 'Beginner',
    tags: '',
  });
  const [videoFile, setVideoFile] = useState(null); // State for the actual file
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // State for progress bar

  const categories = ['Programming', 'Art', 'Music', 'Cooking', 'Photography', 'Design'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setError('');
    } else {
      setVideoFile(null);
      setError('Please select a valid video file.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !videoFile) {
      setError('Title and a video file are required.');
      return;
    }
    setLoading(true);
    setError('');
    setUploadProgress(0);

    // Use FormData for file uploads
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('level', formData.level);
    data.append('tags', formData.tags);
    data.append('file', videoFile);

    try {
      const response = await api.post('/api/videos', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // This is how we track upload progress with Axios
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      
      onVideoUploaded(response.data); 
      onClose();

    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "Failed to upload video.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Upload Your Video</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
          
          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video File*</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none">
                    <span>Select a video to upload</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="video/*" onChange={handleFileChange} />
                  </label>
                </div>
                {videoFile && <p className="text-xs text-gray-500">{videoFile.name}</p>}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Video Title*</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
          </div>

          {/* Other fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
                <select name="level" value={formData.level} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                    {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
            </div>
          </div>
          
          {/* Progress Bar */}
          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          )}

          <div className="pt-6 border-t flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 disabled:bg-purple-300 flex items-center">
              {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <UploadCloud size={16} className="mr-2" />}
              {loading ? `Uploading ${uploadProgress}%` : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoModal;