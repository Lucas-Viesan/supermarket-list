import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import { SAVE_USERNAME_PATH } from "../../services/constants";

export const HomeScreen = () => {
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const onClickContinue = () => {
    if (userName.length < 3) {
      alert("Username deve conter mais de 3 caracteres");
      return;
    }
    localStorage.setItem(SAVE_USERNAME_PATH, userName);
    navigate("/List");
  };

  return (
    <div className="home-screen-container">
      <div className="home-screen-content-container">
        <img
          className="shopping-bag-image"
          src="/images/shopping-bag.svg"
          alt="shopping-bag"
        />
        <h1 className="home-screen-title">
          Sua lista de supermercado mais fácil do que nunca
        </h1>
        <h3 className="home-screen-subtitle">
          Ajudamos você a organizar sua lista de compras de forma descomplicada.
        </h3>
        <h3 className="home-screen-subtitle-description">
          Digite abaixo seu usuário para ter acesso a sua lista de compras:
        </h3>
        <Input
          onChange={(text) => setUserName(text)}
          value={userName}
          label="Username"
          placeholder="Ex: usuário 1"
        />
        <div className="home-screen-button-container">
          <Button onClick={onClickContinue}>Continuar</Button>
        </div>
      </div>
    </div>
  );
};
