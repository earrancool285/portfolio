import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code, Briefcase, Mail } from "lucide-react";

const PAGES = ["home", "about", "skills", "work", "contact"];

function DotNavigation({ current, setPage }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-50">
      {PAGES.map((p) => (
        <button
          key={p}
          aria-label={p}
          onClick={() => setPage(p)}
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
            current === p
              ? "bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50"
              : "bg-gray-500 hover:bg-white"
          }`}
        />
      ))}
    </div>
  );
}

function PageWrapper({ children, pageKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={pageKey}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.55 }}
        className="h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-4xl font-bold mb-6"
    >
      <span className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        <Icon size={26} className="text-cyan-400" />
        {title}
      </span>
      <span className="block h-[2px] w-16 bg-cyan-400 mt-2 mx-auto" />
    </motion.h2>
  );
}

function WorkSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const experiences = [
    {
      title: "PTT Digital",
      period: "Oct 2024 - Present",
      short: "OutSystems enterprise application development",
      details: [
        "Developed Outsystems (Low-Code Platform)",
        "Collaborated with cross-functional teams",
        "Customized solutions",
        "Enhanced applications",
        "Integrated systems",
        "Key Projects",
        " - GC / PSSR & KEEP",
        " - GC / e-MoC",
      ],
    },
    {
      title: "Frasers Property",
      period: "Jun 2023 - Sep 2024",
      short: "Power Platform & automation",
      details: [
        "Developed Power Platform",
        "Built Power Automate flows",
        "Designed automation",
        "System integration",
      ],
    },
    {
      title: "PTT Digital",
      period: "Aug 2021 - Apr 2023",
      short: "Low-code development",
      details: [
        "Developed Outsystems apps",
        "Built business solutions",
        "Improved systems",
        "Key Projects",
        "  - GC / Data Executive",
        "  - GC / SWR",
        "  - GC / CTC"
      ],
    },
    {
      title: "NetSys & Computer Co.,Ltd.",
      period: "Feb 2019 - Aug 2021",
      short: "ASP.NET",
      details: [
        "Developed Web apps",
        "SAP B1 support",
        "System testing",
      ],
    },
    {
      title: "Unicef",
      period: "2018",
      short: "Data Analyst",
      details: [
        "Database management",
        "Solved complex data problems",
        "Built dashboards and reports",
        "Developed VBA solutions",
      ],
    },
  ];

  return (
    <div className="w-full max-w-6xl flex flex-col items-center">
      <SectionHeader icon={Briefcase} title="Work Experience" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur
            hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20
            transition duration-300 text-left flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <p className="text-gray-400 text-sm">{exp.period}</p>
              <p className="text-gray-300 mt-2">{exp.short}</p>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="list-disc list-inside mt-3 text-gray-300 space-y-1"
                  >
                    {exp.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="text-cyan-400 text-sm mt-3 hover:underline"
            >
              {openIndex === index ? "Show less" : "Read more"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [page, setPage] = useState("home");
  const lockRef = useRef(false);

  useEffect(() => {
    const onWheel = (e) => {
      if (lockRef.current) return;
      const idx = PAGES.indexOf(page);

      if (e.deltaY > 0 && idx < PAGES.length - 1) {
        setPage(PAGES[idx + 1]);
      } else if (e.deltaY < 0 && idx > 0) {
        setPage(PAGES[idx - 1]);
      }

      lockRef.current = true;
      setTimeout(() => (lockRef.current = false), 700);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [page]);

  return (
    <div className="bg-black text-white h-screen overflow-hidden">
      <DotNavigation current={page} setPage={setPage} />

      {page === "home" && (
        <PageWrapper pageKey="home">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold">
              Patipan
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Nuntaso
              </span>
            </h1>
            <p className="mt-6 text-gray-400">
              Software Developer — OutSystems / .NET / Power Platform
            </p>
            <p className="mt-4 text-xs text-gray-500">Scroll to navigate ↓</p>
          </div>
        </PageWrapper>
      )}

      {page === "about" && (
        <PageWrapper pageKey="about">
          <div className="max-w-2xl">
            <SectionHeader icon={User} title="About" />
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
              Software Developer with 5+ years experience building scalable applications,
              automating workflows and integrating enterprise systems.

              Passionate about solving complex technical problems and building efficient solutions
              using modern technologies like OutSystems, .NET, and Power Platform.
            </p>
          </div>
        </PageWrapper>
      )}

      {page === "skills" && (
        <PageWrapper pageKey="skills">
          <div className="max-w-2xl">
            <SectionHeader icon={Code} title="Skills" />
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "OutSystems",
                "Power Platform",
                ".NET Core",
                "C#",
                "SQL Server",
                "Oracle",
                "REST API",
                "Power Automate",
                "Entity Framework",
                "VBA",
              ].map((s) => (
                <span key={s} className="px-4 py-2 border border-white/20 rounded-full text-sm hover:border-cyan-400 transition">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </PageWrapper>
      )}

      {page === "work" && (
        <PageWrapper pageKey="work">
          <WorkSection />
        </PageWrapper>
      )}

      {page === "contact" && (
        <PageWrapper pageKey="contact">
          <div>
            <SectionHeader icon={Mail} title="Contact" />
            <p className="text-gray-300">earrancool@gmail.com</p>
            <p className="text-gray-300">090-452-7390</p>
          </div>
        </PageWrapper>
      )}
    </div>
  );
}
