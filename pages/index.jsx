import { MainLayout } from "@components/layout";

import 'aos/dist/aos.css';
import SharedCard from "@components/common/SharedCard";
import { BackendApiServer } from "@components/common/Apis/Api";
import Pagination from "@components/common/Pagination";

import NoContentSvg from "../public/undraw_no_data_re_kwbl.svg";
import Image from "next/image";
import Visibility from "@components/common/Visibility";

const INITPAGE = 1;
const PERPAGE = 10;

export default function HomePage({ sharedList, pagination }) {
    return (
        <>
            <div className="container mt-24 ">
                <div className="ml-10 font-medium text-white text-xl">Total Video shared: {pagination?.total_records}</div>
                <div className="mt-10 mx-10 md:mx-0">
                    {
                        sharedList.map((ele) => (<SharedCard key={ele.id} share={ele} />))
                    }
                    <Visibility visibility={sharedList.length == 0} >
                        <div className="mx-auto mb-10 flex flex-row justify-center">
                            <Image
                                priority
                                src={NoContentSvg}
                                alt="No content Svg"
                            />
                        </div>
                    </Visibility>
                    <Pagination total_pages={pagination?.total_pages} current_page={pagination?.current_page} />
                </div>
            </div>

        </>
    );
}

HomePage.Layout = MainLayout;

export async function getServerSideProps({ query }) {
    try {
        const page = query?.page ?? INITPAGE;
        const per_page = query?.per_page ?? PERPAGE;
        const res = await BackendApiServer.get(`/shareds?page=${page}&per_page=${per_page}`);
        const shared = await res.data;
        return {
            props: {
                sharedList: shared.data,
                pagination: shared.pagination,
            },
        };
    } catch (err) {
        return {
            props: {
                sharedList: []
            },
        };
    }
}  