import TextAccordion from "@/components/Accodion/TextAccodion";
import Button from "@/components/Button/Button";

export default function Result() {
  // 스토리 key 값
  return (
    <div className="w-full h-full overflow-auto flex flex-col text-center gap-5">
      <header className="flex flex-col gap-3">
        <span className="text-bold-34">우연의 속마음</span>
        <span className="text-bold-70">🥺</span>
        <span className="text-regular-16">
          우리 관계가 깊어지면서 나의 배려가 당연한 것처럼 느껴지는 것 같아.
          내가 너에게 이렇게 신경 쓰고 노력하고 있는데, 그게 별로 특별하지 않게
          여겨지는 것 같아서 마음이 아파. 나의 관심과 애정이 존중받지 못하고
          있다는 생각이 들어서 속상해.
        </span>
      </header>
      <section className="flex flex-col gap-3 bg-gray-50 h-auto p-4 text-regular-14 rounded-xl">
        <span className="text-bold-24">당신과 우연은 서먹한 관계</span>
        <span>
          우연은 자신의 배려가 당신에게 당연하게 여겨지는 것 같아 서운함을
          느꼈습니다. 대화 이후로도 서로의 감정을 제대로 이해하지 못하고 있어
          아예 이야기하기를 꺼려하는 모습도 보입니다. 서로의 감정을 더 깊이
          이해하고 나누는 과정이 필요할 것 같습니다.
        </span>
      </section>
      <TextAccordion type="review" />
      <TextAccordion type="advise" />
      <footer className="">
        <Button href="" variant="replay">
          다시 대화하기
        </Button>
      </footer>
    </div>
  );
}
