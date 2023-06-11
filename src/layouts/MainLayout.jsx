import Header from '../components/Header'

function MainLayout({children}) {
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            {children}
          </div>
        </div>
    </div>
  )
}

export default MainLayout