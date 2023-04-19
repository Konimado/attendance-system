// import Header from "./Header";
import Header from "./Header";
// import Footer from "./footer";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
