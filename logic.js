function print1(){

  var outputElement = document.getElementById('output');
            
            // Append "Testing" to the existing content
            outputElement.innerHTML += "Testing<br>";

            // Scroll to the bottom of the box
            outputElement.scrollTop = outputElement.scrollHeight;

            console.log("TEST");
}