import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {togglePictureEdit} from '../../actions';
import userUtils from '../../utils/userUtils';


export class EditPictureFormContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pictureUrl: ''
    };
  }


  setPicture (event) {
    this.setState({
      pictureUrl: event.target.value,
    });
  }

  editProfilePicture () {
    userUtils.changeProfilePicture(this.props.user._id);
  }

  handleToggle() {
    this.props.togglePictureEdit()
  }

  render () {
    return (
      <form action='/profile' className="picture-edit-form" method='' onSubmit={() => {this.editProfilePicture()} }>
        <div>
          <label htmlFor='pictureUrl'>Picture Url:</label>
          <input type='text' className='profile-edit-input' id='pictureUrl' onChange={this.setPicture.bind(this)} value={this.state.pictureUrl} />
        </div>
        <div className='form-group'>
          <button type='submit' className="picture-submit" onClick={this.handleToggle.bind(this)}>Submit</button>
        </div>
      </form>
    );
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePictureEdit
}, dispatch)

const EditPictureForm = connect(
  () => ({}),
  mapDispatchToProps
)(EditPictureFormContainer);

export default EditPictureForm;
