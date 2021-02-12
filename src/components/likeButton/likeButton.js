import React from "react";
import { Button } from "semantic-ui-react";

function LikeButton(props) {
  if(props.likeCount > 0){
  return (
    <Button
      color="blue"
      content="Like"
      icon="circle"
      label={{
        basic: true,
        color: "blue",
        pointing: "left",
        content: props.likeCount,
      }}
      onClick={props.handleUnlike}
    />
  );}
  return (
    <Button
      color="red"
      content="Like"
      icon="heart"
      label={{
        basic: true,
        color: "red",
        pointing: "left",
        content: props.likeCount,
      }}
      onClick={props.handleLike}
    />
  );
}

export default LikeButton;
