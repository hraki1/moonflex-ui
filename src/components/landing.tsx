export default function LandingPage() {
  return (
    <div className="relative bg-[url('/images/landingFilm.jpg')] bg-cover bg-top h-[calc(100vh+64px)] w-full text-white">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0  bg-black/60 z-10"></div>

      {/* Content section */}
      <div className="relative z-20 flex items-center h-full px-8 md:px-20">
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Bullet Train Explosion
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            A mind-blowing action thriller. Get ready to ride.
          </p>

          {/* CTA Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className=" flex items-center justify-between cursor-pointer bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className=" inline mr-2"
              >
                <path
                  fill="currentColor"
                  fillOpacity={0}
                  stroke="currentColor"
                  strokeDasharray={40}
                  strokeDashoffset={40}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 6l10 6l-10 6Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="0.5s"
                    dur="0.5s"
                    values="0;1"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.5s"
                    values="40;0"
                  ></animate>
                </path>
              </svg>
              <p>Play</p>
            </button>
            <button className="flex items-center justify-between cursor-pointer bg-white/20 text-white border border-white font-semibold px-6 py-3 rounded hover:bg-white/30 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className=" inline mr-2"
              >
                <path
                  fill="currentColor"
                  d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                ></path>
              </svg>
              <p>More Info</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
