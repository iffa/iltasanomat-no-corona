// ==UserScript==
// @name     Ilta-Sanomat: no more corona news
// @description Hide corona-related news from the Ilta-Sanomat front page.
// @namespace https://github.com/iffa/iltasanomat-no-corona
// @match *://*.is.fi/* 
// @version  1
// ==/UserScript==
//
// TODO: Replace DOMNodeInserted event listener with observer
// TODO: Hide corona from other parts of the page as well (most read article lists etc.)

// List of all corona-y words that we don't like
// Keep these lowercase
const CORONA_WORDS = [
    'korona',
    'corona',
    'covid-19',
    'karanteeni',
    'poikkeusolo',
    'pandemia',
    'epidemia'
];

function removeArticle(article) {
    article.remove();
}

function findArticles() {
    const articles = Array.from(document.querySelectorAll("article"));

    articles.forEach(article => {
        const textContent = article.textContent.toLowerCase();
        if (CORONA_WORDS.some(word => textContent.includes(word))) {
            removeArticle(article);
        }
    });
}

window.addEventListener('load', () => {
    // Find some on initial page load, as our event listener may not wake up yet
    findArticles();

    // Listen for any DOM inserts under main (to combat virtual scrolling)
    document.querySelector('main').addEventListener('DOMNodeInserted', () => {
        findArticles();
    });
}, false);
