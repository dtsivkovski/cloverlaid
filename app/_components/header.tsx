import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
    return ( 
        <div className="flex flex-row items-center justify-between w-full p-4">
            <div className="flex flex-row items-center justify-start gap-x-3">
                <Image 
                    src="/Cloverlaid.svg" 
                    alt="Cloverlaid" 
                    width={32} 
                    height={32} 
                    draggable={false}
                />
                <h1 className="text-4xl font-bold text-center select-none rgb-text-clip maven-pro-standard">Cloverlaid</h1>
            </div>
            <div className="flex flex-row items-center justify-start gap-x-2">
                <Link href="https://github.com/dtsivkovski/cloverlaid" title="My Github">
                    <Button variant="outline" size="icon"> 
                        <Image
                        src="/github-mark.svg"
                        alt="Github"
                        width={24}
                        height={24}
                        />
                    </Button>
                </Link>
                <Link href="https://linkedin.com/in/danieltsivkovski" title="My LinkedIn">
                    <Button variant="outline" size="icon">
                        <Linkedin size={24} />
                    </Button>
                </Link>
                <Link href="https://ko-fi.com/dtsivkovski" title="Buy me a coffee!">
                    <Button variant="outline" size="icon"> 
                        <Image
                        className="attention-anim"
                        src="/kofi.webp"
                        alt="Ko-fi"
                        width={24}
                        height={24}
                        />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
 
export default MainHeader;