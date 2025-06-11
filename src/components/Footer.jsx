import BMCIcon from "../assets/bmc-button.svg";

const Footer = () => {
  return (
    <div className="relative mt-auto flex w-full flex-col items-center justify-between gap-5 pt-5 text-base text-black/80 sm:flex-row">
      <p className="text-xs sm:text-sm lg:text-base">
        &copy; {new Date().getFullYear()}&nbsp;
        <a
          className="underline"
          href="https://takumayumi.pages.dev"
          title="takumayumi"
          target="_blank"
          rel="noreferrer"
        >
          takumayumi
        </a>
      </p>
      <a
        href="https://buymeacoffee.com/yumicchi"
        title="Buy me a hot chocolate"
        target="_blank"
        rel="noreferrer"
        aria-label="Buy me a hot chocolate"
      >
        <img
          src={BMCIcon}
          alt="Buy me a hot chocolate"
          width="179"
          height="50"
          className="h-auto max-w-28 sm:max-w-32 lg:max-w-44"
        />
      </a>
    </div>
  );
};

export default Footer;
