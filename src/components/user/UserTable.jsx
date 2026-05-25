export default function UserTable({ users }) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-white/10">
            <th className="border border-white/10 px-3 sm:px-4 py-3 text-left font-semibold">ID</th>
            <th className="border border-white/10 px-3 sm:px-4 py-3 text-left font-semibold">Nama</th>
            <th className="border border-white/10 px-3 sm:px-4 py-3 text-left font-semibold hidden sm:table-cell">Email</th>
            <th className="border border-white/10 px-3 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">Phone</th>
            <th className="border border-white/10 px-3 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">Website</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-white/5 transition-colors">
              <td className="border border-white/10 px-3 sm:px-4 py-2.5">{user.id}</td>
              <td className="border border-white/10 px-3 sm:px-4 py-2.5">{user.name}</td>
              <td className="border border-white/10 px-3 sm:px-4 py-2.5 hidden sm:table-cell">{user.email}</td>
              <td className="border border-white/10 px-3 sm:px-4 py-2.5 hidden md:table-cell">{user.phone}</td>
              <td className="border border-white/10 px-3 sm:px-4 py-2.5 hidden md:table-cell">{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}