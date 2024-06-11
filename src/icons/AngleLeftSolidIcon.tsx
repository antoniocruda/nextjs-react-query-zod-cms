type Props = {
    className?: string;
};

const AngleLeftSolidIcon = ({ className }: Props) => {
    return (
        <svg
            viewBox="0 0 256 512"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M192,448c-8.2,0-16.4-3.1-22.6-9.4l-160-160c-12.5-12.5-12.5-32.8,0-45.2l160-160c12.5-12.5,32.8-12.5,45.2,0
                s12.5,32.8,0,45.2L77.2,256l137.4,137.4c12.5,12.5,12.5,32.8,0,45.2C208.4,444.9,200.2,448,192,448z"
                fill="currentColor"
            />
        </svg>
    );
  }
  
  export default AngleLeftSolidIcon;