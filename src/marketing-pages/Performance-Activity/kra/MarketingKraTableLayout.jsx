import React from 'react';

const MarketingKraTableLayout = () => {
  // Dummy data to match the image
  const employeeDetails = {
    employeeName: 'Ankit Sharma',
    department: 'Project Management',
    reportingManager: 'Priya Menon',
    month: 'July 2025'
  };

  const jobPerformanceData = [
    { slNo: 1, keyParameter: 'Revenue Generation', weightage: 15, empRating: 15, empJustification: 'Have identified a clients', managerRating: 2, managerComments: '-', averageRating: 3, points: 9 },
    { slNo: 2, keyParameter: 'Lead Gen & Networking', weightage: 10, empRating: 10, empJustification: 'Have created a pipeline', managerRating: 1.5, managerComments: '-', averageRating: 2.75, points: 5.5 },
    { slNo: 3, keyParameter: 'Client Relationship Management', weightage: 7.5, empRating: 7.5, empJustification: 'Have worked with clients', managerRating: 2, managerComments: '-', averageRating: 3, points: 4.5 },
    { slNo: 4, keyParameter: 'Proposal Development', weightage: 5, empRating: 5, empJustification: 'Have worked with marketing and done the research', managerRating: 2, managerComments: '-', averageRating: 3, points: 3 },
    { slNo: 5, keyParameter: 'Market Research & Strategy', weightage: 5, empRating: 5, empJustification: 'have researched the clients needs and market', managerRating: 2, managerComments: '-', averageRating: 3.5, points: 3.5 },
    { slNo: 6, keyParameter: 'Team Collaboration', weightage: 2.5, empRating: 2.5, empJustification: 'have working with designing and marketing team and coordinating', managerRating: 2, managerComments: '-', averageRating: 3, points: 1.5 },
    { slNo: 7, keyParameter: 'Reporting & Documentation', weightage: 5, empRating: 5, empJustification: 'doing it on the regular bases and done with sales reports', managerRating: 3, managerComments: '-', averageRating: 4, points: 4 },
    { slNo: 'A.Total %', weightage: 50, empRating: 50, empJustification: '', managerRating: 14.5, managerComments: '', averageRating: 22.5, points: 31.00 }
  ];

  const companyPerformanceData = [
    { slNo: 1, keyParameter: 'Revenue Generation', weightage: 15, target: '4200000', achievedINR: '2350000', achievedPercentage: '56.071259', points: 28.0 },
    { slNo: 'B.Total %', weightage: '', target: '', achievedINR: '', achievedPercentage: '', points: 28.0 }
  ];

  const totalFinalScore = 59.0; // Total A + B

  const handleClose = () => {
    // Simulate closing the modal or page
    console.log('Close button clicked');
  };

  return (
    <div className="p-6">
      <div className="mx-auto rounded-lg shadow-sm bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Review KRA</h1>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-sm font-medium rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>

        {/* Employee Details */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Details</h2>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Employee Name</h3>
              <p className="text-sm text-gray-900">{employeeDetails.employeeName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Department</h3>
              <p className="text-sm text-gray-900">{employeeDetails.department}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Reporting Manager</h3>
              <p className="text-sm text-gray-900">{employeeDetails.reportingManager}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Month</h3>
              <p className="text-sm text-gray-900">{employeeDetails.month}</p>
            </div>
          </div>
        </div>

        {/* Job Performance Section */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">A. Job Performance</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left font-medium text-gray-700">Sl no</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Key Parameters</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Weightage</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Emp. Rating</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Employee Justification</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Manager Rating</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Manager Comments</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Average Rating</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Points</th>
              </tr>
            </thead>
            <tbody>
              {jobPerformanceData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4">{row.slNo}</td>
                  <td className="py-2 px-4">{row.keyParameter}</td>
                  <td className="py-2 px-4">{row.weightage}</td>
                  <td className="py-2 px-4">{row.empRating}</td>
                  <td className="py-2 px-4">{row.empJustification}</td>
                  <td className="py-2 px-4">{row.managerRating}</td>
                  <td className="py-2 px-4">{row.managerComments}</td>
                  <td className="py-2 px-4">{row.averageRating}</td>
                  <td className="py-2 px-4">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Company Performance Section */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">A. Company Performance - Revenue Target achievement [Min Criteria - 75% Target Achievement]</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left font-medium text-gray-700">Sl no</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Key Parameters</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Weightage</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Target</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Achieved INR</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Achieved Percentage</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Points</th>
              </tr>
            </thead>
            <tbody>
              {companyPerformanceData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4">{row.slNo}</td>
                  <td className="py-2 px-4">{row.keyParameter}</td>
                  <td className="py-2 px-4">{row.weightage}</td>
                  <td className="py-2 px-4">{row.target}</td>
                  <td className="py-2 px-4">{row.achievedINR}</td>
                  <td className="py-2 px-4">{row.achievedPercentage}</td>
                  <td className="py-2 px-4">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Final Score */}
        <div className="p-6 bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">TOTAL FINAL SCORE (A+B)%:</h2>
          <p className="text-xl font-semibold text-gray-900">{totalFinalScore}</p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900">FINAL RATING:</h2>
            <p className="text-sm text-gray-700">Improvement Plant Required</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingKraTableLayout;