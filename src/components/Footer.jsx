import BMCIcon from "../assets/bmc-button.svg";

const Footer = () => {
  return (
    <div className="mt-auto relative w-full pt-5 text-black/80 text-base flex flex-col gap-5 sm:flex-row justify-between items-center">
      <p>
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
        />
      </a>
    </div>
  );
};

export default Footer;
