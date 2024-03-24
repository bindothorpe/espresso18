import Image from 'next/image';
import {Button} from "@nextui-org/react";

export default function About() {
  return (
    <section className="flex flex-row bg-white text-black p-20 py-28 gap-32">
      <div className='w-1/2 relative'>
        <div className='w-full h-0 pb-[100%]'>
          <div className='absolute inset-0'>
            <Image
              src="/images/cup_black_and_white.jpg"
              alt="Picture of the author"
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      </div>
      <div className='w-1/2 flex justify-center items-center'>
        <div className='gap-10 flex flex-col'>
          <h2 className='text-5xl'>Experience the Cozy Charm and Breathtaking Views at Espresso 18</h2>
          <p>At Espresso 18, we provide not only excellent coffee, but also a charming environment and stunning mountain vistas, which together make the ideal backdrop for you to unwind and savor a delightful cup of coffee.</p>
          <div>
            <Button color='primary' radius='sm'>Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}