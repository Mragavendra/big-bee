import React, { useState } from 'react';

const DesignationEdit = () => {
  const [isActive, setIsActive] = useState(true);
  
  // Dummy data for designation
  const [designationData, setDesignationData] = useState({
    name: 'Senior Software Engineer',
    level: 'L3',
    description: 'Responsible for developing complex software solutions and mentoring junior team members.'
  });

  const designationLevels = ['L1', 'L2', 'L3', 'L4', 'L5'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className=" p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Designation</h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium">
            Save
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Designation Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Designation Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={designationData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Designation Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation Level</label>
                <select 
                  name="level"
                  value={designationData.level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Level</option>
                  {designationLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description"
                  value={designationData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
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
                className={`relative inline-flex h-7 w-14 items-center rounded-full cursor-pointer transition-colors ${isActive ? 'bg-orange-500' : 'bg-gray-200'}`}
                onClick={() => setIsActive(!isActive)}
              >
                <div className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-7' : 'translate-x-1'} shadow-sm`}>
                  {isActive && (
                    <div className="flex items-center justify-center h-full">
                      <svg className="h-3 w-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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

export default DesignationEdit;