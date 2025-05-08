import Image from "next/image";
import Landing from "../components/Landing";
import Bento from "../components/Bento";

import { Footer2 } from "../components/footer2";
export default function Home() {
  return (
    <div className="w-full">
    <Landing />
     <Bento/>
     <Footer2/>
      </div>
  );
}
