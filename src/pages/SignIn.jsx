import '../styles/signUp.css'
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'

function SignIn() {
    const navigate = useNavigate();
    const handleGoAcheteurHome = () => {
        navigate("/Acheteur");
    };
    return (
        <>
            <Header />
            <div className="contentSignUp">
                <div className="headerSignUp">
                    <div className="logo">
                        <img src="logos/logoPlateforme.png" alt="" />
                        <h2>art-e-zanal</h2>
                    </div>
                </div>
                <div className="body">
                    <div className="left"><img src="images/pattern-c.png" alt="" /></div>
                    <div className="right">
                        <div className="titleSignUp">
                            <h1>Créer un compte </h1>
                            <h1>art-e-zanal</h1>
                        </div>
                        <div className="form">
                            <input type="text" placeholder='votrenom@gmail.com' /><br />
                            <input type="text" placeholder='mot de passe' />
                            <div className="btnSubmit">
                                <button onClick={handleGoAcheteurHome}>Se connecter</button>
                            </div>
                        </div>
                        <div className="bottom">
                            <p> Mot de passe oublié ? Pas encore de compte ? S’inscrire</p>
                        </div>
                    </div>
                </div>
                <div className="footerSignUp">
                    <p>La qualité artisanal qui fait <br /> toute la différence !</p>
                </div>
            </div>
        </>
    )
}

export default SignIn