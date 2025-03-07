Functionality
Image Fetching
The fetchImages() function asynchronously requests image data from the following API endpoint:
https://api.mademyday.ai/Mock/getimages.php

Upon a successful response, the images are displayed in a grid layout.
If the API request fails, an error message is shown in the gallery container.
Image Rating
The rateImage(bild_id, rating, button) function is triggered when a user clicks either the "Like" or "Dislike" button.

It sends the rating (either "LIKE" or "DISLIKE") for the respective image to the API using a POST request to:
https://api.mademyday.ai/Mock/rateimages.php
The response from the API determines if a success or error message is displayed next to the image.
Customization
CSS Styling: The design is easily customizable by modifying the style.css file.
Image Source: You can replace the API endpoint with a different image source if needed.
Error Handling
If the image data or rating submission fails, the system will display an error message to inform the user.
