import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import ReactPlayer from 'react-youtube';

export default function SharedCard({ share }) {

  return (
    <div className="mb-10 relative">
      <div className=" absolute -top-5 -right-3 bg-indigo-500 h-12 w-24 rounded-sm flex flex-col justify-center items-center">
        <div className="flex flex-row items-center gap-3">
          <AiOutlineLike size={24} className=" cursor-pointer" /> <AiOutlineDislike className=" cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-row gap-5 px-2 py-1 bg-gray-600 rounded-xl">
        <div className="w-1/2 rounded-md">
          <ReactPlayer
            className="w-full aspect-video"
            url={share?.url}
            opts={{
              width: "100%",
            }}
          >
          </ReactPlayer>
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <div className="text-red font-bold text-xl mt-5">{share?.title}</div>
          <div className=" inline text-indigo-500">Shared by <span className=" text-white font-bold">{share?.user?.email}</span></div>
          <div className="flex flex-row items-center gap-3">
            <AiOutlineLike /> {share?.upvote} <AiOutlineDislike /> {share?.downvote}
          </div>
          <div className=" inline text-indigo-500">Description</div>
          <p className="line-clamp-6	">{share?.description}</p>
        </div>
      </div>
    </div>
  );
}