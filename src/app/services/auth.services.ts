import { authKey } from "@/constants/storageKey";
import { setToLocalStorage, getFromLocalStorage } from "../utils/local-storage";
import { decodedToken } from "../utils/jwt";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { getBaseUrl } from "@/helpers/config/envConfig";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  console.log(accessToken);
  return setToLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};
export const token = () => {
  const authToken = getFromLocalStorage(authKey);
  return authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};
