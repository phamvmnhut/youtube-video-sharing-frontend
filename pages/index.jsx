import { MainLayout } from "@components/layout";

import 'aos/dist/aos.css';
import SharedCard from "@components/common/SharedCard";
import BackendApi from "@components/common/Apis/Api";

export default function HomePage({sharedList}) {
    // const ws = new WebSocket("ws://localhost:3000/cable");

    // ws.onopen = () => {
    //     console.log("Connected");
    //     const gid = Math.random().toString(36).substring(2, 15);
    //     ws.send(
    //         JSON.stringify({
    //             command: "subscribe",
    //             identifier: JSON.stringify({
    //                 id: gid,
    //                 channel: "NotificationsChannel"
    //             })
    //         })
    //     )
    // }

    // ws.onmessage = (message) => {
    //     const data = JSON.parse(message.data);
    //     if (data.type == "ping") return;
    //     if (data.type == "welcome") return;

    //     console.log(data);

    // }

    return (
        <>
            <div className="container">
                <div className="mt-24">
                    {
                        sharedList.map((ele) => (<SharedCard key={ele.id} share={ele}/>))
                    }
                </div>
            </div>

        </>
    );
}

HomePage.Layout = MainLayout;


export async function getServerSideProps(context) {
    const res = await BackendApi.get("/shareds")
    const shared = await res.data;

    return {
      props: {
        sharedList: shared.data,
      },
    };
  }  