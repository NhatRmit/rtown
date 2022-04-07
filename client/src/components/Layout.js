import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({children, header, footer, className}) => {
    return (
        <>
          {header ? <Navbar /> : null}
          <main className={className}>{children}</main>
          {footer ? <Footer /> : null}
        </>
    )
  }
  
  export default Layout