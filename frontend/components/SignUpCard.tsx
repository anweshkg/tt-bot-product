"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { IconBrandGoogle } from "@tabler/icons-react";

export function SignupFormDemo() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleGenderChange = (selectedGender: string) => {
    setFormData({
      ...formData,
      gender: selectedGender,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...dataToSend } = formData; // exclude confirmPassword from the object to be sent

    console.log("Form data to be sent:", dataToSend);

    // try {
    //   const response = await fetch("/api/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(dataToSend),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const result = await response.json();
    //   console.log("Success:", result);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border-2 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-4xl flex justify-center text-neutral-800 dark:text-neutral-200">
          Signup
        </h2>
        <p className="text-neutral-600 flex justify-center text-sm max-w-sm mt-2 dark:text-neutral-300">
          Help us know you better!
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Saul"
                type="text"
                value={formData.firstname}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Goodman"
                type="text"
                value={formData.lastname}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="yourname@mail.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </LabelInputContainer>

          {/* Gender Selection Buttons */}
          <div className="mb-4">
            <p className="text-neutral-600 text-sm mb-2 dark:text-neutral-300">
              Gender
            </p>
            <div className="flex space-x-2">
              <button
                type="button"
                className={cn(
                  "relative group/btn flex-1 h-10 rounded-md font-medium",
                  formData.gender === "male"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-zinc-900 text-neutral-800 dark:text-neutral-300"
                )}
                onClick={() => handleGenderChange("male")}
              >
                Male
                <BottomGradient />
              </button>
              <button
                type="button"
                className={cn(
                  "relative group/btn flex-1 h-10 rounded-md font-medium",
                  formData.gender === "female"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 dark:bg-zinc-900 text-neutral-800 dark:text-neutral-300"
                )}
                onClick={() => handleGenderChange("female")}
              >
                Female
                <BottomGradient />
              </button>
            </div>
          </div>

          {/* Date of Birth Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
