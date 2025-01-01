import './EditorSidebar.css'

function EditorSidebar(){
    return(
        <div className='editor-sidebar'>
            <div className="upper-sidebar">
                <div className='upper-section'>
                    <i class="fa-solid fa-house dashboard-icon"></i>
                    <h2>Dashboard</h2>
                </div>
                <div className="editor-search">
                    <i className="fas fa-search search-icon"></i> {/* Font Awesome search icon */}
                    <input type="text" placeholder='Search Article' />
                </div>
            </div>
            <div className="lower-sidebar">
                <h2>SECTIONS</h2>
                <ul>
                    <li>All Articles <span className="arrow-icon"><i className="fa-solid fa-angle-right"></i></span></li>
                    <li>News <span className="arrow-icon"><i className="fa-solid fa-angle-right"></i></span></li>
                    <li>Editorial <span className="arrow-icon"><i className="fa-solid fa-angle-right"></i></span></li>
                    <li>Opinion <span className="arrow-icon"><i className="fa-solid fa-angle-right"></i></span></li>
                    <li>Feature <span className="arrow-icon"><i className="fa-solid fa-angle-right"></i></span></li>
                    <li>Sci-Tech <span className="arrow-icon"><i className="fa-solid fa-angle-right"></i></span></li>
                    <li>Sports <span className="arrow-icon"><i className="fa-solid fa-angle-right"></i></span></li>
                    <li>Print Issues <span className="arrow-icon"><i className="fa-solid fa-angle-right"></i></span></li>
                </ul>
            </div>
        </div>
    )
}

export default EditorSidebar;