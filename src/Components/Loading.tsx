import "../assets/style/loading.css";

function Load() {
  return (
    <div className="loading">
      <div className="loader">
        <div className="face">
          <div className="circle"></div>
        </div>
        <div className="face">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}

export default Load;