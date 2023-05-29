import { toast } from "react-toastify";
import React from "react";

const Msg = ({ closeToast, toastProps, title, email }) => (
  <div className="">
    <div className=" font-bold">New Video</div>
    <div className="truncate">{title}</div>
    <div className=" text-indigo-500">Share by <span className=" text-black">{email}</span></div>
  </div>
)

export function setupRecieveNotification(token) {
  const ws = new WebSocket("ws://localhost:3000/cable");

  ws.onopen = () => {
    const gid = Math.random().toString(36).substring(2, 15);
    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: gid,
          channel: "NotificationsChannel",
          jwt: token
        })
      })
    )
  }

  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.type == "ping") return;
    if (data.type == "welcome") return;
    if (data.type == "confirm_subscription") return;

    const messageData = data.message;
    toast(<Msg title={messageData.title} email={messageData.email} />,
      {
        autoClose: false
      })
  }
}