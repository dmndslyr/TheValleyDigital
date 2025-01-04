import LoginImg from '../assets/login-logo.png';
import './Login.css';

function LoginPage(){
    return(
        <div className='login-page'>
            <img src={LoginImg} alt='Logo img'></img>
            <div className='login-form'>
                <h2>EDITOR LOGIN</h2>
                <input
                    type="email"
                    placeholder="EMAIL"
                    required
                    // value={email}
                    // onChange={handleEmailChange}
                />
                <input
                    type='password'
                    placeholder='PASSWORD'
                    required
                    // value={password}
                    // onChange={handlePasswordChange}
                />
                <button>LOGIN</button>
            </div>
        </div>
    )
}

export default LoginPage