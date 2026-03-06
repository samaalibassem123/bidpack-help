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
    title: "Navigate to Project Tasks",
    description: (
      <>
        From your project dashboard, click on the{" "}
        <span className="font-medium">“Tasks”</span> tab to view the project
        structure and manage your ongoing work items.
      </>
    ),
    img_url: "/assets/tasks/task1.png",
  },
  {
    icon: "2",
    step: "step2",
    title: "Add New Project Elements",
    description: (
      <>
        Click the <span className="font-medium">“+” icon</span> next to Project
        Structure to add new Folders, Episodes, Sequences, or Shots to your
        project hierarchy.
      </>
    ),
    img_url: "/assets/tasks/task2.png",
  },
  {
    icon: "3",
    step: "step3",
    title: "View Shot Details",
    description: (
      <>
        Select a specific shot from the sidebar to open the{" "}
        <span className="font-medium">“Details”</span> panel, where you can edit
        descriptions and manage custom attributes.
      </>
    ),
    img_url: "/assets/tasks/task3.png",
  },
  {
    icon: "4",
    step: "step4",
    title: "Manage Task Specifications",
    description: (
      <>
        Click on a specific service (like{" "}
        <span className="font-medium">“Roto”</span>) to access the Task View.
        Here you can set the status, priority, and specific service type for
        that task.
      </>
    ),
    img_url: "/assets/tasks/task4.png",
  },
];
export default function page() {
  return (
    <div className="w-full ">
      <TimeLine timelineItems={items} />
    </div>
  );
}
