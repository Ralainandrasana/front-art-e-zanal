import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signUp.css";
import Header from "../components/Header";
import { apiUtilisateur } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material UI imports
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔹 Login avec JWT
      const response = await apiUtilisateur.post("/token/", {
        email: formData.email,
        password: formData.motDePasse,
      });

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      // 🔹 Stocker token et info utilisateur dans localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("id_user", response.data.id_user);
      localStorage.setItem("nom", response.data.nom);

      toast.success("Connexion réussie ✅");

      // 🔹 Redirection selon rôle
      const role = response.data.role;
      if (role === "client") navigate("/Acheteur");
      else if (role === "vendeur") navigate("/Vendeur");
      else navigate("/administrateur");
    } catch (error) {
      console.error(
        "Erreur de connexion :",
        error.response?.data || error.message
      );
      toast.error("Email ou mot de passe incorrect ❌");
    }
  };

  return (
    <>
      <Header />
      <Box className="contentSignUp" sx={{ p: 2 }}>
        <Box className="headerSignUp" sx={{ mb: 4 }}>
          <Box className="logo" sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="logos/logoPlateforme.png"
              alt=""
              style={{ marginRight: 8 }}
            />
            <Typography variant="h4">art-e-zanal</Typography>
          </Box>
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
          className="body"
        >
          {/* Partie gauche: image */}
          <Box className="left" sx={{ flex: 1, textAlign: "center" }}>
            <img
              src="images/pattern-c.png"
              alt=""
              style={{ maxWidth: "100%" }}
            />
          </Box>

          {/* Partie droite: formulaire */}
          <Box
            className="right"
            sx={{ flex: 1, display: "flex", justifyContent: "center" }}
          >
            <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
              <Box className="titleSignUp" sx={{ mb: 3 }}>
                <Typography variant="h5">Connexion</Typography>
                <Typography variant="h6">art-e-zanal</Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Stack spacing={2} alignItems="center">
                  <TextField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="votrenom@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ maxWidth: 300 }}
                  />
                  <TextField
                    label="Mot de passe"
                    type="password"
                    name="motDePasse"
                    placeholder="mot de passe"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ maxWidth: 300 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ maxWidth: 300 }}
                  >
                    Se connecter
                  </Button>
                </Stack>
              </form>

              <Box className="bottom" sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  Mot de passe oublié ? Pas encore de compte ? 
                  <Link to="/signUp">S’inscrire</Link>
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Stack>

        <Box className="footerSignUp" sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2">
            La qualité artisanale qui fait <br /> toute la différence !
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default SignIn;
