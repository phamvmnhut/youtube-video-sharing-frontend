import ToastCustom from "@components/common/ToastCustom";
import { toast } from "react-toastify";

export function setupRecieveNotification(token) {
  const ws = new WebSocket(process.env.NEXT_PUBLIC_BACKEND_WS || "ws://localhost:3000/cable");

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
    if (data.type == "welcome") return;
    if (data.type == "ping") return;
    if (data.type == "confirm_subscription") return;
    const messageData = data.message;
  
    toast(<ToastCustom title={messageData?.title} email={messageData.email} />,
      {
        autoClose: false
      })
  }
}