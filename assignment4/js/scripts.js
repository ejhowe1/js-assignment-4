document.addEventListener('DOMContentLoaded', () => {
    // Add student ID and name dynamically
    const studentInfo = document.getElementById('student-info');
    studentInfo.textContent = 'Student ID: 1227097 | Name: Elliot Howe';

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const profileContainer = document.getElementById('profile-container');

    searchButton.addEventListener('click', async () => {
        const username = searchInput.value.trim();
        if (username === '') return;

        try {
            // Fetch user data from GitHub API
            const response = await fetch(`https://api.github.com/users/${username}`, {
                headers: {
                    'Accept': 'application/vnd.github+json'
                }
            });
            const userData = await response.json();
            
            if (response.ok) {
                // Display user profile if user is found
                displayUserProfile(userData);
            } else {
                alert('User not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('An error occurred while fetching user data');
        }
    });

    function displayUserProfile(userData) {
        const profileElement = document.createElement('div');
        profileElement.classList.add('profile');
    
        const profileImage = document.createElement('img');
        profileImage.src = userData.avatar_url;
        profileImage.alt = `${userData.login} profile picture`;
    
        const profileName = document.createElement('p');
        profileName.textContent = userData.login;
    
        const documentationHeader = document.createElement('h2');
        documentationHeader.textContent = 'Documentation';
    
        const documentationLink = document.createElement('a');
        documentationLink.textContent = 'GitHub API Documentation';
        documentationLink.href = 'https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user';
        documentationLink.target = '_blank'; // Open link in a new tab
    
        profileElement.appendChild(profileImage);
        profileElement.appendChild(profileName);
        profileElement.appendChild(documentationHeader);
        profileElement.appendChild(documentationLink);
    
        profileContainer.innerHTML = '';
        profileContainer.appendChild(profileElement);
    }
});
