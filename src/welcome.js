import React from 'react'
import { Button } from 'antd'

const paragraphs = [
  'Imagine you have an Australian investment portfolio of $1 million. It is all invested in an ASX200 index ETF.',
  'You now have the confidence to start investing directly in companies rather than just in the index. ',
  'Over time you will transition all of that ETF money into 20 ASX listed companies.',
  'You have decided to make a start and to invest $50,000 in each of 5 companies listed on the ASX.',
  'Which is your best investing idea - the company that, based on the current market price (effectively your potential purchase price), you expect will give you the best future return, the company that you would buy first? And second? And third? And fourth? And fifth?',
  'You must choose 5 even if the fifth one is not really undervalued, but fairly priced, and you might be tempted to wait - no for this to work you must choose 5. I will only include your input if you choose 5.',
  'Remember you need to ignore your current portfolio and imagine you are starting from scratch with your first and best five choices.',
  'Additionally, participants have found it useful to understand why other participants chose their top stock pick. So, please also include a (one or two paragraph) summary of why you chose that particular company as your top pick. '
]
const Welcome = () => (
  <div className="bg">
    <div style={{ textAlign: 'center', width: '60%' }}>
      <h1 style={{ padding: '40px' }}>Top 5 stock picks</h1>

      {paragraphs.map((para, ix) => (
        <h3 style={{ padding: '4px' }} key={ix}>
          {para}
        </h3>
      ))}

      <Button type="primary" block href="/picks" icon="rocket" id="next">
        Get started
      </Button>
    </div>
  </div>
)

export default Welcome
