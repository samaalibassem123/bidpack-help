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
    title: "Access Company Profile",
    description: (
      <>
        Click on your <span className="font-medium">profile icon</span> in the
        top right and select
        <span className="font-medium"> “Company Profile”</span> from the
        dropdown menu to begin the setup process.
      </>
    ),
    img_url: "/assets/company/Company1.png",
  },
  {
    icon: "2",
    step: "step2",
    title: "Fill Basic Company Information",
    description: (
      <>
        Complete your <span className="font-medium">General Information</span>,
        including company name, website, and a brief bio, then click{" "}
        <span className="font-medium">“Save Changes”</span>
        to establish your core identity.
      </>
    ),
    img_url: "/assets/company/Company2.png",
  },
  {
    icon: "3",
    step: "step3",
    title: "Configure Services Offered",
    description: (
      <>
        Navigate to the <span className="font-medium">“Services”</span> tab to
        define your specialties. Use the{" "}
        <span className="font-medium">“Add Service”</span> modal to select
        categories and sub-services that match your studio's expertise.
      </>
    ),
    img_url: "/assets/company/Company3.png",
  },
  {
    icon: "4",
    step: "step4",
    title: "Define Technical Tools",
    description: (
      <>
        In the <span className="font-medium">“Tools”</span> tab, click{" "}
        <span className="font-medium">“+ Add Tools”</span>
        to list your software stack. Select the relevant{" "}
        <span className="font-medium">Industry</span>
        and specific software (like Maya or Unreal Engine) your team uses.
      </>
    ),
    img_url: "/assets/company/Company4.png",
  },
  {
    icon: "5",
    step: "step5",
    title: "Manage Team Members",
    description: (
      <>
        Go to the <span className="font-medium">“Team”</span> tab to invite
        collaborators. Enter their{" "}
        <span className="font-medium">email address</span> and assign a
        <span className="font-medium"> Role</span> to manage permissions within
        your company profile.
      </>
    ),
    img_url: "/assets/company/Company5.png",
  },
  {
    icon: "6",
    step: "step6",
    title: "Upload Portfolio Media",
    description: (
      <>
        Use the <span className="font-medium">“Media”</span> tab to showcase
        your work. Click <span className="font-medium">“Add Media”</span> to
        upload high-quality images or videos that represent your studio’s best
        projects.
      </>
    ),
    img_url: "/assets/company/Company6.png",
  },
  {
    icon: "7",
    step: "step7",
    title: "List Industry Certifications",
    description: (
      <>
        Navigate to the <span className="font-medium">“Certification”</span> tab
        and click
        <span className="font-medium"> “Add Certification”</span> to display
        official credentials or awards that validate your professional standing.
      </>
    ),
    img_url: "/assets/company/Company7.png",
  },
  {
    icon: "8",
    step: "step8",
    title: "Add Custom Profile Attributes",
    description: (
      <>
        Under <span className="font-medium">“Custom Attributes”</span>, you can
        add unique data points or specific tags that help your company stand out
        during client searches.
      </>
    ),
    img_url: "/assets/company/Company8.png",
  },
  {
    icon: "9",
    step: "step9",
    title: "Review & Verification Status",
    description: (
      <>
        Check your profile's{" "}
        <span className="font-medium">Indexing Status</span> to ensure all
        mandatory fields are complete. A green badge indicates your profile is
        fully optimized and searchable.
      </>
    ),
    img_url: "/assets/company/Company9.png",
  },
  {
    icon: "10",
    step: "step10",
    title: "View Public Profile",
    description: (
      <>
        Click <span className="font-medium">“View Public Profile”</span> to see
        how your information appears to potential clients and partners on the
        Bidpack platform.
      </>
    ),
    img_url: "/assets/company/Company10.png",
  },
];

export default function page() {
  return (
    <div className="w-full ">
      <TimeLine timelineItems={items} />
    </div>
  );
}
