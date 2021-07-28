import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import classnames from "classnames";
import path from "path";
import MenuTray from "../components/MenuTray";
import Section from "../components/Section";
import { capitalize } from "../lib/lib";

function ActiveLink({ children, href, className, currentPath }) {
  const firstCrumb = currentPath.split("/")[1];

  const activeClassName = classnames({
    "text-black": "/" + firstCrumb === href,
    "text-gray": "/" + firstCrumb !== href,
  });

  return (
    <Link href={href}>
      <a className={`${className} ${activeClassName}`}>{children}</a>
    </Link>
  );
}

export default function Header(props) {
  const [isOpen, setTray] = useState(false);

  const currentPath = useRouter().asPath;

  const routeDepth = currentPath.split("/").length;

  const firstCrumb = currentPath.split("/")[1];

  return (
    <header className="w-full px-4 md:px-8 md:w-10/12 flex flex-row justify-between items-center pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12 lg:pb-24">
      <div>
        <Link href="/">
          <a className="type-ui">Urbit</a>
        </Link>
        {routeDepth > 2 ? (
          <Link href={`/${firstCrumb}`}>
            <a className="inline md:hidden type-ui text-gray ml-2">
              {capitalize(firstCrumb)}
            </a>
          </Link>
        ) : null}
      </div>
      {
        // Large screen header
      }
      <nav className="items-center hidden md:flex">
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/docs"
        >
          Docs
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/blog"
        >
          Blog
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/events"
        >
          Events
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 text-green type-ui button-text"
          href="/getting-started"
        >
          Get Started
        </ActiveLink>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.search.toggleSearch(e);
          }}
          className="button-sm bg-wall text-gray"
        >
          Search<div className="ml-4 text-lightGray">⌘K</div>
        </button>
      </nav>

      {
        // Small screen header
      }
      <MenuTray isOpen={isOpen} setTray={setTray} search={props.search}>
        <Link href="/">
          <a className="type-ui mb-12">Urbit</a>
        </Link>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/docs"
        >
          Docs
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/blog"
        >
          Blog
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/events"
        >
          Events
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/grants"
        >
          Grants
        </ActiveLink>
      </MenuTray>
    </header>
  );
}
