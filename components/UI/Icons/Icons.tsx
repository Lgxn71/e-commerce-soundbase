import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Loader2 } from "lucide-react";

import styles from "./Icons.module.css";
type IconsOnClick = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
}) => JSX.Element;

interface IIcons {
  Search: (props: any) => JSX.Element;
  Visa: (props: any) => JSX.Element;
  ArrowLeft: () => JSX.Element;
  Loader: () => JSX.Element;
  WhiteCross: IconsOnClick;
  Plus: IconsOnClick;
  Minus: IconsOnClick;

  BurgerMenu: ({
    onClick,
    isOpen,
  }: {
    onClick: MouseEventHandler<HTMLDivElement>;
    isOpen: boolean;
  }) => JSX.Element;
}

const Icons: IIcons = {
  Search: (props: any) => (
    <svg
      {...props}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_165_328)">
        <path
          d="M2.5 8.83333C2.5 9.59938 2.65088 10.3579 2.94404 11.0657C3.23719 11.7734 3.66687 12.4164 4.20854 12.9581C4.75022 13.4998 5.39328 13.9295 6.10101 14.2226C6.80875 14.5158 7.56729 14.6667 8.33333 14.6667C9.09938 14.6667 9.85792 14.5158 10.5657 14.2226C11.2734 13.9295 11.9164 13.4998 12.4581 12.9581C12.9998 12.4164 13.4295 11.7734 13.7226 11.0657C14.0158 10.3579 14.1667 9.59938 14.1667 8.83333C14.1667 8.06729 14.0158 7.30875 13.7226 6.60101C13.4295 5.89328 12.9998 5.25022 12.4581 4.70854C11.9164 4.16687 11.2734 3.73719 10.5657 3.44404C9.85792 3.15088 9.09938 3 8.33333 3C7.56729 3 6.80875 3.15088 6.10101 3.44404C5.39328 3.73719 4.75022 4.16687 4.20854 4.70854C3.66687 5.25022 3.23719 5.89328 2.94404 6.60101C2.65088 7.30875 2.5 8.06729 2.5 8.83333Z"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 18L12.5 13"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_165_328">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),

  Visa: (props: any) => (
    <svg
      {...props}
      width="128"
      height="56"
      viewBox="0 0 128 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_114_734"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="44"
        y="21"
        width="40"
        height="14"
      >
        <path d="M84 21.3195H44V34.0973H84V21.3195Z" fill="white" />
      </mask>
      <g mask="url(#mask0_114_734)">
        <path
          d="M61.3331 33.9129H58.0928L60.1195 21.5436H63.3596L61.3331 33.9129Z"
          fill="white"
        />
        <path
          d="M73.0798 21.8461C72.4407 21.5958 71.427 21.3195 70.1736 21.3195C66.9737 21.3195 64.7203 23.0037 64.7065 25.4116C64.6799 27.1882 66.3198 28.175 67.5464 28.7673C68.8 29.3726 69.2261 29.7677 69.2261 30.3073C69.2134 31.1359 68.2131 31.5179 67.2802 31.5179C65.9866 31.5179 65.2934 31.321 64.24 30.8599L63.8133 30.6623L63.3599 33.4389C64.1199 33.7807 65.52 34.084 66.9737 34.0972C70.3736 34.0972 72.5871 32.4391 72.6133 29.873C72.6262 28.4649 71.7603 27.386 69.8934 26.5044C68.7601 25.9384 68.0661 25.5568 68.0661 24.9777C68.0793 24.4513 68.6531 23.9121 69.9324 23.9121C70.9858 23.8857 71.7598 24.1356 72.3461 24.3857L72.6392 24.5171L73.0798 21.8461Z"
          fill="white"
        />
        <path
          d="M77.3862 29.5309C77.6531 28.8203 78.6799 26.0701 78.6799 26.0701C78.6664 26.0965 78.9462 25.3464 79.1062 24.8859L79.3327 25.9517C79.3327 25.9517 79.9463 28.9125 80.0795 29.5309C79.5731 29.5309 78.0262 29.5309 77.3862 29.5309ZM81.3859 21.5436H78.8796C78.1067 21.5436 77.5195 21.7672 77.186 22.5699L72.373 33.9127H75.7729C75.7729 33.9127 76.3327 32.386 76.453 32.0572C76.826 32.0572 80.1334 32.0572 80.6132 32.0572C80.7062 32.4915 80.9998 33.9127 80.9998 33.9127H84L81.3859 21.5436Z"
          fill="white"
        />
        <path
          d="M55.3866 21.5436L52.2133 29.9783L51.8666 28.2676C51.2799 26.2938 49.4399 24.1492 47.3867 23.0829L50.2933 33.8998H53.7198L58.813 21.5436H55.3866Z"
          fill="white"
        />
        <path
          d="M49.2666 21.5436H44.0533L44 21.7936C48.0667 22.82 50.76 25.2942 51.8665 28.2682L50.7332 22.5834C50.5467 21.7934 49.9733 21.5697 49.2666 21.5436Z"
          fill="white"
        />
      </g>
    </svg>
  ),
  WhiteCross: ({ onClick }) => (
    <div onClick={onClick} className={styles.whiteCross}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.99961 8.04998L1.74961 13.3C1.59961 13.45 1.42461 13.525 1.22461 13.525C1.02461 13.525 0.849609 13.45 0.699609 13.3C0.549609 13.15 0.474609 12.975 0.474609 12.775C0.474609 12.575 0.549609 12.4 0.699609 12.25L5.94961 6.99998L0.699609 1.74998C0.549609 1.59998 0.474609 1.42498 0.474609 1.22498C0.474609 1.02498 0.549609 0.849976 0.699609 0.699976C0.849609 0.549976 1.02461 0.474976 1.22461 0.474976C1.42461 0.474976 1.59961 0.549976 1.74961 0.699976L6.99961 5.94998L12.2496 0.699976C12.3996 0.549976 12.5746 0.474976 12.7746 0.474976C12.9746 0.474976 13.1496 0.549976 13.2996 0.699976C13.4496 0.849976 13.5246 1.02498 13.5246 1.22498C13.5246 1.42498 13.4496 1.59998 13.2996 1.74998L8.04961 6.99998L13.2996 12.25C13.4496 12.4 13.5246 12.575 13.5246 12.775C13.5246 12.975 13.4496 13.15 13.2996 13.3C13.1496 13.45 12.9746 13.525 12.7746 13.525C12.5746 13.525 12.3996 13.45 12.2496 13.3L6.99961 8.04998Z"
          fill="white"
        />
      </svg>
    </div>
  ),

  ArrowLeft: () => <FontAwesomeIcon icon={faArrowRight} rotation={180} />,
  Loader: () => (
    <Loader2
      width={20}
      height={20}
      className={styles.animateSpin}
      absoluteStrokeWidth={true}
    />
  ),
  Plus: ({ onClick }) => (
    <div onClick={onClick} className={styles.plus}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <path
          d="M10 8V13M12.5 10.5H7.5M17.5 10.5C17.5 11.4849 17.306 12.4602 16.9291 13.3701C16.5522 14.2801 15.9997 15.1069 15.3033 15.8033C14.6069 16.4997 13.7801 17.0522 12.8701 17.4291C11.9602 17.806 10.9849 18 10 18C9.01509 18 8.03982 17.806 7.12987 17.4291C6.21993 17.0522 5.39314 16.4997 4.6967 15.8033C4.00026 15.1069 3.44781 14.2801 3.0709 13.3701C2.69399 12.4602 2.5 11.4849 2.5 10.5C2.5 8.51088 3.29018 6.60322 4.6967 5.1967C6.10322 3.79018 8.01088 3 10 3C11.9891 3 13.8968 3.79018 15.3033 5.1967C16.7098 6.60322 17.5 8.51088 17.5 10.5Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  ),
  Minus: ({ onClick }) => (
    <div onClick={onClick} className={styles.minus}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <path
          d="M12.5 10.5H7.5M17.5 10.5C17.5 11.4849 17.306 12.4602 16.9291 13.3701C16.5522 14.2801 15.9997 15.1069 15.3033 15.8033C14.6069 16.4997 13.7801 17.0522 12.8701 17.4291C11.9602 17.806 10.9849 18 10 18C9.01509 18 8.03982 17.806 7.12987 17.4291C6.21993 17.0522 5.39314 16.4997 4.6967 15.8033C4.00026 15.1069 3.44781 14.2801 3.0709 13.3701C2.69399 12.4602 2.5 11.4849 2.5 10.5C2.5 8.51088 3.29018 6.60322 4.6967 5.1967C6.10322 3.79018 8.01088 3 10 3C11.9891 3 13.8968 3.79018 15.3033 5.1967C16.7098 6.60322 17.5 8.51088 17.5 10.5Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  ),
  BurgerMenu: ({ onClick, isOpen }) => {
    const arrayMap = [1, 2, 3];

    return (
      <div onClick={onClick} className={styles.burgerMobile}>
        <span className={`${styles.burgerLine} ${isOpen && styles.active}`} />
        <span className={`${styles.burgerLine} ${isOpen && styles.active}`} />
        <span className={`${styles.burgerLine} ${isOpen && styles.active}`} />
      </div>
    );
  },
};
export default Icons;
