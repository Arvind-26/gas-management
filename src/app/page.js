import Image from "next/image";

export default function Home() {
  return (<>
    <Image src={"/gas.jpeg"} width={1000} height={1000} alt="bg-image" className="w-full h-screen relative" />
    <div className=' absolute text-white top-60 left-20 w-fit'>
      <div className=' text-3xl'>Affordable and Precise</div>
      <div className=' text-4xl font-bold font-serif my-2'>Cooking Gas Agency</div>
      <button className=' bg-[#c9371a] px-6 py-1 rounded-2xl mr-3'>Register</button>
      <button className=' bg-[#55555500] border-2 px-6 py-1 rounded-2xl'>Login</button>
    </div>
    <main className="flex flex-col items-center mt-12">
      <h1 className="text-[#c9371a] text-5xl m-5 font-bold">Services</h1>
      <div className="flex justify-between items-center gap-10 w-4/5 my-3">
        <Image src={"/home-delivery.jpg"} width={1000} alt="" height={1000} className=" w-52" />
        <div className="flex flex-col items-start w-3/5">
          <h2 className="text-2xl my-2 text-[#c9371a] font-semibold">Home Delivery</h2>
          <h3 className="text-xl">Book a new gas connection or refill it, we will deliver your cylinder free of deliver fee at your place in no time.</h3>
        </div>
      </div>
      <div className="flex justify-between items-center gap-10 w-4/5 my-3">
        <div className="flex flex-col items-start w-3/5">
          <h2 className="text-2xl my-2 text-[#c9371a] font-semibold">LPG Cylinder for Home</h2>
          <h3 className="text-xl">Book top class regular size cylinders of accurate weight & superior quality for your household needs.</h3>
        </div>
        <Image src={"/lpg.jpg"} width={1000} alt="" height={1000} className=" w-52" />
      </div>
      <div className="flex justify-between items-center gap-10 w-4/5 my-3">
        <Image src={"/connection.jpg"} width={1000} alt="" height={1000} className=" w-52" />
        <div className="flex flex-col items-start w-3/5">
          <h2 className="text-2xl my-2 text-[#c9371a] font-semibold">Quick gas connection</h2>
          <h3 className="text-xl">Quick Gas Connection offers fast and hassle-free gas connection services for homes and businesses.</h3>
        </div>
      </div>
    </main>

  </>
  )
}
