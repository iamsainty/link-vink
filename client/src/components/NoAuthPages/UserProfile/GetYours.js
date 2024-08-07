import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CenteredLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  width: 40vw;
  border-radius: 0 0  20px 20px;
  text-decoration: none;
  padding: 7px;
  font-size: 1rem;
  text-align: center;

  @media (max-width : 768px){
    width: 70vw;
    font-size: 0.75rem;
  }
`

function GetYours() {
  return (
    <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
    <CenteredLink to={'/register'}>
      Wish to have your Link Vink Profile ? <br className='d-lg-none' /> Click here to Get Yours Now
    </CenteredLink>
    </div>
  )
}

export default GetYours
