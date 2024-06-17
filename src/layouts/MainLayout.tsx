import { ReactElement } from "react";
import Navbar from "../components/Navbar";

interface Props {
  children: ReactElement;
}

function MainLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
