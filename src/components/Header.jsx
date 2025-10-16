function Header() {

    return (
        <>
            <div className="header">
                <div className="left">
                    <p>Bienvenue sur notre plateforme !</p>
                </div>
                <div className="right">
                    <div className="suivez">
                        <img src="icons\iconoir_delivery-truck.png" alt="truck" />
                        <p>Suivez votre commande</p>
                    </div>
                    <div className="mat">
                        <img src="icons\Discount.png" alt="truck" />
                        <p>Matériaux de construction</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header