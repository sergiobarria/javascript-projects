// Get html elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// Show new quote
const newQuote = () => {
  showLoadingSpinner();

  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author field is blank or null
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // Set Quote, hide loader
  quoteText.textContent = quote.text;
  hideLoadingSpinner();
};

// Get Quotes from API
const getQuotes = async () => {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const res = await fetch(apiUrl);

    apiQuotes = await res.json();
    newQuote();
  } catch (error) {
    // Catch Error here
  }
};

// Tweet quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
