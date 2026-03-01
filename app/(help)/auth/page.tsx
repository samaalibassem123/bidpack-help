import TimeLine, { TimeLineItem } from "@/components/TimeLine";
import React from "react";

/**
 *
 * for step on items : you must respect the writing of it like this step(n)
 * n : is the number of step (1,2,3....)
 */

const items: TimeLineItem[] = [
  {
    icon: "1",
    step: "step1",
    title: "Start Your Workspace",
    description: (
      <>
        Click <span className="font-semibold">“Sign up for a workspace”</span>{" "}
        from the homepage to begin creating your account and setting up your
        dedicated workspace.
      </>
    ),
    img_url: "/assets/auth/Auth1.png",
  },
  {
    icon: "2",
    step: "step2",
    title: "Enter Your Email",
    description: (
      <>
        Provide your email address and click{" "}
        <span className="font-semibold">“Continue”</span>. We’ll send you a
        secure verification link to activate your workspace.
      </>
    ),
    img_url: "/assets/auth/Auth2.png",
  },
  {
    icon: "3",
    step: "step3",
    title: "Verify Your Email",
    description: (
      <>
        Check your inbox and click the{" "}
        <span className="font-semibold">verification link</span> to confirm your
        email address and complete your account setup.
      </>
    ),
    img_url: "/assets/auth/Auth3.png",
  },
  {
    icon: "4",
    step: "step4",
    title: "Access Your Workspace",
    description: (
      <>
        Once verified, click{" "}
        <span className="font-semibold">“Go to your workspace”</span> to log in
        and start collaborating.
      </>
    ),
    img_url: "/assets/auth/Auth4.png",
  },
];

export default function page() {
  return (
    <div className="w-full ">
      <TimeLine timelineItems={items} />
    </div>
  );
}
