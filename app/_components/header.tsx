import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
    return ( 
        <div className="flex flex-row items-center justify-between w-full p-4">
        <h1 className="text-3xl font-bold text-center">Easy Overlay</h1>
        <Link href="https://github.com/dtsivkovski">
          <Button variant="outline" size="icon"> 
            <Image
              src="/github-mark.svg"
              alt="Github"
              width={24}
              height={24}
            />
          </Button>
        </Link>
      </div>
    );
}
 
export default MainHeader;