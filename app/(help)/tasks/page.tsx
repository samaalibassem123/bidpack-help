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
    title: "Open Project Task Board",
    description: (
      <>
        Navigate to the <span className="font-medium">Project Dashboard</span>{" "}
        and access the task board to view all tasks, statuses, and assignments
        in one centralized workspace.
      </>
    ),
    img_url: "/assets/tasks/task1.png",
  },
  {
    icon: "2",
    step: "step2",
    title: "Filter and Organize Tasks",
    description: (
      <>
        Use filtering and sorting options to organize tasks by{" "}
        <span className="font-medium">status, priority, or assignee</span> for
        better focus and tracking.
      </>
    ),
    img_url: "/assets/tasks/task2.png",
  },
  {
    icon: "3",
    step: "step3",
    title: "Switch Task Views",
    description: (
      <>
        Toggle between different task views such as{" "}
        <span className="font-medium">List</span> or{" "}
        <span className="font-medium">Board</span> to manage work in the format
        that fits your workflow.
      </>
    ),
    img_url: "/assets/tasks/task3.png",
  },
  {
    icon: "4",
    step: "step4",
    title: "Open Task Details",
    description: (
      <>
        Click on a task to open its detailed view where you can manage
        descriptions, attachments, deadlines, and assigned members.
      </>
    ),
    img_url: "/assets/tasks/task4.png",
  },
  {
    icon: "5",
    step: "step5",
    title: "Create or Edit Task",
    description: (
      <>
        Add a new task or update an existing one by editing its{" "}
        <span className="font-medium">title, scope, budget, and timeline</span>.
      </>
    ),
    img_url: "/assets/tasks/task5.png",
  },
  {
    icon: "6",
    step: "step6",
    title: "Initiate Outsourcing",
    description: (
      <>
        Click the <span className="font-medium">“Outsource”</span> button to
        send the task to external vendors and begin the bidding process.
      </>
    ),
    img_url: "/assets/tasks/task6.png",
  },
  {
    icon: "7",
    step: "step7",
    title: "Configure Outsourcing Details",
    description: (
      <>
        Define outsourcing requirements including{" "}
        <span className="font-medium">
          budget, deadline, and specifications
        </span>{" "}
        before publishing the request.
      </>
    ),
    img_url: "/assets/tasks/task7.png",
  },
  {
    icon: "8",
    step: "step8",
    title: "Receive Vendor Bids",
    description: (
      <>
        Vendors submit proposals with pricing and delivery timelines. Review all
        bids directly within the task interface.
      </>
    ),
    img_url: "/assets/tasks/task8.png",
  },
  {
    icon: "9",
    step: "step9",
    title: "Review Bid Details",
    description: (
      <>
        Open each proposal to analyze the{" "}
        <span className="font-medium">
          cost breakdown, timeline, and vendor profile
        </span>{" "}
        before making a decision.
      </>
    ),
    img_url: "/assets/tasks/task9.png",
  },
  {
    icon: "10",
    step: "step10",
    title: "Award the Task",
    description: (
      <>
        Select the preferred vendor and click{" "}
        <span className="font-medium">“Award”</span> to officially assign the
        outsourced task.
      </>
    ),
    img_url: "/assets/tasks/task10.png",
  },
  {
    icon: "11",
    step: "step11",
    title: "Manage Contract & Payment",
    description: (
      <>
        Track payment details, milestones, and contract status to ensure smooth
        collaboration and financial transparency.
      </>
    ),
    img_url: "/assets/tasks/task11.png",
  },
  {
    icon: "12",
    step: "step12",
    title: "Monitor Progress & Completion",
    description: (
      <>
        Follow task updates, approve final submissions, and mark the task as{" "}
        <span className="font-medium">completed</span> once deliverables are
        verified.
      </>
    ),
    img_url: "/assets/tasks/task12.png",
  },
];
export default function page() {
  return (
    <div className="w-full ">
      <TimeLine timelineItems={items} />
    </div>
  );
}
