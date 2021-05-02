import React from 'react'
import 'antd/dist/antd.css'
import { Select, notification } from 'antd'
import axios from 'axios'

const { Option } = Select

let timeout
let currentTicker

function fetch(ticker, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentTicker = ticker

  function doFetch() {
    const str = {
      datatype: 'json',
      function: 'SYMBOL_SEARCH',
      apikey: 'YPT81KZ54CM2SCAJ',
      keywords: ticker
    }
    const searchUrl = process.env.REACT_APP_TICKERS_URL // 'http://localhost:3080/tickers'
    axios
      .get(searchUrl, { params: str })
      .then(d => {
        if (currentTicker === ticker) {
          const result = d.data.bestMatches
          console.log(d)
          const data = []
          result.forEach(r => {
            // console.log(r)
            if (r['1. symbol'].match(/\S/))
              data.push({
                value: r['1. symbol'],
                text: r['2. name']
              })
          })
          // console.log(data)
          callback(data)
        }
      })
      .catch(e => {
        notification.error({ message: 'There is a technical problem', description: e.message })
        console.error(e.message)
      })
  }

  // A bit clunky - a way of debouncing the input

  timeout = setTimeout(doFetch, 300)
}

const TickerSearch = ({ placeholder, style, onChange, name }) => {
  const [data, setData] = React.useState([])
  const [ticker, setTicker] = React.useState(null)

  const handleSearch = ticker => {
    if (ticker) {
      fetch(ticker, data => setData(data))
    } else {
      setData([])
    }
  }

  const triggerChange = changedValue => {
    // const { onChange, value } = props
    if (onChange) {
      onChange(changedValue)
    }
  }

  const handleChange = ticker => {
    setTicker(ticker)
    triggerChange(ticker)
  }

  const options = data.map(d => (
    <Option key={d.value}>
      {d.value} {d.text}
    </Option>
  ))
  return (
    <Select
      showSearch
      value={ticker}
      placeholder={placeholder}
      style={style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      name={name}
      id={name}
    >
      {options}
    </Select>
  )
}

export default TickerSearch
