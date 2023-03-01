import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createQuestion } from '../../actions/questions'

class QuestionsForm extends Component {
  constructor() {
    super()
    this.state = { question: '' }
  }

  submitForm(event) {
    event.preventDefault()
    this.props.createQuestion(this.state.question)
  }

  render() {
    const { question } = this.state

    return (
      <form onSubmit={event => this.submitForm(event)} className='question-form'>
        <h3>Create a Question</h3>
        <input
          className='form-control'
          onChange={({ target }) => this.setState({ question: target.value })}
          placeholder='Enter your question...'
          value={question}
        />
        <button
          className='btn btn-primary'
          disabled={question === ''}
          type='submit'
        >
          Create
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = {
  createQuestion
}

export default connect(null, mapDispatchToProps)(QuestionsForm)
