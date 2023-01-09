import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { baseUrl } from "../config";

const AddingNotesModal = ({ wordId }) => {
  const [notesInput, setNotesInput] = useState();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const addNotesHandler = async (e) => {
    try {
      axios
        .patch(`${baseUrl}/word/${wordId}`, { Notizen: notesInput })
        .then((res) => {
          window.location.reload();
        });
    } catch (error) {
      console.log(" delete", error.message);
    }
  };

  return (
    <div>
      <button onClick={onOpenModal}>add notes</button>
      <Modal open={open} onClose={onCloseModal} center>
        <textarea
          name="notes"
          placeholder="add notes"
          className="textarea "
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
        ></textarea>
        <button className="btn" onClick={addNotesHandler}>
          save
        </button>
      </Modal>
    </div>
  );
};

export default AddingNotesModal;
