import '../styles/signUp.css'
import Header from '../components/Header'
import { useState } from 'react'
import api from '../api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

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
            const response = await api.post('/', formData);
            toast.success("Inscription réussie !");
            console.log(response.data);

            // ✅ redirection automatique après un petit délai
            setTimeout(() => {
                navigate('/login'); // ← change '/login' par le vrai chemin de ta page de connexion
            }, 1500);

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
                    <div className="left"><img src="images/pattern-c.png" alt="" /></div>
                    <div className="right">
                        <div className="titleSignUp">
                            <h1>Créer un compte</h1>
                            <h1>art-e-zanal</h1>
                        </div>
                        <form className="form" onSubmit={handleSubmit}>
                            <input name="nom" type="text" placeholder="nom/prénom" onChange={handleChange} />
                            <input name="email" type="email" placeholder="votrenom@gmail.com" onChange={handleChange} /><br />
                            <input name="motDePasse" type="password" placeholder="mot de passe" onChange={handleChange} />
                            <select name="role" onChange={handleChange}>
                                <option value="">-- Choisir un rôle --</option>
                                <option value="client">Client</option>
                                <option value="vendeur">Vendeur</option>
                                <option value="admin">Administrateur</option>
                            </select><br />
                            <div className="btnSubmit">
                                <button type="submit">S'inscrire</button>
                            </div>
                        </form>
                        <div className="bottom">
                            <p>Déjà inscrit ? Se connecter</p>
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
