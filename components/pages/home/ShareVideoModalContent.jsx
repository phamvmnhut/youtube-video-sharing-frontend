import BackendApi from "@components/common/Apis/Api";
import { getAccessTokenLocalStorage } from "@utils/localStorage";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const YoutubeVideoLinkRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/

export default function ShareVideoModalContent() {

  const [url, setUrl] = useState(undefined);
  const [urlError, setUrlError] = useState("");

  async function share() {
    if (urlError) {
      return toast.warn("Please complete all error before do");
    }
    const dataBody = {
      shareds: {
        url: url
      }
    }
    const auth_token = getAccessTokenLocalStorage();
    try {
      await BackendApi.post("/shareds", dataBody, {
        headers: {
          auth_token
        }
      });
    } catch (err) {
      const message = err.response;
      toast.error(message.data.error);
    }
  }

  useEffect(()=> {
    if (url == undefined) return;
    if (!YoutubeVideoLinkRegex.test(url)) {
      setUrlError("Youtube video link is invalid");
    } else {
      setUrlError("");
    }
  }, [url]);

  return (
    <div>
      <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xltext-white mb-6">
        Share a Youtube Movie
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="url" className="block mb-2 text-sm font-medium text-white">Url <span className="text-red-500">*</span></label>
          <input type="text" name="url" id="url" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="https://www.youtube.com/watch?v=ABCxyz" required={true}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className=" text-red-500 font-normal text-sm">{urlError}</div>
        </div>
        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
          onClick={share}
        >Share</button>
      </div>
    </div>
  );
}
