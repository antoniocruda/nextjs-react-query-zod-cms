type Props = {
    className?: string;
};

const AngleUpSolidIcon = ({ className }: Props) => {
    return (
        <svg
            viewBox="0 0 384 512"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M352,352c-8.2,0-16.4-3.1-22.6-9.4L192,205.3L54.6,342.7c-12.5,12.5-32.8,12.5-45.2,0s-12.5-32.8,0-45.2
                l160-160c12.5-12.5,32.8-12.5,45.2,0l160,160c12.5,12.5,12.5,32.8,0,45.2C368.4,348.9,360.2,352,352,352z"
                fill="currentColor"
            />
        </svg>
    );
  }
  
  export default AngleUpSolidIcon;