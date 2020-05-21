import React, { Component } from "react";
import { connect } from "react-redux";

import { Icon, Button, Card } from "@material-ui/core";
import TextArea from "react-textarea-autosize";

import { addList, addCard } from "../store/actions/listsAction";
// import { addCard } from "../store/actions/cardAction";

class AddButton extends Component {
  state = {
    formOpen: false,
    text: "",
  };

  componentDidMount = () => {
    // console.warn("check props form", this.props.listId)
  }

  openForm = () => {
    this.setState({ formOpen: true });
  };

  closeForm = (e) => {
    this.setState({ formOpen: false });
  };

  handleInputChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleAddList = () => {
    const { text } = this.state;

    if (text) {
      this.props.addList(text);
    }
    this.setState({ text: "" })
  };

  handleAddCard = () => {
    const { text } = this.state;
    if (text) {
      this.props.addCard(this.props.listId, text);
    }
    this.setState({ text: "" })
  };

  renderAddButton = () => {
    const buttonText = this.props.list
      ? "Add another list"
      : "Add another card";
    const buttonTextOpacity = this.props.list ? 1 : 0.5;
    const buttonColor = this.props.list ? "white" : "inherit";
    const buttonTextBackground = this.props.list
      ? "rgba(0,0,0,.15"
      : "transparent";

    return (
      <div
        onClick={this.openForm}
        className="add-button"
        style={{
          opacity: buttonTextOpacity,
          color: buttonColor,
          backgroundColor: buttonTextBackground,
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const placeHolder = this.props.list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = this.props.list ? "Add List" : "Add Card";

    return (
      <div>
        <Card className="card-form">
          <TextArea
            className="add-form"
            placeholder={placeHolder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
          />
        </Card>
        <div className="action-form-group">
          <Button 
          className="button-form" 
          variant="contained" 
          onMouseDown={this.props.list ? this.handleAddList : this.handleAddCard} >
            {buttonTitle}{" "}
          </Button>
          <Icon className="close-form">close</Icon>
        </div>
      </div>
    );
  };

  render() {
    // console.warn("text state", this.state.text)
    return (
      <React.Fragment>
        {this.state.formOpen ? this.renderForm() : this.renderAddButton()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = {
  addList,
  addCard
};
export default connect(mapStateToProps, mapDispatchToProps)(AddButton);
