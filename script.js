const mainContainer = document.getElementById("main-container");
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loadingSpinner = document.getElementById("loading-spinner");

// Modal Buttons
const imageContainer = document.getElementById("image-container");
const modal = document.getElementById("modal");
const imageText = document.getElementById("image-text-span");
const imageAuthor = document.getElementById("image-author-span");
const saveBtn = document.getElementById("save-btn");

// Modal Background Buttons
const backgroundBtn = document.getElementById("background-btn");
const backgroundList = document.getElementById("background-list");
const backgroundLi = document.querySelectorAll(".background-li");
const imageBackground = document.getElementById("image-background");

// Modal Fonts Buttons
const fontsBtn = document.getElementById("fonts-btn");
const fontsList = document.getElementById("fonts-list");
const fontsLi = document.querySelectorAll(".fonts-li");

let apiQuote = [];

/**
 * API fetching JS
 */
async function getQuoteFromAPI() {
  showingLoadingSpinner(); // calling Loading method before the API fetches data.
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json(); // Storing json data into apiQuote array, so it can be used later when "new quote" button is clicked.
    setQuote();
  } catch (error) {
    alert(error);
  }
}

function setQuote() {
  showingLoadingSpinner();
  // picking a random json data from apiQuote array.
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];

  if (!quote.author) {
    authorText.textContent = "Unkown";
    imageAuthor.textContent = "Unkown";
  } else {
    authorText.textContent = quote.author;
    imageAuthor.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    // if quote is too long, then it's font size should decrease.
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  imageText.textContent = quote.text;
  modal.style.display = "none";
  hideLoadingSpinner();
}

/**
 * Buttons JS
 */
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

function showingLoadingSpinner() {
  mainContainer.style.display = "none";
  loadingSpinner.style.display = "block";
}

function hideLoadingSpinner() {
  mainContainer.style.display = "block";
  loadingSpinner.style.display = "none";
}

/**
 * Modal JS
 */
function closeModal() {
  modal.style.display = "none";
  backgroundList.style.display = "none";
  fontsList.style.display = "none";
}
function showModal() {
  modal.style.display = "flex";
}

function showAndHideBackgroundList() {
  if (backgroundList.style.display === "none") {
    backgroundList.style.display = "flex";
    fontsList.style.display = "none";
  } else {
    backgroundList.style.display = "none";
  }
}

function showAndHideFontsList() {
  if (fontsList.style.display === "none") {
    fontsList.style.display = "flex";
    backgroundList.style.display = "none";
  } else {
    fontsList.style.display = "none";
  }
}

backgroundLi.forEach((background) => {
  background.addEventListener("click", function () {
    // console.log(background.getAttribute("src"));
    imageBackground.setAttribute("src", background.getAttribute("src"));
  });
});

fontsLi.forEach((font) => {
  font.addEventListener("click", function () {
    if (font.textContent === "Default") {
      imageText.style.fontFamily = "sans-serif";
      imageAuthor.style.fontFamily = "sans-serif";
    } else {
      imageText.style.fontFamily = font.textContent;
      imageAuthor.style.fontFamily = font.textContent;
    }
  });
});

function downloadImage() {
  domtoimage
    .toPng(imageContainer, {
      width: 450,
      height: 200,
    })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "quote.png";
      link.href = dataUrl;
      link.click();
      closeModal();
    });
}

// setting event listeners for both buttons
newQuoteBtn.addEventListener("click", setQuote);
twitterBtn.addEventListener("click", tweetQuote);
backgroundBtn.addEventListener("click", showAndHideBackgroundList);
fontsBtn.addEventListener("click", showAndHideFontsList);
saveBtn.addEventListener("click", downloadImage);
/*
 Calling this method on page load.
 Note:- we're loading our JS after whole HTML is loaded & in JS this method is called at last,
 so it gets called after the page has been loaded.
*/
getQuoteFromAPI();
