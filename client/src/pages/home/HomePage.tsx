
import Navbar from '../../components/Navbar';
//icons
import { FaRunning, FaLaptopCode } from 'react-icons/fa';
import { FaBowlFood, FaWebAwesome } from 'react-icons/fa6';
import { iconsTextContent } from '../../data/data';

const HomePage = () => {

  const icons = [ <FaRunning size={40}/>, <FaLaptopCode size={40}/>, <FaBowlFood size={40}/>, <FaWebAwesome size={40}/> ];

  const iconsHandle = () => {
    return ( 
      <>
        {
          icons.map( ( icon:any, index:number ) => {
            return ( 
              <div 
                key = { index }
                className='grid grid-rows-2 gap-2 p-3'
              >
                  <div className='flex justify-center content-center mt-5'>
                    { icon }
                  </div>
                  <span>
                    { iconsTextContent[index] }
                  </span>
              </div>
            )
          })
        }
      </>
    );
  }

  return (
    <div className='grid w-[100]'>
          <Navbar/>
          <div className="w-full h-[80vh] bg-[url('/assets/images/office.png')]  bg-local bg-cover bg-center">
            <div className='bg-white/30 backdrop-invert backdrop-opacity-10 h-[100%] w-[100vw] justify-center content-center'>
              <div className='w-[90%] m-auto text-center 
              lg:text-start '>
                <p className='text-small lg:w-[80%]'>
                  FOCUSING ON RESULTS
                </p>
                <p className='text-[75px]  lg:text-[100px] lg:w-[75%]'>
                  Enabling Organizations to grow.
                </p>
                <div className='flex justify-center lg:justify-start mt-5 '>
                  <button>
                    learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='grid w-[100%] grid-cols-1 mt-10
              lg:grid-cols-2 lg:m-auto lg:mt-[5%] lg:mb-[5%] lg:w-[75%]'
          >
            <div className='grid text-center lg:text-start gap-4 p-5'>
              <p> What we do? </p>
              <p className='text-4xl'>
                Adequate creativity along with high-end technological solutions 
              </p>
              <p className='text-small lg:w-[75%]'> 
                We are a team of experienced developers, designers, marketers, 
                and analysts dedicated to creating innovative solutions that enhance everyday life and promote healthier, smarter lifestyles. 
              </p>
            </div>
            <div className='grid grid-cols-1 text-center lg:grid-cols-2 justify-center'>
              { iconsHandle() }
            </div>
          </div>
        </div>
  )
}

export default HomePage