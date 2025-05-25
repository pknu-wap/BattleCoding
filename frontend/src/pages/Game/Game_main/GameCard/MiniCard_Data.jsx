const imageFour = "https://res.cloudinary.com/drg2mizpe/image/upload/v1747408988/FILLINBLANK_hlrckr.png";
const imagePerson = "https://res.cloudinary.com/drg2mizpe/image/upload/v1747409612/PREDICTOUTPUT_t4afyw.png";

const miniData = [
  {
    image: imageFour,
    title: "네 글자 퀴즈",
    description: "사라진 두 글자를 떠올려 단어를 완성해 보세요",
    type: "WORD_CHAIN",
    typing: "위 치",
    mini_typingPosition: { top: "37.5%", left: "56%" },
    typingFontSize: "60px",
  },
  {
    image: imagePerson,
    title: "인물 퀴즈",
    description: "사진 속 인물은 누구일까요? 사진을 보고 이름을 맞혀보세요",
    type: "GUESS_WHO",
    typing: "스티브 잡스",
    mini_typingPosition: { top: "83%", left: "23%" },
    typingFontSize: "35px",
  },
];

export default miniData;
