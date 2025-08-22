import React, { useState } from "react";
import { Camera, User, Mail, Phone, Briefcase, Save, Check, Edit3, Eye, Shield, Target } from "lucide-react";
import defaultProfileImage from "../../assets/image.png";

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "Raghava😎",
    email: "raghav@example.com",
    phone: "",
    designation: "",
  });

  // Set profile image to default imported image
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setIsSaved(false);
    }
  };

  const handleSubmit = () => {
    console.log("Updated Data:", formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-orange-100 rounded-lg">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Profile Editor</h1>
                <p className="text-sm text-gray-500">Customize your professional identity</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-orange-50 rounded-lg">
                <Target className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">Live Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div className="col-span-3">
            <NavigationSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>

          {/* Main Content Area */}
          <div className="col-span-6">
            <MainContent 
              activeSection={activeSection} 
              formData={formData} 
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSaved={isSaved}
            />
          </div>

          {/* Live Preview Panel */}
          <div className="col-span-3">
            <LivePreview 
              profileImage={profileImage} 
              handleImageChange={handleImageChange}
              formData={formData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted NavigationSidebar component
const NavigationSidebar = ({ activeSection, setActiveSection }) => {
  const NavigationTab = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 font-medium ${
        isActive
          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
          : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
      }`}>
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 sticky top-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Sections</h3>
      <div className="space-y-2">
        <NavigationTab
          id="personal"
          label="Personal Info"
          icon={User}
          isActive={activeSection === 'personal'}
          onClick={setActiveSection}
        />
        <NavigationTab
          id="contact"
          label="Contact Details"
          icon={Phone}
          isActive={activeSection === 'contact'}
          onClick={setActiveSection}
        />
        <NavigationTab
          id="professional"
          label="Professional"
          icon={Briefcase}
          isActive={activeSection === 'professional'}
          onClick={setActiveSection}
        />
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Quick Actions</h4>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200">
            <Eye className="w-4 h-4" />
            <span>Preview Profile</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200">
            <Shield className="w-4 h-4" />
            <span>Privacy Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Extracted MainContent component
const MainContent = ({ activeSection, formData, handleChange, handleSubmit, isSaved }) => {
  const ProfileField = ({ icon: Icon, label, name, type = "text", placeholder, value }) => (
    <div className="group">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-focus-within:bg-orange-200 transition-colors duration-200">
          <Icon className="w-5 h-5 text-orange-600"/>
        </div>
        <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          {label}
        </label>
      </div>
      
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full px-0 py-4 text-lg font-medium text-gray-900 placeholder-gray-400 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-orange-500 transition-colors duration-300"
          placeholder={placeholder}
        />
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-focus-within:w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100">
      {/* Section Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeSection} Information</h2>
            <p className="text-gray-600 mt-1">Update your {activeSection} details below</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
            {activeSection === 'personal' && <User className="w-6 h-6 text-orange-600" />}
            {activeSection === 'contact' && <Phone className="w-6 h-6 text-orange-600" />}
            {activeSection === 'professional' && <Briefcase className="w-6 h-6 text-orange-600" />}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-8 py-8">
        <div className="space-y-8">
          {activeSection === 'personal' && (
            <ProfileField
              icon={User}
              label="Full Name"
              name="name"
              placeholder="Enter your complete name"
              value={formData.name}
            />
          )}
          
          {activeSection === 'contact' && (
            <>
              <ProfileField
                icon={Mail}
                label="Email Address"
                name="email"
                type="email"
                placeholder="your.email@domain.com"
                value={formData.email}
              />
              
              <ProfileField
                icon={Phone}
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
              />
            </>
          )}
          
          {activeSection === 'professional' && (
            <ProfileField
              icon={Briefcase}
              label="Job Title"
              name="designation"
              placeholder="Enter your current position"
              value={formData.designation}
            />
          )}
        </div>

        {/* Save Button */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <button
            onClick={handleSubmit}
            disabled={isSaved}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
              isSaved
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transform hover:scale-[1.02] shadow-lg'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-6 h-6" />
                <span>Changes Saved Successfully</span>
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                <span>Save {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Info</span>
              </>
            )}
          </button>

          {isSaved && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
              <p className="text-green-800 font-medium">Your {activeSection} information has been updated successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Extracted LivePreview component
const LivePreview = ({ profileImage, handleImageChange, formData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 sticky top-8">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Live Preview</h3>
        
        {/* Profile Card Preview */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white mb-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-white/30 overflow-hidden flex items-center justify-center bg-white/20">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg font-bold">
                    {formData.name ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase() : "RG"}
                  </span>
                )}
              </div>
              
              <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                <Camera className="w-3 h-3 text-orange-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            
            <h4 className="font-bold text-lg mb-1">{formData.name || "Your Name"}</h4>
            <p className="text-orange-100 text-sm mb-2">{formData.designation || "Larence"}</p>
            <p className="text-orange-200 text-xs">{formData.email}</p>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Profile Status</span>
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Last Updated</span>
            <span className="text-sm font-medium text-gray-900">Just now</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600">Completion</span>
            <span className="text-sm font-medium text-orange-600">
              {Math.round((Object.values(formData).filter(v => v.trim() !== '').length / 4) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;