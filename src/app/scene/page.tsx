import SceneCard from "@/components/Card/SceneCard";
import { IMAGE_DATA } from "@/constants/contents";

export default function Scene() {
  return (
    <section className="w-full h-full overflow-auto flex flex-col gap-5">
      <div className="text-bold-24 text-center">상황 선택</div>
      <ul className="grid grid-cols-1 gap-5">
        {IMAGE_DATA.map((data) => {
          return <SceneCard key={data.id} id={data.id} />;
        })}
      </ul>
    </section>
  );
}
