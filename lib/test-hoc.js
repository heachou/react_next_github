import Comp from "../components/comp";

export default Comp => {
  function TestHocComp({ Component, pageProps, ...rest }) {
    
    if (pageProps) {
      pageProps.test = 'add new props'
    }

    return <Comp Component={Component} pageProps={pageProps} hello={123} {...rest} />
  }

  TestHocComp.getInitialProps = Comp.getInitialProps
  
  return TestHocComp
}