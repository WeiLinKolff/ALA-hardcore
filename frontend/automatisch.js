const officegen = require('officegen')

const fileDropBox = document.getElementById('file-drop-box');
        
        // Add event listeners for drag events
        fileDropBox.addEventListener('dragover', handleDragOver, false);
        fileDropBox.addEventListener('dragleave', handleDragLeave, false);
        fileDropBox.addEventListener('drop', handleDrop, false);
        
        function handleDragOver(event) {
            event.preventDefault();
            fileDropBox.style.backgroundColor = 'lightgray';
        }
        
        function handleDragLeave(event) {
            event.preventDefault();
            fileDropBox.style.backgroundColor = '';
        }
        
        function handleDrop(event) {
            event.preventDefault();
            fileDropBox.style.backgroundColor = '';
            
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                const wordFile = files[0];
                
                // Read the binary data from the dropped Word file
                const fileReader = new FileReader();
                fileReader.onload = function (event) {
                    // Parse the Word file data
                    const wordFileData = event.target.result;
                    const officegen = require('officegen');
                    const docx = officegen('docx');
                    const body = docx.createP();
                    body.addText(docx.getBody().getContentAsText());
                    
                    // Generate a download link for the converted Word file
                    const downloadLink = document.createElement('a');
                    downloadLink.href = window.URL.createObjectURL(docx.generate({ type: 'blob' }));
                    downloadLink.download = 'converted_word_file.docx';
                    downloadLink.click();
                };
                fileReader.readAsArrayBuffer(wordFile);
            }
        }