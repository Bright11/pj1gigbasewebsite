
import ComponentLayout from './../../../componets/layouts/Layouts';
import Navbar from './../../../componets/navbar/Navbar';
import SliderSection from './../../../componets/slider/Slider';
import Appqrcode from './../../../componets/qrcode/Appqrcode';
import  Sidebarbar from './../../../componets/sidebar/Sidebar';
import Postdata from './../../../componets/fetchdata/Postdata';
import Footer from "../../../componets/footer/Footer"



export default function Homepage() {
  return (
   <ComponentLayout 
   navContent={<Navbar/>}
   myslidercomponent={<SliderSection/>}
   showslider={true}
   mysidebarcomponent={<Sidebarbar/>}
   appqrcode={<Appqrcode/>}
   showsidebar={true}
   footerContent={<Footer/>}
   >
    <div className="">
      <Postdata/>
    </div>
   </ComponentLayout>
  );
}
