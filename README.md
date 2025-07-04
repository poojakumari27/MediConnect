🏥 MediConnect – Doctor Appointment Platform

A full-stack medical appointment platform enabling patients to browse doctors by specialization, book consultations, and join secure video calls. Built with Next.js, Tailwind CSS, Prisma, Vonage, and Clerk, MediConnect offers a seamless healthcare experience from search to real-time consultation.

🚀 Live Demo

🔗 Visit MediConnect (Deployed on Vercel)💻 GitHub Repository

✨ Features

🔍 Doctor Discovery – Patients can explore doctors by specialization, location, or availability.

🗕️ Appointment Booking – Schedule consultations in real-time with available doctors.

📧 Email Confirmation – Automatically sends confirmation emails for successful bookings.

🔐 Secure Authentication – Role-based access for patients and doctors using Clerk.

🎥 Video Consultation – Integrated Vonage API for HD video calls with pre-call hardware checks.

📱 Responsive UI – Optimized for all screen sizes using Tailwind and Shadcn UI components.

🧹 Serverless & Scalable – Built with Next.js 15 and NeonDB to ensure modern scalability and performance.

🧠 How It Works

Patients sign up and browse doctors by specialization.

Doctors register and manage their availability and consultations.

Appointments are booked with automatic confirmation and reminders.

Video Calls happen securely using Vonage, with stream controls and diagnostics.

🛠️ Tech Stack

Frontend

Backend

Auth & DB

Realtime Video

Next.js 15

Next.js API Routes

Clerk (Auth)

Vonage Video API

React 19

Prisma ORM

NeonDB (PostgreSQL)

Vonage RTC SDK

Tailwind CSS

Serverless





Shadcn/UI







📁 Folder Structure

mediaconnect/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components (shadcn, UI cards, forms)
├── lib/                 # Utility functions and API logic
├── prisma/              # Prisma schema and DB client
├── public/              # Static assets
├── styles/              # Tailwind and custom CSS
├── pages/               # API routes and dynamic pages
├── hooks/               # Custom React hooks
├── env.local            # Environment variables
└── README.md

🧪 Local Setup

Clone the repo

git clone https://github.com/poojakumari27/mediaconnect.git
cd mediaconnect

Install dependencies

npm install

Set up environment variablesCreate a .env.local file:

DATABASE_URL=your-neon-db-url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-pk
CLERK_SECRET_KEY=your-clerk-secret
VONAGE_API_KEY=your-vonage-key
VONAGE_API_SECRET=your-vonage-secret

Run locally

npx prisma generate
npx prisma db push
npm run dev

📄 License

This project is licensed under the MIT License – feel free to fork and build on top of it!

👩‍💻 Developed By
 Pooja Kumari

