import {useHistory} from 'react-router-dom'

export default function Welcome() {
  let history = useHistory()
  return (
    <div>
      <p>Hello🖐️, Please Enter your name </p>
      <input
        type="text"
        placeholder="e.g Ahmed"
        autoFocus
        style={{
          width: '100%',
          borderRadius: '38px',
          padding: '8px',
          color: 'black',
          outline: 'none',
          boxShadow: '0px 0px 2px #0066ff',
        }}
      />
      {/* <button style={{ background: '#a8b4e0', width: '60%', justifyContent: 'center', marginTop: '20px', marginLeft: '60px' }}>Go</button> */}
      <button
        style={{
          background: '#234668',
          width: '60%',
          justifyContent: 'center',
          marginTop: '20px',
          marginLeft: '60px',
        }}
        onClick={() => history.push('/questions')}
      >
        Go ➡️{' '}
      </button>
      {/* <Link to="/questions" style={{ background: '#234668', width: '60%', justifyContent: 'center', marginTop: '20px', marginLeft: '60px', }} onClick={() => history.push('/questions')}>Go ➡️ </Link> */}
    </div>
  )
}
