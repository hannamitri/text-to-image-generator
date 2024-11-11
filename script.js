function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

const fileInput = document.getElementById("fileInput");
const imageButtons = document.getElementById("image-buttons");
const resetButton = document.getElementById("reset-button");
const downloadButton = document.getElementById("download-button");
const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loading-spinner");
const submitButton = document.getElementById("submit-button");
const dropArea = document.getElementById("drop-area");

submitButton.addEventListener("click", handleTextSubmission);

function handleTextSubmission() {
  const inputText = fileInput.value.trim();
  if (!inputText) {
    alert("Please enter text before submitting.");
    return;
  }

  imageContainer.style.opacity = 0.4;
  dropArea.style.display = "none";
  loadingSpinner.style.display = "flex";
  imageButtons.style.display = "none";

  // Simulate text-to-speech processing
  // mockUploadTextToSpeech(inputText);

  // Uncomment the line below to make a real API call
  uploadTextToSpeech(inputText);
}

async function uploadTextToSpeech() {
  const inputText = document.getElementById("fileInput").value;

  if (!inputText) {
    alert("Please enter text before submitting.");
    return;
  }

  const url =
    "https://us-central1-frontend-simplified.cloudfunctions.net/textToImageGenerator";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: inputText,
      apiKey: "43MKDdQpJSQuRtO7Eo71QC453Cd2",
    }),
  };

  try {
    const res = await fetch(url, options);
    const result = await res.json();
    appendImageToContainer(result.url);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function mockUploadTextToSpeech() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const url =
    "https://firebasestorage.googleapis.com/v0/b/frontend-simplified.appspot.com/o/Ai%20project%20images%2Fdog-in-park.jpg?alt=media&token=f81dd4d3-1029-440f-b297-da27cb4ee2b6";
  appendImageToContainer(url);
}

function appendImageToContainer(url) {
  loadingSpinner.style.display = "none";
  imageContainer.style.opacity = 1;
  imageButtons.style.display = "flex";

  const processedImg = document.createElement("img");
  processedImg.src = url;
  processedImg.alt = "Processed Image";
  processedImg.style.maxWidth = "100%";
  processedImg.style.maxHeight = "400px";

  imageContainer.innerHTML = "";
  imageContainer.appendChild(processedImg);
}

resetButton.addEventListener("click", () => {
  imageContainer.innerHTML = "";
  imageButtons.style.display = "none";
  fileInput.value = "";
  loadingSpinner.style.display = "none";
  imageContainer.style.opacity = 1;
  dropArea.style.display = "flex";
});

downloadButton.addEventListener("click", () => {
  const processedImg = imageContainer.querySelector("img");
  if (processedImg) {
    const link = document.createElement("a");
    link.href = processedImg.src;
    link.download = "processed-image.png";
    link.click();
  }
});
