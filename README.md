# 🩺 MediConnect - Doctor Appointment Platform

MediConnect is a full-stack medical appointment platform designed to streamline the process of discovering doctors by specialization, booking consultations, and conducting video calls with real-time support and email notifications.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://medi-connect-eta.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/poojakumari27/MediConnect)


## 🚀 Features

- **Doctor Discovery:** Patients can explore doctors by medical specialization and view detailed profiles.
- **Appointment Booking:** Users can book consultations with available doctors.
- **Email Confirmation:** Automated email confirmations for scheduled appointments.
- **Authentication:** Secure login/signup using Clerk for both doctors and patients.
- **Video Consultations:** Real-time video calls using Vonage with media device checks.
- **Dynamic Controls:** Doctors and patients have access to mic/camera toggles during video calls.
- **Admin Panel (Optional):** Scalable to include a clinic admin dashboard.

## 🛠 Tech Stack

- **Frontend:** Next.js 15, Tailwind CSS, Shadcn UI
- **Backend:** Next.js App Router, Serverless Functions
- **Database:** NeonDB with Prisma ORM
- **Authentication:** Clerk
- **Video Calling:** Vonage (OpenTok)
- **Deployment:** Vercel

## 🧠 How It Works

1. Patients sign up and browse doctors by specialization.
2. Users book a consultation by selecting a date & time.
3. A confirmation email is sent with appointment details.
4. At the scheduled time, both join a secure video call via Vonage.
5. Video session includes dynamic controls and automatic session management.

## 📦 Installation

```bash
git clone https://github.com/yourusername/mediaconnect.git
cd mediaconnect
npm install
npx prisma generate
npm run dev
```

Ensure environment variables are configured (e.g. for Clerk, NeonDB, Vonage).

## 📝 License

MIT License  
© 2025 Pooja Kumari
