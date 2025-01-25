const movieList = document.getElementById('movie-list');


const apiKey = 'tmdb api'; 
const movieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

fetch(movieUrl)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    displayMovies(movies);
  })
  .catch(error => console.error('Error fetching movie data:', error));

function displayMovies(movies) {
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.release_date}</p>
    `;
    movieList.appendChild(movieElement);
  });
}

// Chatbot Integration
function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  const chatMessages = document.getElementById('chat-messages');
  
  // Display user message
  chatMessages.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
  document.getElementById('user-input').value = '';

  // Send message to the server for chatbot response
  fetchChatbotResponse(userInput, chatMessages);
}

async function fetchChatbotResponse(userMessage, chatMessages) {
  try {
    const response = await fetch('http://localhost:3000/chat', {  // Now use the Node.js server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    const botReply = data.reply || 'Sorry, I didn\'t get that.';
    
    chatMessages.innerHTML += `<p><strong>MovieBot:</strong> ${botReply}</p>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
  }
}
