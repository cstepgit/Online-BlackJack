import { Deck, givePlayerCard } from './deck.js';
let myDeck = new Deck();
function print1() {
  var outputElement = document.getElementById('output');

  // Append "Testing" to the existing content
  outputElement.innerHTML += "Testing<br>";

  // Scroll to the bottom of the box
  console.log("TEST");
  scrollToBottom();
}

function scrollToBottom() {
  let outputElement = document.getElementById('output');
  outputElement.scrollTop = outputElement.scrollHeight;
  outputElement.innerHTML += "Scrolling<br>";
  console.log(myDeck.cards);
}

document.addEventListener('DOMContentLoaded', function () {
  // Add event listener after the DOM has loaded
  document.getElementById('hit').addEventListener('click', print1);
 myDeck.printCardNames(); 
});







