import React, { useEffect, useState } from "react";

export default function EmojiVoting() {
  const [votes, setVotes] = useState(
    JSON.parse(localStorage.getItem("votes")) || {}
  );
  const [topVotes, setTopVotes] = useState();
  const [topEmoji, setTopEmoji] = useState(0);

  const [emojis, setEmojis] = useState(["😊", "😂", "😍", "🤔"]);

  const handleResult = () => {
    let maxVotes = 0;
    let topEmoji = "";

    for (let emoji in votes) {
      if (votes[emoji] > maxVotes) {
        maxVotes = votes[emoji];
        topEmoji = emoji;
      }
    }
    setTopEmoji(topEmoji || "No votes yet!");

    setTopVotes(maxVotes);
  };

  const handleVote = (event) => {
    const emoji = event.target.getAttribute("data-emoji");
    const updatedVotes = { ...votes, [emoji]: (votes[emoji] || 0) + 1 };

    setVotes(updatedVotes);
    localStorage.setItem("votes", JSON.stringify(updatedVotes));

    console.log(emoji, updatedVotes);
  };

  const handleClean = () => {
    setVotes({});
    localStorage.removeItem("votes");
    setTopEmoji("No votes yet!");
    setTopVotes(0);
  };

  return (
    <div>
      <h1 className="d-flex flex-row bd-highlight mb-3 justify-content-center gap-3 ">
        Vote for Your Favorite Emoji!
      </h1>

      <div className="d-flex flex-row bd-highlight mb-3 justify-content-center gap-3 ">
        {emojis.map((emoji, key) => (
          <div
            key={key}
            className="d-flex flex-row "
            style={{ fontSize: "3em" }}
            onClick={handleVote}
            data-emoji={emoji}
          >
            {emoji}
            <p>{votes[emoji] || 0}</p>
          </div>
        ))}
      </div>
      <div className="d-flex flex-column align-items-center mb-3">
        <button className=" btn btn-primary" onClick={handleResult}>
          Show Results
        </button>

        <p
          className="d-flex flex-row justify-content-center "
          style={{ fontSize: "3em" }}
        >
          {topEmoji && `${topEmoji}  ${topVotes} `}
        </p>
        <button className="btn btn-primary" onClick={handleClean}>
          Clean Button
        </button>
      </div>
    </div>
  );
}
