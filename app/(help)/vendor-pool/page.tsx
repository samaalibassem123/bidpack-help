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
    title: "Accessing the Vendor Pool",
    description: (
      <>
        Navigate to the <span className="font-medium">“Vendor Pool”</span>{" "}
        section from your dashboard to view all approved studios and freelancers
        in your network.
      </>
    ),
    img_url: "/assets/vendor-pool/vp1.png",
  },
  {
    icon: "2",
    step: "step2",
    title: "Filter and Search Vendors",
    description: (
      <>
        Use the <span className="font-medium">“Filter”</span> button and search
        bar to narrow down your vendor list by specific criteria, services, or
        names.
      </>
    ),
    img_url: "/assets/vendor-pool/vp2.png",
  },
  {
    icon: "3",
    step: "step3",
    title: "View Vendor Services",
    description: (
      <>
        Click the <span className="font-medium">“Reviews”</span> button (marked
        with red '1') to open the modal and see a detailed breakdown of the
        vendor's available services and rates.
      </>
    ),
    img_url: "/assets/vendor-pool/vp3.png",
  },
  {
    icon: "4",
    step: "step4",
    title: "Check Calendar Availability",
    description: (
      <>
        Switch to the{" "}
        <span className="font-medium">“General Availability”</span> tab to view
        the vendor’s calendar and identify open dates for your project.
      </>
    ),
    img_url: "/assets/vendor-pool/vp4.png",
  },
];
export default function page() {
  return (
    <div className="w-full ">
      <TimeLine timelineItems={items} />
    </div>
  );
}
