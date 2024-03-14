import { useContext } from "react";
import { AuthProviderContext } from "./AuthProvider";

// id를 불러오는 과정은 비동기로 수행된다.
export default function useAuth() {
  return useContext(AuthProviderContext);
}
