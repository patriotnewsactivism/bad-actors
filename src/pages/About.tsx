import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home, ExternalLink, Music, Newspaper, Scale, Video, Code } from "lucide-react";

const About = () => {
  const pageTitle = "About Don Matthews (Matthew Reardon) — Investigative Journalist, Songwriter, Civil Rights Activist";
  const pageDescription = "Don Matthews, also known as Matthew Reardon, is an investigative journalist, songwriter, civil rights activist, web developer, and founder of We The People News, Bad Actors Music, Civil Rights Hub, and Tyrant Cam.";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Don Matthews",
    "alternateName": ["Matthew Reardon", "Don Matthews"],
    "description": pageDescription,
    "url": "https://badactors.online/about",
    "image": "https://badactors.online/bad-actors-cover.avif",
    "jobTitle": ["Investigative Journalist", "Songwriter", "Civil Rights Activist", "Web Developer"],
    "sameAs": [
      "https://www.wtpnews.org/about-matthew-reardon-don-matthews/",
      "https://badactors.online/",
      "https://www.youtube.com/@BadActors",
      "https://www.youtube.com/@WeThePeopleNews",
      "https://www.youtube.com/@PatriotNewsActivism",
      "https://www.instagram.com/badactorsjustice",
      "https://www.bandlab.com/badactors",
      "https://soundcloud.com/don-matthews-268378810"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "We The People News",
      "url": "https://www.wtpnews.org"
    },
    "founder": [
      { "@type": "Organization", "name": "We The People News", "url": "https://www.wtpnews.org" },
      { "@type": "Organization", "name": "Bad Actors Music", "url": "https://badactors.online" },
      { "@type": "Organization", "name": "Civil Rights Hub" },
      { "@type": "Organization", "name": "Tyrant Cam" }
    ],
    "knowsAbout": [
      "Investigative Journalism",
      "Civil Rights",
      "First Amendment",
      "Surveillance Technology",
      "Flock Safety",
      "Web Development",
      "Songwriting",
      "Police Accountability",
      "Government Corruption"
    ],
    "nationality": {
      "@type": "Country",
      "name": "United States"
    },
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "MS",
      "addressCountry": "US"
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-police-red selection:text-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://badactors.online/about" />
        <meta name="keywords" content="Don Matthews, Matthew Reardon, investigative journalist, songwriter, civil rights activist, We The People News, Bad Actors Music, Mississippi, protest music, First Amendment" />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://badactors.online/about" />
        <meta property="og:image" content="https://badactors.online/bad-actors-cover.avif" />
        <meta property="profile:first_name" content="Don" />
        <meta property="profile:last_name" content="Matthews" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      {/* Nav */}
      <nav className="bg-zinc-950 border-b-2 border-police-red/30 py-4 px-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-police-red transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-black tracking-tighter text-lg">BAD ACTORS</span>
          </Link>
          <Link to="/tracks" className="text-zinc-400 hover:text-white text-sm font-bold transition-colors">
            All Tracks →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-police-red/5 to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-6">
              Don <span className="text-police-red">Matthews</span>
            </h1>
            <p className="text-xl text-zinc-400 italic mb-2">a.k.a. Matthew Reardon</p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {["Investigative Journalist", "Songwriter", "Civil Rights Activist", "Web Developer", "Founder"].map((role) => (
                <span key={role} className="bg-police-red/20 border border-police-red/50 text-police-red px-3 py-1 text-sm font-bold uppercase tracking-wider">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* About Content */}
      <section className="py-16 bg-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">

            <div>
              <h2 className="text-3xl font-black text-police-red mb-6 uppercase tracking-tighter italic">About</h2>
              <div className="space-y-4 text-zinc-300 text-lg leading-relaxed">
                <p>
                  Matthew Reardon, also known as Don Matthews, is an investigative journalist, songwriter, civil rights activist, website and web application developer, and the founder and creator of <strong className="text-white">We The People News</strong>, <strong className="text-white">Civil Rights Hub</strong>, <strong className="text-white">Tyrant Cam</strong>, and <strong className="text-white">Bad Actors Music</strong>.
                </p>
                <p>
                  Based in Mississippi, he has dedicated his career to exposing civil rights violations, holding institutions accountable, and amplifying the voices of citizens whose stories go untold by mainstream media.
                </p>
                <p>
                  As the driving force behind We The People News (<a href="https://wtpnews.org" target="_blank" rel="noopener noreferrer" className="text-police-red hover:underline">WTPNEWS.ORG</a>), Matthews has built an independent media platform focused on investigative journalism that challenges government overreach, corporate surveillance, and systemic violations of constitutional rights.
                </p>
              </div>
            </div>

            {/* Bad Actors Music */}
            <div className="bg-zinc-900 border-l-4 border-police-red p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Music className="w-6 h-6 text-police-red" />
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Bad Actors Music</h2>
              </div>
              <p className="text-zinc-300 leading-relaxed mb-4">
                The <strong className="text-white">Bad Actors</strong> album is a 17-track sonic case file documenting named corruption across North Mississippi and the Southeast. Released as a free digital download on September 1, 2025, each track tells a real story, documents real corruption, and demands real accountability. The title "Bad Actors" refers to those in positions of power who abuse their authority and betray the public trust.
              </p>
              <Link
                to="/tracks"
                className="inline-flex items-center gap-2 bg-police-red text-white px-5 py-2.5 font-bold uppercase text-sm tracking-wider hover:bg-red-700 transition-colors"
              >
                Explore All 17 Tracks →
              </Link>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-3xl font-black text-police-red mb-6 uppercase tracking-tighter italic">Founded Projects</h2>
              <div className="grid gap-4">
                {[
                  {
                    icon: <Newspaper className="w-5 h-5" />,
                    name: "We The People News",
                    url: "https://wtpnews.org",
                    desc: "Independent investigative news platform covering civil rights, government accountability, and stories ignored by corporate media."
                  },
                  {
                    icon: <Music className="w-5 h-5" />,
                    name: "Bad Actors Music",
                    url: "https://badactors.online",
                    desc: "A 17-track investigative album and digital dossier combining songwriting with activism. Free to stream worldwide."
                  },
                  {
                    icon: <Scale className="w-5 h-5" />,
                    name: "Civil Rights Hub",
                    url: null,
                    desc: "A resource and advocacy center dedicated to civil rights education, awareness, and action."
                  },
                  {
                    icon: <Video className="w-5 h-5" />,
                    name: "Tyrant Cam",
                    url: null,
                    desc: "A live-streaming initiative documenting interactions with government officials and law enforcement in real time."
                  }
                ].map((project) => (
                  <div key={project.name} className="bg-zinc-900 border-l-4 border-crime-yellow p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-crime-yellow">{project.icon}</span>
                      <h3 className="text-lg font-black text-white">
                        {project.url ? (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-police-red transition-colors">
                            {project.name} <ExternalLink className="w-3 h-3 inline" />
                          </a>
                        ) : project.name}
                      </h3>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{project.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h2 className="text-3xl font-black text-police-red mb-6 uppercase tracking-tighter italic">Connect</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "We The People News", url: "https://wtpnews.org" },
                  { label: "Bad Actors Album", url: "https://badactors.online" },
                  { label: "YouTube — We The People News", url: "https://www.youtube.com/@WeThePeopleNews" },
                  { label: "YouTube — Patriot News Activism", url: "https://www.youtube.com/@PatriotNewsActivism" },
                  { label: "YouTube — Bad Actors", url: "https://www.youtube.com/@BadActors" },
                  { label: "Instagram", url: "https://www.instagram.com/badactorsjustice" },
                  { label: "SoundCloud", url: "https://soundcloud.com/don-matthews-268378810" },
                  { label: "BandLab", url: "https://www.bandlab.com/badactors" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 hover:border-police-red transition-all group"
                  >
                    <span className="text-sm font-bold group-hover:text-police-red transition-colors">{link.label}</span>
                    <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-police-red transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t-4 border-police-red bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white font-bold">© 2025 Don Matthews. All rights reserved.</p>
          <p className="text-police-red font-black text-xl mt-2 tracking-tighter uppercase italic">
            Truth. Justice. Accountability.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
