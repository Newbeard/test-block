import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions/auth.action';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Error from '../Error/Error'


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, values, isLoading } = useSelector(state => state.user)

  useEffect(() => {
    if (values.id) {
      navigate('/')
    };
  }, [values])

  const handlerSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    dispatch(userLogin(payload));
  };


	return (
    <>
		<form onSubmit={handlerSubmit}>
			<div className="uk-margin">
				<div className="uk-inline">
					<span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: mail" />
					<input className="uk-input" id="email" type="text" name="email" placeholder="Email" autoFocus autoComplete="off" required />
				</div>
			</div>

			<div className="uk-margin">
				<div className="uk-inline">
					<span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock" />
					<input className="uk-input" id="password" type="password"  name="password" placeholder="Password" autoComplete="off" required />
				</div>
			</div>
			<center>
				<button className="uk-button uk-button-secondary" disabled={isLoading}>{isLoading ? 'is loading...' : 'SignIn'}</button>
			</center>
		</form>
      {error && <Error error={error.error} />}
      </>
	);
}
