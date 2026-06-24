import Logo from "./Logo";
import Buttons from "./Buttons";

function Header() {
  return (
    <header className="mx-auto flex w-[90%] items-center justify-between py-3">
      <Logo />
      <Buttons />
    </header>
  );
}

export default Header;
