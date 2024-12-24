import { memo, useContext } from "react";
import { motion } from "framer-motion";
import { useLottie } from "lottie-react";
import eventMapLottie from "../../static/animations/eventMapLottie.json";
import classNames from "./loadingAnimation.module.scss";
import { GlobalContex } from "../../globalContext";

function LoadingAnimation({
  className,
  classNameSvg,
  logoAnim = false,
  sideDraw,
  mobile,
}) {
  const { selectedApp } = useContext(GlobalContex);

  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "#18191D00",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: selectedApp.appColor,
    },
  };

  const options = {
    animationData: eventMapLottie,
    loop: true,
    autoplay: true,
    className: classNames.loadingAnimation,
    // className: `${classNames.logo} ${classNameSvg}`,
  };
  const { View } = useLottie(options);

  const conditionalPaths = () => {
    console.log(selectedApp?.appName, "app-name")
    if (selectedApp?.appName === "MyCryptoBrand") {
      return (
        <motion.svg
          className={classNames.animation}
          // className={`${classNames.logo} ${classNameSvg}`}
          viewBox={mobile ? "0 0 42 45" : "0 0 80 80"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            stroke={selectedApp.appColor}
            strokeWidth={0.5}
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut", repeat: Infinity },
              fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
            }}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32.4041 27.4356H22.6357C20.0264 27.4356 17.7151 25.8003 16.8004 23.428L18.0393 22.1811C18.5034 24.3311 20.4278 25.8868 22.6357 25.8868H23.7718H26.7464H32.4041C33.4873 25.8868 34.3682 25.0055 34.3682 23.9224C34.3682 22.8392 33.4873 21.9583 32.4041 21.9583H29.3446V20.4091H32.4041C33.4873 20.4091 34.3682 19.5282 34.3682 18.445C34.3682 17.3618 33.4873 16.4809 32.4041 16.4809H28.6302V14.9317H32.4041C34.3411 14.9317 35.9171 16.508 35.9171 18.445C35.9171 19.5513 35.4028 20.5393 34.6009 21.1835C35.4028 21.8281 35.9171 22.8161 35.9171 23.9224C35.9171 25.8594 34.3411 27.4356 32.4041 27.4356ZM7.33848 17.28V26.6612H5.78962V14.1327L13.6783 20.2066L18.4779 16.5148C19.6238 15.4938 21.0988 14.9317 22.6357 14.9317H25.8014V16.4809H22.6357C21.4719 16.4809 20.3552 16.9091 19.4912 17.6866L19.4453 17.7247L13.678 22.1608L7.33848 17.28ZM21.125 -0.000102997C9.72118 -0.000102997 0.476624 9.24446 0.476624 20.6483C0.476624 32.0521 9.72118 41.2966 21.125 41.2966C32.5288 41.2966 41.7734 32.0521 41.7734 20.6483C41.7734 9.24446 32.5288 -0.000102997 21.125 -0.000102997Z"
            fill={selectedApp.appColor}
          />
        </motion.svg>
      );
    } else if (selectedApp?.appName === "Capitalized") {
      return (
        <motion.svg
          // className={`${classNames.logo} ${classNameSvg}`}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.path
            stroke={selectedApp.appColor}
            strokeWidth={0.5}
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut", repeat: Infinity },
              fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
            }}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28.4249 0C32.0239 0 35.4387 0.677207 38.6072 1.87792C36.7002 1.41691 34.7003 1.20073 32.6394 1.20073C18.304 1.20073 6.7063 12.7989 6.7063 27.1346C6.7063 41.4701 18.304 53.0685 32.6394 53.0685C40.1762 53.0685 46.9441 49.8674 51.6816 44.7625C46.544 52.0527 38.0227 56.8191 28.4249 56.8191C12.7359 56.8191 0 44.1165 0 28.4264C0 12.7052 12.7359 0 28.4249 0Z"
            fill={selectedApp.appColor}
          />
          <motion.path
            stroke={selectedApp.appColor}
            strokeWidth={0.5}
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut", repeat: Infinity },
              fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
            }}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M44.1141 11.5383L55.6192 4.40177L41.6836 52.7585L31.4702 55.5271L44.1141 11.5383Z"
            fill={selectedApp.appColor}
          />
          <motion.path
            stroke={selectedApp.appColor}
            strokeWidth={0.5}
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut", repeat: Infinity },
              fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
            }}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.78263 32.5781L21.2879 25.4416L15.0121 47.1925L6.27582 44.8535L9.78263 32.5781Z"
            fill={selectedApp.appColor}
          />
          <motion.path
            stroke={selectedApp.appColor}
            strokeWidth={0.5}
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut", repeat: Infinity },
              fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
            }}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M26.9482 22.0583L38.392 15.1353L26.7636 55.5271L18.027 53.097L26.9482 22.0583Z"
            fill={selectedApp.appColor}
          />
        </motion.svg>
      );
    } else if (selectedApp?.appName === "CryptoMarketingPro") {

      return <motion.svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd" d="M71.3591 22.6825C69.4891 18.2597 66.8112 14.2878 63.4016 10.8781C59.992 7.46833 56.021 4.79188 51.5974 2.92051C47.0167 0.983002 42.1518 0 37.1397 0C32.1278 0 27.263 0.983002 22.6821 2.92051C18.2586 4.79188 14.2878 7.46833 10.8781 10.8781C7.46833 14.2878 4.79071 18.2597 2.9205 22.6825C0.982661 27.2637 0 32.1282 0 37.1403C0 42.1525 0.982661 47.0167 2.9205 51.598C4.79071 56.021 7.46833 59.9923 10.8781 63.4019C14.2878 66.8115 18.2586 69.4891 22.6821 71.3597C27.263 73.2973 32.1278 74.28 37.1397 74.28C42.1518 74.28 47.0167 73.2973 51.5974 71.3597C52.0937 71.1501 52.5839 70.9295 53.0688 70.6994C55.313 69.6339 57.4317 68.3531 59.4104 66.8678L36.4386 43.8593L31.3513 48.9474L47.5835 65.2052C44.33 66.4202 40.8107 67.0843 37.1397 67.0843C20.6283 67.0843 7.19577 53.6517 7.19577 37.1403C7.19577 20.6295 20.6283 7.1958 37.1397 7.1958C51.0421 7.1958 62.7606 16.7179 66.118 29.5831L58.4226 21.8759L53.3343 26.9633L73.039 46.6987C73.8122 43.7939 74.225 40.8018 74.274 37.7519C74.2775 37.5484 74.2797 37.3445 74.2797 37.1403C74.2797 32.1282 73.2967 27.2637 71.3591 22.6825Z" fill={selectedApp.appColor}
        />
        <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd" d="M65.9351 60.5998C67.4902 58.6961 68.8472 56.6513 69.9923 54.4795L47.9226 32.375L42.8346 37.463L65.9351 60.5998Z" fill={selectedApp.appColor} />
        <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd" d="M98.5411 42.3649C95.1802 42.3649 92.1552 41.6622 89.4663 40.2566C86.808 38.8206 84.7149 36.8343 83.1872 34.2984C81.6596 31.7624 80.8956 28.8902 80.8956 25.6819C80.8956 22.4736 81.6596 19.6015 83.1872 17.0654C84.7149 14.5294 86.808 12.5586 89.4663 11.1531C92.1552 9.71698 95.1802 8.99893 98.5411 8.99893C101.474 8.99893 104.117 9.51836 106.47 10.5572C108.823 11.5961 110.778 13.0933 112.337 15.0488L106.562 20.2737C104.484 17.7682 101.963 16.5154 98.9994 16.5154C97.2578 16.5154 95.6995 16.8974 94.3245 17.6612C92.9802 18.4251 91.9261 19.5098 91.1621 20.9153C90.4288 22.2903 90.0621 23.8792 90.0621 25.6819C90.0621 27.4846 90.4288 29.0888 91.1621 30.4943C91.9261 31.8693 92.9802 32.9386 94.3245 33.7026C95.6995 34.4665 97.2578 34.8484 98.9994 34.8484C101.963 34.8484 104.484 33.5957 106.562 31.0901L112.337 36.315C110.778 38.2706 108.823 39.7676 106.47 40.8066C104.117 41.8456 101.474 42.3649 98.5411 42.3649ZM132.699 33.1984H127.749V41.7232H118.674V9.64058H133.341C136.243 9.64058 138.764 10.1295 140.903 11.1072C143.042 12.0544 144.692 13.4294 145.853 15.2321C147.014 17.0043 147.595 19.0973 147.595 21.5112C147.595 23.8333 147.045 25.8652 145.945 27.6069C144.875 29.3179 143.332 30.6624 141.316 31.6401L148.236 41.7232H138.52L132.699 33.1984ZM138.428 21.5112C138.428 20.014 137.954 18.8529 137.007 18.0279C136.06 17.2029 134.654 16.7904 132.791 16.7904H127.749V26.1861H132.791C134.654 26.1861 136.06 25.7888 137.007 24.9944C137.954 24.1694 138.428 23.0084 138.428 21.5112ZM171.632 30.2193V41.7232H162.557V30.0818L150.32 9.64058H159.899L167.507 22.382L175.116 9.64058H183.915L171.632 30.2193ZM203.047 9.64058C205.95 9.64058 208.47 10.1295 210.609 11.1072C212.748 12.0544 214.398 13.4294 215.559 15.2321C216.72 17.0043 217.301 19.0973 217.301 21.5112C217.301 23.925 216.72 26.018 215.559 27.7902C214.398 29.5624 212.748 30.9374 210.609 31.9151C208.47 32.8624 205.95 33.3359 203.047 33.3359H197.455V41.7232H188.381V9.64058H203.047ZM202.497 26.1861C204.361 26.1861 205.766 25.7888 206.714 24.9944C207.661 24.1694 208.134 23.0084 208.134 21.5112C208.134 20.014 207.661 18.8529 206.714 18.0279C205.766 17.2029 204.361 16.7904 202.497 16.7904H197.455V26.1861H202.497ZM230.04 16.8363H220.186V9.64058H248.923V16.8363H239.115V41.7232H230.04V16.8363ZM270.327 42.3649C266.935 42.3649 263.88 41.6467 261.161 40.2108C258.472 38.7748 256.348 36.7885 254.79 34.2526C253.262 31.7166 252.498 28.8596 252.498 25.6819C252.498 22.5042 253.262 19.6473 254.79 17.1113C256.348 14.5752 258.472 12.5891 261.161 11.1531C263.88 9.71698 266.935 8.99893 270.327 8.99893C273.719 8.99893 276.759 9.71698 279.448 11.1531C282.167 12.5891 284.291 14.5752 285.818 17.1113C287.377 19.6473 288.156 22.5042 288.156 25.6819C288.156 28.8596 287.377 31.7166 285.818 34.2526C284.291 36.7885 282.167 38.7748 279.448 40.2108C276.759 41.6467 273.719 42.3649 270.327 42.3649ZM270.327 34.8484C271.947 34.8484 273.413 34.4665 274.727 33.7026C276.041 32.9386 277.08 31.8693 277.844 30.4943C278.607 29.0888 278.989 27.4846 278.989 25.6819C278.989 23.8792 278.607 22.2903 277.844 20.9153C277.08 19.5098 276.041 18.4251 274.727 17.6612C273.413 16.8974 271.947 16.5154 270.327 16.5154C268.708 16.5154 267.241 16.8974 265.927 17.6612C264.613 18.4251 263.574 19.5098 262.811 20.9153C262.047 22.2903 261.665 23.8792 261.665 25.6819C261.665 27.4846 262.047 29.0888 262.811 30.4943C263.574 31.8693 264.613 32.9386 265.927 33.7026C267.241 34.4665 268.708 34.8484 270.327 34.8484Z" fill={selectedApp.appColor} />
        <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd" d="M98.824 65.1135L98.7766 56.3185L94.5095 63.4778H92.4233L88.1799 56.5555V65.1135H83.8416V48.5191H87.7057L93.5375 58.0964L99.227 48.5191H103.091L103.139 65.1135H98.824ZM117.578 61.8895H110.561L109.257 65.1135H104.469L111.794 48.5191H116.417L123.766 65.1135H118.882L117.578 61.8895ZM116.203 58.4283L114.07 53.1181L111.936 58.4283H116.203ZM132.351 60.7042H129.79V65.1135H125.096V48.5191H132.682C134.184 48.5191 135.488 48.7719 136.594 49.2777C137.7 49.7676 138.554 50.4788 139.154 51.4112C139.755 52.3279 140.055 53.4105 140.055 54.659C140.055 55.8601 139.771 56.9111 139.202 57.812C138.649 58.697 137.85 59.3924 136.807 59.8981L140.387 65.1135H135.361L132.351 60.7042ZM135.314 54.659C135.314 53.8846 135.069 53.2841 134.579 52.8573C134.089 52.4306 133.362 52.2173 132.398 52.2173H129.79V57.0771H132.398C133.362 57.0771 134.089 56.8716 134.579 56.4607C135.069 56.034 135.314 55.4334 135.314 54.659ZM149.045 59.0921L147.291 60.9649V65.1135H142.644V48.5191H147.291V55.4176L153.715 48.5191H158.883L152.103 55.868L159.239 65.1135H153.786L149.045 59.0921ZM173.794 61.4865V65.1135H160.471V48.5191H173.486V52.1461H165.117V54.9435H172.49V58.452H165.117V61.4865H173.794ZM179.931 52.241H174.834V48.5191H189.698V52.241H184.624V65.1135H179.931V52.241ZM191.446 48.5191H196.14V65.1135H191.446V48.5191ZM215.268 48.5191V65.1135H211.404L204.079 56.2711V65.1135H199.48V48.5191H203.344L210.669 57.3616V48.5191H215.268ZM229.697 56.4607H233.846V63.3356C232.898 64.0151 231.807 64.5367 230.575 64.9002C229.342 65.2637 228.109 65.4454 226.876 65.4454C225.138 65.4454 223.573 65.0819 222.183 64.3549C220.792 63.6121 219.701 62.5849 218.911 61.2731C218.121 59.9614 217.726 58.4758 217.726 56.8163C217.726 55.1569 218.121 53.6713 218.911 52.3595C219.701 51.0477 220.8 50.0284 222.206 49.3014C223.613 48.5586 225.201 48.1872 226.971 48.1872C228.52 48.1872 229.911 48.448 231.144 48.9695C232.376 49.491 233.404 50.2417 234.225 51.2216L231.238 53.9241C230.116 52.6914 228.773 52.075 227.208 52.075C225.786 52.075 224.64 52.5096 223.771 53.3789C222.902 54.2323 222.467 55.3781 222.467 56.8163C222.467 57.733 222.665 58.5548 223.06 59.2818C223.455 59.993 224.008 60.554 224.719 60.9649C225.43 61.36 226.244 61.5576 227.161 61.5576C228.062 61.5576 228.907 61.3758 229.697 61.0123V56.4607ZM251.307 48.5191C252.808 48.5191 254.112 48.7719 255.218 49.2777C256.325 49.7676 257.178 50.4788 257.779 51.4112C258.379 52.3279 258.68 53.4105 258.68 54.659C258.68 55.9076 258.379 56.9902 257.779 57.9068C257.178 58.8234 256.325 59.5346 255.218 60.0404C254.112 60.5303 252.808 60.7753 251.307 60.7753H248.415V65.1135H243.721V48.5191H251.307ZM251.022 57.0771C251.987 57.0771 252.714 56.8716 253.203 56.4607C253.693 56.034 253.938 55.4334 253.938 54.659C253.938 53.8846 253.693 53.2841 253.203 52.8573C252.714 52.4306 251.987 52.2173 251.022 52.2173H248.415V57.0771H251.022ZM268.222 60.7042H265.662V65.1135H260.968V48.5191H268.554C270.056 48.5191 271.359 48.7719 272.466 49.2777C273.572 49.7676 274.425 50.4788 275.026 51.4112C275.627 52.3279 275.927 53.4105 275.927 54.659C275.927 55.8601 275.642 56.9111 275.073 57.812C274.52 58.697 273.722 59.3924 272.679 59.8981L276.259 65.1135H271.233L268.222 60.7042ZM271.186 54.659C271.186 53.8846 270.941 53.2841 270.451 52.8573C269.961 52.4306 269.234 52.2173 268.27 52.2173H265.662V57.0771H268.27C269.234 57.0771 269.961 56.8716 270.451 56.4607C270.941 56.034 271.186 55.4334 271.186 54.659ZM286.885 65.4454C285.131 65.4454 283.55 65.074 282.144 64.3312C280.753 63.5884 279.654 62.5611 278.848 61.2494C278.058 59.9376 277.663 58.4599 277.663 56.8163C277.663 55.1727 278.058 53.695 278.848 52.3832C279.654 51.0715 280.753 50.0442 282.144 49.3014C283.55 48.5586 285.131 48.1872 286.885 48.1872C288.639 48.1872 290.212 48.5586 291.602 49.3014C293.009 50.0442 294.107 51.0715 294.898 52.3832C295.704 53.695 296.107 55.1727 296.107 56.8163C296.107 58.4599 295.704 59.9376 294.898 61.2494C294.107 62.5611 293.009 63.5884 291.602 64.3312C290.212 65.074 288.639 65.4454 286.885 65.4454ZM286.885 61.5576C287.722 61.5576 288.481 61.36 289.161 60.9649C289.84 60.5698 290.378 60.0167 290.773 59.3055C291.168 58.5785 291.365 57.7488 291.365 56.8163C291.365 55.8839 291.168 55.062 290.773 54.3508C290.378 53.6238 289.84 53.0628 289.161 52.6677C288.481 52.2726 287.722 52.075 286.885 52.075C286.047 52.075 285.289 52.2726 284.609 52.6677C283.929 53.0628 283.392 53.6238 282.997 54.3508C282.602 55.062 282.404 55.8839 282.404 56.8163C282.404 57.7488 282.602 58.5785 282.997 59.3055C283.392 60.0167 283.929 60.5698 284.609 60.9649C285.289 61.36 286.047 61.5576 286.885 61.5576Z" fill={selectedApp.appColor} />
      </motion.svg>
    }
  };

  return !mobile ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: sideDraw ? "80vh" : "100vh",
        paddingLeft: sideDraw ? "30%" : "10%",
        paddingTop: "25%",
      }}
    >
      {logoAnim ? <motion.svg
        className={classNames.animation}
        // className={`${classNames.logo} ${classNameSvg}`}
        viewBox={mobile ? "0 0 42 45" : "0 0 80 80"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.00839 27.653C8.00362 27.5993 8.00243 27.5666 8.00243 27.5666C8.00454 27.5955 8.00631 27.6239 8.00839 27.653C8.03719 27.9621 8.22048 29.0472 9.37772 29.6543C9.38007 29.6483 9.38259 29.6425 9.38494 29.6365C8.52448 28.2334 8.31109 26.9394 8.69902 25.3696C9.0907 23.7874 9.29502 21.7975 8.65255 21.1832C9.91501 21.3472 10.0499 23.2379 10.2244 24.4776C9.92589 22.1958 10.6192 17.9862 10.9449 17.3433C11.4813 16.2848 15.5701 10.7828 16.6528 9.26166C15.4395 11.1143 17.0567 14.6383 17.2536 16.5092C17.2574 16.5041 17.2616 16.4987 17.2655 16.4939C17.3309 15.641 17.9471 7.54885 18.5297 7.28144C21.4507 5.93938 23.3663 3.56091 23.7265 3.09043C23.7534 3.05378 23.768 3.034 23.768 3.034C22.1927 4.44516 20.1136 5.20783 19.1115 5.51558C17.8639 5.18462 16.554 5.0074 15.2026 5.0074C6.80645 5.0074 0 11.8137 0 20.2097C0 25.0416 2.25455 29.3466 5.76859 32.1312C6.52021 35.2347 6.63714 39 6.63714 39C6.85149 37.2811 8.10148 28.9895 8.00839 27.653Z" 
          fill={selectedApp.appColor}
        />
        <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M29.7088 12.1701C29.7167 12.1591 29.7247 12.1481 29.7326 12.1373L29.5709 12.2084C29.6202 12.1985 29.6662 12.1857 29.7088 12.1701Z"
          fill={selectedApp.appColor}
        />
        {/* <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.9995 23.4983L20.9995 0L13.4963 17.5014L20.9995 23.4983Z"
          fill={selectedApp.appColor}
        /> */}
        {/* <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M28.5026 17.5014L20.9993 23.4983L20.9993 0L28.5026 17.5014Z"
          fill={selectedApp.appColor}
        /> */}
        <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M29.7055 12.1745C28.6212 12.721 23.8609 17.7167 22.4174 20.0339C21.9906 20.719 17.604 20.8617 15.5208 20.4538C17.0177 20.8652 20.2237 21.8189 21.7007 21.1972C20.5002 21.8434 18.0287 25.5002 16.4617 26.5042C14.8951 27.5086 10.7521 29.26 10.1984 30.159C11.4314 29.4598 12.8438 28.9436 13.7264 29.0499C12.8396 29.3058 10.8372 30.1878 10.0475 31.2329C11.0038 30.5091 11.2966 30.9813 11.3575 31.2376C11.2009 30.9851 9.68343 31.9175 8.86226 32.623C12.2978 23.5974 17.4389 15.9923 24.4749 9.5087C23.922 9.90061 23.3589 10.3432 22.7898 10.8297C22.7875 10.8319 22.7849 10.8341 22.7825 10.8357C14.1898 18.8681 10.1526 27.3275 8.09442 33.6498C10.2158 34.7741 12.6344 35.4122 15.2028 35.4122C23.5989 35.4122 30.4054 28.6059 30.4054 20.2096C30.4054 17.8603 29.8722 15.6354 28.9205 13.6492C29.1198 13.1584 29.3836 12.6142 29.7055 12.1745Z"
          fill={selectedApp.appColor}
        />
        <motion.path
          stroke={selectedApp.appColor}
          strokeWidth={0.5}
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", repeat: Infinity },
            fill: { duration: 2, ease: [1, 0, 0.8, 1], repeat: Infinity },
          }}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.5986 10.2269C26.2642 10.3105 30.1957 10.5909 30.4286 10.3071C32.2022 8.14644 35.2725 0.556466 34.7359 0.217665C33.7884 -0.380318 28.21 0.29446 26.1907 1.74368C24.6001 2.88572 23.8341 6.6848 23.3646 9.1775C23.8843 8.74981 31.694 2.89024 32.1991 2.54042C31.7067 2.98426 24.5306 9.04318 23.5986 10.2269Z"
          fill={selectedApp.appColor}
        />
      </motion.svg> : View}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: sideDraw ? "80vh" : "100vh",
        // paddingLeft: sideDraw ? "30%" : "10%",
        // paddingTop: "25%",
      }}
    >
      {logoAnim ? conditionalPaths() : View}
    </div>
  );
}

export default memo(LoadingAnimation);
