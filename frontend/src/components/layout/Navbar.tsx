"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Activate", href: "/activate" },
    { label: "Items", href: "/items" },
    { label: "User Items", href: "/items/user" },
    { label: "Login", href: "/login" },
    { label: "Signup", href: "/signup" },

  ];

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">MyApp</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-yellow-300 font-bold"
                    : "hover:text-yellow-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
