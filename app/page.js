import Image from "next/image";
import Landing from "../components/Landing";
import Bento from "../components/Bento";
export default function Home() {
  return (
    <div className="w-full">
    <Landing />
     <Bento/>
      </div>
  );
}
