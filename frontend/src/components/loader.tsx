const Loader = () => {
  return (
    <>
      <div className="loader"></div>

      <style>
        {`
        .loader {
          width: 44.8px;
          height: 44.8px;
          color: #813599; 
          position: relative;
          background: radial-gradient(11.2px, currentColor 94%, transparent);
        }

        .loader::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background:
            radial-gradient(10.08px at bottom right, transparent 94%, currentColor) top left,
            radial-gradient(10.08px at bottom left,  transparent 94%, currentColor) top right,
            radial-gradient(10.08px at top right,    transparent 94%, currentColor) bottom left,
            radial-gradient(10.08px at top left,     transparent 94%, currentColor) bottom right;

          background-size: 22.4px 22.4px;
          background-repeat: no-repeat;
          animation: loaderAnim 1.5s infinite cubic-bezier(0.3,1,0,1);
        }

        @keyframes loaderAnim {
          33% {
            inset: -11.2px;
            transform: rotate(0deg);
          }

          66% {
            inset: -11.2px;
            transform: rotate(90deg);
          }

          100% {
            inset: 0;
            transform: rotate(90deg);
          }
        }
        `}
      </style>
    </>
  );
};

export default Loader;