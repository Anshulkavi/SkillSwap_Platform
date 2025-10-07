// src/components/CreateListingModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { X, Loader2 } from 'lucide-react';

const CreateListingModal = ({ isOpen, onClose, onListingCreated }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    skill_offered: '',
    skill_wanted: '',
    description: '',
    availability: [],
    session_type: [],
    hourly_rate: 'Free Exchange',
    tags: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentValues = prev[field];
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return { ...prev, [field]: currentValues.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.skill_offered || !formData.skill_wanted) {
      setError('Skill Offered and Skill Wanted are required fields.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      // Convert tags from a comma-separated string to an array
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      const response = await api.post('/api/skill-exchange/listings', postData);
      
      // Call the function passed from the parent to update the UI
      onListingCreated(response.data); 
      onClose(); // Close the modal on success

    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "Failed to create listing.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Post Your Skills</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="skill_offered" className="block text-sm font-medium text-gray-700">Skill You're Offering*</label>
              <input type="text" name="skill_offered" value={formData.skill_offered} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
            </div>
            <div>
              <label htmlFor="skill_wanted" className="block text-sm font-medium text-gray-700">Skill You Want in Return*</label>
              <input type="text" name="skill_wanted" value={formData.skill_wanted} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., figma, web design, prototyping" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Availability</h4>
              {['Mornings', 'Afternoons', 'Evenings', 'Weekends'].map(item => (
                <div key={item} className="flex items-center mt-2">
                  <input type="checkbox" id={`avail_${item}`} value={item} onChange={(e) => handleCheckboxChange(e, 'availability')} className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                  <label htmlFor={`avail_${item}`} className="ml-2 text-sm text-gray-600">{item}</label>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Session Type</h4>
              {['Video Call', 'Chat', 'Screen Share', 'In-Person'].map(item => (
                <div key={item} className="flex items-center mt-2">
                  <input type="checkbox" id={`type_${item}`} value={item} onChange={(e) => handleCheckboxChange(e, 'session_type')} className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                  <label htmlFor={`type_${item}`} className="ml-2 text-sm text-gray-600">{item}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 disabled:bg-purple-300 flex items-center">
              {loading && <Loader2 className="animate-spin mr-2" size={16} />}
              Post Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingModal;