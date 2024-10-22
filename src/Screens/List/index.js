import "./index.css";
import { useState, useEffect } from "react";
import { getList } from "../../services/request";
import { ListCard, Loader, ListRender, Button } from "../../components";

export const ListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const options = [
    {
      id: 0,
      name: "Arroz",
      quantity: 2,
    },
    {
      id: 1,
      name: "Feijão",
      quantity: 3,
    },
    {
      id: 2,
      name: "Feijão",
      quantity: 3,
    },
    {
      id: 3,
      name: "Feijão",
      quantity: 3,
    },
    {
      id: 4,
      name: "Feijão",
      quantity: 3,
    },
    {
      id: 5,
      name: "Feijão",
      quantity: 3,
    },
    {
      id: 6,
      name: "Feijão",
      quantity: 3,
    },
    {
      id: 7,
      name: "Feijão",
      quantity: 3,
    },
  ];

  const loadListItems = async () => {
    setLoading(true);
    const result = options; //await getList();
    console.log({ result });
    setListData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadListItems();
  }, []);
  return (
    <div className="list-screen-container">
      <div className="list-screen-content-container">
        <div className="list-screen-header">
          <div className="list-screen-title-container">
            <img
              className="logo-image"
              src="/images/logo.png"
              alt="supermarket-list-logo"
            />

            <h1 className="list-screen-header-title">Lista Supermercado</h1>
          </div>
          <div className="list-screen-button-container">
            <Button>Adicionar</Button>
          </div>
        </div>
        <div className="list-screen-list-container">
          {loading ? <Loader /> : <ListRender list={listData} />}
        </div>
      </div>
    </div>
  );
};
