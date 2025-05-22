const imageFour = "https://res.cloudinary.com/drg2mizpe/image/upload/v1747408988/FILLINBLANK_hlrckr.png";
const imagePerson = "https://res.cloudinary.com/drg2mizpe/image/upload/v1747409612/PREDICTOUTPUT_t4afyw.png";

const miniData = [
  {
    image: imageFour,
    title: "네 글자 퀴즈",
    description: "빠진 부분은 무엇일까요? 빈칸을 채워 단어를 완성해 보세요",
    type: "WORD_CHAIN",
    typing: "위 치",
    typingPosition: { top: "43.7%", left: "41%" },
  },
  {
    image: imagePerson,
    title: "인물 퀴즈",
    description: "사진을 보고 고민하는 시간! 사진 속 인물의 이름을 맞혀보세용",
    type: "GUESS_WHO",
    typing: "스티브 잡스",
    typingPosition: { top: "61%", left: "15%" },
  },
];

export default miniData;
