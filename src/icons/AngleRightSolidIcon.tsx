type Props = {
    className?: string;
};

const AngleRightSolidIcon = ({ className }: Props) => {
    return (
        <svg
            viewBox="0 0 256 512"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M64,448c-8.2,0-16.4-3.1-22.6-9.4c-12.5-12.5-12.5-32.8,0-45.2L178.8,256L41.4,118.6
                c-12.5-12.5-12.5-32.8,0-45.2s32.8-12.5,45.3,0l160,160c12.5,12.5,12.5,32.8,0,45.2l-160,160C80.4,444.9,72.2,448,64,448z"
                fill="currentColor"
            />
        </svg>
    );
  }
  
  export default AngleRightSolidIcon;