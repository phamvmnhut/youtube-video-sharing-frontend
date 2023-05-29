import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { cleanPath } from "@utils/cleanUrl";

export default function ActiveLink({ children, activeLinkClass, ...props }) {
  const { pathname } = useRouter();
  let className = children.props.children || ""
  const pathClean = cleanPath(pathname);

  if (props.href == "/") {
    if (pathClean == "") {
      className = `${className} ${activeLinkClass ? activeLinkClass : "text-primary"}`
    }
  } else {
    if (pathClean.indexOf(props.href) != -1) {
      className = `${className} ${activeLinkClass ? activeLinkClass : "text-primary"}`
    }
  }

  return (
    <Link {...props}>
      {
        React.cloneElement(children, { className })
      }
    </Link>
  )
}
