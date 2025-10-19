
const Commandes = () => {

    return (
        <div>
            <h3>Liste  des  commandes En attente</h3>
            <div className="contentCommandes" style={{
                display: "flex",
            }}>
                <div className="cardCommande" style={{
                    background: "#EFEFEF",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    width: "400px",
                    borderRadius: "10px",
                    padding: "10px 15px 10px 15px",
                    margin: "10px 15px 10px 15px",
                    fontWeight: "bold"
                }}>
                    <img src="/images/sable.png" alt="sable" width="100px" height="100px" />
                    <div className="desc">
                        <h4>sable gros</h4>
                        <p>Référence 06084467 Marque NFA GRANITE</p>
                        <p>Client: Mijoro Mrason</p>
                        <p>Quantité: 15 sacs</p>
                        <p>Téléphone: 034 40 037 76</p>
                        <p>Prix Total  : 75000ar</p>
                        <button
                            style={{
                                background: "#3ACD5F",
                                color: "white",
                                border: "none",
                                padding: "10px 15px 10px 15px",
                                borderRadius: "10px",
                                cursor: "pointer"
                            }}
                        > Valider</button>
                    </div>
                </div>
                <div className="cardCommande" style={{
                    background: "#EFEFEF",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    width: "400px",
                    borderRadius: "10px",
                    margin: "10px 15px 10px 15px",
                    padding: "10px 15px 10px 15px",
                    fontWeight: "bold"
                }}>
                    <img src="/images/sable.png" alt="sable" width="100px" height="100px" />
                    <div className="desc">
                        <h4>sable gros</h4>
                        <p>Référence 06084467 Marque NFA GRANITE</p>
                        <p>Client: Mijoro Mrason</p>
                        <p>Quantité: 15 sacs</p>
                        <p>Téléphone: 034 40 037 76</p>
                        <p>Prix Total  : 75000ar</p>
                        <button
                            style={{
                                background: "#3ACD5F",
                                color: "white",
                                border: "none",
                                padding: "10px 15px 10px 15px",
                                borderRadius: "10px",
                                cursor: "pointer"
                            }}
                        > Valider</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Commandes;
