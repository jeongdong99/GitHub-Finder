const nameInputBox = document.getElementById("name-input");
nameInputBox.addEventListener("keypress", enterKey);

function enterKey(e) {
  if (e.key === 'Enter') {
    const name = document.getElementById('name-input').value;
    fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  }
}
