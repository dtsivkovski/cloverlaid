import MainHeader from "./_components/header";
import ImageManipulator from "./_components/imagemanipulator";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-screen">
      <MainHeader />
      <ImageManipulator />
    </div>
  );
}
