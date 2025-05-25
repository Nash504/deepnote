import Image from "next/image";
import Landing from "../components/landing_page/Landing";
import Bento from "../components/landing_page/Bento";

import { Footer2 } from "../components/landing_page/footer2";
export default function Home() {
  return (
    <div className="w-full">
    <Landing id="landing"/>
     <Bento id="bento"/>
     <Footer2 id="footer"/>
      </div>
  );
}
