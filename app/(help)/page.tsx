import Link from "next/link";
import React from "react";

interface ModulesItem {
  label: string;
  url: string;
}

const Modules: ModulesItem[] = [
  {
    label: "Authenticate and access your account",
    url: "/",
  },
  {
    label: "Build and manage your company profile",
    url: "/",
  },
  {
    label: "Add and organize studios and vendors",
    url: "/",
  },
  {
    label: "Create and manage projects",
    url: "/",
  },
  {
    label: "Assign vendors and manage outsourcing",
    url: "/",
  },
  {
    label: "Track vendor availabilityt",
    url: "/",
  },
  {
    label: "Communicate effectively within the platform",
    url: "/",
  },
];

export default function page() {
  return (
    <main className=" space-y-6 font-extralight">
      {/** Intro */}
      <div className="space-y-4 ">
        <h1 className="text-2xl font-semibold">Introduction </h1>
        <p>
          Welcome to <span className="font-semibold"> Bidpack Help</span>
        </p>
        <p>
          This guide is designed to help you navigate and use Bidpack
          efficiently — from setting up your company profile to managing
          vendors, projects, and communications.
        </p>
        <p>
          Bidpack streamlines the way studios and companies collaborate with
          vendors. Whether you`re assigning projects, managing outsourcing
          tasks, tracking vendor availability, or communicating with partners,
          this help center will walk you through each step of the process.
        </p>
      </div>
      {/**What You’ll Learn */}
      <div className="space-y-4 ">
        <h1 className="text-2xl font-semibold">What You’ll Learn </h1>
        <p>In this guide, you’ll discover how to:</p>
        <div className="pl-10 space-y-4 ">
          {Modules.map((m) => (
            <li
              key={m.label}
              className=" hover:underline hover:font-medium transition-all"
            >
              <Link href={m.url}>{m.label}</Link>
            </li>
          ))}
        </div>
        <p>
          Each section is structured step-by-step to ensure you can quickly find
          what you need and start working efficiently.
        </p>
        <p>
          If you’re new to Bidpack, we recommend starting with Authentication
          and following the sections in order.
        </p>
      </div>
    </main>
  );
}
