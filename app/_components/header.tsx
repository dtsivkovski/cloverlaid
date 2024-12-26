import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
    return ( 
        <div className="flex flex-row items-center justify-between w-full p-4">
            <div className="flex flex-row items-center justify-start gap-x-2">
                <Image 
                    src="/Cloverlaid.svg" 
                    alt="Cloverlaid" 
                    width={24} 
                    height={24} 
                    draggable={false}
                />
                <h1 className="text-3xl font-bold text-center select-none rgb-text-clip maven-pro-standard">Cloverlaid</h1>
            </div>
            <Link href="https://github.com/dtsivkovski">
            <Button variant="outline" size="icon" className="mx-2"> 
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