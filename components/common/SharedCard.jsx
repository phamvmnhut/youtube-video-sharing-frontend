import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"

export default function SharedCard({ share }) {

  return (
    <div className="mb-3">
      <div className="flex flex-row gap-3">
        <div className="bg-white w-1/3 rounded-md">
          {/* <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/QY8dhl1EQfI"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe> */}
        </div>
        <div className="flex flex-col w-2/3">
          <div className="text-red font-bold text-xl">{share.url}</div>
          <div className=" inline">Shared by <span className=" text-indigo-600 inline-block">phamnhut@mail.com</span></div>
          <div className="flex flex-row items-center">
            <AiOutlineLike /> 21 <AiOutlineDislike /> 11
          </div>
          <div className=" inline">Description <p className=" text-indigo-600 inline-block">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p></div>
        </div>
      </div>
    </div>
  );
}