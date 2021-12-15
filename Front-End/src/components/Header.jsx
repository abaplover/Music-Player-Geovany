// import React from 'react';
// import './Header.css'


// export default function Header() {

//     return(
//         <header className="Header">
//             <img src={"../assets/logo.png"} className="logo" alt="logo" />
//             <nav className="Nav">
//                 <a href="/"> Home</a>
//                 <a href="/"> Articles</a>
//                 <a href="/"> About</a>
//                 <button>Logout</button>
//             </nav>
//         </header>
//     );
// }

import React from 'react'
import  './style.css'

export default function Nav () {

    return(
    <div>
        <div className="navigation">
          <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact Us</li>
          </ul>
        </div>
    </div>
    )
}


