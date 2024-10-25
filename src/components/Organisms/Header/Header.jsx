import isoGold from '../../../assets/brand/isoGold.svg'
import LogInBtn from '../../Atoms/LoginBtn/LoginBtn'
import SignUpBtn from '../../Atoms/SignUpBtn/SignUpBtn'
// import Navbar from '../../Molecules/Navbar/Navbar'

function Header () {
  return (
    <header style={styles.header}>
      <img src={isoGold} alt='logo' style={styles.logo} />
      {/* <Navbar /> */}
      <div style={styles.authButtons}>
        <LogInBtn />
        <SignUpBtn />
      </div>
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: 'rgb(15 23 42)'
  },
  logo: {
    height: '50px',
    marginRight: '20px'
  },
  authButtons: {
    display: 'flex',
    gap: '10px',
    width: 'fit-content'
  }
}

export default Header
