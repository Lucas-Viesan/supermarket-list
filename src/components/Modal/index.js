import "./index.css";
import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { createItem, updateItem, deleteItem } from "../../services/request";

export const Modal = ({ onClose, item }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const valideBeforeSave = () => {
    if (name.length < 3) {
      alert("Nome tem que ter mais de 3 caracteres");
      return false;
    }

    if (quantity < 1) {
      alert("Quantidade não pode ser menor que 1");
      return false;
    }

    return true;
  };

  const callAddItem = async () => {
    const validate = valideBeforeSave();
    if (validate) {
      const result = await createItem({
        name,
        quantity: Number(quantity),
      });
      if (!result.error) {
        alert("Item salvo com sucesso");
        onClose();
      }
    }
  };

  const callUpdateItem = async () => {
    const validate = valideBeforeSave();

    if (validate) {
      const result = await updateItem(item?._id, {
        name,
        quantity: Number(quantity),
        checked: item?.checked,
      });
      if (!result.error) {
        alert("Item atualizado com sucesso");
        onClose();
      }
    }
  };

  const callDeleteItem = async () => {
    const result = await deleteItem(item?._id);
    if (!result.error) {
      alert("Item deletado com sucesso");
      onClose();
    }
  };

  useEffect(() => {
    if (item?.name && item?.quantity) {
      setName(item.name);
      setQuantity(item.quantity);
    }
  }, [item]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1>{item ? "Editar item" : "Adicionar novo item"}</h1>
          <button onClick={onClose} className="modal-close-button" />
        </div>
        <Input
          onChange={(text) => setName(text)}
          value={name}
          label="Nome"
          placeholder="Ex: Arroz"
        />
        <Input
          onChange={(text) => setQuantity(text)}
          value={quantity}
          label="Quantidade"
          type="number"
        />
        <Input
          onChange={(text) => setInputValue(text)}
          value={inputValue}
          label="Preço"
          type="number"
        />
        <h1 className="modal-valor-item">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(inputValue * quantity)}
        </h1>
        <div className="buttons-container">
          {item && (
            <Button icon="trash" variant="outline" onClick={callDeleteItem}>
              Deletar item
            </Button>
          )}
        </div>
        <Button onClick={item ? callUpdateItem : callAddItem}>
          {item ? "Atualizar" : "Adicionar"}
        </Button>
      </div>
    </div>
  );
};
