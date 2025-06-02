import About from "../../components/LandingComponent/About";
import Contact from "../../components/LandingComponent/Contact";
import Features from "../../components/LandingComponent/Features";
import Footer from "../../components/LandingComponent/Footer";
import MainHome from "../../components/LandingComponent/MainHome";
import Nav from "../../components/LandingComponent/nav";
import Vision from "../../components/LandingComponent/Vision";

const Landing = () => {
    return (
        <div  className=" bg-[#FFFFFF]">
          <Nav/>
          <MainHome/>
          <Features/>
          <About/>
          <Vision/>
          <Contact/>
          <Footer/>
        </div>
    );
}

export default Landing;
