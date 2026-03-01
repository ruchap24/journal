"use client";

import Script from "next/script";

export default function AuraBg() {
  return (
    <>
      <div className="aura-background-component fixed top-0 w-full h-screen -z-10" data-alpha-mask="80" style={{ maskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)" }}>
        <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
          <div data-us-project="HzcaAbRLaALMhHJp8gLY" className="absolute w-full h-full left-0 top-0 -z-10"></div>
          <Script
             src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
             strategy="afterInteractive"
             onLoad={() => {
                // @ts-ignore
                if(!window.UnicornStudio){window.UnicornStudio={isInitialized:false};}
                 // @ts-ignore
                if(!window.UnicornStudio.isInitialized && window.UnicornStudio.init) {
                   // @ts-ignore
                   window.UnicornStudio.init();
                   // @ts-ignore
                   window.UnicornStudio.isInitialized=true;
                }
             }}
          />
        </div>
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ visibility: "hidden" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light"></div>
      </div>
    </>
  );
}