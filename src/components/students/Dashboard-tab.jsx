const DashboardTab = ({ stats, gradeDistribution, enrollmentTrend, maxEnrollment }) => {
  return (
    <div className="space-y-6 overflow-y-auto max-h-100">
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
                <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(item.count / 100) * 100}%` }}></div>
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
  )
}

export default DashboardTab

