
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/Navbar/Navbar"
import ScrollToTopButton from "@/components/modules/ScrollToTopButton/ScrollToTopButton";
import Articles from "@/components/templates/Index/Articles/Articles";
import Banner from "@/components/templates/Index/Banner/Banner"
import Latest from "@/components/templates/Index/Latest/Latest";
import Promote from "@/components/templates/Index/Promote/Promote";
import { authUser } from "@/utils/serverHelper";

export default  async function  Home() {
 const user=await authUser();

  return (
    <>

     <Navbar isLogged={user}/>
      <Banner />
      <Latest />
      <Promote />
      <Articles />
      <Footer />
      <ScrollToTopButton /> 
    </>
  );
}
