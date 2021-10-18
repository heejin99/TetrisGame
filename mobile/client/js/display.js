
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
}
function displayLeaders (games) {
    const leaderBoard = document.querySelector('#leaderboard')
    leaderBoard.innerHTML = '<h3>High Scores</h3>'
    const leaderList = document.createElement('ul')
    leaderBoard.appendChild(leaderList)
    for (const game of games.data.user) {
      const leaderItem = document.createElement('li')
      leaderItem.style.fontSize = "1rem"
      leaderItem.style.textAlign = 'center'
      leaderItem.textContent = `. ${game.nickname} - ${game.highscore}`
      leaderList.appendChild(leaderItem)
    }
    if (leaderBoard.style.display === 'none') {
      leaderBoard.style.display = 'block'
    } else {
      leaderBoard.style.display = 'none'
    }
}

function displayGameStart () {
  const gameStart = document.querySelector('#info')
  gameStart.innerHTML = '<p>로그인 후 게임을 시작할 수 있습니다!</p>'
  if (gameStart.style.display === 'none') {
    gameStart.style.display = 'block'
  } else {
    gameStart.style.display = 'none'
  }
}
function handleLeaders () {
    leaderGetRequest()
      .then(games => 
        displayLeaders(games)
      )
  }