import "./index.css";
import { useState, useEffect } from "react";
import { getList, updateItem } from "../../services/request";
import { ListCard, Loader, ListRender, Button, Modal } from "../../components";

export const ListScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadListItems = async () => {
    setLoading(true);
    const result = await getList();
    console.log({ result });
    setListData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadListItems();
  }, []);

  const onClickAddButton = () => {
    setModalVisible(true);
    setSelectedItem(null);
  };

  const onCloseModal = () => {
    setModalVisible(false);
    loadListItems();
    setSelectedItem(null);
  };

  const onEditItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const onCheckItem = async (item) => {
    const result = await updateItem(item._id, {
      name: item.name,
      quantity: Number(item.quantity),
      checked: !item.checked,
    });
    if (!result.error) {
      await loadListItems();
    }
  };

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
            <Button onClick={onClickAddButton}>
              {window.innerWidth <= 420 ? "+" : "Adicionar"}
            </Button>
          </div>
        </div>
        <div className="list-screen-list-container">
          {loading ? (
            <Loader />
          ) : (
            <ListRender
              onCheckItem={onCheckItem}
              onEdit={onEditItem}
              list={listData}
            />
          )}
        </div>
      </div>
      {modalVisible && <Modal item={selectedItem} onClose={onCloseModal} />}
    </div>
  );
};
