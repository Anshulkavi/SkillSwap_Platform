// // src/components/UploadVideoModal.jsx

// import React, { useState } from 'react';
// import api from '../api/axios';
// import { X, Loader2, UploadCloud } from 'lucide-react';

// const UploadVideoModal = ({ isOpen, onClose, onVideoUploaded }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'Programming',
//     level: 'Beginner',
//     tags: '',
//   });
//   const [videoFile, setVideoFile] = useState(null); // State for the actual file
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0); // State for progress bar

//   const categories = ['Programming', 'Art', 'Music', 'Cooking', 'Photography', 'Design'];
//   const levels = ['Beginner', 'Intermediate', 'Advanced'];

//   if (!isOpen) return null;

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('video/')) {
//       setVideoFile(file);
//       setError('');
//     } else {
//       setVideoFile(null);
//       setError('Please select a valid video file.');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title || !videoFile) {
//       setError('Title and a video file are required.');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     setUploadProgress(0);

//     // Use FormData for file uploads
//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('category', formData.category);
//     data.append('level', formData.level);
//     data.append('tags', formData.tags);
//     data.append('file', videoFile);

//     try {
//       const response = await api.post('/api/videos', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         // This is how we track upload progress with Axios
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(percentCompleted);
//         },
//       });
      
//       onVideoUploaded(response.data); 
//       onClose();

//     } catch (err) {
//       const errorMessage = err.response?.data?.detail || err.message || "Failed to upload video.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
//         <div className="p-6 border-b flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-800">Upload Your Video</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X size={24} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
          
//           {/* File Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Video File*</label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//               <div className="space-y-1 text-center">
//                 <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600">
//                   <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none">
//                     <span>Select a video to upload</span>
//                     <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="video/*" onChange={handleFileChange} />
//                   </label>
//                 </div>
//                 {videoFile && <p className="text-xs text-gray-500">{videoFile.name}</p>}
//               </div>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">Video Title*</label>
//             <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
//           </div>
          
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
//           </div>

//           {/* Other fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//              <div>
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
          
//           {/* Progress Bar */}
//           {loading && (
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
//             </div>
//           )}

//           <div className="pt-6 border-t flex justify-end space-x-3">
//             <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300">
//               Cancel
//             </button>
//             <button type="submit" disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 disabled:bg-purple-300 flex items-center">
//               {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <UploadCloud size={16} className="mr-2" />}
//               {loading ? `Uploading ${uploadProgress}%` : 'Upload Video'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadVideoModal;

import React, { useState } from 'react';
import api from '../api/axios';
import { X, Loader2, UploadCloud, CheckCircle, Sparkles, Film } from 'lucide-react';

const UploadVideoModal = ({ isOpen, onClose, onVideoUploaded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    level: 'Beginner',
    tags: '',
  });
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-scaleIn border-2 border-purple-100">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white overflow-hidden rounded-t-3xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Film className="h-6 w-6 animate-pulse" />
              <h2 className="text-2xl font-bold">Upload Your Video</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto bg-gradient-to-br from-purple-50/30 to-blue-50/30">
          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 p-4 rounded-xl flex items-start space-x-3 animate-shake">
              <div className="bg-red-100 rounded-full p-1">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <p className="flex-1 font-medium">{error}</p>
            </div>
          )}
          
          {/* File Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <UploadCloud className="h-4 w-4 text-purple-600" />
              Video File*
            </label>
            <div className={`mt-1 flex justify-center px-6 pt-8 pb-8 border-3 border-dashed rounded-2xl transition-all duration-300 ${
              videoFile 
                ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50' 
                : 'border-gray-300 hover:border-purple-400 bg-white'
            }`}>
              <div className="space-y-2 text-center">
                {videoFile ? (
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                ) : (
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label 
                    htmlFor="file-upload" 
                    className="relative cursor-pointer bg-white rounded-lg px-4 py-2 font-semibold text-purple-600 hover:text-purple-500 hover:bg-purple-50 focus-within:outline-none transition-all duration-300 border-2 border-purple-200"
                  >
                    <span>{videoFile ? 'Change Video' : 'Select a video'}</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="video/*" 
                      onChange={handleFileChange} 
                    />
                  </label>
                </div>
                {videoFile && (
                  <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                    <p className="text-sm font-medium text-gray-900">{videoFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
                {!videoFile && (
                  <p className="text-xs text-gray-500">MP4, MOV, AVI up to 500MB</p>
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
              Video Title*
            </label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="Enter an engaging title..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300" 
              required 
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
              Description
            </label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="4"
              placeholder="Describe what viewers will learn..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 resize-none"
            ></textarea>
          </div>

          {/* Category and Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">
                Category
              </label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 cursor-pointer"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="level" className="block text-sm font-bold text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select 
                name="level" 
                value={formData.level} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 cursor-pointer"
              >
                {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
            </div>
          </div>
          
          {/* Progress Bar */}
          {loading && (
            <div className="bg-white rounded-xl p-4 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Uploading...</span>
                <span className="text-sm font-bold text-purple-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t-2 border-gray-100 rounded-b-3xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 hover:scale-105 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading} 
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Uploading {uploadProgress}%
                </>
              ) : (
                <>
                  <UploadCloud size={20} className="mr-2 group-hover:-translate-y-1 transition-transform" />
                  Upload Video
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UploadVideoModal;