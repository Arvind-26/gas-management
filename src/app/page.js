import Card from "@/components/Card";
import Image from "next/image";

export default function Home() {
  return (<>
    <Image src={"/gas.jpeg"} width={1000} height={1000} alt="bg-image" className="w-full h-screen relative" />
    <div className=' absolute text-white top-60 left-20 w-fit'>
      <div className=' text-3xl'>Affordable and Precise</div>
      <div className=' text-4xl font-bold font-serif my-2'>Cooking Gas Agency</div>
      <div className="flex space-x-3 mt-3">
        <button className="bg-[#c9371a] font-semibold px-8 py-2 rounded-2xl shadow-lg hover:bg-[#b32f16] transition-colors duration-300">
          Register
        </button>
        <button className="bg-transparent font-semibold border-2 border-white px-8 py-2 rounded-2xl shadow-lg hover:bg-white hover:text-[#c9371a] transition-colors duration-300">
          Login
        </button>
      </div>
    </div>

    <main>
      <section className="flex flex-col items-center mt-20 space-y-12">
        <h1 className="text-[#c9371a] text-5xl font-bold">Our Services</h1>

        <div className="flex justify-between items-center gap-8 w-4/5 bg-[#171717bd] p-8 rounded-xl shadow-lg">
          <Image src="/home-delivery.jpg" width={1000} alt="Home Delivery" height={1000} className="w-52 rounded-xl" />
          <div className="flex flex-col items-start w-3/5">
            <h2 className="text-3xl my-2 text-[#c9371a] font-semibold">Home Delivery</h2>
            <h3 className="text-lg text-white">Book a new gas connection or refill it, and we will deliver your cylinder with no delivery fee in no time.</h3>
          </div>
        </div>

        <div className="flex justify-between items-center gap-8 w-4/5 bg-[#171717bd] p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-start w-3/5">
            <h2 className="text-3xl my-2 text-[#c9371a] font-semibold">LPG Cylinder for Home</h2>
            <h3 className="text-lg text-white">Book top-class regular size cylinders with accurate weight & superior quality for your household needs.</h3>
          </div>
          <Image src="/lpg.jpg" width={1000} alt="LPG Cylinder" height={1000} className="w-52 rounded-xl" />
        </div>

        <div className="flex justify-between items-center gap-8 w-4/5 bg-[#171717bd] p-8 rounded-xl shadow-lg">
          <Image src="/connection.jpg" width={1000} alt="Quick Gas Connection" height={1000} className="w-52 rounded-xl" />
          <div className="flex flex-col items-start w-3/5">
            <h2 className="text-3xl my-2 text-[#c9371a] font-semibold">Quick Gas Connection</h2>
            <h3 className="text-lg text-white">Quick Gas Connection offers fast and hassle-free gas connection services for homes and businesses.</h3>
          </div>
        </div>
      </section>

      <section className="grid-cols-1 md:grid-cols-3 grid">
        <Card type={"Large"} img={"/home-lpg.png"} />
        <Card type={"Large"} img={"/home-lpg.png"} />
        <Card type={"Large"} img={"/home-lpg.png"} />
      </section>
    </main>
  </>
  )
}
