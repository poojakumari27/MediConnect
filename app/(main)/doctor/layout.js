import { Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Doctor Dashboard - MediConnect",
  description: "Manage your appointments and availability",
};

export default async function DoctorDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white px-4 py-12">
       <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader icon={<Stethoscope />} title="Doctor Dashboard" />

      {children}
      </div>
    </div>
  );
}
