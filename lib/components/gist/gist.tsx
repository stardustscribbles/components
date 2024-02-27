export interface GistProps {
    gistId?: string;
}

const SSGist: React.FC<GistProps> = ({ gistId }) => {

    // const [showGist, setShowGist] = useState(false);

    const onGistLoad = (event: any) => {
        const iframe = event.target;
        const contentDocument = iframe.contentDocument;
        const contentHeight = contentDocument.body.scrollHeight;
        iframe.style.height = `${contentHeight}px`;
    }

    // useEffect(() => {
    //     setShowGist(true);
    // }, []);

    const someContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Iframe Content</title>
                <script>
                    onGistLoad = () => { 
                        document.body.style.margin = 0;
                        document.body.style.height = document.body.scrollHeight + "px";
                    }
                </script>
                <style>
                    /* https://github.com/lonekorean/gist-syntax-themes */
                    @import url('https://cdn.rawgit.com/lonekorean/gist-syntax-themes/d49b91b3/stylesheets/idle-fingers.css');

                    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
                    body {
                        font: 16px 'Open Sans', sans-serif;
                    }
                    body .gist .gist-file {
                        border-color: #555 #555 #444
                    }
                    body .gist .highlight {
                        background: rgb(13, 17, 23);
                    }
                    body .gist .gist-data {
                        border-color: #555
                    }
                    body .gist .gist-meta {
                        color: #ffffff;
                        background: rgb(22, 27, 34); 
                    }
                    body .gist .gist-meta a {
                        color: #ffffff
                    }
                    body .gist .gist-data .pl-s .pl-s1 {
                        color: #a5c261
                    }
                    body .gist .blob-num {
                        color: grey;
                    }
                </style>
            </head>
            <body>
                <script id=${gistId} onload="onGistLoad()" src="https://gist.github.com/stardustscribbles/${gistId}.js"></script>
                <script>
                    
                </script>
            </body>
        </html>`;
    return (
        <>

            <div className="m-8">
                {true ? (
                    <>
                        <iframe
                            srcDoc={someContent}
                            width="100%"
                            height="100%"
                            onLoad={onGistLoad}
                        />
                    </>
                ) : <></>}
            </div>
        </>
    )
}

export default SSGist;
