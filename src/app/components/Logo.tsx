import localFont from 'next/font/local'

const aswatama = localFont({ src: "../fonts/aswatama.ttf" });

export default function Logo(){
    return(
        <h1 className={`text-black text-4xl select-none ${aswatama.className}`}>
          espresso18
        </h1>
    )
}