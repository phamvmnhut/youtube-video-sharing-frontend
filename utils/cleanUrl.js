export function cleanPath(url) {
    let checkUrl = url;
    if (checkUrl.indexOf("#") != -1) {
        checkUrl = checkUrl.substring(0, checkUrl.indexOf("#"))
    }
    if (checkUrl.indexOf("?") != -1) {
        checkUrl = checkUrl.substring(0, checkUrl.indexOf("?"))
    }
    if (checkUrl.substr(checkUrl.length -1) == "/") {
        checkUrl = checkUrl.substring(0, checkUrl.length - 1 )
    }
    return checkUrl;
}