import '../styles/signUp.css'
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        motDePasse: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login/', formData);
            console.log(response.data);

            toast.success('Connexion réussie');

            localStorage.setItem('user', JSON.stringify(response.data.user));

            const role = response.data.user.role;
            if (role === 'client') {
                navigate('/Acheteur');
            } else if (role === 'vendeur') {
                navigate('/Vendeur');
            } else {
                navigate('/Admin');
            }
        } catch (error) {
            console.error('Erreur de connexion :', error);
            toast.error('Email ou mot de passe incorrect !');
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
                            <h1>Connexion</h1>
                            <h1>art-e-zanal</h1>
                        </div>
                        <form className="form" onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder='votrenom@gmail.com' value={formData.email} onChange={handleChange} required /> <br />
                            <input type="password" name="motDePasse" placeholder='mot de passe' value={formData.motDePasse} onChange={handleChange} required />
                            <div className="btnSubmit">
                                <button type="submit">Se connecter</button>
                            </div>
                        </form>

                        <div className="bottom">
                            <p>Mot de passe oublié ? Pas encore de compte ? S’inscrire</p>
                        </div>
                    </div>
                </div>
                <div className="footerSignUp">
                    <p>La qualité artisanale qui fait <br /> toute la différence !</p>
                </div>
            </div>
        </>
    );
}

export default SignIn;
