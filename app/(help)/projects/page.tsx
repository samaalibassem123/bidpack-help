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
    title: "Access Project Management",
    description: (
      <>
        Click on the <span className="font-medium">“Projects”</span> icon in the
        top navigation bar to manage your active projects.
      </>
    ),
    img_url: "/assets/projects/project1.png",
  },
  {
    icon: "2",
    step: "step2",
    title: "Create a New Project",
    description: (
      <>
        Click <span className="font-medium">“+ New Project”</span>. Enter the
        project name, description, and configure the necessary settings in the
        pop-up modal.
      </>
    ),
    img_url: "/assets/projects/project2.png",
  },
  {
    icon: "3",
    step: "step3",
    title: "Project Dashboard",
    description: (
      <>
        Review your newly created project list. Click on a project to open its
        detailed view and begin adding tasks.
      </>
    ),
    img_url: "/assets/projects/project3.png",
  },
  {
    icon: "4",
    step: "step4",
    title: "View Project Details",
    description: (
      <>
        Within the project view, you can see tasks, milestones, and status
        indicators like <span className="font-medium">“Draft”</span>.
      </>
    ),
    img_url: "/assets/projects/project4.png",
  },
  {
    icon: "5",
    step: "step5",
    title: "Manage Project Team",
    description: (
      <>
        Navigate to the <span className="font-medium">“Team”</span> tab within
        your project to view current members. Click{" "}
        <span className="font-medium">“Add Member”</span> to search for and
        assign individuals from your organization to the project.
      </>
    ),
    img_url: "/assets/projects/project5.png",
  },
  {
    icon: "6",
    step: "step6",
    title: "Invite Vendor Organizations",
    description: (
      <>
        Go to the <span className="font-medium">“Vendors”</span> tab and click{" "}
        <span className="font-medium">“Invite Vendor”</span>. Search for an
        existing vendor organization and click{" "}
        <span className="font-medium">“Set up”</span> to add them to the
        project.
      </>
    ),
    img_url: "/assets/projects/project6.png",
  },
  {
    icon: "7",
    step: "step7",
    title: "Configure Project Settings",
    description: (
      <>
        Access the <span className="font-medium">“Settings”</span> tab to update
        project information. This section also contains the{" "}
        <span className="font-medium">“Danger Zone”</span> for deleting the
        project if necessary.
      </>
    ),
    img_url: "/assets/projects/project7.png",
  },
];

export default function page() {
  return (
    <div className="w-full ">
      <TimeLine timelineItems={items} />
    </div>
  );
}
