export const metadata = {
  title: "Find Doctors - MediMeet",
  description: "Browse and book appointments with top healthcare providers",
};

export default async function DoctorsLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {children}
      </div>
    </div>
  );
}
