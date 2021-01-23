import FoodieHeader from "../Components/FoodieHeading";
import LoginButton from "../Components/LoginButton"

const Home = () => {
    return ( 
        <header className="header">
            <FoodieHeader/>
            <p className="header__p">Ucztujcie razem</p>
            <LoginButton />
        </header>
     );
}
export default Home;