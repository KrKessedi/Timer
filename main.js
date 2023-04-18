let hoursInput = document.getElementById('hours')
let minutesInput = document.getElementById('minutes')
let secondsInput = document.getElementById('seconds')
let timer = null
let countdown = null
let timeRemaining = 0

function startTimer() {
	let hours = parseInt(hoursInput.value) || 0
	let minutes = parseInt(minutesInput.value) || 0
	let seconds = parseInt(secondsInput.value) || 0
	let period = hours * 3600 + minutes * 60 + seconds
	if (period <= 0) {
		alert('Поля пустые')
		return
	}
	let timerElement = document.getElementById('timer')
	timerElement.dataset.period = period

	if (timer !== null) {
		clearInterval(timer)
	}
	if (countdown !== null) {
		clearInterval(countdown)
	}
	timeRemaining = period
	countdown = setInterval(decrementTime, 1000)
	document.getElementById('startButton').disabled = true
	document.getElementById('stopButton').disabled = false
	document.getElementById('continueButton').disabled = true
}

function stopTimer() {
	clearInterval(countdown)
	document.getElementById('startButton').disabled = false
	document.getElementById('stopButton').disabled = true
	timeRemaining =
		parseInt(document.getElementById('timer').dataset.remaining) || 0
	if (timeRemaining > 0) {
		document.getElementById('continueButton').disabled = false
	}
}
function continueTimer() {
	countdown = setInterval(decrementTime, 1000)
	document.getElementById('continueButton').disabled = true
	document.getElementById('stopButton').disabled = false
}

function decrementTime() {
	let timerElement = document.getElementById('timer')
	if (timeRemaining <= 0) {
		clearInterval(countdown)
		document.getElementById('startButton').disabled = false
		document.getElementById('stopButton').disabled = true
		document.getElementById('continueButton').disabled = true
		timerElement.textContent = '00:00:00'
		timerElement.dataset.remaining = 0
		return
	}
	timeRemaining--
	let hours = Math.floor(timeRemaining / 3600)
	let minutes = Math.floor((timeRemaining % 3600) / 60)
	let seconds = timeRemaining % 60
	let hoursStr = hours.toString().padStart(2, '0')
	let minutesStr = minutes.toString().padStart(2, '0')
	let secondsStr = seconds.toString().padStart(2, '0')
	timerElement.textContent = `${hoursStr}:${minutesStr}:${secondsStr}`
	timerElement.dataset.remaining = timeRemaining
}
