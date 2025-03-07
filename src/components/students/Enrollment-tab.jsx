import EnrollmentForm from "./Enrollment"

const EnrollmentTab = ({ enrollments }) => {
  return (
    <div className="space-y-6">
      <EnrollmentForm />
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
  )
}

export default EnrollmentTab

