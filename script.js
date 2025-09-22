document.getElementById('processImage').addEventListener('click', () => {
  const file = document.getElementById('imageInput').files[0];
  if (!file) {
    alert('Please select an image!');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    Tesseract.recognize(reader.result, 'eng', {
      logger: info => console.log(info)
    }).then(({ data: { text } }) => {
      document.getElementById('extractedText').value = text;
    }).catch(err => console.error(err));
  };
  reader.readAsDataURL(file);
});

document.getElementById('downloadDoc').addEventListener('click', () => {
  const text = document.getElementById('extractedText').value;
  if (!text) {
    alert('No text to download!');
    return;
  }
  const blob = new Blob([text], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'extracted_text.doc';
  link.click();
});

document.getElementById('downloadPdf').addEventListener('click', () => {
  const text = document.getElementById('extractedText').value;
  if (!text) {
    alert('No text to download!');
    return;
  }
  const pdf = new jsPDF();
  pdf.text(text, 10, 10);
  pdf.save('extracted_text.pdf');
});
