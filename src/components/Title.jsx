/**
 * Title.jsx
 * Displays the app title with a layered text effect.
 * Clicking the title opens the info prompt modal.
 *
 * Author: Yumi Takuma
 */

import React from "react";
import { useDispatch } from "react-redux";
import { setShowPrompt } from "../redux/taskSlice";

const Title = () => {
  const dispatch = useDispatch();

  // Open info modal on title click
  const handleClick = () => {
    dispatch(setShowPrompt("info"));
  };

  return (
    <button
      className="font-playwright relative mx-auto mb-5 inline-block text-center text-3xl font-light sm:text-4xl lg:text-5xl"
      title="taskite info"
      type="button"
      onClick={handleClick}
    >
      <h1 className="text-indigo">taskite</h1>
      <span className="text-yellow absolute -top-0.5 -left-0.5">taskite</span>
    </button>
  );
};

export default Title;
