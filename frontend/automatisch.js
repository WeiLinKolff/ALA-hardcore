// automatisch.js

// Dynamically load the jsPDF library
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
script.onload = function() {
  // Code to be executed after the jsPDF library is loaded
  var dropZone = document.getElementById('drop-zone');
  
    // Prevent the default behavior of drop events
    dropZone.addEventListener('dragover', function(event) {
      event.preventDefault();
    });
  
    // Handle the drop event
    dropZone.addEventListener('drop', function(event) {
      event.preventDefault();
  
      // Get the dropped file   
      var file = event.dataTransfer.files[0];
  
      // Create a new FileReader object
      var fileReader = new FileReader();
  
      // Define onload event handler for when the file is loaded
      fileReader.onload = function(event) {
        // Get the loaded content as an ArrayBuffer
        var arrayBuffer = event.target.result;
  
        // Create a new jsPDF object
        var pdf = new jsPDF();
  
        // Load the ArrayBuffer into the jsPDF object
        pdf.loadDocument(arrayBuffer);
  
        // Extract text from the PDF
        var extractedText = pdf.extractText();
  
        // Print the extracted text
        console.log(extractedText);
      };
  
      // Read the file as an ArrayBuffer
      fileReader.readAsArrayBuffer(file);
    });
  // Use the jsPDF object as needed
};
document.head.appendChild(script);

document.addEventListener('DOMContentLoaded', function() {
    
  });