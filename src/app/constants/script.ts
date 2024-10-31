import { BaseStoryType, GeminiChatHistoryType } from "@/type/common";

export function RESULT_SCRIPT(
  baseStory: BaseStoryType[],
  noScriptHistory: GeminiChatHistoryType[]
) {
  return `아래 제공되는 데이터를 바탕으로, 당신은 다음과 같은 요약 자료를 제공해야합니다.
        - character: ${baseStory[0].story_info.character}
        - summary: 대화를 고려했을 때, model이 맡은 역할인 ${
          baseStory[0].story_info.character
        }의 4줄 이하의 속마음.
        - status: [증오함, 미움, 어색함, 애증, 사랑함] 단계의 감정 상태 중, ${
          baseStory[0].story_info.character
        }와 사용자(user)의 관계는 무엇인지. "당신과 ㅇㅇ는(은) ㅇㅇ 사이"와 같이 작성.
        - emoji: status에 어울리는 이모지 1개.
        - context: 왜 위의 감정상태 관계라고 판단했는지, 관계를 개선하기 위해서는 어떤 식으로 대화를 진행해야하는지에 대한 3줄 이하의 요약 내용.
        - advise: 관계 개선을 위한 조언: 현재문제(current), 해결방법(solution), 주의할점(caution)을 각각 3줄 이하의 문장으로.
        데이터: ${JSON.stringify(noScriptHistory)}

        제공되는 데이터는 반드시 다음 형식을 따라야합니다.
        {
          character: "",
          summary: "",
          result : {status: "", context: "", emoji: ""},
          advise : {
            current: "",
            solution: "",
            caution: ""
          }
        }`;
}
