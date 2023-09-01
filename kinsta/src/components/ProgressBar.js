const ProgressBar = ({progress}) => {
    return (
      <div class="outer-bar">
        <div className="inner-bar"
        style={{width: `${progress}%`, backgroundColor:"cyan"}}
        ></div>
      
      </div>
    );
  }
  
  export default ProgressBar;