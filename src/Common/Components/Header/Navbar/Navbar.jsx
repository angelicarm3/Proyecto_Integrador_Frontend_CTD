const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}><a style={styles.link} href="/">Home</a></li>
        <li style={styles.li}><a style={styles.link} href="/Inicio">About</a></li>
        <li style={styles.li}><a style={styles.link} href="/Contacto">Contact</a></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgb(15 23 42)',
    padding: '10px',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  li: {
    marginRight: '200px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
};
//   (
//     <>
//       <nav className='' />
//       <p>Logo</p>
//       <p>Login/SingUp</p>
//     </>

//   )
// }

export default Navbar
