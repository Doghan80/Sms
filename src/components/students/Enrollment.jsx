"use client"

import { useState } from "react"

const EnrollmentForm = () => {
  const [enrollmentFormData, setEnrollmentFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalInfo: "",
    preferredCourses: [],
    documents: [],
  })

  // Available courses for enrollment
  const courses = [
    "Mathematics",
    "Science",
    "History",
    "English",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
    "Foreign Language",
    "Economics",
  ]

  // Enrollment form handlers
  const handleEnrollmentFormChange = (e) => {
    const { name, value } = e.target
    setEnrollmentFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setEnrollmentFormData((prev) => ({
        ...prev,
        preferredCourses: [...prev.preferredCourses, value],
      }))
    } else {
      setEnrollmentFormData((prev) => ({
        ...prev,
        preferredCourses: prev.preferredCourses.filter((course) => course !== value),
      }))
    }
  }

  const handleEnrollmentFileChange = (e) => {
    setEnrollmentFormData((prev) => ({
      ...prev,
      documents: [...e.target.files],
    }))
  }

  const handleEnrollmentSubmit = (e) => {
    e.preventDefault()
    alert("Enrollment submitted successfully!")
    // In a real application, you would send this data to your backend
    console.log(enrollmentFormData)
    setEnrollmentFormData({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      phone: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      emergencyContact: "",
      emergencyPhone: "",
      medicalInfo: "",
      preferredCourses: [],
      documents: [],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">New Student Enrollment</h2>
      <form onSubmit={handleEnrollmentSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={enrollmentFormData.firstName}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={enrollmentFormData.lastName}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={enrollmentFormData.dob}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={enrollmentFormData.gender}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={enrollmentFormData.email}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={enrollmentFormData.phone}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input
                type="text"
                name="address"
                value={enrollmentFormData.address}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={enrollmentFormData.city}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={enrollmentFormData.state}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={enrollmentFormData.zipCode}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Parent/Guardian Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent/Guardian Name</label>
              <input
                type="text"
                name="parentName"
                value={enrollmentFormData.parentName}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent/Guardian Email</label>
              <input
                type="email"
                name="parentEmail"
                value={enrollmentFormData.parentEmail}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent/Guardian Phone</label>
              <input
                type="tel"
                name="parentPhone"
                value={enrollmentFormData.parentPhone}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={enrollmentFormData.emergencyContact}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Emergency Phone</label>
              <input
                type="tel"
                name="emergencyPhone"
                value={enrollmentFormData.emergencyPhone}
                onChange={handleEnrollmentFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Medical Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Medical Conditions/Allergies</label>
            <textarea
              name="medicalInfo"
              value={enrollmentFormData.medicalInfo}
              onChange={handleEnrollmentFormChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>
        </div>

        {/* Course Preferences */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Course Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div key={course} className="flex items-center">
                <input
                  type="checkbox"
                  id={course}
                  name="preferredCourses"
                  value={course}
                  checked={enrollmentFormData.preferredCourses.includes(course)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor={course} className="ml-2 block text-sm text-gray-700">
                  {course}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Required Documents</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Documents (Birth Certificate, Immunization Records, etc.)
            </label>
            <input
              type="file"
              name="documents"
              onChange={handleEnrollmentFileChange}
              multiple
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {enrollmentFormData.documents.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Selected documents: {enrollmentFormData.documents.length}</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Enrollment
          </button>
        </div>
      </form>
    </div>
  )
}

export default EnrollmentForm

