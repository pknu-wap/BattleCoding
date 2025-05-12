import imageFill from "./FillInTheBlank.png";
import imageResult from "./PredictOutput.png";
import imageCS from "./CsKnowledge.png";

const gameData = [
  {
    image: imageFill,
    title: "빈칸 삽입",
    description: "빠진 부분은 무엇일까요? <br/>빈칸을 채워 코드를 완성해 보세요",
    type: "FILL_IN_BLANK",
  },
  {
    image: imageResult,
    title: "결과 예측",
    description:
      "코드를 보고 고민하는 시간! <br/>어떤 출력이 나올지 예측해 보세요",
    type: "PREDICT_OUTPUT",
  },
  {
    image: imageCS,
    title: "CS 지식",
    description: "알아두면 유용한 지식! <br/>컴퓨터 과학 기초 개념을 맞춰보세요",
    type: "CS_KNOWLEDGE",
  },
];

export default gameData;
