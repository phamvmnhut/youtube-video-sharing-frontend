import { clsV2 } from "@utils/cls";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react"

export default function Pagination({ total_pages, current_page }) {

  const [listPage, setListPage] = useState([]);
  useEffect(() => {
    if (total_pages < 5) {
      const numberArray = Array.from({ length: total_pages }, (_, index) => index + 1);
      return setListPage(numberArray);
    }
    let newListPage = [];
    if (current_page <= 3) {
      console.log(Array.from({ length: current_page - 1 }, (_, index) => index + 1));
      newListPage = newListPage.concat(Array.from({ length: current_page - 1 }, (_, index) => index + 1))
    }
    if (current_page > 3) {
      newListPage = newListPage.concat([1, "...", current_page - 1])
    }
    newListPage.push(current_page);
    if (current_page + 3 > total_pages) {
      newListPage = newListPage.concat(Array.from({ length: total_pages - current_page }, (_, index) => current_page + index + 1))
    }
    if (current_page + 3 <= total_pages) {
      newListPage = newListPage.concat([current_page + 1, "...", total_pages]);
    }
    setListPage(newListPage);
  }, [current_page, total_pages])

  const router = useRouter();

  function onPageClick(page) {
    if (page == current_page) return;
    if (page - 1 < 0) return;
    if (page > total_pages) return;
    router.replace(`${router.pathname}?page=${page}`);
  }

  return (
    <nav className="flex flex-row justify-center">
      <ul className="inline-flex -space-x-px">
        <li>
          <button className={clsV2(
            "px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700",
            current_page == 1 ? " cursor-not-allowed bg-gray-100" : ""
          )}
            onClick={() => onPageClick(current_page - 1)}
          >Previous</button>
        </li>
        {
          listPage.map((e, i) => {
            return (
              <li key={`${e}_${i}`}>
                <button className={clsV2(
                  "px-3 py-2 leading-tight  bg-white border border-gray-300",
                  e == current_page ? " text-blue-500 hover:text-blue-700" : "hover:bg-gray-100 text-gray-500"
                )}
                  onClick={() => onPageClick(e)}
                >{e}</button>
              </li>
            )
          })
        }
        <li>
          <button className={clsV2(
            "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:text-gray-700 hover:bg-gray-100",
            current_page == total_pages ? "cursor-not-allowed bg-gray-100" : ""
          )}
            onClick={() => onPageClick(current_page + 1)}
          >Next</button>
        </li>
      </ul>
    </nav>
  )
}