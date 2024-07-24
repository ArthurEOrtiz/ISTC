interface ActionBarProps {
    navList: JSX.Element;
}

const ActionBar: React.FC<ActionBarProps> = ({ navList }) => {
    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-circle btn-outline btn-primary text-white lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navList}
                    </ul>
                </div>
            </div>
            <div className="navbar-center hidden bg-base-300 rounded-xl lg:flex justify-start">
                <ul className="menu menu-horizontal space-x-16">
                    {navList}
                </ul>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    );
}

export default ActionBar;