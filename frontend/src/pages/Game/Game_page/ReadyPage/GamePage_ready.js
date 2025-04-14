import "./GamePage_ready.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GamePage_ready() {
  const navigate = useNavigate();

  const location = useLocation();
  const { image, title, description } = location.state || {};

  return (
    <div className="PageBackground">
      <div className="PageLayout">
        <div className="PageContent">
          <div className="Ready_content">
            <div className="Ready_main">
              <div className="ImageCover">
                <img className="Image" src={image} alt={title} />
              </div>
              <div className="TextBox">
                <span className="Readytitle">{title}</span>
                <span className="Readyelaborate">{description}</span>
              </div>
              <div className="ReadyButtonList">
                <button
                  className="ReadyButton"
                  aria-label="초급"
                  type="button"
                  onClick={() => navigate("/game/question")}
                >
                  초급
                </button>
                <button
                  className="ReadyButton"
                  aria-label="중급"
                  type="button"
                  onClick={() => navigate("/game/question")}
                >
                  중급
                </button>
                <button
                  className="ReadyButton"
                  aria-label="고급"
                  type="button"
                  onClick={() => navigate("/game/question")}
                >
                  고급
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage_ready;
