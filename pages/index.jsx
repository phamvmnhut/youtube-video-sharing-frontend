import { MainLayout } from "@components/layout";

import 'aos/dist/aos.css';
import SharedCard from "@components/common/SharedCard";
import { BackendApiServer } from "@components/common/Apis/Api";

export default function HomePage({ sharedList }) {
    return (
        <>
            <div className="container">
                <div className="mt-24 mx-10 md:mx-0">
                    {
                        sharedList.map((ele) => (<SharedCard key={ele.id} share={ele} />))
                    }
                </div>
            </div>

        </>
    );
}

HomePage.Layout = MainLayout;


export async function getServerSideProps(context) {
    try {
        const res = await BackendApiServer.get("/shareds")
        const shared = await res.data;
        
    return {
        props: {
            sharedList: shared.data,
        },
    };
    } catch (err){
        return {
            props: {
                sharedList: []
            },
        };
    }
}  