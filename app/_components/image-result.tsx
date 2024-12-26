"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Jimp } from "jimp";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type ImageResultProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    redJimpImage: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    greenJimpImage: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blueJimpImage: any;
}

export const ImageResult = ({redJimpImage, greenJimpImage, blueJimpImage}: ImageResultProps) => {
    const [base64ImageResult, setBase64ImageResult] = useState<string>("");
    const [redChannelValue, setRedChannelValue] = useState<number>(50);
    const [greenChannelValue, setGreenChannelValue] = useState<number>(50);
    const [blueChannelValue, setBlueChannelValue] = useState<number>(50);
    const [posterizeValue, setPosterizeValue] = useState<number>(0);
    const [contrastValue, setContrastValue] = useState<number>(0);

    const [redChannelValueTemp, setRedChannelValueTemp] = useState<number>(50);
    const [greenChannelValueTemp, setGreenChannelValueTemp] = useState<number>(50);
    const [blueChannelValueTemp, setBlueChannelValueTemp] = useState<number>(50);
    const [posterizeValueTemp, setPosterizeValueTemp] = useState<number>(0);
    const [contrastValueTemp, setContrastValueTemp] = useState<number>(0);

    const areImagesSameResolution = useCallback(() => {
        if (!redJimpImage || !greenJimpImage || !blueJimpImage) 
            return 0;
        else if (redJimpImage.width === greenJimpImage.width && redJimpImage.width === blueJimpImage.width) 
            return 1;
        else return -1;
      }, [redJimpImage, greenJimpImage, blueJimpImage]);


    useEffect(() => {
        if (!areImagesSameResolution()) return;
    
        // Create a new blank image with the same dimensions
        const resultImage = new Jimp({
            width: redJimpImage.width,
            height: redJimpImage.height,
            data: Buffer.alloc(redJimpImage.bitmap.data.length) // Create empty buffer with correct size
        });
    
        // Combine channels with brightness adjustments
        resultImage.scan(0, 0, resultImage.bitmap.width, resultImage.bitmap.height, (x, y, idx) => {
            // Red channel (idx + 0)
            resultImage.bitmap.data[idx] = Math.min(255, 
                redJimpImage.bitmap.data[idx] * (redChannelValue / 50));
            
            // Green channel (idx + 1)
            resultImage.bitmap.data[idx + 1] = Math.min(255, 
                greenJimpImage.bitmap.data[idx + 1] * (greenChannelValue / 50));
            
            // Blue channel (idx + 2)
            resultImage.bitmap.data[idx + 2] = Math.min(255, 
                blueJimpImage.bitmap.data[idx + 2] * (blueChannelValue / 50));
            
            // Alpha channel (idx + 3)
            resultImage.bitmap.data[idx + 3] = 255; // Full opacity
        });

        // Posterize
        if (posterizeValue > 0) {
            resultImage.posterize((256 - posterizeValue));
        }

        // Contrast
        if (contrastValue > 0) {
            const adjustedContrastVal = (contrastValue / 100);
            resultImage.contrast(adjustedContrastVal);
        }
    
        // Convert to base64
        resultImage.getBase64("image/png")
            .then(base64 => setBase64ImageResult(base64))
            .catch(err => console.error('Error converting to base64:', err));
    
    }, [redJimpImage, greenJimpImage, blueJimpImage, 
        redChannelValue, greenChannelValue, blueChannelValue, 
        areImagesSameResolution, posterizeValue, contrastValue]);

    return ( 
        <div className="flex flex-col items-center justify-start w-full h-full p-4">
            <h1 className="text-xl font-bold">Image Result</h1>
            <div className="flex flex-row items-center justify-center gap-x-2 p-2">
                <Checkbox className="bg-gray-500 data-[state=checked]:bg-red-500 cursor-default" checked={redJimpImage} />
                <Checkbox className="bg-gray-500 data-[state=checked]:bg-green-600 cursor-default" checked={greenJimpImage} />
                <Checkbox className="bg-gray-500 data-[state=checked]:bg-blue-600 cursor-default" checked={blueJimpImage} />
            </div>
            <div className="flex flex-row items-center justify-center">
                {areImagesSameResolution() === 1 ? (
                    <div className="flex flex-col items-center justify-center gap-y-2 w-full">
                        <div className="flex flex-col gap-y-3 min-w-50 w-80 max-w-100">
                            <label htmlFor="allChannels">All Channels</label>
                            <Slider 
                                max={100} 
                                step={1} 
                                barColor="bg-red-500"
                                className="rounded-full"
                                value={[redChannelValueTemp]} 
                                onValueChange={(value) => setRedChannelValueTemp(value[0])}
                                onValueCommit={(v) => setRedChannelValue(v[0])}
                            />
                            <Slider
                                max={100}
                                step={1}
                                barColor="bg-green-600"
                                className="rounded-full"
                                value={[greenChannelValueTemp]}
                                onValueChange={(value) => setGreenChannelValueTemp(value[0])}
                                onValueCommit={(v) => setGreenChannelValue(v[0])}
                            />
                            <Slider
                                max={100}
                                step={1}
                                barColor="bg-blue-600"
                                className="text-blue-600 rounded-full"
                                value={[blueChannelValueTemp]}
                                onValueChange={(value) => setBlueChannelValueTemp(value[0])}
                                onValueCommit={(v) => setBlueChannelValue(v[0])}
                            />
                            <label htmlFor="posterize">Posterize</label>
                            <Slider
                                min={0}
                                max={256}
                                step={1}
                                barColor="bg-gray-900"
                                className="rounded-full"
                                value={[posterizeValueTemp]}
                                onValueChange={(value) => setPosterizeValueTemp(value[0])}
                                onValueCommit={(v) => setPosterizeValue(v[0])}
                            />
                            <label htmlFor="contrast">Contrast</label>
                            <Slider
                                min={-100}
                                max={100}
                                step={1}
                                barColor="bg-gray-900"
                                className="rounded-full"
                                value={[contrastValueTemp]}
                                onValueChange={(value) => setContrastValueTemp(value[0])}
                                onValueCommit={(v) => setContrastValue(v[0])}
                            />
                        </div>
                        {base64ImageResult && (
                            <Image
                                src={base64ImageResult}
                                alt="Processed Image"
                                width={redJimpImage.width}
                                height={redJimpImage.height}
                                className="rounded-md"
                            />
                        )}
                    </div>
                ) : (
                    <p className={cn(areImagesSameResolution() === -1 ? "text-red-500" : "")}>{areImagesSameResolution() == 0 ? "Upload all images to get started." : "Images are not the same resolution."}</p>
                )}
            </div>
        </div>
    );
}