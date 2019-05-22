import React, { Component } from 'react';


class ComputerDetail extends Component {
  state = {
    editMode : !this.props.recipe || false,
    recipe : this.props.recipe || null,
    add : this.props.add || true
  };

  toggleEditMode = () => {
    this.setState({editMode: !this.state.editMode});
    this.props.addRecipe(this.state.recipe);
  }

  updatePicture = (event) => {
    this.setState({recipe: {...this.state.recipe, picture: event.target.value}})
  }

  updateName = (event) => {
    this.setState({recipe: {...this.state.recipe, name: event.target.value}})
  }

  updateDescription = (event) => {
    this.setState({recipe: {...this.state.recipe, description: event.target.value}})
  }



	render() {	
		return (
	     <div>
      </div>
      
		)
  }
}


export default ComputerDetail;