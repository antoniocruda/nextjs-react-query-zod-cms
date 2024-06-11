type Props = {
    className?: string;
};

const UserOutlineIcon = ({ className }: Props) => {
    return (
        <svg
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg" 
            className={className}
        >
            <path
                d="M30.88,27.62H19.12c-9.09,0-16.48,7.93-16.48,17.68V50h44.71v-4.69C47.36,35.56,39.96,27.62,30.88,27.62z
                M45.09,47.73H4.91v-2.42c0-8.5,6.37-15.41,14.21-15.41h11.76c7.83,0,14.21,6.92,14.21,15.41V47.73z M25,24.76
                c6.83,0,12.38-5.55,12.38-12.38S31.83,0,25,0S12.62,5.55,12.62,12.38S18.17,24.76,25,24.76z M25,2.27
                c5.57,0,10.11,4.54,10.11,10.11S30.57,22.49,25,22.49s-10.11-4.54-10.11-10.11S19.43,2.27,25,2.27z"
                fill="currentColor"
            />
        </svg>
    );
  }
  
  export default UserOutlineIcon;