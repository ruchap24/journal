export function Logo() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ce3ec4" />
          <stop offset="50%" stopColor="#a838dc" />
          <stop offset="100%" stopColor="#c314b7" />
        </linearGradient>
      </defs>
      {/* Crescent moon shape with stars */}
      <path
        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C13.9059 21 15.6696 20.4074 17.1199 19.4015C16.9097 19.4413 16.6953 19.4616 16.4772 19.4616C13.4451 19.4616 11 16.9314 11 13.7908C11 10.6502 13.4451 8.12 16.4772 8.12C16.6953 8.12 16.9097 8.14028 17.1199 8.18012C15.6696 7.17425 13.9059 6.58162 12 6.58162C12 6.58162 13.5 9.12 13.5 12C13.5 14.88 12 17.4184 12 17.4184C14.4853 17.4184 16.5 15.3137 16.5 12C16.5 8.68629 14.4853 6.58162 12 6.58162"
        fill="url(#logoGradient)"
      />
      {/* Small stars */}
      <circle cx="18" cy="8" r="1" fill="url(#logoGradient)" />
      <circle cx="16" cy="6" r="0.5" fill="url(#logoGradient)" />
      <circle cx="19" cy="11" r="0.5" fill="url(#logoGradient)" />
    </svg>
  );
} 