"use client"

import { useState, useEffect } from "react"

const StudentsPage = () => {
  // Student list states
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const studentsPerPage = 10

  // Student form state
  const [studentFormData, setStudentFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    grade: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    status: "Active",
    photo: null,
    documents: [],
  })

  // Mock data for demonstration
  useEffect(() => {
    // Mock students
    const mockStudents = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
      dob: `2000-01-${(i % 28) + 1}`,
      gender: i % 2 === 0 ? "Male" : "Female",
      grade: `Grade ${Math.floor(Math.random() * 12) + 1}`,
      enrollmentDate: `2022-09-${(i % 30) + 1}`,
      status: i % 5 === 0 ? "Inactive" : "Active",
      photo: null,
    }))
    setStudents(mockStudents)
  }, [])

  // Student list handlers
  const handleAddStudent = (newStudent) => {
    const id = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1
    setStudents([...students, { ...newStudent, id }])
    setShowAddForm(false)
  }

  const handleEditStudent = (updatedStudent) => {
    setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)))
    setEditingStudent(null)
    setShowAddForm(false)
  }

  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id))
    }
  }

  // Student form handlers
  const handleStudentFormChange = (e) => {
    const { name, value } = e.target
    setStudentFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStudentFileChange = (e) => {
    const { name, files } = e.target
    if (name === "photo") {
      setStudentFormData((prev) => ({ ...prev, photo: files[0] }))
    } else if (name === "documents") {
      setStudentFormData((prev) => ({ ...prev, documents: [...prev.documents, ...files] }))
    }
  }

  const handleStudentFormSubmit = (e) => {
    e.preventDefault()
    if (editingStudent) {
      handleEditStudent({ ...studentFormData, id: editingStudent.id })
    } else {
      handleAddStudent(studentFormData)
    }
  }

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm),
  )

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

  // Reset form when editing student
  useEffect(() => {
    if (editingStudent) {
      setStudentFormData(editingStudent)
    } else {
      setStudentFormData({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        grade: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
        status: "Active",
        photo: null,
        documents: [],
      })
    }
  }, [editingStudent])

  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-mini">
      <div className="flex justify-between items-center mb-6 dark:bg-mini">
        <h2 className="text-xl font-bold text-gray-800">Student List</h2>
        <button
          onClick={() => {
            setEditingStudent(null)
            setShowAddForm(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Student
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search students..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-auto h-100 overflow-y-auto max-h-60">
        <table className="min-w-full bg-white dark:bg-mini">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">DoB</th>
              <th className="py-3 px-6 text-left">Gender</th>
              <th className="py-3 px-6 text-left">Class</th>
              <th className="py-3 px-6 text-left">Enroll Date</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {currentStudents.map((student) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6">{`${student.firstName} ${student.lastName}`}</td>
                <td className="py-3 px-6">{student.dob}</td>
                <td className="py-3 px-6">{student.gender}</td>
                <td className="py-3 px-6">{student.grade}</td>
                <td className="py-3 px-6">{student.enrollmentDate}</td>
                <td className="py-3 px-6">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      student.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingStudent(student)
                        setShowAddForm(true)
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteStudent(student.id)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div>
            Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of{" "}
            {filteredStudents.length} entries
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Student Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{editingStudent ? "Edit Student" : "Add New Student"}</h3>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingStudent(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleStudentFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={studentFormData.firstName}
                    onChange={handleStudentFormChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={studentFormData.lastName}
                    onChange={handleStudentFormChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={studentFormData.dob}
                    onChange={handleStudentFormChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={studentFormData.gender}
                    onChange={handleStudentFormChange}
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
                  <label className="block text-sm font-medium text-gray-700">Grade/Class</label>
                  <input
                    type="text"
                    name="grade"
                    value={studentFormData.grade}
                    onChange={handleStudentFormChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
                  <input
                    type="date"
                    name="enrollmentDate"
                    value={studentFormData.enrollmentDate}
                    onChange={handleStudentFormChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={studentFormData.status}
                    onChange={handleStudentFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleStudentFileChange}
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {studentFormData.photo && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {typeof studentFormData.photo === "object" ? studentFormData.photo.name : "Current photo"}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Documents</label>
                <input
                  type="file"
                  name="documents"
                  onChange={handleStudentFileChange}
                  multiple
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {studentFormData.documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Selected documents: {studentFormData.documents.length}</p>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      {Array.from(studentFormData.documents).map((doc, index) => (
                        <li key={index}>{doc.name || `Document ${index + 1}`}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingStudent(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  {editingStudent ? "Update Student" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentsPage

