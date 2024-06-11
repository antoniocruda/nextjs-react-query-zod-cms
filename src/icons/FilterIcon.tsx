type Props = {
    className?: string;
};

const FilterIcon = ({ className }: Props) => {
    return (
        <svg
            viewBox="0 0 50 46.72"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M0,8.86A2.39,2.39,0,0,1,2.38,6.48H6.86a7.22,7.22,0,0,1,13.63,0H47.57a2.38,2.38,0,1,1,0,4.76H20.49a7.22,7.22,0,0,1-13.63,0H2.38A2.39,2.39,0,0,1,0,8.86Zm47.62,29.9H20.55a7.23,7.23,0,0,0-13.64,
                0H2.43a2.38,2.38,0,0,0,0,4.76H6.91a7.22,7.22,0,0,0,13.64,0H47.62a2.38,2.38,0,1,0,0-4.76ZM2.38,27.38H26.16a7.22,7.22,0,0,0,13.63,0h7.78a2.38,2.38,0,1,0,0-4.76H39.79a7.22,7.22,0,0,0-13.63,0H2.38a2.38,
                2.38,0,0,0,0,4.76Z" 
                transform="translate(0 -1.64)"
                fill="currentColor"
            />
        </svg>
    );
  }
  
  export default FilterIcon;