const addButton = document.querySelector(".button-add");
const modalAddDisplay = document.querySelector(".add-modal");
const closeButton = document.querySelector(".form-button-cancel");
const form = document.querySelector(".form-add");
const BookmarkList = document.querySelector(".bookmark-list");

addButton.addEventListener("click", () => {
  modalAddDisplay.showModal();
});

closeButton.addEventListener("click", () => {
  modalAddDisplay.close();
});

//ブックマークのオブジェクトを格納している配列
const Bookmarks = [];

//ブックマークカードの描画
function renderBookmarks(array) {

  //描画する前に現在のカード群を消す
  BookmarkList.replaceChildren();

  for (let i = 0; i < array.length; i++) {
    let bookmarkCard = document.createElement("section");
    let bookmarkTitle = document.createElement("h1");
    let bookmarkURL = document.createElement("a");

    bookmarkTitle.textContent = array[i].title;
    bookmarkURL.href = array[i].url;
    bookmarkURL.textContent = "Go to Website!";
    bookmarkURL.target = "_blank";
    bookmarkURL.rel = "noopener noreferrer";

    bookmarkCard.append(bookmarkTitle, bookmarkURL);

    BookmarkList.append(bookmarkCard);
  }
}

//saveボタンを押したときの処理
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputTitle = document.getElementById("input-title");
  const inputURL = document.getElementById("input-url");

  const newBookmark = {
    title: inputTitle.value,
    url: inputURL.value,
  };

  Bookmarks.push(newBookmark);

  //ブックマークカード描画
  renderBookmarks(Bookmarks);

  //入力欄をリセット
  form.reset();

  modalAddDisplay.close();
});
