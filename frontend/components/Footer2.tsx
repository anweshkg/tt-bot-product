import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps } from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-400 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col items-start space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-200">
            Interested in knowing more?
          </h3>
          <p className="text-sm md:text-base">
            Enter your email to get the latest news and updates.
          </p>
          <form className="w-full flex items-center space-x-2">
            <Input
              className="flex-1 bg-gray-100 border-gray-300 focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:border-gray-600 dark:focus:ring-gray-600"
              placeholder="Enter your email"
              type="email"
            />
            <Button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-200">
              Pages
            </h4>
            <nav className="flex flex-col space-y-1">
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                Home
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                About
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                Services
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-2">
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-200">
              Legal
            </h4>
            <nav className="flex flex-col space-y-1">
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                Terms of Use
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>
          <div className="space-y-2">
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-200">
              Social
            </h4>
            <div className="flex items-center space-x-3">
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                <TwitterIcon className="w-5 h-5" />
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                <FacebookIcon className="w-5 h-5" />
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                <InstagramIcon className="w-5 h-5" />
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-gray-300"
                href="#"
              >
                <LinkedinIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link
            className="hover:text-gray-900 dark:hover:text-gray-300"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="hover:text-gray-900 dark:hover:text-gray-300"
            href="#"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
