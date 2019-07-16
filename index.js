"use strict";

const STORE = {
  items: [
    { id: cuid(), name: "apples", checked: false },
    { id: cuid(), name: "oranges", checked: false },
    { id: cuid(), name: "milk", checked: true },
    { id: cuid(), name: "bread", checked: false }
  ],
  hideCompleted: false,
  textFilters: ""
};

function renderShoppingList() {
  let filteredItems = STORE.items;

  if (STORE.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }
  if (STORE.textFilters) {
    filteredItems = filteredItems.filter(item =>
      item.name.includes(STORE.textFilters)
    );
  }
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);
  $(".js-shopping-list").html(shoppingListItemsString);
}

const handleNewItemSubmit = () => {
  $("#js-shopping-list-form").submit(function(event) {
    event.preventDefault();
    const newItemName = $(".js-shopping-list-entry").val();
    $(".js-shopping-list-entry").val("");
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
};

const handleItemCheckClicked = () => {
  $(".js-shopping-list").on("click", `.js-item-toggle`, event => {
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
};

const handleDeleteItemClicked = () => {
  $(".js-shopping-list").on("click", `.js-item-delete`, event => {
    const id = getItemIdFromElement(event.currentTarget);
    deleteItem(id);
    renderShoppingList();
  });
};

function handleToggleHideFilter() {
  $(".js-hide-completed-toggle").on("click", () => {
    toggleHideFilter();
    renderShoppingList();
  });
}

const handleEdit = () => {
  $(".js-shopping-list").on("click", `.js-item-edit`, event => {
    const newName = prompt(
      "Please new name for item",
      "Error: Please Add a Valid Name!!"
    );
    const id = getItemIdFromElement(event.currentTarget);
    editItem(newName, id);
    renderShoppingList();
  });
};

const handleTextFilter = () => {
  $(".js-shopping-list-filter").on("input", e => {
    const text = $(e.currentTarget).val();
    setTextFilter(text);
    renderShoppingList();
  });
};
const setTextFilter = text => {
  console.log(text);
  STORE.textFilters = text;
};

const handleShoppingList = () => {
  renderShoppingList();
  handleTextFilter();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideFilter();
  handleEdit();
};

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
