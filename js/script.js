
const gallery = document.getElementById("gallery");

// Asynchronous function to fetch images from the API
async function fetchImages() {
    try {
        // Make a GET request to the API to fetch images
        const response = await fetch('https://api.mademyday.ai/Mock/getimages.php');
        
        // Check if the response is successful (status code 200)
        if (!response.ok){
           throw new Error('something is not working');
        } 
        const data = await response.json();
        gallery.innerHTML = "";

        // Loop through each image retrieved from the API
        data.forEach(image => {
            const card = document.createElement("div");
            card.classList.add("card"); 
            // Insert the image and the "Like" and "Dislike" buttons
            card.innerHTML = `
                <h3>${image.description}</h3>
                <img src="${image.url}" alt="Image ${image.id}">
                <div class="buttons">
                    <p>Likes: ${image.likes}</p>
                    <button class="like" onclick="rateImage('${image.id}', 'LIKE', this)">Like</button>
                    <button class="dislike" onclick="rateImage('${image.id}', 'DISLIKE', this)">don't like</button>
                </div>
                <div class="message"></div> <!-- Success or error message -->
            `;
            // Add the card to the main gallery container
            gallery.appendChild(card);
        } );
    } catch (error ){
        gallery.innerHTML = `Fallo: ${error.message}`;
        console.error(error);
    } 
}

// Function to rate an image (Like / Dislike)
async function rateImage(bild_id, rating, button) {
    try {
        const response = await fetch('https://api.mademyday.ai/Mock/rateimages.php', {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ id: bild_id, rate: rating })            
        });
        
        // Get the element where the success or error message will be displayed
        const messageBox = button.closest('.card').querySelector('.message');

        // Check if the response is successful
        if (response.ok) {
            messageBox.innerText = "Rating submitted!";
            messageBox.style.color = "orange"; 
        } else {
            messageBox.innerText = "Error submitting rating.";
            messageBox.style.color = "red"; 
        }
        setTimeout(() => {
            messageBox.innerText = "";
        }, 2000);
    } catch (error) {
        console.error(error)
        gallery.innerHTML = `Error: ${error} API not found`;
    }
}

// Call the function to fetch and display images when the page loads
fetchImages();



