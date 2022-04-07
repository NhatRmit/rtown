import LoginNavbar from "./Navbar/LoginNavbar";
import LoginFooter from "../Footer/LoginFooter";

const LoginLayout = ({children, header, footer, className}) => {
    return (
        <>
          {header ? <LoginNavbar /> : null}
          <main className={className}>{children}</main>
          {footer ? <LoginFooter /> : null}
        </>
    )
  }
  
  export default LoginLayout