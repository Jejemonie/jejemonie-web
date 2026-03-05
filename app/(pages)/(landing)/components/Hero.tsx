'use client'

export function Hero() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex flex-col items-center px-6 pb-16 flex-1 pt-16">
        <div className="w-full max-w-5xl rounded-[20px] overflow-hidden" style={{ height: 'clamp(280px, 45vw, 520px)' }}>
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&fit=crop"
            alt="Group of young people using phones and laptops outdoors"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-12">
          <h1 className="font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#0f1b2d] text-center">
            Take control of your money with <span className="text-orange-500">manayja</span>
          </h1>
        </div>
      </main>
    </div>
  )
}