import Card from "@/components/Card";
import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (<>
    <Image src={"/gas.jpeg"} width={1000} height={1000} alt="bg-image" className="w-full md:h-screen relative pt-16 md:pt-0" />
    <div className=' md:absolute flex flex-col items-center text-white md:top-60 md:left-20 md:w-fit'>
      <div className=' md:text-3xl text-xl'>Affordable and Precise</div>
      <div className=' md:text-4xl text-2xl font-bold font-serif my-2'>Cooking Gas Agency</div>
      <div className="flex space-x-3 mt-3">
        <Link href="/signup">
          <button className="bg-[#c9371a] font-semibold md:px-8 px-3 md:py-2 py-1 rounded-2xl shadow-lg hover:bg-[#b32f16] transition-colors duration-300">
            Register
          </button></Link>
        <Link href="/login">
        <button className="bg-transparent font-semibold border-2 border-white md:px-8 px-3 md:py-2 py-1 rounded-2xl shadow-lg hover:bg-white hover:text-[#c9371a] transition-colors duration-300">
          Login
        </button></Link>
      </div>
    </div>

    <main>
      <section className="flex flex-col items-center mt-20 space-y-12 m-3">
        <h1 className="text-[#c9371a] md:text-5xl text-4xl font-bold">Our Services</h1>

        <div className="flex justify-between items-center gap-8 max-w-4/5 bg-[#171717bd] md:p-8 p-4 rounded-xl shadow-lg">
          <Image src="/home-delivery.jpg" width={1000} alt="Home Delivery" height={1000} className="md:w-52 w-32 rounded-xl" />
          <div className="flex flex-col items-start w-3/5">
            <h2 className="text-3xl my-2 text-[#c9371a] font-semibold">Home Delivery</h2>
            <h3 className="text-lg text-white">Book a new gas connection or refill it, and we will deliver your cylinder with no delivery fee in no time.</h3>
          </div>
        </div>

        <div className="flex justify-between items-center gap-8 max-w-4/5 bg-[#171717bd] md:p-8 p-4 rounded-xl shadow-lg">
          <div className="flex flex-col items-start w-3/5">
            <h2 className="text-3xl my-2 text-[#c9371a] font-semibold">LPG Cylinder for Home</h2>
            <h3 className="text-lg text-white">Book top-class regular size cylinders with accurate weight & superior quality for your household needs.</h3>
          </div>
          <Image src="/lpg.jpg" width={1000} alt="LPG Cylinder" height={1000} className="md:w-52 w-32 rounded-xl" />
        </div>

        <div className="flex justify-between items-center gap-8 max-w-4/5 bg-[#171717bd] md:p-8 p-4 rounded-xl shadow-lg">
          <Image src="/connection.jpg" width={1000} alt="Quick Gas Connection" height={1000} className="md:w-52 w-32 rounded-xl" />
          <div className="flex flex-col items-start w-3/5">
            <h2 className="text-3xl my-2 text-[#c9371a] font-semibold">Quick Gas Connection</h2>
            <h3 className="text-lg text-white">Quick Gas Connection offers fast and hassle-free gas connection services for homes and businesses.</h3>
          </div>
        </div>
      </section>

      <section className="grid-cols-1 md:grid-cols-4 grid mt-20 mb-10">
        <h1 className="text-[#c9371a] md:text-5xl text-4xl font-bold m-auto">LPG Booking</h1>
        <Card type={"Large"} img={"/home-lpg.png"} price={800}/>
        <Card type={"Medium"} img={"/medium-lpg.png"} price={600}/>
        <Card type={"Small"} img={"/small-lpg.jpg"} price={400}/>
      </section>

      <section className="flex md:flex-row flex-col mt-10 md:gap-32 gap-5 border-t-2 p-12">
        <div className="md:text-9xl text-4xl font-extrabold font">About Us</div>
        <div className="flex items-center md:text-lg text-md">
          We are one of the most popular & reliable gas agencies in the vicinity that provide gas cylinders and other cooking gas connections to residents as and when required. We ensure that our clients do not complain about untimely meals & skipping lunches and thus are at their beck and all. Our staff is extremely determined in making it a smooth and easy going experience for you.
        </div>
      </section>
    </main>

  </>
  )
}
