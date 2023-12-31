import Card from './card.js';
import Deck, { printCardNames } from './deck.js';
let myDeck = new Deck();
function print1() {
  var outputElement = document.getElementById('output');

  // Append "Testing" to the existing content
  outputElement.innerHTML += "Testing<br>";

  // Scroll to the bottom of the box
  console.log("TEST");

  console.log(myDeck.cards[3]);
  printCard(myDeck.cards[2].fileName);
  

}



document.addEventListener('DOMContentLoaded', function () {
  // Add event listener after the DOM has loaded
  document.getElementById('hit').addEventListener('click', print1);
});

function printCard(fileName){
  console.log(fileName);
  var box = document.getElementById('dealer');
  var img = document.createElement('img');
  img.src = fileName; // Replace with the path to your image
  console.log(fileName); 
  img.classList.add('card');
  // Append the image to the box
  box.appendChild(img);
}







