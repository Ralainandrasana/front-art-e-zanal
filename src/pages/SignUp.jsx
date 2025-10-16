import '../styles/signUp.css'
import Header from '../components/Header'

function SignIn() {

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
                            <input type="text" placeholder='nom/prenom' /><input type="text" placeholder='votrenom@gmail.com' /><br />
                            <input type="text" placeholder='téléphone' /><input type="text" placeholder='adresse' /><br />
                            <input type="text" placeholder='mot de passe' /><input type="text" placeholder='Confirmation du mot de passe' /><br />
                            <input type="text" placeholder='role' /><br />
                            <div className="btnSubmit">
                                <button>S'inscrire</button>
                            </div>
                        </div>
                        <div className="bottom">
                            <p>Déjà inscrit ? Se connecter</p>
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