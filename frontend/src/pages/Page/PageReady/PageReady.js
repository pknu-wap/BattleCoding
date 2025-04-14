import "./PageReady.css";

function GamePage_ready() {
  return (
    <div className="Background">
      <div className="Layout">
        <div className="Content">
          <div className="Ready">
            <div className="Ready_main">
              <div className="ImageCover">
                <img
                  className="Image"
                  src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDExMTBfMTEx%2FMDAxNjA0OTgxNTU0MDMw.wwIzlFbWoHoSxdy52fHN2Z7Hyg91fxKq44E1x2sQFvYg.D1jbkHq-Dd_8aOIPQZUwjNmkCzxrw8gYcpXnK99OuFMg.JPEG.511jay%2F%25B4%25D9%25B8%25AE1.JPG&type=sc960_832"
                  alt="예시 이미지1"
                />
              </div>
              <div className="TextBox">
                <span className="Readytitle">예시 이미지1</span>
                <span className="Readyelaborate">
                  안녕하세요 예시 이미지1입니다. 반가워요.
                </span>
              </div>
              <div className="ReadyButtonList">
                <button className="ReadyButton" aria-label="초급" type="button">
                  초급
                </button>
                <button className="ReadyButton" aria-label="중급" type="button">
                  중급
                </button>
                <button className="ReadyButton" aria-label="고급" type="button">
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
