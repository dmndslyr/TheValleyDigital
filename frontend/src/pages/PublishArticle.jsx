import EditorHeader from "../components/EditorHeader"
import EditorSidebar from "../components/EditorSidebar"
import './PublishArticle.css'

function PublishArticle(){
    return(
        <>
        <EditorHeader />
        <div className="editor-container">
            <EditorSidebar />
            <div className="publish">
                <div className="publish-header">
                    <i className="fa-solid fa-angle-left"></i>
                    <h2>PUBLISH PRINT ISSUE</h2>
                    <button><i className="fa-solid fa-angle-right"></i>SAVE CHANGES</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default PublishArticle;
