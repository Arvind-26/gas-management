import Image from "next/image";

export default function Home() {
  return (<>
    <Image src={"/gas.jpg"} width={1000} height={1000} className="w-full h-full absolute" />
    <div className=' relative text-white top-60 left-20 w-fit'>
      <div className=' text-3xl'>Affordable and Precise</div>
      <div className=' text-4xl font-bold font-serif my-2'>Cooking Gas Agency</div>
      <button className=' bg-[#c9371a] px-6 py-1 rounded-2xl mr-3'>Register</button>
      <button className=' bg-[#55555500] border-2 px-6 py-1 rounded-2xl'>Login</button>
    </div>
  </>
  )
}
