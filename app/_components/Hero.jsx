import React from "react";
import Image from "next/image";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";

function Hero() {
  return (
    <section className="bg-gray-50">
      <div>
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Track Smart. Spend Wise. <br />
                <span className="text-4xl md:text-[6rem] text-blue-800 font-bold mt-1 leading-none">
                  FinSights
                </span>
              </h1>
            </>
          }
        >
          <div className="inline-block p-1">
            <Image
              src={`/dashboard.png`}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-contain w-full h-auto"
              draggable={false}
            />
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}

export default Hero;