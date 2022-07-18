import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
      update: false,
    };
  }

  componentDidMount() {
    this.showUserProfile();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateSubmitBtn = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const { userEmail } = this.state;
    if (emailRegex.test(userEmail)) {
      return false;
    }
    return true;
  }

  showUserProfile = async () => {
    const check = await getUser();
    this.setState({
      userName: check.name,
      userEmail: check.email,
      userImage: check.image,
      userDescription: check.description,
    });
  }

  updateUserProfile = async () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    await updateUser({
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    });
  }

  handleSubmit = () => {
    this.updateUserProfile();
    this.setState({
      update: true,
    });
  }

  render() {
    const { userName, userEmail, userImage, userDescription, update } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>

          <label htmlFor="edit-name">
            <input
              data-testid="edit-input-name"
              name="userName"
              value={ userName }
              id="edit-name"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="edit-email">
            <input
              data-testid="edit-input-email"
              name="userEmail"
              value={ userEmail }
              id="edit-email"
              type="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="edit-description">
            <input
              data-testid="edit-input-description"
              type="textarea"
              name="userDescription"
              value={ userDescription }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="edit-image">
            <input
              data-testid="edit-input-image"
              name="userImage"
              id="edit-image"
              type="text"
              value={ userImage }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ this.validateSubmitBtn() }
            onClick={ this.handleSubmit }
          >
            Salvar
          </button>
        </form>
        {
          update ? <Redirect to="/profile" /> : null
        }
      </div>
    );
  }
}

export default ProfileEdit;
