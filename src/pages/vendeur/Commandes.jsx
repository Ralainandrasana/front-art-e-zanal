import React, { useEffect, useState } from "react";
import axios from "axios";

const Commandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [filtre, setFiltre] = useState("En attente"); // Filtre par défaut
  const token = localStorage.getItem("token");

  // Récupération des commandes depuis le backend
  const fetchCommandes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/commande/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommandes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  // Valider une commande
  const handleValider = async (id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/commande/${id}/valider/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Commande validée !");
      fetchCommandes();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la validation !");
    }
  };

  // Refuser une commande
  const handleRefuser = async (id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/commande/${id}/refuser/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Commande refusée !");
      fetchCommandes();
    } catch (error) {
      console.error(error);
      alert("Erreur lors du refus !");
    }
  };

  // Filtrer les commandes selon le statut
  const commandesFiltrees = commandes.filter((c) => c.statut === filtre);

  return (
    <div>
      <h3>Liste des commandes</h3>

      {/* Boutons de filtre */}
      <div style={{ marginBottom: "20px" }}>
        {["En attente", "Validée", "Refusée"].map((status) => (
          <button
            key={status}
            onClick={() => setFiltre(status)}
            style={{
              marginRight: "10px",
              padding: "8px 15px",
              borderRadius: "5px",
              background: filtre === status ? "#3ACD5F" : "#EFEFEF",
              color: filtre === status ? "white" : "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Liste des commandes */}
      <div
        className="contentCommandes"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {commandesFiltrees.length === 0 ? (
          <p>Aucune commande {filtre.toLowerCase()}.</p>
        ) : (
          commandesFiltrees.map((commande) => (
            <div
              key={commande.id_commande}
              className="cardCommande"
              style={{
                background: "#EFEFEF",
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                width: "400px",
                borderRadius: "10px",
                padding: "10px 15px",
                margin: "10px",
                fontWeight: "bold",
              }}
            >
              <img
                src="/images/sable.png"
                alt="sable"
                width="100px"
                height="100px"
              />
              <div className="desc">
                <h4>
                  {commande.ligneCommandes?.[0]?.id_produit?.nomProduit ||
                    "Produit"}
                </h4>
                <p>Client: {commande.id_user}</p>
                <p>Total: {commande.total} Ar</p>
                <p>Statut: {commande.statut}</p>

                {/* Actions disponibles seulement si en attente */}
                {filtre === "En attente" && (
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={() => handleValider(commande.id_commande)}
                      style={{
                        background: "#3ACD5F",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => handleRefuser(commande.id_commande)}
                      style={{
                        background: "#FF4C4C",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Refuser
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Commandes;
