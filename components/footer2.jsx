import { Notebook } from "lucide-react";
const Footer2 = ({
  

  tagline = "Query Your Study Files, Effortlessly.",

  menuItems = [
    {
      title: "Resources",
      links: [
        { text: "Contact Us", url: "#" },
        { text: "About", url: "#" },
        { text: "Help", url: "#" },
       
      ],
    },
  
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],

  copyright = "© 2025 CodeX. All rights reserved.",

  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ]
}) => {
  return (
    <section className="py-20 pl-4 bg-neutral-900 text-white">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start text-lime-300">
                <a href="https://shadcnblocks.com">
             <Notebook/>
                </a>
                <p className="text-xl font-semibold">DeepNote</p>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-lime-300">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            className="mt-24 flex flex-col justify-center gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center text-lime-300">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:white">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
