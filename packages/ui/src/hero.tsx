import Image from 'next/image';
// import AppBarIcon from '../assets/appbar-icon.png';
import HeroImg from '../../../apps/user-app/public/home-hero.webp';

const Hero = () => {
  return (
    <div className='w-full flex items-center p-8 gap-8 mx-auto'>
        {/* <img src={HeroImg} alt='home-hero-img' className='flex flex-row self-end w-3xl mx-auto' /> */}
        <Image 
            // src='../../../apps/user-app/public/home-hero.webp'
            src={HeroImg}
            alt='home-hero-image'
            className='flex flex-row self-end w-3xl mx-auto'
        />
    </div>
  )
}

export default Hero