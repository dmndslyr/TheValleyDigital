import './PrintIssue.css';
import placeholderImg from '../assets/placeholder-issue.jpg'; 
import logo from '../assets/DIGITAL_print.png'

function PrintIssue (){

    const placeholderData = {
    img: placeholderImg,
    volumeNumber: 'XX',
    pagesNumber: 'XX',
    startIssue: 'Month Year',
    endIssue: 'Month Year',
    awards: ['Award 1', 'Award 2', 'Award 3']
    };

    const pastIssues = [ 
        { 
            img: placeholderImg, 
            volumeNumber: 'XX', 
            pagesNumber: 'XX',
            startIssue: 'Month Year', 
            endIssue: 'Month Year' 
        }, 

        { img: placeholderImg,
            volumeNumber: 'XX',
            pagesNumber: 'XX',
            startIssue: 'Month Year',
            endIssue: 'Month Year' }
    ];

    return(
    <div className='print-issue'>
        <div className='print-issue-header'>
            <h1>PRINT ISSUES</h1>
            <div className='header-slice'></div>
            <div className='header-slice'></div>
        </div>
        <h2>LATEST ISSUE</h2>
        <div className="latest-issue">
            <div className="issue-photo">
                <img src={placeholderData.img} alt='img'></img>
                <button>READ ONLINE</button>
            </div>
            <div className='right-latest-issue'>
                <img src={logo} alt='logo'></img>
                <h3>VOLUME {placeholderData.volumeNumber}, NO.1</h3>
                <p>{placeholderData.pagesNumber} pages | {placeholderData.startIssue} - {placeholderData.endIssue}</p>
                <div className='awards'>
                    {placeholderData.awards.map((award, index) => ( 
                    <div key={index} className='award-item'>
                        {award} 
                    </div> ))}
                </div>
            </div>
        </div>
        <h2>OTHER ISSUES</h2>
        <div className='past-issues'>
            {pastIssues.map((issue, index) => ( 
                <div key={index} className='past-issue'>
                    <div className="past-issue-photo">
                        <img src={issue.img} alt='img' /> 
                    </div> 
                    <div className='right-past-issue'> 
                        <h3>THE VALLEY</h3>
                        <h3>VOLUME {issue.volumeNumber}, NO.1</h3> 
                        <p>
                            {issue.pagesNumber} pages | {issue.startIssue} - {issue.endIssue}
                        </p>
                        <button>READ ONLINE</button> 
                    </div> 
                </div> ))}
        </div>
    </div>
    )
}

export default PrintIssue