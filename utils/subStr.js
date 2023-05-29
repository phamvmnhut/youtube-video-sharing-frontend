export const subStr = (str, length = 4) => {
    if (!str) return "";
    return str.substring(0, length) + "..." + str.substring(str.length, str.length - length);
}