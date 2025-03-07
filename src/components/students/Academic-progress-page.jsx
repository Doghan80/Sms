"use client"

import { useState, useEffect } from "react"

const AcademicProgressPage = () => {
  // Academic progress states
  const [academicData, setAcademicData] = useState([])
  const [events, setEvents] = useState([])

  // Mock data for demonstration
  useEffect(() => {
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
  }, [])

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

  return (
    <div className="space-y-6 overflow-y-auto max-h-screen pt-4">
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
                <div className="w-full bg-green-500 rounded-t" style={{ height: `${averageAttendance[index]}%` }}></div>
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
  )
}

export default AcademicProgressPage

