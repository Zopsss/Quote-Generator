const mainContainer = document.getElementById("main-container");
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loadingSpinner = document.getElementById("loading-spinner");
let apiQuote = [];

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
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    // if quote is too long, then it's font size should decrease.
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  hideLoadingSpinner();
}

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

// setting event listeners for both buttons
newQuoteBtn.addEventListener("click", setQuote);
twitterBtn.addEventListener("click", tweetQuote);

/*
 Calling this method on page load.
 Note:- we're loading our JS after whole HTML is loaded & in JS this method is called at last,
 so it gets called after the page has been loaded.
*/
getQuoteFromAPI();
