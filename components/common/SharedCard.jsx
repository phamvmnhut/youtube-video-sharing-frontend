import { getAccessTokenLocalStorage } from "@utils/localStorage";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import ReactPlayer from 'react-player';
import BackendApi from "./Apis/Api";
import { toast } from "react-toastify";
import { clsV2 } from "@utils/cls";
import { useSelector } from "react-redux";
import { UserStatus, selectUserStatus } from "@app/userSlice";

const MyVoteState = {
  "NONE": 0,
  "UPVOTE": 1,
  "DOWNVOTE": 2
}

export default function SharedCard({ share }) {
  const userStatus = useSelector(selectUserStatus);

  const [upvote, setUpvote] = useState(share?.upvote);
  const [downvote, setDownvote] = useState(share?.downvote);

  const [myVote, setMyVote] = useState(MyVoteState.NONE);
  const [vote, setVote] = useState(null);

  useEffect(() => {
    if (userStatus == UserStatus.NO_LOGIN) return;
    const auth_token = getAccessTokenLocalStorage();
    if (!auth_token) return;
    async function getIsVote() {
      try {
        const shared_id = share?.id;
        const response = await BackendApi.get(`/likes_by_shared/${shared_id}`, {
          headers: {
            auth_token
          }
        });
        const likeByShared = await response.data;
        const likeData = likeByShared.data;
        setVote(likeData);
        const isLiked = likeData.is_like;
        if (isLiked == true) {
          setMyVote(MyVoteState.UPVOTE);
        } else {
          setMyVote(MyVoteState.DOWNVOTE);
        }
      } catch (e) {
        setMyVote(MyVoteState.NONE)
      }

    }
    getIsVote();
  }, [share?.id, userStatus]);

  async function onLikeBtnClick() {
    const auth_token = getAccessTokenLocalStorage();
    if (!auth_token || userStatus == UserStatus.NO_LOGIN) {
      return toast.warn("Please login to do")
    }
    if (myVote == MyVoteState.NONE) {
      // create vote
      try {
        const bodyData = { shared_id: share?.id, is_like: "true" };
        let response = await BackendApi.post("/likes", bodyData, {
          headers: {
            auth_token
          }
        });
        const responseData = await response.data;
        const likeData = responseData.data;
        setMyVote(MyVoteState.UPVOTE);
        setVote(likeData);
        setUpvote((e) => e + 1);
      } catch (e) {

      }
    }
    if (myVote == MyVoteState.UPVOTE) {
      try {
        const likeId = vote?.id;
        let response = await BackendApi.delete(`/likes/${likeId}`, {
          headers: {
            auth_token
          }
        });
        await response.data;
        setMyVote(MyVoteState.NONE);
        setVote(null);
        setUpvote((e) => e - 1);
      } catch (e) {

      }
    }
    if (myVote == MyVoteState.DOWNVOTE) {
      try {
        const likeId = vote?.id;
        let response = await BackendApi.put(`/likes/${likeId}`, {}, {
          headers: {
            auth_token
          }
        });
        const responseData = await response.data;
        setMyVote(MyVoteState.UPVOTE);
        setVote(responseData.data);
        setUpvote((e) => e + 1);
        setDownvote((e) => e - 1);
      } catch (e) {

      }
    }
  }

  async function onDisLikeBtnClick() {
    const auth_token = getAccessTokenLocalStorage();
    if (!auth_token || userStatus == UserStatus.NO_LOGIN) {
      return toast.warn("Please login to do")
    }
    if (myVote == MyVoteState.NONE) {
      // create vote
      try {
        const bodyData = { shared_id: share?.id, is_like: "false" };
        let response = await BackendApi.post("/likes", bodyData, {
          headers: {
            auth_token
          }
        });
        const responseData = await response.data;
        const likeData = responseData.data;
        setMyVote(MyVoteState.DOWNVOTE);
        setVote(likeData);
        setDownvote((e) => e + 1);
      } catch (e) {
        console.log(e);
      }
    }
    if (myVote == MyVoteState.DOWNVOTE) {
      try {
        const likeId = vote?.id;
        let response = await BackendApi.delete(`/likes/${likeId}`, {
          headers: {
            auth_token
          }
        });
        await response.data;
        setMyVote(MyVoteState.NONE);
        setVote(null);
        setDownvote((e) => e - 1);
      } catch (e) {

      }
    }
    if (myVote == MyVoteState.UPVOTE) {
      try {
        const likeId = vote?.id;
        let response = await BackendApi.put(`/likes/${likeId}`, {}, {
          headers: {
            auth_token
          }
        });
        const responseData = await response.data;
        setMyVote(MyVoteState.DOWNVOTE);
        setVote(responseData.data);
        setUpvote((e) => e - 1);
        setDownvote((e) => e + 1);
      } catch (e) {

      }
    }
  }

  return (
    <div className="mb-10 relative">
      <div className=" absolute -top-5 -right-3 bg-indigo-500 h-12 w-24 rounded-sm flex flex-col justify-center items-center">
        <div className="flex flex-row items-center gap-3">
          <AiOutlineLike size={myVote == MyVoteState.UPVOTE ? 24 : 16} className={clsV2(
            "cursor-pointer hover:scale-110",
            myVote == MyVoteState.UPVOTE ? "text-red-500" : "text-white"
          )} onClick={onLikeBtnClick} />
          <AiOutlineDislike size={myVote == MyVoteState.DOWNVOTE ? 24 : 16} className={clsV2(
            "cursor-pointer hover:scale-110",
            myVote == MyVoteState.DOWNVOTE ? " text-gray-600" : "text-white"
          )} onClick={onDisLikeBtnClick} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 px-2 py-1 bg-gray-600 rounded-xl">
        <div className="md:w-1/2 rounded-md">
          <div className=" aspect-video mt-5 overflow-hidden rounded-md">
            <ReactPlayer
              url={share?.url}
              width='100%'
              height='100%'
            >
            </ReactPlayer>
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 gap-2">
          <div className="text-red font-bold text-xl mt-5">{share?.title}</div>
          <div className=" inline text-indigo-500">Shared by <span className=" text-white font-bold">{share?.user?.email}</span></div>
          <div className="flex flex-row items-center gap-3">
            <AiOutlineLike /> {upvote} <AiOutlineDislike /> {downvote}
          </div>
          <div className=" inline text-indigo-500">Description</div>
          <p className="line-clamp-6	">{share?.description}</p>
        </div>
      </div>
    </div>
  );
}