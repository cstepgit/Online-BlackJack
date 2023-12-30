import Card from './card.js';
import Deck, { printCardNames } from './deck.js';
let myDeck = new Deck();
function print1() {
  var outputElement = document.getElementById('output');

  // Append "Testing" to the existing content
  outputElement.innerHTML += "Testing<br>";

  // Scroll to the bottom of the box
  console.log("TEST");
  scrollToBottom();

  var card = myDeck.cards[1];
  printCard(card.fileName);

}

function scrollToBottom() {
  let outputElement = document.getElementById('output');
  outputElement.scrollTop = outputElement.scrollHeight;
  outputElement.innerHTML += "Scrolling<br>";
  console.log(myDeck);
}

document.addEventListener('DOMContentLoaded', function () {
  // Add event listener after the DOM has loaded
  document.getElementById('hit').addEventListener('click', print1);
});

function printCard(fileName){
  var box = document.getElementById('dealer');
  var img = document.createElement('img');
  img.src = fileName; // Replace with the path to your image
  console.log(fileName); 
  img.classList.add('card');
  // Append the image to the box
  box.appendChild(img);
}







