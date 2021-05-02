import React from 'react'
import { Form, Input, Button, notification } from 'antd'
import axios from 'axios'
import TickerSearch from './ticker-search'

// const debug = require('debug')('stockie:top5')
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const Picks = props => {
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values)
      if (!err) {
        console.log('Received values of form: ', values)
        const data = {
          memberName: values.memberName,
          email: values.email,
          tickers: [values.pick1, values.pick2, values.pick3, values.pick4, values.pick5],
          reasons: [values.reason || '']
        }
        const ok = data.tickers.reduce((acc, val) => {
          if (data.tickers.filter(ticker => ticker === val).length !== 1) return false
          return acc
        }, true)
        if (!ok)
          notification.error({ message: 'Please check your picks', description: 'All your picks should be different' })
        else {
          const request = {
            url: process.env.REACT_APP_PICKS_URL,
            method: 'post',
            // headers: { Authorization: 'Basic 1234' },
            data
            // validateStatus: function(status) {
            //   return status >= 200
            // }
          }
          // debug(`sending request to ${process.env.REACT_APP_PICKS_URL}`)
          axios(request)
            .then(d => {
              // debug('ok', d)
              props.history.push('/thanks')
            })
            .catch(e => console.error(e.message))
        }
      }
    })
  }

  const { getFieldDecorator } = props.form

  return (
    <div className="App">
      <h1>Top 5 picks</h1>

      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('memberName', {
            rules: [
              {
                required: true,
                message: 'Please input your name!'
              }
            ]
          })(<Input name="memberName" />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(<Input name="email" />)}
        </Form.Item>
        <hr></hr>
        <Form.Item label="Top Pick">
          {getFieldDecorator('pick1', {
            rules: [
              {
                required: true,
                message: 'Please input first stock pick!'
              }
            ]
          })(<TickerSearch name="pick1" />)}
        </Form.Item>
        <Form.Item label="Reason">
          {getFieldDecorator('reason', {
            rules: [
              {
                required: false,
                message: 'Why did you choose this as your top pick?'
              }
            ]
          })(<Input.TextArea rows={6} placeholder="Reason why this is your #1 pick" />)}
        </Form.Item>
        <hr></hr>
        <Form.Item label="#2 Pick">
          {getFieldDecorator('pick2', {
            rules: [
              {
                required: true,
                message: 'Please input #2 stock pick!'
              }
            ]
          })(<TickerSearch name="pick2" />)}
        </Form.Item>
        <Form.Item label="#3 Pick">
          {getFieldDecorator('pick3', {
            rules: [
              {
                required: true,
                message: 'Please input #3 stock pick!'
              }
            ]
          })(<TickerSearch name="pick3" />)}
        </Form.Item>
        <Form.Item label="#4 Pick">
          {getFieldDecorator('pick4', {
            rules: [
              {
                required: true,
                message: 'Please input #4 stock pick!'
              }
            ]
          })(<TickerSearch name="pick4" />)}
        </Form.Item>
        <Form.Item label="#5 Pick">
          {getFieldDecorator('pick5', {
            rules: [
              {
                required: true,
                message: 'Please input #5 stock pick!'
              }
            ]
          })(<TickerSearch name="pick5" />)}
        </Form.Item>
        <Button type="primary" block icon="save" id="save" onClick={handleSubmit}>
          Save
        </Button>
      </Form>
    </div>
  )
}

// export default Picks

export default Form.create({ name: 'pick' })(Picks)
