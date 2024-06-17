const Button = (props) => {
    return (
        <div className="flex flex-row-reverse">
            <button>
                <a className={`bg-gold flex hover:bg-gray-500 rounded-md transition-all px-4 py-2`}
                href={props.to}>
                    {props.children}
                </a>
            </button>
        </div>
    )
}

export default Button