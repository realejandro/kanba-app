
const SideBar = () => {
  
  return (    
    <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content lg:hidden">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-white text-base-content min-h-full w-80 p-4">
            {/*Sidebar content here */}
            <div className="flex justify-center gap-4 mb-4">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
            </div>
            <li>
                <a href="/" className="block text-center !text-white">Board</a>
            </li>
            <li>
                <a href="/analytics" className="block text-center !text-white">Analytics</a>
            </li>
            <li>
                <a href="/comments" className="block text-center !text-white">Comments</a>
            </li>
            <li>
                <a href="/calendar" className="block text-center !text-white">Calendar</a>
            </li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar