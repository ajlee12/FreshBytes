import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class ProductForm extends React.Component {
  state = {
    submitted: false
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addProduct(this.state)
    this.setState({submitted: true})
  }

  render() {
    if(this.state.submitted === true) return <Redirect to='/main'/>
    else return (
      <div>
        <nav style={styles.nav}>
          <div>
            <Link to='/main' style={styles.navLinkHome}>
              <img src="../../../public/assets/NeighborsTableUC.png" height="150"></img>
            </Link>
          </div>
        </nav>
        <div style={styles.formContainer} className="formContainer">
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <div style={styles.subFormDiv}>
              <h3 style={styles.h3}>Seller Description</h3>
              <div style={styles.inputDiv}>
                <label>Name</label>
                <input style={styles.input} name='name'/>
              </div>
              <div style={styles.inputDiv}>
                <label>Email</label>
                <input style={styles.input} name='email'/>
              </div>
              <div style={styles.inputDiv}>
                <label>Phone</label>
                <input style={styles.input} name='phone'/>
              </div>
              <div style={styles.inputDiv}>
                <label>About</label>
                <input style={styles.input} name='about'/>
              </div>
              <div style={styles.inputDiv}>
                <label>Zip</label>
                <input style={styles.input} name='zip'/>
              </div>
            </div> 
            <div style={styles.subFormDiv}>
              <h3 style={styles.h3}>Product Info</h3>
              <div style={styles.inputDiv}>
                <label>Product</label>
                <input style={styles.input} name='title'/>
              </div>
              <div style={styles.inputDiv}>
                <label>Price</label>
                <input style={styles.input} name='price'/>
              </div>
              <div style={styles.inputDiv}>
                <label>Description</label>
                <input style={styles.input} name='description'/>
              </div>
            </div>
            <div style={styles.buttonDiv}>
                <button style={styles.button}type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ProductForm

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '10rem',
  },
  input: {
    minWidth: '200px',
    fontSize: '1rem',
    marginLeft: '2rem',
    color: 'grey',
  },
  button: {
    minWidth: '150px',
    fontSize: '1.2rem',
    fontWeight: '500',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer',
    margin: '2.5rem',
    background:'#3F9E4D',
    color: 'aliceblue',
    opacity: '.9'
  },
  nav: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
    color: '#EAEAEA',
    backgroundColor: '#3F9E4D',
    minHeight: '15vh',
    width: '100%',
    padding: '0 2rem',
    marginTop: '-.5rem',
    marginLeft: '-.5rem',
    opacity: '.9',
    position: 'fixed',
    top: '0'
  },
  navLinkHome: {
    fontFamily: 'Varela Round',
    fontSize: '2rem',
    color: '#EAEAEA',
    fontWeight: '900',
    textDecoration: 'none',
  },
  inputDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '.5rem'
  },
  subFormDiv: {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
    padding: '1rem',
    marginTop: '2rem',
    borderRadius: '8px',
    fontFamily: 'Open Sans',
    fontSize: '1rem',
    paddingBottom: '2rem',
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
  h3: {
    textAlign: 'center',

  }
}
