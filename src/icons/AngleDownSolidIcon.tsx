type Props = {
    className?: string;
};

const AngleDownSolidIcon = ({ className }: Props) => {
    return (
        <svg
            viewBox="0 0 384 512"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M192,384c-8.2,0-16.4-3.1-22.6-9.4l-160-160c-12.5-12.5-12.5-32.8,0-45.2s32.8-12.5,45.2,0L192,306.8
                l137.4-137.4c12.5-12.5,32.8-12.5,45.2,0s12.5,32.8,0,45.2l-160,160C208.4,380.9,200.2,384,192,384z"
                fill="currentColor"
            />
        </svg>
    );
  }
  
  export default AngleDownSolidIcon;