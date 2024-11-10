import { useState } from "react";

function useDialogFormControler() {
  const [formOpen, setFormOpen] = useState(null);

  const handleFormClose = () => {
    setFormOpen(null);
  };

  const handleFormOpen = (formOpenValue) => {
    setFormOpen(formOpenValue);
  };
  return { formOpen, handleFormClose, handleFormOpen };
}

export default useDialogFormControler;
