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
    title: "Navigate to Connections",
    description: (
      <>
        Select the <span className="font-medium">“Connections”</span> icon in
        the top navigation bar to view your existing network and find new
        opportunities.
      </>
    ),
    img_url: "/assets/studio-vendors/stdv1.png",
  },
  {
    icon: "2",
    step: "step2",
    title: "Search for Partners",
    description: (
      <>
        Click <span className="font-medium">“Find Partners”</span> to browse a
        directory of verified studios. You can use filters to search by name,
        service, or industry expertise.
      </>
    ),
    img_url: "/assets/studio-vendors/stdv2.png",
  },
  {
    icon: "3",
    step: "step3",
    title: "Invite New Vendors",
    description: (
      <>
        Click <span className="font-medium">“Invite Vendors”</span> and enter
        the
        <span className="font-medium">email addresses</span> of companies you
        wish to collaborate with, then click{" "}
        <span className="font-medium">“Send Invitations”</span>.
      </>
    ),
    img_url: "/assets/studio-vendors/stdv3.png",
  },
];

export default function page() {
  return (
    <div className="w-full ">
      <TimeLine timelineItems={items} />
    </div>
  );
}
