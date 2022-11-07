import React from "react";
import { useState } from "react";

function OnlineStatus() {
  const [fields, setField] = useState(false);

  // //Incase of any error, we display the alert message
  const [alertStatus, setAlertStatus] = useState("online");
  const [msg, setMsg] = useState(null);

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  function updateOnlineStatus(event) {
    const onlineStatus = navigator.onLine ? "online" : "offline";

    //rendering the item
    if (onlineStatus === "online") {
      setField(true);
      setMsg("You are Online 😊");
      setAlertStatus("online");

      setTimeout(() => {
        setField(false);
      }, 5000);
    } else if (onlineStatus === "offline") {
      setField(true);
      setMsg("You are Offline 😫");
      setAlertStatus("offline");

      setTimeout(() => {
        setField(false);
      }, 5000);
    }
  }

  return (
    // Whenever field is true, render the notification
    fields && (
      <div
        className={` rounded-md z-100 fixed bottom-4 md:right-16  text-white p-3 px-5 ${
          alertStatus === "online" ? "bg-green-600" : "bg-red-700"
        }`}
      >
        <p>{msg}</p>
      </div>
    )
  );
}

export default OnlineStatus;
