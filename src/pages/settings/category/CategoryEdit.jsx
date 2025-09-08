import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get id from URL like /settings/category/edit/:id

  const [category, setCategory] = useState({
    stage: '',
    description: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(true);

  // Fetch category by ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/categories/${id}`);
        if (res.data.success && res.data.data) {
          setCategory({
            stage: res.data.data.funnel_stage,
            description: res.data.data.description,
            isActive: res.data.data.is_active,
          });
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle active status
  const toggleActiveStatus = () => {
    setCategory((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  // Update API
  const handleUpdate = async () => {
    try {
      const payload = {
        funnel_stage: category.stage,
        description: category.description,
        is_active: category.isActive,
      };

      const res = await axios.put(`http://localhost:5000/api/categories/${id}`, payload);

      if (res.data.success) {
        alert('Category updated successfully!');
        navigate('/settings/category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Category</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/settings/category')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Update
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Funnel Stage */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Funnel Stage</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Funnel Stage</label>
                <input
                  type="text"
                  name="stage"
                  value={category.stage}
                  onChange={handleInputChange}
                  placeholder="Enter Funnel Stage"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={category.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Control */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Control:</h2>

            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-4">Active Status*</label>
              <div
                className={`relative inline-flex h-8 w-14 items-center rounded-full cursor-pointer transition-colors ${
                  category.isActive ? 'bg-orange-500' : 'bg-gray-200'
                }`}
                onClick={toggleActiveStatus}
              >
                <div
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    category.isActive ? 'translate-x-7' : 'translate-x-1'
                  } shadow-sm`}
                >
                  {category.isActive && (
                    <div className="flex items-center justify-center h-full">
                      <svg
                        className="h-3 w-3 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;
