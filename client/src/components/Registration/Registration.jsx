import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegistration } from '../../redux/actions/auth.action';
import { useEffect } from 'react'
import Error from '../Error/Error'



export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, values, isLoading } = useSelector(state => state.user)

  useEffect(() => {
    if(values.id) {
      navigate('/')
    };
  }, [values])


  const handlerSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const payload = Object.fromEntries(new FormData(form));
    dispatch(userRegistration(payload));
  };

	return (
		<form onSubmit={handlerSubmit}>
			<div className="uk-margin">
				<div className="uk-inline">
					<span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: user" />
					<input className="uk-input" type="text" id="name" name="name" placeholder="Name" autoFocus autoComplete="off" required />
				</div>
			</div>

			<div className="uk-margin">
				<div className="uk-inline">
					<span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: mail" />
					<input className="uk-input" id="email" type="text" name="email" placeholder="Email" autoComplete="off" required  />
				</div>
			</div>

			<div className="uk-margin">
				<div className="uk-inline">
					<span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock" />
					<input className="uk-input" id="password" type="password" name="password" placeholder="Password" autoComplete="off" required />
				</div>
			</div>

			<div className="uk-margin">
				<div className="uk-inline">
					<span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock" />
					<input
						className="uk-input"
						id="confirmPassword"
						type="password"
						name="confirmPassword"
						placeholder="Confirm password"
            autoComplete="off"
            required 
					/>
				</div>
			</div>
			<center>
				<button className="uk-button uk-button-secondary" disabled={isLoading}>{isLoading ? 'is loading...' : 'SignUp'}</button>
			</center>
      {error && <Error error={error.error} />}
		</form>
	);
}
