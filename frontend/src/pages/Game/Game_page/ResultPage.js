import { useLocation } from "react-router-dom";
import Navbar_game from "../../Navbar/Navbar_game";
import RankingResult from "./ResultPage/RankingGamePage_result";
import PracticeResult from "./ResultPage/PracticeGamePage_result";

function PageResult() {

  const location = useLocation();
  const { isRanking } = location.state || {};

  return (
    <div className="Game_Page">
      <Navbar_game />
      {isRanking ? <RankingResult /> : <PracticeResult />}
    </div>
  );
}

export default PageResult;
