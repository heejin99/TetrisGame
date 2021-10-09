function displayLogin () {
    const loginModal = document.querySelector('#login')
    loginModal.style.display = 'block'
  }
  
function hideLogin () {
    const loginModal = document.querySelector('#login')
    loginModal.style.display = 'none'
  }

function displaySigniup () {
    const loginModal = document.querySelector('#signup')
    loginModal.style.display = 'block'
}
  
function hideSignup () {
    const loginModal = document.querySelector('#signup')
    loginModal.style.display = 'none'
}

function displayLeaders (games) {
    const leaderBoard = document.querySelector('#leaderboard')
    leaderBoard.innerHTML = '<h2>High Scores</h2>'
    const leaderList = document.createElement('ul')
    leaderBoard.appendChild(leaderList)
    for (const game of games) {
      const leaderItem = document.createElement('li')
      leaderItem.textContent = `${game.user.name} - ${game.score}`
      leaderList.appendChild(leaderItem)
    }
    leaderBoard.style.display = 'block'
}
