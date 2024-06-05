import { getMessageDetails } from "@/pages/api/normalUserAPI";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MessageDetails = () => {
  // const { msgid } = useParams() ? useParams() : "";
  const msgid = useParams()?.msgid
  // console.log(msgid);
  let [message, setMessage] = useState("");

  useEffect(() => {
    getMessageDetails(msgid).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setMessage(data);
        // console.log(data);
      }
    });
  }, []);
  return (
    <>
      <div className="min-h-screen xl:w-11/12 lg:w-10/12 md:w-9/12 w-full mx-auto">
        <div className="bg-white flex-col rounded-lg overflow-hidden ">
          {!message.message && !message.name ? (
            <h1 className="bg-gray-100 px-3 py-3 rounded-t-lg text-lg">
              SUBSCRIPTION
            </h1>
          ) : (
            <h1 className="bg-gray-100 px-3 py-3 rounded-t-lg text-lg font-medium">
              CONTACT FORM
            </h1>
          )}
          <div className="flex justify-between md:text-base text-sm py-2">
            <h2 className="px-3">
              From:
              <span className="font-semibold ps-2 ">{message.email}</span>
            </h2>
            <h2 className="pe-3 font-thin text-sm">{new Date(message.createdAt).toLocaleString()}</h2>
          </div>
          <h1 className="px-3 py-2 md:text-base text-sm">
            Name:
            {/* {message.name} */}
            {!message.name ? (
              // <span class="px-6 md:px-2 py-3 md:py-3 font-medium text-gray-900 capitalize whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="ps-1 capitalize font-semibold">
                {message.email && message.email.split("@")[0]}
              </span>
            ) : (
              // </span>
              // <td class="px-6 md:px-2 py-3 md:py-3 font-medium text-gray-900 capitalize whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="ps-1 capitalize font-semibold">
                {message.name}
              </span>
              // </td>
            )}
          </h1>
          <p className="px-3 py-2 md:text-base text-sm">
            Message:
            <br />
            {!message.message ? (
              <span class="">I want to subscribe to your newsletter.</span>
            ) : (
              <span class=" ">{message.message}</span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default MessageDetails;
