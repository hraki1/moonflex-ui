import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function NetflixFooter() {
  return (
    <footer className="bg-black text-gray-400 pt-12 pb-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40">
      <div className="max-w-6xl mx-auto">
        {/* Social Media Links */}
        <div className="flex gap-4 mb-6">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-white transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-white transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="hover:text-white transition-colors"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>

        {/* Footer Links - Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="space-y-3">
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Audio Description
            </Link>
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Investor Relations
            </Link>
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Legal Notices
            </Link>
          </div>
          <div className="space-y-3">
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Help Center
            </Link>
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Jobs
            </Link>
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Cookie Preferences
            </Link>
          </div>
          <div className="space-y-3">
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Gift Cards
            </Link>
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Terms of Use
            </Link>
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Corporate Information
            </Link>
          </div>
          <div className="space-y-3">
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Media Center
            </Link>
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="block text-sm hover:text-white hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Service Button */}
        <button className="mb-8 px-4 py-2 border border-gray-400 text-sm hover:text-white transition-colors">
          Service Code
        </button>

        {/* Copyright */}
        <div className="text-xs">
          © {new Date().getFullYear()} Netflix Clone, Inc. (This is a demo
          project)
        </div>
      </div>
    </footer>
  );
}
