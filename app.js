const addButton = document.querySelector(".button-add");
const modalAddDisplay = document.querySelector(".add-modal");
const saveButton = document.querySelector(".form-button-save");
const closeButton = document.querySelector(".form-button-cancel");

addButton.addEventListener("click", () => {
  modalAddDisplay.showModal();
});

closeButton.addEventListener("click", () => {
  modalAddDisplay.close();
});
