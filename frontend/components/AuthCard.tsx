import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthCard() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// import React from "react";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import Link from "next/link";

// const AuthCard = () => {
//   return (
//     <>
//       <div className="rounded-md bg-white p-8 shadow-sm dark:bg-gray-900">
//         <div className="grid gap-6">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               placeholder="m@example.com"
//               required
//               type="email"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" required type="password" />
//           </div>
//         </div>
//         <Button className="mt-6 w-full" type="submit">
//           Sign In
//         </Button>
//         <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
//           Don't have an account?
//           <Link
//             className="font-medium text-gray-900 underline hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
//             href="#"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthCard;
