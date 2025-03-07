

import type React from "react"

import { useState } from "react"

// Define the form data structure
interface EnrollmentFormData {
  // Personal Information
  firstName: string
  lastName: string
  dob: string
  gender: string

  // Contact Information
  address: string
  city: string
  state: string
  zipCode: string
  email: string
  phone: string

  // Parent/Guardian Information
  parentName: string
  parentEmail: string
  parentPhone: string
  emergencyContact: string
  emergencyPhone: string

  // Medical Information
  medicalInfo: string

  // Course Preferences
  preferredCourses: string[]

  // Documents
  documents: File[]
}

export default function EnrollmentForm() {
  // Available courses
  const courses = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
    "Foreign Language",
  ]

  // Form steps
  const steps = [
    "Personal Information",
    "Contact Information",
    "Parent/Guardian Information",
    "Medical Information",
    "Course Preferences",
    "Document Upload",
  ]

  // State for current step
  const [currentStep, setCurrentStep] = useState(0)

  // State for animation direction
  const [direction, setDirection] = useState<"forward" | "backward">("forward")

  // State for form data
  const [formData, setFormData] = useState<EnrollmentFormData>({
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle checkbox changes for courses
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        preferredCourses: [...prev.preferredCourses, value],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredCourses: prev.preferredCourses.filter((course) => course !== value),
      }))
    }
  }

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        documents: fileList,
      }))
    }
  }

  // Navigate to next step
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection("forward")
      setCurrentStep((prev) => prev + 1)
    }
  }

  // Navigate to previous step
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection("backward")
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process form submission here
    console.log("Form submitted:", formData)
    alert("Enrollment submitted successfully!")
  }

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="animate-slide-in" key="personal-info">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="animate-slide-in" key="contact-info">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="animate-slide-in" key="parent-info">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Parent/Guardian Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent/Guardian Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent/Guardian Email</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent/Guardian Phone</label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="animate-slide-in" key="medical-info">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Medical Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Medical Conditions/Allergies</label>
              <textarea
                name="medicalInfo"
                value={formData.medicalInfo}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="animate-slide-in" key="course-preferences">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Preferred Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {courses.map((course) => (
                <div key={course} className="flex items-center">
                  <input
                    type="checkbox"
                    id={course}
                    value={course}
                    checked={formData.preferredCourses.includes(course)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={course} className="ml-2 block text-sm text-gray-700">
                    {course}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="animate-slide-in" key="document-upload">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Required Documents</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Documents (Birth Certificate, ID Proof, etc.)
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.documents.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Selected documents: {formData.documents.length}</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Enrollment Form</h2>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index < currentStep
                    ? "bg-green-500 text-white"
                    : index === currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {index < currentStep ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs mt-1 hidden md:block">{step}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
          <div
            className="absolute top-0 h-1 bg-blue-600 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step Content with Animation */}
        <div className="overflow-hidden">
          <div
            className={`transition-all duration-500 ease-cubic-bezier ${
              direction === "forward" ? "transform translate-x-0" : "transform -translate-x-0"
            }`}
          >
            {renderStepContent()}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentStep === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            }`}
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit Enrollment
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

