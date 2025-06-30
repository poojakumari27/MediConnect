"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Stethoscope,
  Loader2,
  ArrowLeftCircle,
  FileText,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setUserRole } from "@/actions/onboarding";
import { doctorFormSchema } from "@/lib/schema";
import { SPECIALTIES } from "@/lib/specialities";
import useFetch from "@/hooks/use-fetch";

export default function OnboardingPage() {
  const [step, setStep] = useState("choose-role");
  const router = useRouter();
  const { loading, data, fn: submitUserRole } = useFetch(setUserRole);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialtyValue = watch("specialty");

  const handlePatientSelection = async () => {
    if (loading) return;
    const formData = new FormData();
    formData.append("role", "PATIENT");
    await submitUserRole(formData);
  };

  useEffect(() => {
    if (data?.success) {
      router.push(data.redirect);
    }
  }, [data]);

  const onDoctorSubmit = async (data) => {
    if (loading) return;
    const formData = new FormData();
    formData.append("role", "DOCTOR");
    formData.append("specialty", data.specialty);
    formData.append("experience", data.experience.toString());
    formData.append("credentialUrl", data.credentialUrl);
    formData.append("description", data.description);
    await submitUserRole(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-black text-white px-4 md:px-12 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Top Text - Above Header */}
        <div className="text-center">
          <p className="text-md md:text-lg text-blue-100 mb-2">
            We're glad to have you here!
          </p>

          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Get Started
          </h1>

          {/* Welcome Text - Below Header */}
          <p className="text-md md:text-lg text-blue-100 mt-2">
            Welcome to <span className="text-blue-500">MediConnect</span>
          </p>

          <p className="text-sm text-blue-100 mt-1">
            Tell us how you want to use the platform
          </p>
        </div>

        {/* Step: Choose Role */}
        {step === "choose-role" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Card */}
            <Card
              className="border-blue-800/20 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 bg-blue-900/10 backdrop-blur cursor-pointer"
              onClick={handlePatientSelection}
            >
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="p-4 bg-blue-800/20 rounded-full mb-4">
                  <User className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  Join as a Patient
                </CardTitle>
                <CardDescription className="mb-4 text-sm text-blue-100">
                  Book appointments, consult with doctors, and manage your care.
                </CardDescription>
                <Button
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue as Patient"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Doctor Card */}
            <Card
              className="border-blue-800/20 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 bg-blue-900/10 backdrop-blur cursor-pointer"
              onClick={() => setStep("doctor-form")}
            >
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="p-4 bg-blue-800/20 rounded-full mb-4">
                  <Stethoscope className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  Join as a Doctor
                </CardTitle>
                <CardDescription className="mb-4 text-sm text-blue-100">
                  Build your profile, get verified, and help patients.
                </CardDescription>
                <Button
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  Continue as Doctor
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Step: Doctor Form
          <Card className="border-blue-800/20 bg-blue-900/10 backdrop-blur shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="mb-6">
                <CardTitle className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <FileText className="text-blue-400" />
                  Complete Your Doctor Profile
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Provide your professional details for verification.
                </CardDescription>
              </div>

              <form onSubmit={handleSubmit(onDoctorSubmit)} className="space-y-6">
                {/* Specialty */}
                <div className="space-y-2">
                  <Label htmlFor="specialty">Medical Specialty</Label>
                  <Select
                    value={specialtyValue}
                    onValueChange={(value) => setValue("specialty", value)}
                  >
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALTIES.map((spec) => (
                        <SelectItem
                          key={spec.name}
                          value={spec.name}
                          className="flex items-center gap-2"
                        >
                          <span className="text-blue-500">{spec.icon}</span>
                          {spec.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.specialty && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.specialty.message}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="e.g. 5"
                    {...register("experience", { valueAsNumber: true })}
                  />
                  {errors.experience && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                {/* Credential URL */}
                <div className="space-y-2">
                  <Label htmlFor="credentialUrl">Credential Document URL</Label>
                  <Input
                    id="credentialUrl"
                    type="url"
                    placeholder="https://example.com/degree.pdf"
                    {...register("credentialUrl")}
                  />
                  {errors.credentialUrl && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.credentialUrl.message}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Link to your medical degree or certification.
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your experience and services..."
                    rows="4"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="pt-4 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("choose-role")}
                    className="border-blue-900/30"
                    disabled={loading}
                  >
                    <ArrowLeftCircle className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit for Verification"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
