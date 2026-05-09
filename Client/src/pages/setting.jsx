import { BadgeQuestionMark, House, Palette, PanelRightClose, User } from 'lucide-react'
import React, { useState } from 'react'

const SettingPage = ({ textTheme }) => {
  const [activePage, setActivePage] = useState("profile");

  const switchPage = () => {
    switch(activePage) {
      case "profile":
        return <div className="">Profile</div>
      case "theme":
        return <div className="">Theme</div>
      case "help":
        return <div className="">Help and Support</div>
      default:
        return <div className="">404 Not Found</div>
    }
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300 items-center ">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost items-center">
            <PanelRightClose size={22} />
          </label>
          <div className="px-4 text-3xl">Settings</div>
        </nav>
        <div className="p-4">{switchPage()}</div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-15 gap-1 pt-2 is-drawer-open:w-64">
          <div className="p-5 is-drawer-close:hidden">
            <a href="/" className={`${textTheme} text-3xl font-extrabold`}>
              GAME<span className="text-yellow-500">SHELF</span>
            </a>
          </div>
          <ul className="menu w-full grow">
            <li>
              <a href="/">
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Homepage">
                <House size={22} className='my-1' />
                <span className="is-drawer-close:hidden">Homepage</span>
              </button></a>
            </li>

            <li>
              <button onClick={() => setActivePage("profile")} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                <User size={22} className='my-1' />
                <span className="is-drawer-close:hidden">Profile</span>
              </button>
            </li>

            <li>
              <button onClick={() => setActivePage("theme")} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Theme">
                <Palette size={22} className='my-1' />
                <span className="is-drawer-close:hidden">Theme and Colors</span>
              </button>
            </li>

            <li>
              <button onClick={() => setActivePage("help")} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Help and Support">
                <BadgeQuestionMark size={22} className='my-1' />
                <span className="is-drawer-close:hidden">Help and Support</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SettingPage