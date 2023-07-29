import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faCompass } from "@fortawesome/free-solid-svg-icons/faCompass";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";

export default function Sidebar() {
  return (
    <aside className="flex w-[200px] flex-col gap-4">
      <LinkItem
        to=""
        icon={<FontAwesomeIcon icon={faHouse} />}
        linkName="Home"
      />
      <LinkItem
        to="explore"
        icon={<FontAwesomeIcon icon={faCompass} />}
        linkName="Explore"
      />
      <LinkItem
        to="playlists"
        icon={<span className="material-symbols-outlined">playlist_add</span>}
        linkName="Playlists"
      />
      <LinkItem
        to="watch-later"
        icon={<FontAwesomeIcon icon={faClock} />}
        linkName="Watch Later"
      />
    </aside>
  );
}

function LinkItem({ to, icon, linkName }) {
  return (
    <NavLink to={`/${to}`} className="flex items-center gap-3">
      <div className="w-4">{icon}</div>
      <p>{linkName}</p>
    </NavLink>
  );
}
