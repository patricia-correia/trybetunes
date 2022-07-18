import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
      loading: '',
    };
  }

  componentDidMount() {
    this.profileUser();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  profileUser = async () => {
    const check = await getUser();
    this.setState({
      userName: check.name,
      userEmail: check.email,
      userImage: check.image,
      userDescription: check.description,
    });
    if (check !== '') {
      this.setState({
        loading: check,
      });
    }
  }

  render() {
    const { userName, userEmail, userImage, userDescription, loading } = this.state;
    const showInformations = (
      <div>
        <img data-testid="profile-image" src={ userImage } alt="foto de perfil" />
        <p>
          {userName}
        </p>
        <p>
          {userEmail}
        </p>
        <p>
          {userDescription}
        </p>
      </div>
    );
    return (
      <div data-testid="page-profile">
        {
          loading === '' ? <Carregando /> : showInformations
        }
        <nav>
          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </nav>
      </div>
    );
  }
}

export default Profile;
