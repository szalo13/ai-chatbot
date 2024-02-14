"use client";

import { memo } from "react";
import { useAuthGuard } from "../../modules/auth/useAuthGuard";

interface IProps {}

const DashboardPage = ({}: IProps) => {
  useAuthGuard();

  return <div className="">Dashboard</div>;
};

export default memo(DashboardPage);
