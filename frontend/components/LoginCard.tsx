"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { IconEye, IconEyeOff, IconBrandGoogle } from "@tabler/icons-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API!;
console.log(BACKEND_URL);

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

type Errors = Partial<Record<keyof LoginFormData, string>>;

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const {setUserData} = useUserContext();

  const [errors, setErrors] = useState<Errors>({});
  const [passwordEye, setPasswordEye] = useState(false);

  const router = useRouter();

  const passwordVisibility = () => {
    setPasswordEye((prevPasswordEye) => !prevPasswordEye);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginSchema.parse(formData);

      // Form validation successful, perform login logic here
      console.log("Form data to be sent:", formData);

      try {
        const response = await fetch(`${BACKEND_URL}/auth/local/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Success:", result);
        setUserData(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('at', result.accesstoken);
        localStorage.setItem('rt', result.refreshtoken);
        return router.push("/");
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Errors = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-input max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8  bg-white dark:bg-black">
        <h2 className="font-bold text-4xl flex justify-center text-neutral-800 dark:text-neutral-200">
          Login
        </h2>
        <p className="text-neutral-600 flex justify-center text-sm max-w-sm mt-2 dark:text-neutral-300">
          Welcome to our App!
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

          <LabelInputContainer className="mb-9 relative">
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

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Log in &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
              onClick={handleGoogleLogin}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className=" text-neutral-700 dark:text-neutral-300 text-sm">
                Continue with Google
              </span>
              <BottomGradient />
            </button>
            <div className="flex justify-center">
              New Member? Sign Up{" "}
              <Link className="text-blue-400" href="/signup">
                &nbsp;here
              </Link>
            </div>
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
