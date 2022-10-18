import shallow from "zustand/shallow";
import { useEffect } from "react";

import useStore from "../store/useStore";

const DashboardPage = () => {
  const { getPosts } = useStore((state) => {
    return { getPosts: state.authSlide.getPosts };
  }, shallow);

  console.log("DashboardPage");

  useEffect(() => {
    getPosts();
  }, []);

  return <div>Dashboard</div>;
};

export default DashboardPage;
