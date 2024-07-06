document.addEventListener('DOMContentLoaded', () => {
    const savedPlacesContainer = document.getElementById('saved-places');

    // Function to remove a place from savedPlaces and update UI
    function removePlace(placeName) {
        let savedPlaces = JSON.parse(localStorage.getItem('savedPlaces')) || [];
        savedPlaces = savedPlaces.filter(place => place !== placeName);
        localStorage.setItem('savedPlaces', JSON.stringify(savedPlaces));
        renderSavedPlaces();
    }

    // Function to schedule a visit with date and time input
    function scheduleVisit(placeName) {
        // Create schedule container
        const scheduleContainer = document.createElement('div');
        scheduleContainer.classList.add('schedule-container');

        // Create date/time picker
        const dateTimePicker = document.createElement('input');
        dateTimePicker.type = 'datetime-local';
        dateTimePicker.id = 'visit-date-time';

        // Create confirm button
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Confirm';
        confirmBtn.classList.add('confirm-btn');
        confirmBtn.addEventListener('click', () => {
            const selectedDateTime = dateTimePicker.value;
            // Store scheduled place data in localStorage
            let scheduledPlaces = JSON.parse(localStorage.getItem('scheduledPlaces')) || [];
            scheduledPlaces.push({ placeName, selectedDateTime });
            localStorage.setItem('scheduledPlaces', JSON.stringify(scheduledPlaces));
            alert(`Scheduled a visit to ${placeName} on ${selectedDateTime}`);
            scheduleContainer.remove(); // Remove schedule container after scheduling
        });

        // Append elements to schedule container
        scheduleContainer.appendChild(dateTimePicker);
        scheduleContainer.appendChild(confirmBtn);

        // Append schedule container to body
        document.body.appendChild(scheduleContainer);
    }

    // Function to render saved places on the page
    function renderSavedPlaces() {
        savedPlacesContainer.innerHTML = '';

        let savedPlaces = JSON.parse(localStorage.getItem('savedPlaces')) || [];

        if (savedPlaces.length > 0) {
            savedPlaces.forEach(place => {
                const placeCard = document.createElement('div');
                placeCard.classList.add('place-card');

                const img = document.createElement('img');
                img.src = getImagePath(place); // Get the image path based on place name
                img.alt = place;

                const h2 = document.createElement('h2');
                h2.textContent = place;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => removePlace(place));

                const scheduleBtn = document.createElement('button');
                scheduleBtn.textContent = 'Schedule';
                scheduleBtn.classList.add('schedule-btn');
                scheduleBtn.addEventListener('click', () => scheduleVisit(place));

                placeCard.appendChild(img);
                placeCard.appendChild(h2);
                placeCard.appendChild(deleteBtn);
                placeCard.appendChild(scheduleBtn);

                savedPlacesContainer.appendChild(placeCard);
            });
        } else {
            const noPlacesSaved = document.createElement('p');
            noPlacesSaved.textContent = 'No places saved yet.';
            savedPlacesContainer.appendChild(noPlacesSaved);
        }
    }

    // Function to map place names to their respective image paths
    function getImagePath(placeName) {
        switch (placeName) {
            case 'Serendra':
                return '/serendra.jpg';
            case 'The Fort Strip':
                return '/fort.jpg';
            case 'The Mind Museum':
                return '/mind.jpg';
            case 'BGC track 30th':
                return '/track.jpg';
            case 'Uptown Mall':
                return '/uptown.jpg';
            case 'Bonifacio High Street':
                return '/image.png';
            default:
                return '/placeholder.jpg'; // Default image path if not found
        }
    }

    // Initial render of saved places
    renderSavedPlaces();
});
