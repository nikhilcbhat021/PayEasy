import Image from 'next/image';
import HeroImg from '../assets/home-hero.png';
// import HeroImg from '../../../apps/user-app/public/home-hero.webp';

const Hero = () => {
  return (
    <div className='w-full h-full flex sm:flex-col sm:justify-center sm:items-center lg:flex-row lg:items-center p-8 gap-8 mx-auto'>
        {/* <img src={HeroImg} alt='home-hero-img' className='flex flex-row self-end w-3xl mx-auto' /> */}
        <div>
            <Image
                // src='../../../apps/user-app/public/home-hero.webp'
                priority={true}
                src={HeroImg}
                alt='home-hero-image'
                className='flex flex-row w-3xl mx-auto'
            />
        </div>

        <p className='text-6xl text-blue-900 font-light'> Payments made easy... </p>
    </div>
  )
}

export default Hero