"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { IconBrandGoogle, IconEye, IconEyeOff } from "@tabler/icons-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API!;

const signupSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of birth is required"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

type SignupFormData = z.infer<typeof signupSchema>;

type Errors = Partial<Record<keyof SignupFormData, string>>;

export function SignupFormDemo() {
  const [formData, setFormData] = useState<SignupFormData>({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [passwordEye, setPasswordEye] = useState(false);
  const [passwordEyeConfirm, setPasswordEyeConfirm] = useState(false);

  const router = useRouter();

  const passwordVisibility = () => {
    setPasswordEye((prevPasswordEye) => !prevPasswordEye);
  };

  const passwordVisibilityConfirm = () => {
    setPasswordEyeConfirm((prevPasswordEye) => !prevPasswordEye);
  };

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

    try {
      signupSchema.parse(formData);
      let newErrors: Errors = {};

      if (formData.password !== formData.confirmPassword) {
        newErrors = {
          ...newErrors,
          confirmPassword: "Passwords do not match!",
        };
        setErrors(newErrors);
        return;
      }

      const { confirmPassword, ...dataToSend } = formData;

      console.log("Form data to be sent:", dataToSend);

      try {
        const response = await fetch(`${BACKEND_URL}/auth/local/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Errors = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as keyof SignupFormData] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pb-11 pt-11">
      <div className="shadow-input max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
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
              {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname}</p>
              )}
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
              {errors.lastname && (
                <p className="text-red-500 text-sm">{errors.lastname}</p>
              )}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-3">
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

          <div className="mb-4">
            <Label htmlFor="gerder">Gender</Label>
            <div className="flex space-x-2 mt-1">
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
                <BottomGradient2 />
              </button>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              placeholder="enter date here"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type={passwordEye ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-9 right-0 px-3 flex items-center"
              onClick={passwordVisibility}
            >
              {passwordEye ? (
                <IconEye className="text-gray-20" />
              ) : (
                <IconEyeOff className="text-gray-20" />
              )}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type={passwordEyeConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-9 right-0 px-3 flex items-center"
              onClick={passwordVisibilityConfirm}
            >
              {passwordEyeConfirm ? (
                <IconEye className="text-gray-20" />
              ) : (
                <IconEyeOff className="text-gray-20" />
              )}
            </button>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          {/* {Object.keys(errors).length > 0 && (
            <div className="mt-4 text-red-500">
              <ul>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )} */}

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Continue with Google
              </span>
              <BottomGradient />
            </button>
            <div className="flex justify-center">
              Already a Member? Log In{" "}
              <Link className="text-blue-400" href="/login">
                &nbsp;here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient2 = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-fuchsia-600 to-transparent" />
    </>
  );
};
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
