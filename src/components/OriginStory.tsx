import { Scale, MapPin, Music, Flame } from "lucide-react";

const OriginStory = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-black overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-police-red to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-crime-yellow to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-police-red/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-crime-yellow/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-police-red/30 bg-police-red/5 mb-6">
            <Scale className="w-4 h-4 text-police-red" />
            <span className="text-[10px] sm:text-xs font-black text-police-red uppercase tracking-[0.3em]">Case File: Origin</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none mb-4">
            How <span className="text-police-red">Bad Actors</span> Was Born
          </h2>
          <div className="h-1 w-20 bg-police-red mx-auto mb-6" />
          <p className="text-crime-yellow font-bold uppercase tracking-widest text-sm sm:text-base">
            The Galveston DWI Scandal That Started It All
          </p>
        </div>

        {/* Origin Story Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* The Catalyst */}
          <div className="bg-zinc-950 border-2 border-police-red/30 p-6 sm:p-10 relative">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-police-red -translate-x-2 -translate-y-2" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-police-red translate-x-2 translate-y-2" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-police-red/10 border border-police-red/30">
                <Flame className="w-6 h-6 text-police-red" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-police-red uppercase tracking-tighter">
                The Catalyst
              </h3>
            </div>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base mb-6">
              Bad Actors didn't start in a recording studio. It started in a courtroom. It started with a scandal that stretched from the coast of <strong className="text-white">Galveston, Texas</strong> to the hills of <strong className="text-white">Lafayette County, Mississippi</strong> — two jurisdictions, hundreds of miles apart, connected by a web of corruption, false charges, and officials who thought they were untouchable.
            </p>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              The Galveston DWI Scandal was the breaking point. It was the moment I looked at what these people were doing — the manufactured charges, the coordinated retaliation across state lines, the officials who lied under oath and slept fine at night — and I realized the courts alone weren't going to fix this. The system was protecting its own. If the truth was going to get out, it had to come from somewhere they couldn't silence. It had to come through music.
            </p>
          </div>

          {/* Two States, One Conspiracy */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-zinc-950 border border-police-red/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-crime-yellow" />
                <h4 className="text-lg font-black text-crime-yellow uppercase tracking-tight">Galveston, TX</h4>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Where the DWI scandal unfolded. Where charges were fabricated. Where officers filed reports they knew were false. Where the machinery of injustice first showed its hand — and where I first saw just how far bad actors would go to protect each other and destroy anyone who dared to push back.
              </p>
            </div>

            <div className="bg-zinc-950 border border-police-red/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-crime-yellow" />
                <h4 className="text-lg font-black text-crime-yellow uppercase tracking-tight">Lafayette County, MS</h4>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Where the corruption followed me home. Where Mississippi officials coordinated with Texas to keep the pressure on. Where warrants were built on lies, where eleven months of freedom were stolen, and where the full scope of cross-state retaliation became undeniable. North Mississippi became ground zero for the fight back.
              </p>
            </div>
          </div>

          {/* Fed Up */}
          <div className="bg-zinc-950 border-2 border-crime-yellow/30 p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-crime-yellow/10 border border-crime-yellow/30">
                <Music className="w-6 h-6 text-crime-yellow" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-crime-yellow uppercase tracking-tighter">
                Completely Fed Up
              </h3>
            </div>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base mb-6">
              I was completely fed up. Fed up with corrupt cops who lied on the stand. Fed up with prosecutors who looked the other way. Fed up with a system that punished the people exposing the truth instead of the people breaking the law. I had boxes of evidence, stacks of contradicted reports, recordings of officials saying the quiet part out loud — and nobody in power wanted to hear it.
            </p>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base mb-6">
              So I decided to tell the story in music. Not metaphors. Not fiction. Real names. Real events. Real documents set to beats. Every track on Bad Actors is a case file with a melody.
            </p>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              What I never expected was how fast it would all come together. Once I started writing, the songs poured out like they'd been waiting years to exist. Because they had. Every betrayal, every false arrest, every lie sworn under oath — they'd been building up inside me, compressing into something that needed to explode. Seventeen tracks. Each one a documented act of corruption. Each one a name on the record. The bad actors and their accompanying songs came together so quickly it felt less like writing and more like testimony that had been waiting for its day in court.
            </p>
          </div>

          {/* The Result */}
          <div className="bg-gradient-to-r from-police-red/10 via-black to-crime-yellow/10 border border-police-red/30 p-6 sm:p-10 text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-snug mb-4">
              "They thought silence would protect them.
              <br />
              <span className="text-police-red">They never expected a soundtrack.</span>"
            </p>
            <div className="h-0.5 w-16 bg-police-red mx-auto my-6" />
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Bad Actors Volume 1 is the direct result of the Galveston DWI Scandal — 17 tracks born from years of documented corruption spanning Texas and Mississippi. What was meant to break one man became the fuel for a movement. The story isn't over. Volume 2 is already in production.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginStory;
