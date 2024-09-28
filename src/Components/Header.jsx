

function Header(props){
    return(
        <>
            <header className="w-full p-3 bg-slate-400 flex ">
                <h1 className="text-white text-3xl font-light capitalize italic">{props.title}</h1>
            </header>
        </>
    )
}

export default Header;