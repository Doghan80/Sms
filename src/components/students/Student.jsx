
import { useState, useEffect } from "react"
import StudentsTab from "./Students-tab"
import AcademicProgressTab from "./Academic-progress-tab"
import EnrollmentTab from "./Enrollment-tab"
import DashboardTab from "./Dashboard-tab"

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
    <div className="bg-gray-50 overflow-hidden">
      <nav className="bg-white shadow">
        <div className="container mx-auto">
          <div className="flex space-x-4 p-4 overflow-x-auto  overflow-y-auto max-h-60">
            <button
              onClick={() => setActiveTab("students")}
              className={`px-4 py-2 font-medium rounded whitespace-nowrap ${activeTab === "students" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
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
        {activeTab === "students" && (
          <StudentsTab
            students={students}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            editingStudent={editingStudent}
            setEditingStudent={setEditingStudent}
            studentFormData={studentFormData}
            handleStudentFormChange={handleStudentFormChange}
            handleStudentFileChange={handleStudentFileChange}
            handleStudentFormSubmit={handleStudentFormSubmit}
            handleDeleteStudent={handleDeleteStudent}
            currentStudents={currentStudents}
            indexOfFirstStudent={indexOfFirstStudent}
            indexOfLastStudent={indexOfLastStudent}
            filteredStudents={filteredStudents}
            totalPages={totalPages}
          />
        )}
        {activeTab === "academic" && (
          <AcademicProgressTab
            academicData={academicData}
            events={events}
            groupedData={groupedData}
            semesters={semesters}
            averageGrades={averageGrades}
            averageAttendance={averageAttendance}
          />
        )}
        {activeTab === "enrollment" && <EnrollmentTab enrollments={enrollments} />}
        {activeTab === "dashboard" && (
          <DashboardTab
            stats={stats}
            gradeDistribution={gradeDistribution}
            enrollmentTrend={enrollmentTrend}
            maxEnrollment={maxEnrollment}
          />
        )}
      </main>
    </div>
  )
}

export default Student

