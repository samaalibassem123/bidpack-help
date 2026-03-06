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
    title: "Accessing the Messaging Menu",
    description: (
      <>
        Click the <span className="font-medium">“Messages”</span> icon located
        in the top navigation bar to open your inbox and view all pending
        communications.
      </>
    ),
    img_url: "/assets/communication/com1.png",
  },
  {
    icon: "2",
    step: "step2",
    title: "Selecting a Conversation",
    description: (
      <>
        Browse your chat list on the left sidebar and click on the contact
        marked with a{" "}
        <span className="font-medium">blue notification badge</span>
        to open and read your new messages.
      </>
    ),
    img_url: "/assets/communication/com2.png",
  },
];
export default function page() {
  return (
    <div className="w-full ">
      <TimeLine timelineItems={items} />
    </div>
  );
}
