"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Jimp } from "jimp";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

interface ChannelHandlerProps {
	channel: "r" | "g" | "b";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setJimpImage: (image: any) => void;
}

const ChannelHandler = ({channel, setJimpImage} : ChannelHandlerProps) => {
	const [base64Image, setBase64Image] = useState<string>("");
	const [imageDisplayWidth, setImageDisplayWidth] = useState<number>(0);
	const [imageDisplayHeight, setImageDisplayHeight] = useState<number>(0);
	const [loadingValue, setLoadingValue] = useState<number>(0);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [baseJimpImage, setBaseJimpImage] = useState<any>(null);
	const [shadowDepth, setShadowDepth] = useState<number>(100);
	const [channelContrast, setChannelContrast] = useState<number>(0);

	const [shadowDepthTemp, setShadowDepthTemp] = useState<number>(100);
	const [channelContrastTemp, setChannelContrastTemp] = useState<number>(0);

	const channelText = channel === "r" ? "Red" : channel === "g" ? "Green" : "Blue";

	// on load, get a useMemo of localStorage saved values for each channel
	useEffect(() => {
        const savedShadowDepth = window.localStorage.getItem(`${channel}-shadowDepth`);
        const savedChannelContrast = window.localStorage.getItem(`${channel}-channelContrast`);
        
        if (savedShadowDepth) {
            setShadowDepth(parseInt(savedShadowDepth));
            setShadowDepthTemp(parseInt(savedShadowDepth));
        }
        if (savedChannelContrast) {
            setChannelContrast(parseInt(savedChannelContrast));
            setChannelContrastTemp(parseInt(savedChannelContrast));
        }
    }, [channel]);

	useEffect(() => {
		if (!baseJimpImage) return;
		// Clone base image
		const clone = baseJimpImage.clone();
		// Isolate this channel
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		clone.scan(0, 0, clone.bitmap.width, clone.bitmap.height, (x: any, y: any, idx: any) => {
			if (channel === "r") {
				clone.bitmap.data[idx + 1] = 0;
				clone.bitmap.data[idx + 2] = 0;
			} else if (channel === "g") {
				clone.bitmap.data[idx] = 0;
				clone.bitmap.data[idx + 2] = 0;
			} else {
				clone.bitmap.data[idx] = 0;
				clone.bitmap.data[idx + 1] = 0;
			}
		});
		// apply shadow depth
		clone.brightness((shadowDepth) / 100); // negative => darker shadows

		// Contrast
		clone.contrast(channelContrast / 100);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		clone.getBase64("image/png").then((processed: any) => {
			setBase64Image(processed);
			setJimpImage(clone);
		});
	}, [baseJimpImage, channel, shadowDepth, channelContrast, setJimpImage]);

	const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setLoadingValue(10);

		const reader = new FileReader();

		setLoadingValue(15);

		setBase64Image("");

		reader.onload = async (event) => {
			const result = event.target?.result;
			if (!result || typeof result !== "string") return;

			setLoadingValue(30);

			// Load the image in Jimp (no channel isolation here)
			const rawImage = await Jimp.read(Buffer.from(result.split(",")[1], "base64"));
			setBaseJimpImage(rawImage);

			setLoadingValue(50);

		// get image dimensions
			setImageDisplayWidth(rawImage.width);
			setImageDisplayHeight(rawImage.height);

			// if image width is larger than 300px, resize it
			const resizeWidthFactor = 350 / rawImage.width;
			if (rawImage.width > 350) {
				setImageDisplayWidth(350);
				setImageDisplayHeight(rawImage.height * resizeWidthFactor);
			}

			setLoadingValue(60);

			setLoadingValue(100);

			setLoadingValue(0);
		};

		// Read the file as a data URL for browser-based Jimp
		reader.readAsDataURL(file);
	};

  return (
    <div className="flex flex-col justify-between items-start w-full h-full p-2">
		<div className="flex flex-row justify-between items-center gap-x-2">
			<h3 className="text-lg font-bold w-24">{channelText}</h3>
			<Input
				type="file"
				accept="image/png, image/jpeg"
				onChange={(e) => handleFile(e)}
			/>
		</div>
		<div className="flex flex-row justify-between items-center w-full pt-2">
			{base64Image && (
				<Image
					src={base64Image}
					alt="Processed Image"
					height={imageDisplayHeight}
					width={imageDisplayWidth}
					className="rounded-md"
				/>
			)}
			{loadingValue != 0 && (
				<Progress
					value={loadingValue}
					max={100}
					className="w-full max-w-100 h-4"
				/>
			)}
		</div>
		<div className="grid grid-flow-col grid-rows-2 grid-cols-2 justify-center items-center w-full pt-2 gap-y-1 gap-x-2">
			<label className="text-sm font-bold">Shadow Depth</label>
			<Slider
				max={200}
				min={0}
				step={1}
				barColor="bg-gray-800"
				value={[shadowDepthTemp]}
				onValueChange={(v) => setShadowDepthTemp(v[0])}
				onValueCommit={(v) => {
					setShadowDepth(v[0]);
					localStorage.setItem(`${channel}-shadowDepth`, v[0].toString());
				}}
			/>
			<label className="text-sm font-bold">Contrast</label>
			<Slider
				min={-100}
				max={100}
				step={1}
				barColor="bg-gray-800"
				value={[channelContrastTemp]}
				onValueChange={(v) => setChannelContrastTemp(v[0])}
				onValueCommit={(v) => {
					setChannelContrast(v[0]);
					localStorage.setItem(`${channel}-channelContrast`, v[0].toString());
				}}
		/>
		</div>
    </div>
  );
};

export default ChannelHandler;