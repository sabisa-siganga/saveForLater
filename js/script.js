const KEY = "data";

/**
 *  getting the item using getItem from localStorage
 * using JSON parse to parse the data if JSON parse fails to parse then should return empty object
 */
const getItem = JSON.parse(localStorage.getItem(KEY)) || {};

const selectSavedContentsContainer = document.querySelector(
  ".saved-contents-container"
);

// selecting input for name using id
const selectName = document.getElementById("name");

// selecting input for email
const selectEmail = document.getElementById("email");

// selecting input for message
const selectMessage = document.getElementById("message");

/**
 * Saving data to the local Storage
 * @param {object} data
 */
const saveData = (data) => {
  // adding the input data from parameter into the data parsed from localStorage
  getItem[data.id] = data;

  // data to localStorage
  localStorage.setItem(KEY, JSON.stringify(getItem));

  // getting the length of an object
  const objectLength = Object.keys(getItem).length;

  // alerting the user of the number of items saved
  alert(`You have ${objectLength} saved items`);
};

/**
 * Saving data to localStorage and converting it to a JSON string
 */
const saveToStorage = () => {
  localStorage.setItem(KEY, JSON.stringify(getItem));
};

/**
 * Saving data for later use to a save for later page
 * @param {string} title
 * @param {string} id
 */
const saveForLater = (title, id) => {
  // creating a saveForLater object
  const saveForLaterObj = {
    title,
    link: location.href + "#" + id,
    id,
    comments: [],
    isLiked: false,
  };

  saveData(saveForLaterObj);
};

/**
 *
 * @param {string} event
 */
const toggleCommentBtn = (event) => {
  const element = event.target;
  const nextSibling = element.parentElement.parentElement.nextSibling;

  // Toggling the d-none class to add and remove the add comment section
  nextSibling.classList.toggle("d-none");
};

/**
 * Ability to like a comment using its item Id
 * @param {string} itemId
 * @param {HTMLSpanElement} favElement
 */
const likeContent = (itemId, favElement) => {
  // negating the boolean value of isLiked
  const toggle = !getItem[itemId].isLiked;

  getItem[itemId].isLiked = toggle;

  // checking if the content is has been liked then add styling otherwise remove styling
  if (toggle) {
    favElement.classList.add("btn-color");
  } else {
    favElement.classList.remove("btn-color");
  }

  saveToStorage();
};

/**
 * Creating icons for like, delete and add comment buttons
 * @param {string} itemId
 * @returns {creatingIconDiv}
 */
const creatingIcons = (content) => {
  // creating a div element
  const creatingIconDiv = document.createElement("div");

  //adding a class to the div element
  creatingIconDiv.classList.add("icons");

  //   creating a span in the div element
  const creatingFavSpan = document.createElement("span");

  //adding a class to the div element
  creatingFavSpan.classList.add("material-symbols-outlined");

  //adding a text in the span element
  creatingFavSpan.textContent = "favorite";

  // checking if the content is liked thus adding a style
  if (content.isLiked) {
    creatingFavSpan.classList.add("btn-color");
  }

  //   adding an eventListener to creatingFavSpan so that content on click is liked
  creatingFavSpan.addEventListener("click", () =>
    likeContent(content.id, creatingFavSpan)
  );

  // appending creatingFavSpan to creatingIconDiv
  creatingIconDiv.appendChild(creatingFavSpan);

  // creating a div element
  const creatingDeleteSpan = document.createElement("span");

  //adding a class to the div element
  creatingDeleteSpan.classList.add("material-symbols-outlined");

  //adding a text in the span element
  creatingDeleteSpan.textContent = "delete";

  //   Adding an eventListener to the span element
  creatingDeleteSpan.addEventListener("click", () => deleteItem(content.id));

  // appending creatingDeleteSpan to creatingIconDiv
  creatingIconDiv.appendChild(creatingDeleteSpan);

  // creating a div element
  const creatingAddCommSpan = document.createElement("span");

  //adding a class to the div element
  creatingAddCommSpan.classList.add("material-symbols-outlined");

  //adding a text in the span element
  creatingAddCommSpan.textContent = "add_comment";

  // Adding an eventListener to the span element
  creatingAddCommSpan.addEventListener("click", toggleCommentBtn);

  // creating a count element if there are comments
  if (content.comments.length > 0) {
    const creatingCommentCountSpan = document.createElement("span");
    creatingCommentCountSpan.classList.add("comment-count");
    creatingCommentCountSpan.textContent = content.comments.length;

    creatingAddCommSpan.appendChild(creatingCommentCountSpan);
  }

  // appending creatingAddCommSpan to creatingIconDiv
  creatingIconDiv.appendChild(creatingAddCommSpan);

  // returning the creatingIconDiv element
  return creatingIconDiv;
};

/**
 *Submitting the comment ffrom the user
 * @param {string} event
 * @param {string} itemId
 */
const submitComment = (event, itemId) => {
  // get value from input
  const element = event.target;

  // accessing text area
  const textarea = element.previousSibling;

  // checking if there's an input value
  if (textarea.value.trim().length > 0) {
    // getting the next sibling
    const nextSibling = element.parentElement.nextSibling;

    // pushing comment from the input to comments array
    getItem[itemId].comments.push(textarea.value);

    // creating li element
    const creatingLi = document.createElement("li");

    // adding a class to li element
    creatingLi.classList.add("li");

    // adding text content to li
    creatingLi.textContent = textarea.value;

    // appending creatingLi to nextSibling
    nextSibling.appendChild(creatingLi);

    // resetting input value to empty string
    textarea.value = "";

    // saving data to localStorage
    saveToStorage();
  }
};

/**
 *Creating the comment field
 * @returns {HTMLDivElement} creatingTextAreaDiv
 */
const creatingCommentField = (content) => {
  // creating a div element
  const creatingDiv = document.createElement("div");

  //adding a class to the div element
  creatingDiv.classList.add("d-none");

  // creating a div element
  const creatingTextAreaDiv = document.createElement("div");

  //adding a class to the div element
  creatingTextAreaDiv.classList.add("text-area");

  //adding a class to the div element
  creatingTextAreaDiv.classList.add("input-group");

  // creating a text area element
  const creatingTextAreaEle = document.createElement("textarea");

  // adding a form-control class to the textarea element
  creatingTextAreaEle.classList.add("form-control");

  // setting an attribute to the textarea element
  creatingTextAreaEle.setAttribute("placeholder", "Please leave a comment");

  //   appending reatingTextAreaEle to  creatingTextAreaDiv
  creatingTextAreaDiv.appendChild(creatingTextAreaEle);

  // creating a span element
  const creatingSubmitBtnEle = document.createElement("button");

  // adding a class to the span element
  creatingSubmitBtnEle.classList.add("input-group-text");

  //  adding eventListener to creatingSubmitBtnEle
  creatingSubmitBtnEle.addEventListener("click", (event) =>
    submitComment(event, content.id)
  );

  // adding text to the span element
  creatingSubmitBtnEle.textContent = "Submit";

  //appending creatingSubmitBtnEle to creatingTextAreaDiv
  creatingTextAreaDiv.appendChild(creatingSubmitBtnEle);

  //   creating the ul element
  const creatingUl = document.createElement("ul");
  //   adding a class to ul
  creatingUl.classList.add("ul");

  //  iterating through the comment array and creating the li element to display the list of comments
  content.comments.forEach((comment) => {
    const creatingLi = document.createElement("li");

    // addin a class to li
    creatingLi.classList.add("li");

    // adding text content to li element
    creatingLi.textContent = comment;

    // appending creatingLi to creatingUl
    creatingUl.appendChild(creatingLi);
  });

  // appending creatingTextAreaDiv to creatingDiv
  creatingDiv.appendChild(creatingTextAreaDiv);

  // appending creatingUl to creatingDiv
  creatingDiv.appendChild(creatingUl);

  //   returning creatingTextAreaDiv
  return creatingDiv;
};

const displayData = () => {
  selectSavedContentsContainer.innerHTML = "";

  // converting an object to an array
  Object.values(getItem).forEach((value) => {
    // creating the div element
    const createDivElement = document.createElement("div");

    // adding a saved-contents class to the div element
    createDivElement.classList.add("saved-contents");

    const createInlineDivElement = document.createElement("div");
    createInlineDivElement.classList.add("content-container");

    // creating the anchor tag element
    const createAnchorTag = document.createElement("a");

    //setting the href attribute to the a tag
    createAnchorTag.setAttribute("href", value.link);

    // adding the title to the a tag element
    createAnchorTag.textContent = value.title;

    // appending createAnchortag to createDivElement
    createInlineDivElement.appendChild(createAnchorTag);

    // appending creatingIcons() to createDivElement
    createInlineDivElement.appendChild(creatingIcons(value));

    createDivElement.appendChild(createInlineDivElement);

    // appending creatingCommentField() to createDivElement
    createDivElement.appendChild(creatingCommentField(value));

    // appending createDivElement to createDivElement
    selectSavedContentsContainer.appendChild(createDivElement);
  });
};

if (selectSavedContentsContainer) {
  displayData();
}

/**
 * Removing the item using item id
 * @param {string} itemId
 */
const deleteItem = (itemId) => {
  // getItem
  delete getItem[itemId];

  // calling the displayData to display data after deleting the item
  displayData();

  // saving data to localStorage
  saveToStorage();
};

/**
 * Submiting the contact data from the user
 * @param {string} event
 */
const submitContactData = (event) => {
  // preventing default of the event
  event.preventDefault();

  // accessing the values of name, email and message in the contact form
  const nameValue = selectName.value;
  const emailValue = selectEmail.value;
  const messageValue = selectMessage.value;

  // creating the contact object
  const contactObj = {
    name: nameValue,
    email: emailValue,
    message: messageValue,
  };

  console.log(contactObj);

  // resetting the input fields to an empty string
  selectName.value = "";
  selectEmail.value = "";
  selectMessage.value = "";
};

// selecting the contact form using id
const selectContactForm = document.getElementById("contact-form");

//  checking if the element exist then add a submit eventlistener add call submitContact data function
if (selectContactForm) {
  // adding an event listener to the form and calling submitContact as a callback function
  selectContactForm.addEventListener("submit", submitContactData);
}
