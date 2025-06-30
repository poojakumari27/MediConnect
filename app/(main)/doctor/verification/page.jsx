import { ClipboardCheck, AlertCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";

export default async function VerificationPage() {
  const user = await getCurrentUser();

  if (user?.verificationStatus === "VERIFIED") {
    redirect("/doctor");
  }

  const isRejected = user?.verificationStatus === "REJECTED";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/5 backdrop-blur-md border border-blue-800/30 shadow-2xl rounded-2xl">
          <CardHeader className="text-center">
            <div
              className={`mx-auto p-4 rounded-full mb-4 w-fit shadow-md transition-transform duration-300 transform hover:scale-105 ${
                isRejected ? "bg-red-900/30" : "bg-blue-800/30"
              }`}
            >
              {isRejected ? (
                <XCircle className="h-8 w-8 text-red-400 animate-pulse" />
              ) : (
                <ClipboardCheck className="h-8 w-8 text-yellow-400 animate-pulse" />
              )}
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight text-white">
              {isRejected ? "Verification Declined" : "Verification in Progress"}
            </CardTitle>
            <CardDescription className="text-lg text-blue-200 mt-2">
              {isRejected
                ? "Unfortunately, your application needs revision"
                : "Thank you for submitting your information"}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center px-6 pb-8">
            {isRejected ? (
              <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-5 mb-6 text-left text-sm text-red-100 space-y-3">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
                  <div>
                    <p className="mb-2">
                      Our administrative team has reviewed your application and found issues.
                      Common reasons include:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Insufficient or unclear credential documentation</li>
                      <li>Professional experience requirements not met</li>
                      <li>Incomplete or vague service description</li>
                    </ul>
                    <p className="mt-2">
                      You can update your application with more information and resubmit.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-5 mb-6 text-left text-sm text-blue-100 flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                <p>
                  Your profile is under review by our administrative team. This typically takes 1–2 business days.
                  You’ll receive an email notification once your account is verified.
                </p>
              </div>
            )}

            <p className="text-blue-200 text-sm mb-6">
              {isRejected
                ? "You can update your doctor profile and resubmit for verification."
                : "While you wait, you can explore our platform or contact support if you have questions."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isRejected ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Link href="/">Return to Home</Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/doctor/update-profile">Update Profile</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Link href="/">Return to Home</Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/contact-support">Contact Support</Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
