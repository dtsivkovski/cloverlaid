"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ChannelHandler from "./channel-options";
import { useState } from "react";
import { ImageResult } from "./image-result";

const ImageManipulator = () => {

    const [redJimpImage, setRedJimpImage] = useState(null);
    const [greenJimpImage, setGreenJimpImage] = useState(null);
    const [blueJimpImage, setBlueJimpImage] = useState(null);

    return ( 
        <div className="flex flex-row items-center justify-center w-full h-full p-4">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={40}>
                    <div className="flex flex-col gap-4 w-full h-full p-4">
                        <ChannelHandler channel="r" setJimpImage={setRedJimpImage} />
                        <ChannelHandler channel="g" setJimpImage={setGreenJimpImage} />
                        <ChannelHandler channel="b" setJimpImage={setBlueJimpImage} />
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={60}>
                    <ImageResult
                        redJimpImage={redJimpImage}
                        greenJimpImage={greenJimpImage}
                        blueJimpImage={blueJimpImage}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
 
export default ImageManipulator;