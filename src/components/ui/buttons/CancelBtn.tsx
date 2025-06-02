import PropTypes from 'prop-types';

const Button = ({ children, ...props }) => {
  return (
    <button className="cancelBtn bg-transparent border border-[#E9EAF0]" {...props} >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
