import React from 'react'

interface IAppHeader {
  size: string
}
const AppHeader = (props: IAppHeader) => {
  const { size } = props;
  return (
    <span className='font-orbitron  text-white text-center' style={{ fontSize: size }}>Crypto Trader</span>
  )
}

export default AppHeader