import { createBrowserRouter, Outlet } from "react-router-dom";
// import Layout from "../shared/router/Layout";
import Main from "../pages/Main";
import Tag from "../pages/Tag";
import NotFound from "../pages/NotFound";
import GT1 from "../pages/GT1/GT1";
//추후 publicRoute recstirct를 사용하여 로그인 여부 확인
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      //   { path: "", element: <Navigate to="/main" replace /> }, // 기본 경로 리다이렉트
      {
        path: "/main",
        element: <Outlet />,
        children: [
          {
            path: "/main/GT1",
            element: <GT1 />,
            // children: [
            //   { path: "/dashboard/GT1/TagSelction", element: <Tag /> },
            // ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />, // 404 페이지
  },
]);

export default router;
