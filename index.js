const bookmarkName = document.getElementById("bookmarkName");
const bookmarkURL = document.getElementById("bookmarkURL");
const tableContent = document.getElementById("tableContent");

let bookmarks = localStorage.getItem("bookmarks")
    ? JSON.parse(localStorage.getItem("bookmarks"))
    : [];

displayBookmarks();

function isValidURL(url) {
    return /\.\w{2,}/.test(url);
}

function addBookmark() {
    const name = bookmarkName.value.trim();
    let url = bookmarkURL.value.trim();

    if (name === "" || url === "" || !isValidURL(url)) {
        alert("Please enter a valid name and URL (e.g., example.com).");
        return;
    }

    if (!url.startsWith("http")) url = `https://${url}`;
    bookmarks.push({ id: Date.now(), name, url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    clearForm();
    displayBookmarks();
}

function displayBookmarks() {
    tableContent.innerHTML = bookmarks
        .map(
            (bookmark, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${bookmark.name}</td>
        <td><a href="${bookmark.url}" target="_blank" class="btn btn-success"> 
        <i class="fa-solid fa-eye pe-2" style="color: #ffffff;"></i>Visit</a></td>
        <td><button class="btn btn-danger" onclick="deleteBookmark(${bookmark.id})">
        <i class="fa-solid fa-trash pe-2" style="color: #ffffff;"></i>Delete</button></td>
      </tr>`
        )
        .join("");
}

function deleteBookmark(id) {
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
}

function clearForm() {
    bookmarkName.value = null;
    bookmarkURL.value = null;
}

