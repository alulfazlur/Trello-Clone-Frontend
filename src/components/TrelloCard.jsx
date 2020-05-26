import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { Draggable } from "react-beautiful-dnd";

const TrelloCard = (props) => {
  return (
    <Draggable draggableId={String(props.cardId)} index={props.index}>
      {(provided) => (
        <div
          className="card-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="card">
            <CardContent>
                <IconButton>
                  <CreateOutlinedIcon style={{ fontSize: 15, fontWeight: "bold" }}/>
                </IconButton>
              <Typography>
                {props.text}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
