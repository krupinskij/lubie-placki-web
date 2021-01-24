import './NavbarHeader.scss'

import cake from "../../assets/cake.svg";

interface NavbarHeaderProps {
  title: string;
}

export default function NavbarHeader({ title }: NavbarHeaderProps) {

  return (
		<header className="navbar-header">
			<img className="navbar-logo" src={cake} alt="page logo"/>
			<h1 className="navbar-title">{title}</h1>
		</header>
	)
}