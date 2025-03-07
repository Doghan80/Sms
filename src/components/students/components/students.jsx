import { useState, useEffect } from "react"
import EnrollmentForm from "./enrollment"
const Student = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState("students")

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

  // Academic progress states
  const [academicData, setAcademicData] = useState([])
  const [events, setEvents] = useState([])

  // Enrollment states
  const [enrollments, setEnrollments] = useState([])
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

  // Dashboard states
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    inactiveStudents: 0,
    pendingEnrollments: 0,
    upcomingEvents: [],
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

    // Mock academic data
    const mockAcademicData = [
      { semester: "Fall 2022", course: "Mathematics", grade: "A", attendance: 95 },
      { semester: "Fall 2022", course: "Science", grade: "B+", attendance: 90 },
      { semester: "Fall 2022", course: "History", grade: "A-", attendance: 88 },
      { semester: "Spring 2023", course: "Mathematics", grade: "A", attendance: 92 },
      { semester: "Spring 2023", course: "Science", grade: "A-", attendance: 94 },
      { semester: "Spring 2023", course: "History", grade: "B+", attendance: 89 },
      { semester: "Fall 2023", course: "Mathematics", grade: "A+", attendance: 98 },
      { semester: "Fall 2023", course: "Science", grade: "A", attendance: 96 },
      { semester: "Fall 2023", course: "History", grade: "A-", attendance: 91 },
    ]
    setAcademicData(mockAcademicData)

    // Mock events
    const mockEvents = [
      { date: "2023-12-15", title: "End of Fall Semester", type: "academic" },
      { date: "2023-12-20", title: "Winter Break Begins", type: "holiday" },
      { date: "2024-01-10", title: "Spring Semester Begins", type: "academic" },
      { date: "2024-03-15", title: "Mid-term Exams", type: "exam" },
      { date: "2024-04-05", title: "Spring Break", type: "holiday" },
      { date: "2024-05-20", title: "Final Exams", type: "exam" },
      { date: "2024-06-01", title: "End of Spring Semester", type: "academic" },
    ]
    setEvents(mockEvents)

    // Mock enrollments
    const mockEnrollments = [
      { id: 1, name: "John Doe", status: "Approved", date: "2023-09-01" },
      { id: 2, name: "Jane Smith", status: "Pending", date: "2023-09-05" },
      { id: 3, name: "Robert Johnson", status: "Rejected", date: "2023-08-28" },
      { id: 4, name: "Emily Davis", status: "Approved", date: "2023-09-02" },
      { id: 5, name: "Michael Wilson", status: "Pending", date: "2023-09-07" },
    ]
    setEnrollments(mockEnrollments)

    // Mock stats
    setStats({
      totalStudents: 256,
      activeStudents: 230,
      inactiveStudents: 26,
      pendingEnrollments: 15,
      upcomingEvents: [
        { date: "2023-12-15", title: "End of Fall Semester" },
        { date: "2023-12-20", title: "Winter Break Begins" },
        { date: "2024-01-10", title: "Spring Semester Begins" },
      ],
    })
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

  // Group academic data by semester
  const groupedData = academicData.reduce((acc, item) => {
    if (!acc[item.semester]) {
      acc[item.semester] = []
    }
    acc[item.semester].push(item)
    return acc
  }, {})

  // Calculate average grades and attendance for charts
  const semesters = Object.keys(groupedData)
  const averageGrades = semesters.map((semester) => {
    const semesterData = groupedData[semester]
    const gradeMap = {
      "A+": 4.3,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0,
    }
    const avgGrade = semesterData.reduce((sum, course) => sum + gradeMap[course.grade], 0) / semesterData.length
    return avgGrade.toFixed(2)
  })

  const averageAttendance = semesters.map((semester) => {
    const semesterData = groupedData[semester]
    return (semesterData.reduce((sum, course) => sum + course.attendance, 0) / semesterData.length).toFixed(1)
  })

  // Mock data for dashboard charts
  const gradeDistribution = [
    { grade: "A", count: 85 },
    { grade: "B", count: 67 },
    { grade: "C", count: 45 },
    { grade: "D", count: 12 },
    { grade: "F", count: 5 },
  ]

  const enrollmentTrend = [
    { month: "Jan", count: 10 },
    { month: "Feb", count: 15 },
    { month: "Mar", count: 20 },
    { month: "Apr", count: 25 },
    { month: "May", count: 30 },
    { month: "Jun", count: 35 },
    { month: "Jul", count: 25 },
    { month: "Aug", count: 40 },
    { month: "Sep", count: 45 },
    { month: "Oct", count: 35 },
    { month: "Nov", count: 30 },
    { month: "Dec", count: 25 },
  ]

  // Calculate max value for enrollment trend to scale the chart
  const maxEnrollment = Math.max(...enrollmentTrend.map((item) => item.count))

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
    <div className="bg-white h-screen dark:bg-hover overflow-hidden ml-5 ">
      <nav className="bg-background dark:bg-mini  shadow">
        <div className="container mx-auto dark:text-backkground">
          <div className="flex space-x-4 p-4 overflow-x-auto  overflow-y-auto max-h-50 mt-4 boardared  ">
            <button
              onClick={() => setActiveTab("students")}
              className={`px-4 py-2 font-medium rounded whitespace-nowrap  ${activeTab === "students" ? "bg-blue-100 text-blue-600 " : "text-gray-600 hover:bg-gray-100 "}`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab("academic")}
              className={`px-4 py-2 font-medium rounded whitespace-nowrap ${activeTab === "academic" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Academic Progress
            </button>
            <button
              onClick={() => setActiveTab("enrollment")}
              className={`px-4 py-2 font-medium rounded whitespace-nowrap ${activeTab === "enrollment" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Enrollment
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 font-medium rounded whitespace-nowrap ${activeTab === "dashboard" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {/* Student List Tab */}
        {activeTab === "students" && (
          <div className="bg-background dark:bg-mini rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-background">Student List</h2>
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

            <div className="overflow-auto h-100  overflow-y-auto max-h-60 ">
              <table className="min-w-full bg-white dark:bg-background">
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
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="text-red-600 hover:text-red-900"
                          >
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
                <div className="bg-background dark:bg-mini dark:text-background rounded-lg p-6 w-full max-w-2xl">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-background dark:bg-mini dark:text-background">
                      <div>
                        <label className="block text-sm bg-background dark:bg-mini dark:text-background font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={studentFormData.firstName}
                          onChange={handleStudentFormChange}
                          required
                          className="mt-1 block w-full bg-background dark:bg-mini dark:text-background border border-gray-300 rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm bg-background dark:bg-mini dark:text-background font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={studentFormData.lastName}
                          onChange={handleStudentFormChange}
                          required
                          className="mt-1 block w-full border bg-background dark:bg-mini dark:text-background border-gray-300 rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium bg-background dark:bg-mini dark:text-background text-gray-700">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={studentFormData.dob}
                          onChange={handleStudentFormChange}
                          required
                          className="mt-1 block w-full border bg-background dark:bg-mini dark:text-background border-gray-300 rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium bg-background dark:bg-mini dark:text-background text-gray-700">Gender</label>
                        <select
                          name="gender"
                          value={studentFormData.gender}
                          onChange={handleStudentFormChange}
                          required
                          className="mt-1 block w-full border border-gray-300bg-background dark:bg-mini dark:text-background rounded-md shadow-sm p-2"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 bg-background dark:bg-mini dark:text-background">Grade/Class</label>
                        <input
                          type="text"
                          name="grade"
                          value={studentFormData.grade}
                          onChange={handleStudentFormChange}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-background dark:bg-mini dark:text-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 bg-background dark:bg-mini dark:text-background">Enrollment Date</label>
                        <input
                          type="date"
                          name="enrollmentDate"
                          value={studentFormData.enrollmentDate}
                          onChange={handleStudentFormChange}
                          required
                          className="mt-1 bg-background dark:bg-mini dark:text-background block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 bg-background dark:bg-mini dark:text-background">Status</label>
                        <select
                          name="status"
                          value={studentFormData.status}
                          onChange={handleStudentFormChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-background dark:bg-mini dark:text-background" 
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 bg-background dark:bg-mini dark:text-background">Profile Photo</label>
                      <input
                        type="file"
                        name="photo"
                        onChange={handleStudentFileChange}
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700bg-background dark:bg-mini dark:text-background hover:file:bg-blue-100"
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
                      <label className="block text-sm font-medium text-gray-700 bg-background dark:bg-mini dark:text-background">Documents</label>
                      <input
                        type="file"
                        name="documents"
                        onChange={handleStudentFileChange}
                        multiple
                        className=" mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {studentFormData.documents.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Selected documents: {studentFormData.documents.length}
                          </p>
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
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary dark:bg-primary dark:text-background hover:bg-hover"
                      >
                        {editingStudent ? "Update Student" : "Add Student"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Academic Progress Tab */}
        {activeTab === "academic" && (
          <div className="space-y-6  overflow-y-auto max-h-screen pt-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Progress</h2>

              <div className="overflow-x-auto overflow-y-auto max-h-60">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Semester</th>
                      <th className="py-3 px-6 text-left">Course</th>
                      <th className="py-3 px-6 text-left">Grade</th>
                      <th className="py-3 px-6 text-left">Attendance (%)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {academicData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6">{item.semester}</td>
                        <td className="py-3 px-6">{item.course}</td>
                        <td className="py-3 px-6">{item.grade}</td>
                        <td className="py-3 px-6">{item.attendance}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Grade Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Grade Performance</h3>
                <div className="h-64 flex items-end space-x-2">
                  {semesters.map((semester, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(Number.parseFloat(averageGrades[index]) / 4.3) * 100}%` }}
                      ></div>
                      <div className="text-xs mt-2 text-center">{semester}</div>
                      <div className="text-sm font-medium">{averageGrades[index]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Attendance Performance</h3>
                <div className="h-64 flex items-end space-x-2">
                  {semesters.map((semester, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${averageAttendance[index]}%` }}
                      ></div>
                      <div className="text-xs mt-2 text-center">{semester}</div>
                      <div className="text-sm font-medium">{averageAttendance[index]}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Events and Holidays */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Events & Holidays</h3>
              <div className="space-y-3">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 border-l-4 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                    style={{
                      borderLeftColor:
                        event.type === "academic" ? "#3B82F6" : event.type === "holiday" ? "#10B981" : "#EF4444",
                    }}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</div>
                    </div>
                    <div
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor:
                          event.type === "academic" ? "#DBEAFE" : event.type === "holiday" ? "#D1FAE5" : "#FEE2E2",
                        color: event.type === "academic" ? "#1E40AF" : event.type === "holiday" ? "#065F46" : "#B91C1C",
                      }}
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enrollment Tab */}
        {activeTab === "enrollment" && (
          <div className="space-y-6">
            <EnrollmentForm/>
            {/* Enrollment Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Enrollment Status</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">ID</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Date</th>
                      <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {enrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6">{enrollment.id}</td>
                        <td className="py-3 px-6">{enrollment.name}</td>
                        <td className="py-3 px-6">{enrollment.date}</td>
                        <td className="py-3 px-6">
                          <span
                            className={`py-1 px-3 rounded-full text-xs ${
                              enrollment.status === "Approved"
                                ? "bg-green-200 text-green-800"
                                : enrollment.status === "Pending"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-red-200 text-red-800"
                            }`}
                          >
                            {enrollment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6  overflow-y-auto max-h-100">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm font-medium text-gray-500">Total Students</div>
                <div className="mt-2 text-3xl font-bold text-gray-800">{stats.totalStudents}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm font-medium text-gray-500">Active Students</div>
                <div className="mt-2 text-3xl font-bold text-green-600">{stats.activeStudents}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm font-medium text-gray-500">Inactive Students</div>
                <div className="mt-2 text-3xl font-bold text-red-600">{stats.inactiveStudents}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm font-medium text-gray-500">Pending Enrollments</div>
                <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.pendingEnrollments}</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Grade Distribution */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Grade Distribution</h3>
                <div className="h-64 flex items-end space-x-6">
                  {gradeDistribution.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(item.count / 100) * 100}%` }}
                      ></div>
                      <div className="text-sm mt-2">{item.grade}</div>
                      <div className="text-xs text-gray-500">{item.count} students</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enrollment Trend */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Enrollment Trend (2023)</h3>
                <div className="h-64 flex items-end space-x-2">
                  {enrollmentTrend.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${(item.count / maxEnrollment) * 100}%` }}
                      ></div>
                      <div className="text-xs mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity and Upcoming Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                    <div className="font-medium">New student enrolled</div>
                    <div className="text-sm text-gray-500">Emily Johnson - 2 hours ago</div>
                  </div>
                  <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded">
                    <div className="font-medium">Grade updated</div>
                    <div className="text-sm text-gray-500">Michael Smith - 3 hours ago</div>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                    <div className="font-medium">Document uploaded</div>
                    <div className="text-sm text-gray-500">Sarah Williams - 5 hours ago</div>
                  </div>
                  <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded">
                    <div className="font-medium">Attendance marked</div>
                    <div className="text-sm text-gray-500">David Brown - 1 day ago</div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {stats.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center p-3 border border-gray-200 rounded hover:bg-gray-50">
                      <div className="bg-blue-100 text-blue-800 font-bold rounded p-2 w-12 h-12 flex items-center justify-center mr-4">
                        {new Date(event.date).getDate()}
                      </div>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Export Data</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Export Student List (CSV)
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Export Academic Progress (Excel)
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                  Export Enrollment Data (PDF)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Student

