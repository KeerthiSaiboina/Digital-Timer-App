// Write your code here

import {Component} from 'react'

import './index.css'

const intialState = {
  isTimmerRunning: false,
  timeLimitINMins: 25,
  timeElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = intialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimeLimitInMinutes = () => {
    this.setState(prevState => ({
      timeLimitINMins: prevState.timeLimitINMins - 1,
    }))
  }

  onIncreaseTimeLimitInMinutes = () => {
    this.setState(prevState => ({
      timeLimitINMins: prevState.timeLimitINMins + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timeLimitINMins, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            type="button"
            disable={isButtonDisabled}
            onClick={this.onDecreaseTimeLimitInMinutes}
          >
            -
          </button>
          <div className="label-value-container">
            <p className="time">{timeLimitINMins}</p>
          </div>
          <button
            className="limit-controller-button"
            type="button"
            disable={isButtonDisabled}
            onClick={this.onIncreaseTimeLimitInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(intialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeLimitINMins, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitINMins * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimmerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimmerRunning, timeLimitINMins, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitINMins * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimmerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimmerRunning: !prevState.isTimmerRunning}))
  }

  renderTimerController = () => {
    const {isTimmerRunning} = this.state
    const startOrPauseImageUrl = isTimmerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimmerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-controller-container">
        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            alt={startOrPauseAltText}
            src={startOrPauseImageUrl}
            className="timer-controller-icon"
          />
        </button>
        <p className="timer-controller-label">
          {isTimmerRunning ? 'Pause' : 'Start'}
        </p>
        <button type="button" className="timer-controller-btn">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeLimitINMins, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timeLimitINMins * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes} : ${stringifiedSeconds}`
  }

  render() {
    const {isTimmerRunning} = this.state
    const labelText = isTimmerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="time-running-container">
            <div className="timer-card">
              <h1 className="timmer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timmer-state">{labelText}</p>
            </div>
          </div>
          <div className="time-setting-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
