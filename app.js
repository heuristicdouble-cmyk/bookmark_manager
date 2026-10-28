const addButton = document.querySelector(".button-add");
const modalAddDisplay = document.querySelector(".add-modal");
const modalEditDisplay = document.querySelector(".edit-modal");
const modalDeleteDisplay = document.querySelector(".delete-modal");
const closeAddButton = document.querySelector(".form-button-cancel");
const closeEditButton = document.querySelector(".form-button-edit-cancel");
const closeDeleteButton = document.querySelector(".form-button-delete-cancel");
const inputAddTitle = document.getElementById("input-title");
const inputAddURL = document.getElementById("input-url");
const inputEditTitle = document.getElementById("input-edit-title");
const inputEditURL = document.getElementById("input-edit-url");
const formAdd = document.querySelector(".form-add");
const formEdit = document.querySelector(".form-edit");
const deleteYes = document.querySelector(".form-button-delete");
const BookmarkList = document.querySelector(".bookmark-list");

//ブックマークのオブジェクトを格納している配列
const Bookmarks = [];

//編集/削除ボタンが押されたカードのID
let searchID;

addButton.addEventListener("click", () => {
  modalAddDisplay.showModal();
});

//ブックマークカードの描画
function renderBookmarks(array) {
  //描画する前に現在のカード群を消す
  BookmarkList.replaceChildren();

  for (let i = 0; i < array.length; i++) {
    let bookmarkCard = document.createElement("section");
    let bookmarkTitle = document.createElement("h1");
    let bookmarkURL = document.createElement("a");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    bookmarkTitle.textContent = array[i].title;
    bookmarkURL.href = array[i].url;
    bookmarkURL.textContent = array[i].url;
    bookmarkURL.target = "_blank";
    bookmarkURL.rel = "noopener noreferrer";
    editButton.textContent = "✎";
    editButton.value = array[i].id;
    deleteButton.textContent = "🗑";
    deleteButton.value = array[i].id;

    bookmarkCard.append(bookmarkTitle, bookmarkURL, editButton, deleteButton);
    BookmarkList.append(bookmarkCard);

    //編集ボタンを押したとき
    editButton.addEventListener("click", () => {
      searchID = editButton.value;
      const index = Bookmarks.findIndex((bookmark) => bookmark.id === searchID);
      if (index === -1) {
        return;
      }
      inputEditTitle.value = Bookmarks[index].title;
      inputEditURL.value = Bookmarks[index].url;
      modalEditDisplay.showModal();
    });

    //削除ボタンを押したとき
    deleteButton.addEventListener("click", () => {
      searchID = deleteButton.value;
      modalDeleteDisplay.showModal();
    });
  }
}

//追加ボタン＞saveボタンを押したときの処理
formAdd.addEventListener("submit", (event) => {
  event.preventDefault();

  const newBookmark = {
    id: crypto.randomUUID(),
    title: inputAddTitle.value,
    url: inputAddURL.value,
  };

  Bookmarks.push(newBookmark);

  //ブックマークカード描画
  renderBookmarks(Bookmarks);

  //入力欄をリセット
  formAdd.reset();
  modalAddDisplay.close();
});

//編集ボタン＞Saveボタンを押したとき
formEdit.addEventListener("submit", (event) => {
  event.preventDefault();
  const index = Bookmarks.findIndex((bookmark) => bookmark.id === searchID);
  if (index === -1) {
    return;
  }
  Bookmarks[index].title = inputEditTitle.value;
  //URLの入力がなければ変更しない。
  if (inputEditURL.value) {
    Bookmarks[index].url = inputEditURL.value;
  }

  renderBookmarks(Bookmarks);
  formEdit.reset();
  modalEditDisplay.close();
});

//削除ボタン＞Deleteボタンを押したとき
deleteYes.addEventListener("click", () => {
  const index = Bookmarks.findIndex((bookmark) => bookmark.id === searchID);
  if (index === -1) {
    return;
  }
  Bookmarks.splice(index, 1);
  renderBookmarks(Bookmarks);
  modalDeleteDisplay.close();
});

closeAddButton.addEventListener("click", () => {
  //入力欄をリセット
  formAdd.reset();
  modalAddDisplay.close();
});

closeEditButton.addEventListener("click", () => {
  modalEditDisplay.close();
});

closeDeleteButton.addEventListener("click", () => {
  modalDeleteDisplay.close();
});
