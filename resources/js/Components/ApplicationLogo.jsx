export default function ApplicationLogo(props) {
    return (
        <div className="flex items-center" {...props}>
            <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
            >
                <path d="M3 22.0001H21C21.5523 22.0001 22 21.5523 22 21.0001V13.0001C22 12.4478 21.5523 12.0001 21 12.0001H16V5.00005C16 4.44777 15.5523 4.00005 15 4.00005H9C8.44772 4.00005 8 4.44777 8 5.00005V12.0001H3C2.44772 12.0001 2 12.4478 2 13.0001V21.0001C2 21.5523 2.44772 22.0001 3 22.0001Z" />
                <path d="M12 4.00005V2.00005" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M10 8.00005H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 11.0001H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 16.0001H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 19.0001H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 16.0001H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 19.0001H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="ml-2 text-xl font-bold">InmobiliariaPRO</span>
        </div>
    );
}
