import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <p>Dashboard Navbar</p>
      {children}
    </div>
  );
};

export default DashboardLayout;
