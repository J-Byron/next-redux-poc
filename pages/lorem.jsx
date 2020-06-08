import { wrapper } from '../redux/index'
import { connect } from 'react-redux'
import axios from 'axios'

// Runs at build time
export const getStaticProps = wrapper.getStaticProps(async () => {
  const { data: lorem } = await axios.get(
    'https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text'
  )

  return { props: { lorem } }
})

const Lorem = props => {
  return (
    <div
      style={{
        color: '#525252',
        fontSize: '16px'
      }}
    >
      <div>{props.lorem}</div>
    </div>
  )
}

export default connect(state => state)(Lorem)
