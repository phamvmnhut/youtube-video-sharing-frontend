import { MainLayout } from "@components/layout";

import 'aos/dist/aos.css';
import SharedCard from "@components/common/SharedCard";
import BackendApi from "@components/common/Apis/Api";

export default function HomePage({ sharedList }) {
    return (
        <>
            <div className="container">
                <div className="mt-24">
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
        const res = await BackendApi.get("/shareds")
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