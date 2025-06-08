import { useDispatch } from "react-redux";
import { setShowPrompt } from "../redux/taskSlice";

const Title = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setShowPrompt("info"));
  };

  return (
    <button
      className="relative inline-block mx-auto text-center text-5xl font-light mb-5 font-playwright"
      title="taskite info"
      type="button"
      onClick={handleClick}
    >
      <h1 className="text-indigo">taskite</h1>
      <span className="absolute -top-0.5 -left-0.5 text-yellow">taskite</span>
    </button>
  );
};

export default Title;
