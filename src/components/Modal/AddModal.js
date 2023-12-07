import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box, Container, IconButton, ListItemIcon } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import InputForm from "../InputForm/InputForm";
import addImgUrl from "../../assets/images/addIcon.png";
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '100',
//   bgcolor: 'background.paper',
// //   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function AddMOdal({ title, name, endpoint,isEditing, token,open,setOpen ,initialData}) {
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const AddIcon = () => (
    <img
      src={addImgUrl}
      alg={"profile icon"}
      style={{
        width: "32px",
      }}
    />
  );
  const styleAddIconContainer = {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    paddingX: 0,
    backgroundColor: "transparent",
    marginBottom: 8,
  };
  return (
    <>
      <Box style={styleAddIconContainer}>
        <IconButton onClick={handleOpen} sx={{ padding: 0 }}>
          <AddIcon />
        </IconButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <InputForm
          title={title}
          name={name}
          endpoint={endpoint}
          token={token}
          isEditing={isEditing}
          setOpen={setOpen}
          initialData={initialData}
        />
      </Modal>
    </>
  );
}
