  export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };



    export const dashboardVariants = {
      hidden: { scale: 0.95, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          delay: 0.5,
          duration: 0.8,
          ease: "easeOut"
        }
      },
      hover: {
        scale: 1.01,
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }
    };
  
    export const glowVariants = {
      hidden: { opacity: 0.15 },
      visible: {
        opacity: 0.25,
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    };