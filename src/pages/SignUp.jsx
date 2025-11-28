import '../styles/signUp.css'
import Header from '../components/Header'
import { useState } from 'react'
import { apiUtilisateur } from "../api";
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

function SignIn() {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        motDePasse: '',
        role: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiUtilisateur.post('/utilisateurs/register/', formData);
            toast.success("Inscription réussie !");
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            console.error("Erreur d'inscription :", error);
            toast.error("Erreur lors de l'inscription !");
        }
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
                    {/* Image */}
                    <div className="left">
                        <img src="images/pattern-c.png" alt="" />
                    </div>

                    {/* Formulaire */}
                    <div className="right">
                        <div className="titleSignUp">
                            <h1>Créer un compte</h1>
                            <h2>art-e-zanal</h2>
                        </div>

                        <form className="form" onSubmit={handleSubmit}>
                            <div className="row">
                                <input name="nom" type="text" placeholder="Nom / Prénom" onChange={handleChange} />
                                <input name="email" type="email" placeholder="votrenom@gmail.com" onChange={handleChange} />
                            </div>
                            <div className="row">
                                <input name="motDePasse" type="password" placeholder="Mot de passe" onChange={handleChange} />
                                <select name="role" onChange={handleChange}>
                                    <option value="">-- Choisir un rôle --</option>
                                    <option value="client">client</option>
                                    <option value="vendeur">vendeur</option>
                                </select>
                            </div>

                            <div className="btnSubmit">
                                <button type="submit">S'inscrire</button>
                            </div>
                        </form>

                        <div className="bottom">
                            <p>Déjà inscrit ? 
                                <Link to="/signIn"> Se connecter</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footerSignUp">
                    <p>La qualité artisanale qui fait <br /> toute la différence !</p>
                </div>
            </div>
        </>
    )
}

export default SignIn;
