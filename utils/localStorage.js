
export function saveRefreshTokenLocalStorage(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
}
export function getRefreshTokenLocalStorage() {
    return localStorage.getItem("refreshToken");
}
export function deleteRefreshTokenLocalStorage() {
    localStorage.removeItem("refreshToken");
}

export function saveAccessTokenLocalStorage(accessToken) {
    localStorage.setItem("accessToken", accessToken);
}
export function getAccessTokenLocalStorage() {
    return localStorage.getItem("accessToken");
}
export function deleteAccessTokenLocalStorage() {
    localStorage.removeItem("accessToken");
}