import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import {Separator} from "@heroui/react";

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <BsStars className="text-[#8B5CF6] text-2xl" />
              <span className="text-white text-xl font-bold tracking-wide">
                Promt Hive
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Discover, copy, and create production-ready AI prompts for Gemini,
              ChatGPT, Claude, and Midjourney. Build better apps, write better
              code, and automate your productivity.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold tracking-wider uppercase mb-6 text-sm">
              Platform
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/all-prompts" className="hover:text-white transition-colors">
                  All Prompts
                </Link>
              </li>
              <li>
                <Link href="/all-prompts" className="hover:text-white transition-colors">
                  Trending Prompts
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-white transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-white transition-colors">
                  Demo User
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold tracking-wider uppercase mb-6 text-sm">
              Resources
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  UI Elements
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Dev Meets Devs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Stripe Payment
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Better Auth
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-white font-semibold tracking-wider uppercase mb-6 text-sm">
              Connect
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="p-2 border border-gray-700 rounded-lg hover:border-gray-500 hover:text-white transition-all"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={18} />
              </a>
              <a
                href="#"
                className="p-2 border border-gray-700 rounded-lg hover:border-gray-500 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="#"
                className="p-2 border border-gray-700 rounded-lg hover:border-gray-500 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="#"
                className="p-2 border border-gray-700 rounded-lg hover:border-gray-500 hover:text-white transition-all"
                aria-label="Website"
              >
                <TbWorld size={18} />
              </a>
            </div>
            <div className="text-sm">
              <p className="mb-1">Questions? Support at:</p>
              <a
                href="mailto:support@aiverse.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                support@promthive.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <Separator className="my-8 bg-gray-800/50" />
        
        <div className="text-center text-sm pb-4">
          <p>
            © 2026 Promt Hive. All rights reserved. Created with{" "}
            <span className="text-red-500">❤️</span> for AI promt engineering.
          </p>
        </div>
      </div>
    </footer>
  );
}