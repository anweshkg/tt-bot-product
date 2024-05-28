"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { z } from "zod";
import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

type Errors = Partial<Record<keyof ForgotPasswordFormData, string>>;

export function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      forgotPasswordSchema.parse(formData);

      // Form validation successful, perform forgot password logic here
      console.log("Form data to be sent:", formData);

      // Example of API call for password reset
      // try {
      //   const response = await fetch("/api/forgot-password", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Network response was not ok");
      //   }

      //   const result = await response.json();
      //   console.log("Success:", result);
      //   // Redirect or show success message
      // } catch (error) {
      //   console.error("Error:", error);
      // }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Errors = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as keyof ForgotPasswordFormData] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-input max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
        <h2 className="font-bold text-4xl flex justify-center text-neutral-800 dark:text-neutral-200">
          Forgot Password
        </h2>
        <p className="text-neutral-600 flex justify-center text-sm max-w-sm mt-2 dark:text-neutral-300">
          Enter your email to reset your password
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="yourname@mail.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Reset Password &rarr;
            <BottomGradient />
          </button>
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
