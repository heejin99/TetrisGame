
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
function displayEndGame () {
  const endGameModal = document.querySelector('#end-game')
  endGameModal.style.display = 'block'
  endGameModal.innerHTML = 'GAME OVER'
  return endGameModal
}

function unDisplayEndGame () {
  const endGameModal = document.querySelector('#end-game')
  endGameModal.style.display = 'none'
}
function hideSignup () {
    const loginModal = document.querySelector('#signup')
    loginModal.style.display = 'none'
}
function displayHighScore (endGameModal) {
  endGameModal.innerHTML = `
    GAME OVER<br>
    최고기록: ${score.textContent}!
  `
  if (!loggedin) {
    endGameModal.innerHTML += '로그인 먼저 진행하세요.'
  }
}
function displayLeaders (games) {
    const leaderBoard = document.querySelector('#leaderboard')
    leaderBoard.innerHTML = '<h1>## High Scores ##</h1>'
    const leaderList = document.createElement('ul')
    leaderBoard.appendChild(leaderList)
    for (const game of games.data.user) {
      const leaderItem = document.createElement('li')
      leaderItem.style.fontSize = "1.5rem"
      leaderItem.style.textAlign = 'center'
      leaderItem.textContent = `. ${game.nickname} - ${game.highscore}`
      leaderList.appendChild(leaderItem)
    }
    leaderBoard.style.display = 'block'
}

function handleLeaders () {
    leaderGetRequest()
      .then(games => 
        displayLeaders(games)
      )
  }