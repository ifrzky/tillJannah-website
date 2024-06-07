const Hero = () => {
    return (
        <div className="__wrapper min-h-screen">
            <section className="flex flex-nonwrap justify-center items-center bg-green-500 rounded-md mx-10 my-10 h-[550px] text-white">
                <div className="__content_wrapper flex flex-row items-center gap-5 px-20 py-20">
                    <div>
                        <h1 className="text-6xl font-bolder">Till Jannah</h1>
                        <p className="text-2xl">The best app for muslim</p>
                    </div>
                    <img src="__mosq.png" alt="mosque" className="w-1/6"/>
                </div>
            </section>
        </div>
    )
}

export default Hero