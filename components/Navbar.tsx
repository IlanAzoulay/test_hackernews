import { useState } from 'react';
import {SlRefresh} from 'react-icons/sl';

export default function Navbar(
    {changeData, newest}: {changeData: (attr: string) => void, newest: boolean}
) {

    const [animating, setAnimating] = useState<boolean>(false);

    function refresh() {
        console.log("clicked refresh");
        changeData("refresh")
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
        }, 1000)
    };

    // Change from newest stories to top stories, and back
    function changeNewest(source: string) {
        if ((newest && source === "top") || (source === "new" && !newest)) {
            changeData("newest");
        }
    }

    return (
        <div className="navbar">
            <div className='navbar-left'>
                <div className='navbar-title'>Hacker News</div>
                <div className={newest? 'navbar-options-picked' : 'navbar-options-unpicked'} onClick={() => changeNewest("new")}>
                    New
                </div>
                <div className={newest? 'navbar-options-unpicked' : 'navbar-options-picked'} onClick={() => changeNewest("top")}>
                    Top
                </div>
            </div>
            <div className="navbar-refresh" onClick={refresh}>
                <SlRefresh className={animating? 'refresh-icon spin' : 'refresh-icon'}/>
            </div>
        </div>
    )
}