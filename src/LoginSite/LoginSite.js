import FoodieHeader from "../Components/FoodieHeading"
import LoginButton from "../Components/LoginButton"

const LoginSite = () => {
    return (   
        <main className="main">
            <div className="form-wrapper">
            <FoodieHeader/>
            <form className="login-form">
                <label className="login-form__label" htmlFor="">Nazwa użytkownika:</label>
                <input className="login-form__input" type="text" required />
                <label className="login-form__label login-form__label--pass" htmlFor="">Hasło:</label>
                <input className="login-form__input" type="password" required />
            <LoginButton/>
            </form>
            <div className="singup-wrapper">
                <p>Nowy na Foodie?</p>
                <button className="loginBtn">Zarejestuj</button>
            </div>
            </div>
        </main>
     );
}
 
export default LoginSite;