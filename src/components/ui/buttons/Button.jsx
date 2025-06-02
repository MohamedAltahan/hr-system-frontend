// components/ui/Button.jsx
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ children, variant = 'primary', ...props }) => {
  const baseStyle = 'w-full py-3 rounded-2xl text-white text-center font-semibold transition duration-300  title-md h-12 flex items-center justify-center';
  const variants = {
    primary: 'bg-blue-800 hover:bg-blue-900',
    main:   'bg-[#055393] hover:bg-[#04457a]',

  };

  return (
    <button className={classNames(baseStyle, variants[variant])} {...props} style={{paddingBlock:'24px'}}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['main', 'primary']),
};

export default Button;



// How to use the Button component
// <Button variant="main">تسجيل الدخول</Button>
// <Button variant="primary">تسجيل الدخول</Button>
