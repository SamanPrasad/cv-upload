import { ReactElement } from "react";
import Navbar from "../components/Navbar";

interface Props {
  children: ReactElement;
}

function MainLayout({ children }: Props) {
  return (
    <div className="container" style={{ position:"relative" }}>
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
